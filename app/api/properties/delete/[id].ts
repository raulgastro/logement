import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") return res.status(405).json({ error: "Méthode non autorisée" })

  const { id } = req.query

  try {
    await prisma.property.delete({ where: { id: String(id) } })
    res.status(200).json({ message: "Logement supprimé ✅" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erreur lors de la suppression" })
  }
}
