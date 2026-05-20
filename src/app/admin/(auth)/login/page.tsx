import type { Metadata } from "next"

import { AdminLoginForm } from "@/components/forms/admin-login-form"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Logo } from "@/components/shared/logo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { redirectIfAdminAuthenticated } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Admin login",
  description: "Secure admin access for MATT Engineering Solutions.",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminLoginPage() {
  await redirectIfAdminAuthenticated()

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-6">
          <Logo showTagline />
          <div className="space-y-4">
            <h1 className="font-heading text-4xl font-semibold tracking-tight text-[#123b84] sm:text-5xl dark:text-white">
              Secure admin access for brochure enquiries and QR campaigns.
            </h1>
            <p className="max-w-xl text-base leading-7 text-[#4a6296] dark:text-slate-300">
              Sign in with the environment-based admin credentials to review
              student submissions, export enquiry data, and manage QR-linked
              brochure routes.
            </p>
          </div>
        </div>
        <Card className="border-[#d8dfef] bg-white/90 shadow-[0_36px_120px_-56px_rgba(15,44,100,0.28)] dark:bg-slate-950/65">
          <CardHeader>
            <CardTitle className="text-[#123b84]">Admin login</CardTitle>
            <CardDescription>
              Uses simple credential authentication backed by secure HTTP-only cookies.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminLoginForm />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
