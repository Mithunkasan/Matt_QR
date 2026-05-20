"use client"

import { MoonStarIcon, SunMediumIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  )

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="rounded-full border-white/30 bg-white/50 backdrop-blur-md dark:bg-white/5"
        aria-label="Toggle theme"
      >
        <SunMediumIcon />
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full border-white/30 bg-white/50 text-slate-900 backdrop-blur-md dark:bg-white/5 dark:text-slate-100"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <SunMediumIcon /> : <MoonStarIcon />}
    </Button>
  )
}
