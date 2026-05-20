export const qualificationOptions = [
  "10th",
  "12th",
  "Bachelor",
  "Master",
] as const

export type Qualification = (typeof qualificationOptions)[number]

export type SubmissionFormValues = {
  name: string
  age: number
  mobileNumber: string
  qualification: Qualification
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
