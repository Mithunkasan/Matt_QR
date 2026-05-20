import Link from "next/link"

import { Logo } from "@/components/shared/logo"
import { buttonVariants } from "@/components/ui/button"
import { marketingLinks } from "@/lib/constants"
import { cn } from "@/lib/utils"

import { ThemeToggle } from "./theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/80">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Logo size="sm" />
        <div className="flex flex-wrap items-center justify-end gap-2">
          <nav className="hidden items-center gap-1 md:flex">
            {marketingLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-[#294785] transition-colors hover:bg-[#f4f6fb] hover:text-[#1f3768] dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/admin/login"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              "rounded-full border-[#d8dfef] bg-white text-[#1f4286] hover:bg-[#f6f8fc] dark:border-white/15 dark:bg-white/5 dark:text-white"
            )}
          >
            Admin
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
