// types/next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      name: string
      email: string
    }
  }

  interface User {
    id: string
    role: string
  }

  interface JWT {
    role?: string
  }
}
