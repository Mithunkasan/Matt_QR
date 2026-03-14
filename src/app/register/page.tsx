import { StudentForm } from "@/components/StudentForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-3xl space-y-8">
        <StudentForm />
      </div>
    </main>
  );
}
