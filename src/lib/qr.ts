import { DEMO_FORM_ID } from "@/lib/constants"

export function normalizeFormId(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "")
}

export function createRandomFormId(seed = Date.now()) {
  return `qr-${seed.toString(36)}`
}

export function resolveFormId(value?: string) {
  return normalizeFormId(value ?? "") || DEMO_FORM_ID
}

export function buildFormPath(formId: string) {
  return `/form/${resolveFormId(formId)}`
}

export function buildFormUrl(formId: string, appUrl: string) {
  return new URL(buildFormPath(formId), appUrl).toString()
}
