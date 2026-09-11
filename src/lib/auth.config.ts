import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe auth config: no bcrypt, no Prisma. Used by middleware (which
 * Vercel bundles as an Edge Function with a 1MB limit) to check whether a
 * request has a valid session, without pulling in Node-only dependencies.
 * The full config (with the Credentials provider) lives in auth.ts.
 */
export const authConfig = {
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
    authorized({ auth, request }) {
      const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");
      return isDashboard ? !!auth?.user : true;
    },
  },
} satisfies NextAuthConfig;
