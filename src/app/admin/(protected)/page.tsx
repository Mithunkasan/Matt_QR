import type { Metadata } from "next"
import Link from "next/link"
import { DownloadIcon, PlusIcon } from "lucide-react"

import { SearchInput } from "@/components/admin/search-input"
import { SubmissionsTable } from "@/components/admin/submissions-table"
import { StatCard } from "@/components/shared/stat-card"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getDashboardData } from "@/lib/submissions"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Admin dashboard",
  description:
    "Protected brochure and enquiry dashboard with analytics and export controls.",
  robots: {
    index: false,
    follow: false,
  },
}

type DashboardPageProps = {
  searchParams: Promise<{
    q?: string
    page?: string
  }>
}

export const dynamic = "force-dynamic"

export default async function AdminDashboardPage({
  searchParams,
}: DashboardPageProps) {
  const params = await searchParams
  const query = typeof params.q === "string" ? params.q : ""
  const page = Number.isFinite(Number(params.page))
    ? Math.max(1, Number.parseInt(params.page ?? "1", 10))
    : 1

  const { submissions, stats, pagination } = await getDashboardData({
    page,
    query,
  })

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <Card className="border-white/15 bg-white/75 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:bg-slate-950/65">
          <CardHeader>
            <CardTitle className="text-3xl">Enquiry operations</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Review every student QR enquiry, export clean CSV data, and manage
              campaign-specific QR destinations from one dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Link
              href={`/api/admin/export${query ? `?q=${encodeURIComponent(query)}` : ""}`}
              className={cn(buttonVariants({ size: "sm" }), "rounded-full")}
            >
              <DownloadIcon />
              Export CSV
            </Link>
            <Link
              href="/admin/qr"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "rounded-full border-white/20 bg-white/70 dark:bg-slate-950/60"
              )}
            >
              <PlusIcon />
              Generate QR
            </Link>
          </CardContent>
        </Card>
        <div className="grid gap-4 sm:grid-cols-2">
          <StatCard
            label="Total enquiries"
            value={stats.totalSubmissions}
            helper="All-time stored entries"
          />
          <StatCard
            label="Today"
            value={stats.submissionsToday}
            helper="Fresh records since midnight"
          />
          <StatCard
            label="Last 7 days"
            value={stats.submissionsLastWeek}
            helper="Recent operational activity"
          />
          <StatCard
            label="Unique QR IDs"
            value={stats.uniqueFormIds}
            helper="Distinct form routes in use"
          />
        </div>
      </section>

      <section className="space-y-5">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">
              Submitted enquiries
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Search by student name, mobile number, qualification, or QR route
              ID.
            </p>
          </div>
          <SearchInput key={query} defaultValue={query} />
        </div>
        <SubmissionsTable
          submissions={submissions}
          pagination={pagination}
          currentQuery={query}
        />
      </section>
    </div>
  )
}
