// app/api/admin/change-password/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hash, compare } from "bcryptjs"

export async function POST(req: NextRequest) {
  const { adminId, currentPassword, newPassword } = await req.json()
  if (!adminId || !currentPassword || !newPassword) return NextResponse.json({ message: "Données manquantes." }, { status: 400 })

  const admin = await prisma.user.findUnique({ where: { id: adminId } })
  if (!admin) return NextResponse.json({ message: "Admin introuvable." }, { status: 404 })

  const isValid = await compare(currentPassword, admin.password)
  if (!isValid) return NextResponse.json({ message: "Mot de passe actuel incorrect." }, { status: 401 })

  const hashedPassword = await hash(newPassword, 10)
  await prisma.user.update({ where: { id: adminId }, data: { password: hashedPassword } })

  return NextResponse.json({ message: "Mot de passe mis à jour avec succès !" })
}
