import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid admin email"),
  password: z.string().min(8, "Enter your admin password"),
})

export type LoginInput = z.infer<typeof loginSchema>
