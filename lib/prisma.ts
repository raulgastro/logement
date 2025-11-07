// lib/prisma.ts
import { PrismaClient } from "@prisma/client"

declare global {
  // Évite la création multiple en dev
  // @ts-ignore
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "warn", "error"],
  })

if (process.env.NODE_ENV !== "production") global.prisma = prisma
