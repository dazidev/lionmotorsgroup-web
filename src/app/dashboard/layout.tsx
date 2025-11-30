import { auth } from "@/src/auth.config";
import { redirect } from "next/navigation";
import { TopNav } from "../../components/private/dashboard/topNav/TopNav";

export default async function Authlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center min-h-screen overflow-hidden">
      <header className="flex flex-col items-center">
        <TopNav />
      </header>

      <div className="flex justify-center pt-28 w-full bg-zinc-950 flex-1">
        {children}
      </div>
    </main>
  );
}
