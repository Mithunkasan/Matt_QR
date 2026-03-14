"use client";

import { QRCodeSVG } from "qrcode.react";

export function QRCodeDisplay() {
  const url = "https://matt-qr.vercel.app/register"; // As per requirements
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl w-full max-w-sm mx-auto space-y-4">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-brand-blue">Matt Engineering Solution</h1>
        <p className="text-sm text-primary font-medium">Scan to Register for Internship / Courses</p>
      </div>
      <div className="p-4 bg-gray-50 rounded-xl">
        <QRCodeSVG
          value={url}
          size={256}
          level={"H"}
          imageSettings={{
            src: "/logo.png",
            x: undefined,
            y: undefined,
            height: 48,
            width: 48,
            excavate: true,
          }}
        />
      </div>
    </div>
  );
}
