import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      lastname?: string | null;
      role?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    lastname?: string | null;
    role?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    lastname?: string | null;
    role?: string | null;
  }
}
