// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaClient } from "@prisma/client"; // DISABLED: Database temporarily removed
// import bcrypt from "bcrypt";

// const prisma = new PrismaClient();

// MOCK: Hardcoded test user (accepts any email/password for now)
const MOCK_USER = {
  id: "mock-user-1",
  email: "test@example.com",
  name: "Test User",
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: { email: {}, password: {} },

      async authorize(credentials: any) {
        // MOCK: Accept any credentials and return mock user
        // In production, you would validate against the database
        if (credentials?.email && credentials?.password) {
          return MOCK_USER;
        }
        return null;
      },
    }),
  ],

  session: { strategy: "jwt" as const },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
