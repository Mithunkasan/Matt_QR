import { z } from "zod"

import { studentYearOptions } from "@/types/submission"

export const formIdSchema = z
  .string()
  .trim()
  .min(2, "QR form ID is too short")
  .max(48, "QR form ID is too long")
  .regex(/^[a-zA-Z0-9-_]+$/, "Use only letters, numbers, dashes, and underscores")

const mobileNumberSchema = z
  .string()
  .trim()
  .regex(/^\d{10}$/, "Enter a valid 10-digit mobile number")

export const submissionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name is too long"),
  age: z.preprocess(
    (value) => (typeof value === "number" ? String(value) : value),
    z
      .string()
      .trim()
      .min(1, "Enter age")
      .refine((value) => /^\d+$/.test(value), "Enter a valid age")
      .transform((value) => Number(value))
      .refine(
        (value) => value >= 15 && value <= 35,
        "Age must be between 15 and 35"
      )
  ),
  mobileNumber: mobileNumberSchema,
  email: z.string().trim().email("Enter a valid email address"),
  collegeName: z
    .string()
    .trim()
    .min(2, "College name must be at least 2 characters")
    .max(120, "College name is too long"),
  department: z
    .string()
    .trim()
    .min(2, "Department must be at least 2 characters")
    .max(80, "Department is too long"),
  year: z.enum(studentYearOptions, {
    error: "Select your year",
  }),
  alternativeMobileNumber: z.preprocess(
    (value) => {
      if (typeof value !== "string") {
        return value
      }

      const trimmed = value.trim()
      return trimmed === "" ? undefined : trimmed
    },
    mobileNumberSchema.optional()
  ),
})

export type SubmissionInput = z.infer<typeof submissionSchema>
