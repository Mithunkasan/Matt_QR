"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import type { DashboardPagination } from "@/types/submission"

type PaginationControlsProps = {
  pagination: DashboardPagination
}

export function PaginationControls({
  pagination,
}: PaginationControlsProps) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(page))
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Page {pagination.page} of {pagination.totalPages} with{" "}
        {pagination.totalItems} total entries.
      </p>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-full"
          disabled={!pagination.hasPreviousPage}
          onClick={() => setPage(pagination.page - 1)}
        >
          <ChevronLeftIcon />
          Previous
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-full"
          disabled={!pagination.hasNextPage}
          onClick={() => setPage(pagination.page + 1)}
        >
          Next
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  )
}
