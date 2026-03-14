import Image from "next/image";

export function Loader() {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center bg-transparent">
      <div className="relative flex items-center justify-center w-32 h-32">
        {/* Spinning loading ring */}
        <div className="absolute inset-0 rounded-full border-[6px] border-brand-blue opacity-20" />
        <div className="absolute inset-0 rounded-full border-[6px] border-transparent border-t-brand-red border-l-brand-blue animate-[spin_1.5s_linear_infinite]" />
        
        {/* Center Logo */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-white flex items-center justify-center shadow-lg animate-pulse">
          <Image
            src="/logo.png"
            alt="Loading Logo"
            fill
            className="object-contain p-2"
            priority
          />
        </div>
      </div>
    </div>
  );
}
