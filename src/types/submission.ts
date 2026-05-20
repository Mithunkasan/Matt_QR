export const studentYearOptions = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
] as const

export type StudentYear = (typeof studentYearOptions)[number]

export type SubmissionFormValues = {
  name: string
  age: number
  mobileNumber: string
  email: string
  collegeName: string
  department: string
  year: StudentYear
  alternativeMobileNumber?: string
}

export type SerializedSubmission = SubmissionFormValues & {
  id: string
  formId: string | null
  createdAt: string
}

export type DashboardStats = {
  totalSubmissions: number
  submissionsToday: number
  submissionsLastWeek: number
  uniqueFormIds: number
}

export type DashboardPagination = {
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export type DashboardFilters = {
  page: number
  pageSize?: number
  query: string
}
