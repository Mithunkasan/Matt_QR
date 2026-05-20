import "server-only"

import { Prisma, type Submission } from "@prisma/client"

import prisma from "@/lib/prisma"
import { normalizeFormId } from "@/lib/qr"
import { SUBMISSIONS_PAGE_SIZE } from "@/lib/constants"
import type {
  DashboardFilters,
  DashboardPagination,
  DashboardStats,
  SerializedSubmission,
  SubmissionFormValues,
} from "@/types/submission"

function serializeSubmission(submission: Submission): SerializedSubmission {
  return {
    id: submission.id,
    formId: submission.formId,
    name: submission.name,
    age: submission.age,
    mobileNumber: submission.mobileNumber,
    qualification: submission.year as SerializedSubmission["qualification"],
    createdAt: submission.createdAt.toISOString(),
  }
}

function createSubmissionWhere(query: string): Prisma.SubmissionWhereInput {
  if (!query.trim()) {
    return {}
  }

  const numericAge = Number.parseInt(query, 10)

  return {
    OR: [
      { name: { contains: query, mode: "insensitive" } },
      { mobileNumber: { contains: query, mode: "insensitive" } },
      { year: { contains: query, mode: "insensitive" } },
      { formId: { contains: query, mode: "insensitive" } },
      ...(Number.isNaN(numericAge) ? [] : [{ age: numericAge }]),
    ],
  }
}

function buildPagination(
  page: number,
  totalItems: number,
  pageSize: number
): DashboardPagination {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  return {
    page,
    pageSize,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  }
}

export async function createSubmissionRecord(
  input: SubmissionFormValues & { formId: string }
) {
  return prisma.submission.create({
    data: {
      formId: normalizeFormId(input.formId),
      name: input.name,
      age: input.age,
      mobileNumber: input.mobileNumber,
      email: `${input.mobileNumber}@no-email.local`,
      collegeName: "Not provided",
      department: input.qualification,
      year: input.qualification,
    },
  })
}

export async function deleteSubmissionRecord(id: string) {
  return prisma.submission.delete({
    where: { id },
  })
}

export async function getDashboardData({
  page,
  pageSize = SUBMISSIONS_PAGE_SIZE,
  query,
}: DashboardFilters) {
  const where = createSubmissionWhere(query)
  const skip = (page - 1) * pageSize

  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const last7Days = new Date(now)
  last7Days.setDate(now.getDate() - 7)

  const [
    submissions,
    filteredTotal,
    totalSubmissions,
    submissionsToday,
    submissionsLastWeek,
    uniqueFormIds,
  ] = await Promise.all([
    prisma.submission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.submission.count({ where }),
    prisma.submission.count(),
    prisma.submission.count({
      where: {
        createdAt: {
          gte: startOfToday,
        },
      },
    }),
    prisma.submission.count({
      where: {
        createdAt: {
          gte: last7Days,
        },
      },
    }),
    prisma.submission.findMany({
      where: {
        formId: {
          not: null,
        },
      },
      distinct: ["formId"],
      select: {
        formId: true,
      },
    }),
  ])

  const stats: DashboardStats = {
    totalSubmissions,
    submissionsToday,
    submissionsLastWeek,
    uniqueFormIds: uniqueFormIds.length,
  }

  return {
    submissions: submissions.map(serializeSubmission),
    stats,
    pagination: buildPagination(page, filteredTotal, pageSize),
  }
}

export async function getSubmissionExportRows(query = "") {
  const rows = await prisma.submission.findMany({
    where: createSubmissionWhere(query),
    orderBy: { createdAt: "desc" },
  })

  return rows.map(serializeSubmission)
}

export function submissionsToCsv(rows: SerializedSubmission[]) {
  const headers = [
    "ID",
    "Form ID",
    "Name",
    "Age",
    "Mobile Number",
    "Qualification",
    "Created At",
  ]

  const escapeValue = (value: string) => `"${value.replaceAll('"', '""')}"`

  const lines = rows.map((row) =>
    [
      row.id,
      row.formId ?? "-",
      row.name,
      row.age,
      row.mobileNumber,
      row.qualification,
      row.createdAt,
    ]
      .map((value) => escapeValue(String(value)))
      .join(",")
  )

  return [headers.join(","), ...lines].join("\n")
}
