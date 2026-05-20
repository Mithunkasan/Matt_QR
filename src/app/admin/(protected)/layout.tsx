import Link from "next/link"

import { logoutAdminAction } from "@/actions/auth-actions"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Logo } from "@/components/shared/logo"
import { buttonVariants } from "@/components/ui/button"
import { requireAdminSession } from "@/lib/auth"
import { adminLinks } from "@/lib/constants"
import { cn } from "@/lib/utils"

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAdminSession()

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <Logo href="/admin" />
            <ThemeToggle />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <nav className="flex flex-wrap gap-2">
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "rounded-full border-white/20 bg-white/70 dark:bg-slate-950/60"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <form action={logoutAdminAction}>
              <button
                type="submit"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "rounded-full"
                )}
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
