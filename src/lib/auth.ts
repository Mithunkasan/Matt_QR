import "server-only"

import { createHmac, timingSafeEqual } from "node:crypto"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { ADMIN_SESSION_COOKIE } from "@/lib/constants"
import { serverEnv } from "@/lib/env"
import type { AdminSession } from "@/types/auth"

const SESSION_MAX_AGE = 60 * 60 * 8

function signPayload(payload: string) {
  return createHmac("sha256", serverEnv.AUTH_SECRET)
    .update(payload)
    .digest("base64url")
}

function createSessionToken(session: AdminSession) {
  const encodedPayload = Buffer.from(JSON.stringify(session)).toString("base64url")
  const signature = signPayload(encodedPayload)

  return `${encodedPayload}.${signature}`
}

function verifySessionToken(token?: string | null) {
  if (!token) {
    return null
  }

  const [encodedPayload, signature] = token.split(".")

  if (!encodedPayload || !signature) {
    return null
  }

  const expectedSignature = signPayload(encodedPayload)
  const providedBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expectedSignature)

  if (
    providedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(providedBuffer, expectedBuffer)
  ) {
    return null
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as AdminSession

    if (payload.expiresAt <= Date.now()) {
      return null
    }

    return payload
  } catch {
    return null
  }
}

export function isAdminCredentialMatch(email: string, password: string) {
  return (
    email.trim().toLowerCase() === serverEnv.ADMIN_EMAIL.toLowerCase() &&
    password === serverEnv.ADMIN_PASSWORD
  )
}

export async function getAdminSession() {
  const cookieStore = await cookies()
  return verifySessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)
}

export async function createAdminSession(email: string) {
  const cookieStore = await cookies()
  const session: AdminSession = {
    email,
    role: "admin",
    expiresAt: Date.now() + SESSION_MAX_AGE * 1000,
  }

  cookieStore.set(ADMIN_SESSION_COOKIE, createSessionToken(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  })

  return session
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_SESSION_COOKIE)
}

export async function requireAdminSession() {
  const session = await getAdminSession()

  if (!session) {
    redirect("/admin/login")
  }

  return session
}

export async function redirectIfAdminAuthenticated() {
  const session = await getAdminSession()

  if (session) {
    redirect("/admin")
  }
}
