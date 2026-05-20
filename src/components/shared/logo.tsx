import Image from "next/image"
import Link from "next/link"

import { APP_NAME, APP_TAGLINE } from "@/lib/constants"
import { cn } from "@/lib/utils"

type LogoProps = {
  href?: string
  className?: string
  size?: "sm" | "md" | "lg"
  showTagline?: boolean
}

const sizeMap = {
  sm: {
    frame: "size-12 rounded-2xl",
    title: "text-sm",
    subtitle: "text-[10px]",
    gap: "gap-3",
  },
  md: {
    frame: "size-14 rounded-[1.2rem]",
    title: "text-base",
    subtitle: "text-[11px]",
    gap: "gap-3.5",
  },
  lg: {
    frame: "size-16 rounded-[1.35rem]",
    title: "text-lg",
    subtitle: "text-xs",
    gap: "gap-4",
  },
} as const

export function Logo({
  href = "/",
  className,
  size = "md",
  showTagline = false,
}: LogoProps) {
  const styles = sizeMap[size]

  return (
    <Link
      href={href}
      className={cn("inline-flex items-center", styles.gap, className)}
      aria-label={APP_NAME}
    >
      <span
        className={cn(
          "relative shrink-0 overflow-hidden border border-slate-200 bg-white shadow-[0_16px_48px_-28px_rgba(16,37,84,0.45)]",
          styles.frame
        )}
      >
        <Image
          src="/logo.png"
          alt="MATT Engineering Solutions logo"
          fill
          className="object-contain p-0.5"
          sizes="64px"
        />
      </span>
      <span className="flex flex-col">
        <span
          className={cn(
            "font-heading font-semibold tracking-[0.03em] text-[#1f4286] dark:text-white",
            styles.title
          )}
        >
          {APP_NAME}
        </span>
        {showTagline ? (
          <span
            className={cn(
              "font-semibold uppercase tracking-[0.18em] text-[#c93a31] dark:text-[#ff8a77]",
              styles.subtitle
            )}
          >
            {APP_TAGLINE}
          </span>
        ) : null}
      </span>
    </Link>
  )
}
