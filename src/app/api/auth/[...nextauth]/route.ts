// app/api/auth/[...nextauth]/route.ts

import NextAuth, { AuthOptions } from "next-auth"; // <--- IMPORT AuthOptions HERE
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/lib/prismadb"
import bcrypt from "bcrypt";

// Explicitly type the object with AuthOptions
export const authOptions: AuthOptions = { // <--- ADD : AuthOptions HERE
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Please enter an email and password");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("No user found");
        }

        // Check if the user's email is verified *before* checking the password
        if (!user.emailVerified) {
            // This is a security measure. We don't want to confirm if the password is right or wrong
            // for an unverified account. We just tell them to verify.
            throw new Error("Please verify your email before logging in.");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt", // Now TypeScript understands this is a valid SessionStrategy
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };