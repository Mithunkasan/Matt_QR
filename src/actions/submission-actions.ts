"use server"

import { revalidatePath } from "next/cache"
import { ZodError, z } from "zod"

import { getAdminSession } from "@/lib/auth"
import { PUBLIC_PDF_PATH } from "@/lib/constants"
import { createSubmissionRecord, deleteSubmissionRecord } from "@/lib/submissions"
import type { ActionResult } from "@/types/actions"
import type { SubmissionFormValues } from "@/types/submission"
import { formIdSchema, submissionSchema } from "@/validations/submission"

const submissionIdSchema = z.string().min(1, "Submission ID is required")

export async function submitPublicFormAction(
  formId: string,
  values: SubmissionFormValues
): Promise<ActionResult<{ pdfPath: string; redirectTo: string }>> {
  try {
    const validFormId = formIdSchema.parse(formId)
    const payload = submissionSchema.parse(values)

    await createSubmissionRecord({
      formId: validFormId,
      ...payload,
    })

    revalidatePath("/admin")
    revalidatePath("/admin/qr")

    return {
      success: true,
      message: "Form submitted successfully. Your brochure is downloading now.",
      data: {
        pdfPath: PUBLIC_PDF_PATH,
        redirectTo: `/thank-you?formId=${validFormId}`,
      },
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        message: "Please review the form details and try again.",
        fieldErrors: error.flatten().fieldErrors,
      }
    }

    console.error("Public form submission failed", error)

    return {
      success: false,
      message: "We couldn't save the student details right now. Please try again in a moment.",
    }
  }
}

export async function deleteSubmissionAction(
  submissionId: string
): Promise<ActionResult> {
  try {
    const session = await getAdminSession()

    if (!session) {
      return {
        success: false,
        message: "Your admin session has expired. Please sign in again.",
      }
    }

    const validSubmissionId = submissionIdSchema.parse(submissionId)

    await deleteSubmissionRecord(validSubmissionId)

    revalidatePath("/admin")
    revalidatePath("/admin/qr")

    return {
      success: true,
      message: "Enquiry deleted successfully.",
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        message: "Invalid enquiry selected.",
        fieldErrors: error.flatten().fieldErrors,
      }
    }

    console.error("Delete submission failed", error)

    return {
      success: false,
      message: "We couldn't delete that entry right now. Please try again.",
    }
  }
}
