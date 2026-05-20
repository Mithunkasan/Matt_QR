"use client"

import { SearchIcon } from "lucide-react"
import {
  startTransition,
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useState,
  useTransition,
} from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Input } from "@/components/ui/input"

type SearchInputProps = {
  defaultValue: string
}

export function SearchInput({ defaultValue }: SearchInputProps) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(defaultValue)
  const deferredValue = useDeferredValue(value)
  const [isPending, beginTransition] = useTransition()

  const replaceQuery = useEffectEvent((nextValue: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (nextValue.trim()) {
      params.set("q", nextValue.trim())
    } else {
      params.delete("q")
    }

    params.delete("page")

    beginTransition(() => {
      router.replace(
        params.toString() ? `${pathname}?${params.toString()}` : pathname,
        { scroll: false }
      )
    })
  })

  useEffect(() => {
    if (deferredValue === (searchParams.get("q") ?? "")) {
      return
    }

    replaceQuery(deferredValue)
  }, [deferredValue, searchParams])

  return (
    <div className="relative">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
      <Input
        value={value}
        onChange={(event) => {
          startTransition(() => {
            setValue(event.target.value)
          })
        }}
        placeholder="Search name, mobile, qualification, or QR ID"
        className="h-11 rounded-full border-white/20 bg-white/75 pl-10 dark:bg-slate-950/60"
        aria-label="Search enquiries"
      />
      {isPending ? (
        <span className="absolute top-1/2 right-4 -translate-y-1/2 text-xs text-slate-400">
          Updating...
        </span>
      ) : null}
    </div>
  )
}
