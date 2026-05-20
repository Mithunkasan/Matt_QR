import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type EmptyStateProps = {
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
      <h3 className="font-heading text-xl font-semibold text-slate-950 dark:text-white">
        {title}
      </h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
        {description}
      </p>
      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className={cn(
            buttonVariants({ size: "sm" }),
            "mt-6 rounded-full px-5"
          )}
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  )
}
