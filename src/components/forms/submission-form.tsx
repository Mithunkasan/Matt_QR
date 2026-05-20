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
import { qualificationOptions } from "@/types/submission"
import { submissionSchema } from "@/validations/submission"

type SubmissionFormProps = {
  formId: string
}

const fieldControlClassName =
  "h-11 rounded-full border-[#c7d6ec] bg-white px-4 text-[#123b84] caret-[#123b84] placeholder:text-[#7b8ba6] focus-visible:border-[#0ea5d1] dark:border-[#c7d6ec] dark:bg-white dark:text-[#123b84] dark:caret-[#123b84] dark:placeholder:text-[#7b8ba6]"

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
      qualification: undefined,
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
      className="space-y-3 text-[#123b84] dark:text-[#123b84]"
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
        <FieldWrapper htmlFor="age" label="Age" error={form.formState.errors.age?.message}>
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
        <FieldWrapper
          htmlFor="qualification"
          label="Qualification"
          error={form.formState.errors.qualification?.message}
        >
          <Select
            id="qualification"
            defaultValue=""
            className={fieldControlClassName}
            aria-invalid={Boolean(form.formState.errors.qualification)}
            {...form.register("qualification")}
          >
            <option value="" disabled>
              Select qualification
            </option>
            {qualificationOptions.map((qualification) => (
              <option key={qualification} value={qualification}>
                {qualification}
              </option>
            ))}
          </Select>
        </FieldWrapper>
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full rounded-full"
        disabled={isPending}
      >
        {isPending ? <Spinner className="size-4" /> : null}
        Submit and download e-book
      </Button>
    </form>
  )
}
