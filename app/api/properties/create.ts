import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import formidable from "formidable"
import fs from "fs"
import path from "path"

export const config = {
  api: {
    bodyParser: false, // on désactive pour gérer les fichiers
  },
}

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Méthode non autorisée" })

  const form = formidable({ multiples: false, uploadDir: "public/uploads", keepExtensions: true })

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Erreur d’upload" })

    const imageFile = files.image?.[0] || files.image
    const imagePath = imageFile ? `/uploads/${path.basename(imageFile.filepath)}` : ""

    try {
      const newProperty = await prisma.property.create({
        data: {
          name: String(fields.name),
          type: String(fields.type),
          city: String(fields.city),
          region: String(fields.region),
          address: String(fields.address),
          price: parseFloat(String(fields.price)),
          rentalType: String(fields.rentalType),
          rating: parseFloat(String(fields.rating || "0")),
          reviews: parseInt(String(fields.reviews || "0")),
          image: imagePath,
          description: String(fields.description),
          bedrooms: parseInt(String(fields.bedrooms)),
          bathrooms: parseInt(String(fields.bathrooms)),
          amenities: JSON.stringify((fields.amenities || "").split(",")),
        },
      })
      res.status(201).json(newProperty)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Erreur lors de la création du logement" })
    }
  })
}
