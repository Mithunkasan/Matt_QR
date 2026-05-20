"use client"

import { useState } from "react"

export function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const copy = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopiedText(value)
    window.setTimeout(() => setCopiedText(null), 1600)
  }

  return {
    copy,
    copiedText,
  }
}
