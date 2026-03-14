import { Loader } from "@/components/Loader";

export default function Loading() {
  return (
    <div className="flex h-[100dvh] w-full items-center justify-center bg-background">
      <Loader />
    </div>
  );
}
