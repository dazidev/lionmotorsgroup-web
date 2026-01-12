import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcrypt from "bcrypt";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // Buscar el correo
        const user = await prisma.user.findUnique({
          where: { email: email.toLocaleLowerCase() },
        });
        if (!user) return null;

        // Comparar contraseñas
        if (!bcrypt.compareSync(password, user.password)) return null;

        // Regresar usuario
        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.lastname = (user as any).lastname ?? null;
        token.role = (user as any).role ?? null;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.lastname = (token.lastname as string | null) ?? null;
        session.user.role = (token.role as string | null) ?? null;
      }
      return session;
    },
  },
};

export const { signIn, signOut, auth } = NextAuth(authConfig);
