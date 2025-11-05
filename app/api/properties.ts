import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const properties = await prisma.property.findMany()
    // Convert JSON string en tableau pour amenities
    const data = properties.map((p) => ({
      ...p,
      amenities: JSON.parse(p.amenities as unknown as string),
    }))
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: "Impossible de récupérer les logements" })
  }
}
