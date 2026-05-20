"use server"

import { redirect } from "next/navigation"
import { ZodError } from "zod"

import { clearAdminSession, createAdminSession, isAdminCredentialMatch } from "@/lib/auth"
import type { ActionResult } from "@/types/actions"
import type { LoginFormValues } from "@/types/auth"
import { loginSchema } from "@/validations/auth"

export async function loginAdminAction(
  values: LoginFormValues
): Promise<ActionResult<{ redirectTo: string }>> {
  try {
    const payload = loginSchema.parse(values)

    if (!isAdminCredentialMatch(payload.email, payload.password)) {
      return {
        success: false,
        message: "Invalid admin credentials. Check your environment values and try again.",
      }
    }

    await createAdminSession(payload.email)

    return {
      success: true,
      message: "Signed in successfully.",
      data: {
        redirectTo: "/admin",
      },
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        message: "Please correct the highlighted fields.",
        fieldErrors: error.flatten().fieldErrors,
      }
    }

    console.error("Admin login failed", error)

    return {
      success: false,
      message: "We couldn't sign you in right now. Please try again.",
    }
  }
}

export async function logoutAdminAction() {
  await clearAdminSession()
  redirect("/admin/login")
}
