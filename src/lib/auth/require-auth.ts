import { auth } from "@/src/auth.config";
import { Roles } from "@prisma/client";

export async function requireAuth(role: Roles) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (session.user.role !== role) {
    throw new Error("Forbidden.");
  }

  return session;
}
