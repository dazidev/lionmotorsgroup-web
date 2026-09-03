import { TopNav } from "../../components/private/dashboard/topNav/TopNav";

export default async function Authlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center min-h-screen overflow-hidden bg-zinc-950">
      <header className="flex flex-col items-center">
        <TopNav />
      </header>

      <div className="flex justify-center pt-28 w-full flex-1">{children}</div>
    </main>
  );
}
