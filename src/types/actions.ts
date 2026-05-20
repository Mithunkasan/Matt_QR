export type FieldErrorMap = Partial<Record<string, string[]>>

export type ActionResult<T = undefined> =
  | {
      success: true
      message: string
      data?: T
    }
  | {
      success: false
      message: string
      fieldErrors?: FieldErrorMap
    }
