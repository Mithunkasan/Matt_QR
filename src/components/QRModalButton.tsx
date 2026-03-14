"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QRCodeDisplay } from "./QRCodeDisplay";

export function QRModalButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" className="text-brand-blue border-brand-blue hover:bg-brand-blue/10">
            <QrCode className="w-4 h-4 mr-2" />
            Show QR Code
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-gray-800">Registration Link</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center -mb-4">
          <QRCodeDisplay />
        </div>
      </DialogContent>
    </Dialog>
  );
}
