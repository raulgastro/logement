import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") return res.status(405).json({ error: "Méthode non autorisée" })

  const { id } = req.query
  const data = req.body

  try {
    const updated = await prisma.property.update({
      where: { id: String(id) },
      data: {
        ...data,
        price: parseFloat(data.price),
        rating: parseFloat(data.rating),
        reviews: parseInt(data.reviews),
        bedrooms: parseInt(data.bedrooms),
        bathrooms: parseInt(data.bathrooms),
        amenities: JSON.stringify(data.amenities || []),
      },
    })
    res.status(200).json(updated)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erreur lors de la mise à jour" })
  }
}
