import {
  BracesIcon,
  CalendarDaysIcon,
  CoffeeIcon,
  CpuIcon,
  GlobeIcon,
  LaptopIcon,
} from "lucide-react"

export function PosterIllustration() {
  return (
    <div className="relative mx-auto h-[23rem] w-full max-w-[29rem]">
      <div className="absolute left-3 top-1 h-56 w-[20rem] rounded-[2rem] bg-[#123b84] shadow-[0_28px_80px_-42px_rgba(18,59,132,0.65)] sm:w-[22rem]">
        <div className="flex gap-1 px-4 pt-4">
          <span className="size-2 rounded-full bg-[#f87171]" />
          <span className="size-2 rounded-full bg-[#fbbf24]" />
          <span className="size-2 rounded-full bg-[#60a5fa]" />
        </div>
        <div className="space-y-3 px-4 py-5">
          {[0.76, 0.54, 0.83, 0.62, 0.48, 0.72].map((width, index) => (
            <div key={index} className="flex gap-2">
              <span className="h-2 w-8 rounded-full bg-[#4ea5ff]/70" />
              <span
                className="h-2 rounded-full bg-white/70"
                style={{ width: `${width * 11.5}rem` }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-0 top-0 rounded-xl bg-[#d93c3c] px-3 py-2 text-xs font-bold text-white shadow-lg">
        &lt;/&gt;
      </div>
      <div className="absolute -left-1 top-20 rounded-xl bg-[#46a4f9] px-3 py-2 text-xs font-bold text-white shadow-lg">
        {'{code}'}
      </div>
      <div className="absolute left-0 top-40 rounded-xl bg-[#ffb64a] px-3 py-2 text-xs font-bold text-white shadow-lg">
        CSS
      </div>
      <div className="absolute right-4 top-20 rounded-xl bg-[#ffb64a] px-3 py-2 text-xs font-bold text-white shadow-lg">
        HTML
      </div>
      <div className="absolute right-8 bottom-16 rounded-xl bg-white px-3 py-2 text-xs font-bold text-[#24407b] shadow-lg">
        C++
      </div>

      <div className="absolute bottom-3 left-8 right-12 h-1 rounded-full bg-[#2f5db4]" />
      <div className="absolute bottom-0 left-14 flex items-end gap-6">
        <div className="flex flex-col items-center">
          <div className="relative flex h-24 w-24 items-end justify-center rounded-t-[3rem] bg-[#ff7f5b]">
            <div className="absolute -top-10 size-20 rounded-full bg-[#ffd8c4]" />
            <div className="absolute -top-11 h-10 w-16 rounded-t-[2rem] bg-[#5b382c]" />
          </div>
        </div>
        <div className="relative mb-4 flex h-24 w-52 items-center justify-center rounded-[1.8rem] border-4 border-[#2f5db4] bg-[#9fb4da] shadow-[0_18px_48px_-28px_rgba(15,23,42,0.55)]">
          <LaptopIcon className="size-12 text-white/90" strokeWidth={1.6} />
          <div className="absolute -bottom-5 left-1/2 h-3 w-40 -translate-x-1/2 rounded-full bg-[#2f5db4]" />
        </div>
      </div>

      <div className="absolute left-2 bottom-12 flex size-14 items-center justify-center rounded-2xl border border-[#b8caee] bg-white text-[#1f4286] shadow-md">
        <CalendarDaysIcon className="size-7" />
      </div>
      <div className="absolute right-0 bottom-12 flex size-12 items-center justify-center rounded-full border border-[#b8caee] bg-white text-[#c93a31] shadow-md">
        <CoffeeIcon className="size-5" />
      </div>
      <div className="absolute right-12 bottom-1 flex gap-2">
        {[BracesIcon, CpuIcon, GlobeIcon].map((Icon, index) => (
          <div
            key={index}
            className="flex size-11 items-center justify-center rounded-2xl border border-[#dbe4f6] bg-white text-[#1f4286] shadow-md"
          >
            <Icon className="size-5" />
          </div>
        ))}
      </div>
    </div>
  )
}
