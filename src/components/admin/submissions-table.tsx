"use client"

import { Building2Icon, MailIcon, PhoneIcon } from "lucide-react"

import { DeleteSubmissionDialog } from "@/components/admin/delete-submission-dialog"
import { EmptyState } from "@/components/shared/empty-state"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDateTime } from "@/lib/format"
import type { DashboardPagination, SerializedSubmission } from "@/types/submission"

import { PaginationControls } from "./pagination-controls"

type SubmissionsTableProps = {
  submissions: SerializedSubmission[]
  pagination: DashboardPagination
  currentQuery: string
}

export function SubmissionsTable({
  submissions,
  pagination,
  currentQuery,
}: SubmissionsTableProps) {
  if (!submissions.length) {
    return (
      <EmptyState
        title="No enquiries yet"
        description={
          currentQuery
            ? "Try a broader search query or clear the current filter."
            : "Once a student submits the QR form, their details will appear here instantly."
        }
        actionLabel="Open QR generator"
        actionHref="/admin/qr"
      />
    )
  }

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/70 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:bg-slate-950/65">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10">
              <TableHead className="px-4">Student</TableHead>
              <TableHead>Academic</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>QR ID</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="px-4 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id} className="border-white/10">
                <TableCell className="px-4 py-4 align-top">
                  <div className="space-y-1.5">
                    <div className="font-medium text-slate-950 dark:text-white">
                      {submission.name}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      Age {submission.age}
                    </div>
                    <Badge variant="secondary">{submission.year}</Badge>
                  </div>
                </TableCell>
                <TableCell className="align-top">
                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Building2Icon className="size-4 shrink-0" />
                      <span className="max-w-xs whitespace-normal">
                        {submission.collegeName}
                      </span>
                    </div>
                    <div className="max-w-xs whitespace-normal">
                      {submission.department}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="align-top">
                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <MailIcon className="size-4 shrink-0" />
                      <span>{submission.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="size-4 shrink-0" />
                      <span>{submission.mobileNumber}</span>
                    </div>
                    {submission.alternativeMobileNumber ? (
                      <div className="flex items-center gap-2">
                        <PhoneIcon className="size-4 shrink-0" />
                        <span>{submission.alternativeMobileNumber}</span>
                      </div>
                    ) : null}
                  </div>
                </TableCell>
                <TableCell className="align-top">
                  <Badge variant="secondary">
                    {submission.formId ?? "direct-submit"}
                  </Badge>
                </TableCell>
                <TableCell className="align-top text-sm text-slate-600 dark:text-slate-300">
                  {formatDateTime(submission.createdAt)}
                </TableCell>
                <TableCell className="px-4 align-top">
                  <div className="flex justify-end gap-2">
                    <a
                      href={`mailto:${submission.email}`}
                      className="inline-flex size-7 items-center justify-center rounded-full border border-white/20 bg-white/70 text-slate-700 transition-colors hover:text-slate-950 dark:bg-white/5 dark:text-slate-200 dark:hover:text-white"
                      aria-label={`Email ${submission.name}`}
                    >
                      <MailIcon className="size-4" />
                    </a>
                    <DeleteSubmissionDialog
                      submissionId={submission.id}
                      fullName={submission.name}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <PaginationControls pagination={pagination} />
    </div>
  )
}
