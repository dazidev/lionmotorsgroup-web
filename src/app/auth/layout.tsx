import { auth } from "@/src/auth.config";
import { redirect } from "next/navigation";

export default async function Authlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard/admins");
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-black via-zinc-900 to-gold-700/60 flex items-center justify-center p-5 relative overflow-hidden">
      <div className="w-full sm:w-[600px] p-2">{children}</div>
    </main>
  );
}
