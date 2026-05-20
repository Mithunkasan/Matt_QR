"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { startTransition, useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { loginAdminAction } from "@/actions/auth-actions"
import { FieldWrapper } from "@/components/forms/field-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import type { LoginFormValues } from "@/types/auth"
import { loginSchema } from "@/validations/auth"

export function AdminLoginForm() {
  const router = useRouter()
  const [isPending, beginTransition] = useTransition()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: LoginFormValues) => {
    beginTransition(async () => {
      const result = await loginAdminAction(values)

      if (!result.success) {
        if (result.fieldErrors) {
          for (const [field, messages] of Object.entries(result.fieldErrors)) {
            if (!messages?.[0]) {
              continue
            }

            form.setError(field as keyof LoginFormValues, {
              message: messages[0],
            })
          }
        }

        toast.error(result.message)
        return
      }

      toast.success(result.message)
      startTransition(() => {
        router.replace(result.data?.redirectTo ?? "/admin")
      })
    })
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-3"
      noValidate
    >
      <FieldWrapper
        htmlFor="email"
        label="Admin Email"
        error={form.formState.errors.email?.message}
      >
        <Input
          id="email"
          type="email"
          placeholder="admin@mattengg.com"
          autoComplete="email"
          aria-invalid={Boolean(form.formState.errors.email)}
          {...form.register("email")}
        />
      </FieldWrapper>
      <FieldWrapper
        htmlFor="password"
        label="Password"
        error={form.formState.errors.password?.message}
      >
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          aria-invalid={Boolean(form.formState.errors.password)}
          {...form.register("password")}
        />
      </FieldWrapper>
      <Button
        type="submit"
        size="lg"
        className="mt-3 w-full rounded-full"
        disabled={isPending}
      >
        {isPending ? <Spinner className="size-4" /> : null}
        Sign in to dashboard
      </Button>
    </form>
  )
}
