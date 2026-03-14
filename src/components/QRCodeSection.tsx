"use client";

import { QRCodeDisplay } from "./QRCodeDisplay";

export function QRCodeSection() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg w-full max-w-sm mx-auto space-y-6">
      <QRCodeDisplay />
    </div>
  );
}
