"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { startTransition, useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { submitPublicFormAction } from "@/actions/submission-actions"
import { FieldWrapper } from "@/components/forms/field-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import type { SubmissionFormValues } from "@/types/submission"
import { studentYearOptions } from "@/types/submission"
import { submissionSchema } from "@/validations/submission"

type SubmissionFormProps = {
  formId: string
}

const fieldControlClassName =
  "h-11 rounded-full border-[#c7d6ec] bg-white px-4 text-[#123b84] placeholder:text-[#7b8ba6] focus-visible:border-[#0ea5d1] dark:border-[#c7d6ec] dark:bg-white dark:text-[#123b84] dark:placeholder:text-[#7b8ba6]"

export function SubmissionForm({ formId }: SubmissionFormProps) {
  const router = useRouter()
  const [isPending, beginTransition] = useTransition()

  const form = useForm<
    z.input<typeof submissionSchema>,
    unknown,
    SubmissionFormValues
  >({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      name: "",
      age: "",
      mobileNumber: "",
      email: "",
      collegeName: "",
      department: "",
      year: undefined,
      alternativeMobileNumber: "",
    },
  })

  const onSubmit = (values: SubmissionFormValues) => {
    beginTransition(async () => {
      const result = await submitPublicFormAction(formId, values)

      if (!result.success) {
        if (result.fieldErrors) {
          for (const [field, messages] of Object.entries(result.fieldErrors)) {
            if (!messages?.[0]) {
              continue
            }

            form.setError(field as keyof SubmissionFormValues, {
              message: messages[0],
            })
          }
        }

        toast.error(result.message)
        return
      }

      const pdfPath = result.data?.pdfPath
      if (pdfPath) {
        const link = document.createElement("a")
        link.href = pdfPath
        link.download = "matt-course-brochure.pdf"
        document.body.append(link)
        link.click()
        link.remove()
      }

      toast.success(result.message)

      startTransition(() => {
        router.push(result.data?.redirectTo ?? "/thank-you")
      })
    })
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-3 text-[#123b84]"
      noValidate
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <FieldWrapper
          htmlFor="name"
          label="Name"
          error={form.formState.errors.name?.message}
        >
          <Input
            id="name"
            placeholder="Mithun Das"
            className={fieldControlClassName}
            aria-invalid={Boolean(form.formState.errors.name)}
            {...form.register("name")}
          />
        </FieldWrapper>
        <FieldWrapper
          htmlFor="age"
          label="Age"
          error={form.formState.errors.age?.message}
        >
          <Input
            id="age"
            type="number"
            inputMode="numeric"
            min={15}
            max={35}
            placeholder="18"
            className={fieldControlClassName}
            aria-invalid={Boolean(form.formState.errors.age)}
            {...form.register("age")}
          />
        </FieldWrapper>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <FieldWrapper
          htmlFor="email"
          label="Email"
          error={form.formState.errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            placeholder="mithun@example.com"
            className={fieldControlClassName}
            aria-invalid={Boolean(form.formState.errors.email)}
            {...form.register("email")}
          />
        </FieldWrapper>
        <FieldWrapper
          htmlFor="mobileNumber"
          label="Mobile Number"
          error={form.formState.errors.mobileNumber?.message}
        >
          <Input
            id="mobileNumber"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="9876543210"
            className={fieldControlClassName}
            aria-invalid={Boolean(form.formState.errors.mobileNumber)}
            {...form.register("mobileNumber")}
          />
        </FieldWrapper>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <FieldWrapper
          htmlFor="collegeName"
          label="College Name"
          error={form.formState.errors.collegeName?.message}
        >
          <Input
            id="collegeName"
            placeholder="MATT Engineering College"
            className={fieldControlClassName}
            aria-invalid={Boolean(form.formState.errors.collegeName)}
            {...form.register("collegeName")}
          />
        </FieldWrapper>
        <FieldWrapper
          htmlFor="department"
          label="Department"
          error={form.formState.errors.department?.message}
        >
          <Input
            id="department"
            placeholder="Computer Science"
            className={fieldControlClassName}
            aria-invalid={Boolean(form.formState.errors.department)}
            {...form.register("department")}
          />
        </FieldWrapper>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <FieldWrapper
          htmlFor="year"
          label="Year"
          error={form.formState.errors.year?.message}
        >
          <Select
            id="year"
            defaultValue=""
            className={fieldControlClassName}
            aria-invalid={Boolean(form.formState.errors.year)}
            {...form.register("year")}
          >
            <option value="" disabled>
              Select year
            </option>
            {studentYearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </FieldWrapper>
        <FieldWrapper
          htmlFor="alternativeMobileNumber"
          label="Alternative Mobile Number"
          hint="Optional"
          error={form.formState.errors.alternativeMobileNumber?.message}
        >
          <Input
            id="alternativeMobileNumber"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="9876543211"
            className={fieldControlClassName}
            aria-invalid={Boolean(form.formState.errors.alternativeMobileNumber)}
            {...form.register("alternativeMobileNumber")}
          />
        </FieldWrapper>
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full rounded-full"
        disabled={isPending}
      >
        {isPending ? <Spinner className="size-4" /> : null}
        Submit and download brochure
      </Button>
    </form>
  )
}
