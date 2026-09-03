import { TopNavPublic } from "@/src/components";

export default async function Authlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center min-h-screen bg-zinc-950 relative overflow-hidden">
      <TopNavPublic></TopNavPublic>
      <div className="w-full h-auto">{children}</div>
    </main>
  );
}
