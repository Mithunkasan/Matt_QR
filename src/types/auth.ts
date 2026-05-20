export type LoginFormValues = {
  email: string
  password: string
}

export type AdminSession = {
  email: string
  role: "admin"
  expiresAt: number
}
