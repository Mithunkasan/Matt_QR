"use client"

import { Trash2Icon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { toast } from "sonner"

import { deleteSubmissionAction } from "@/actions/submission-actions"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"

type DeleteSubmissionDialogProps = {
  submissionId: string
  fullName: string
}

export function DeleteSubmissionDialog({
  submissionId,
  fullName,
}: DeleteSubmissionDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteSubmissionAction(submissionId)

      if (!result.success) {
        toast.error(result.message)
        return
      }

      toast.success(result.message)
      setOpen(false)
      router.refresh()
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="destructive" size="icon-sm" aria-label="Delete enquiry" />
        }
      >
        <Trash2Icon />
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-3xl border-white/10 bg-white/95 p-0 dark:bg-slate-950/95">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Delete this enquiry?</DialogTitle>
          <DialogDescription>
            This will permanently remove {fullName}&apos;s entry from the admin dashboard.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="rounded-b-3xl bg-slate-50/90 px-6 py-4 dark:bg-slate-900/80">
          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="rounded-full"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? <Spinner className="size-4" /> : null}
            Delete entry
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
