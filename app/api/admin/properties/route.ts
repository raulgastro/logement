// app/api/admin/properties/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });
    const data = properties.map((p) => ({
      ...p,
      amenities: JSON.parse(p.amenities || "[]"),
    }));
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET properties error:", error);
    return NextResponse.json({ error: "Impossible de récupérer les logements" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name, type, city, region, address, price, rentalType,
      rating, reviews, description, bedrooms, bathrooms,
      amenities, image, gallery,
    } = body;

    const property = await prisma.property.create({
      data: {
        name,
        type,
        city,
        region,
        address,
        price: Number(price),
        rentalType,
        rating: Number(rating),
        reviews: Number(reviews),
        description,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        amenities: JSON.stringify(amenities || []),
        image: image || "",
        images: {
          create: (gallery || []).map((url: string) => ({ url })),
        },
      },
      include: { images: true },
    });

    return NextResponse.json(property);
  } catch (error) {
    console.error("POST property error:", error);
    return NextResponse.json({ error: "Erreur création" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, gallery, ...rest } = body;
    if (!id) return NextResponse.json({ error: "ID requis" }, { status: 400 });

    // remove old images, then add new ones (simple strategy)
    await prisma.propertyImage.deleteMany({ where: { propertyId: id } });

    const updated = await prisma.property.update({
      where: { id },
      data: {
        ...rest,
        price: rest.price ? Number(rest.price) : undefined,
        rating: rest.rating ? Number(rest.rating) : undefined,
        reviews: rest.reviews ? Number(rest.reviews) : undefined,
        bedrooms: rest.bedrooms ? Number(rest.bedrooms) : undefined,
        bathrooms: rest.bathrooms ? Number(rest.bathrooms) : undefined,
        amenities: JSON.stringify(rest.amenities || []),
        image: rest.image || "",
        images: {
          create: (gallery || []).map((url: string) => ({ url })),
        },
      },
      include: { images: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT property error:", error);
    return NextResponse.json({ error: "Erreur modification" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;
    if (!id) return NextResponse.json({ error: "ID requis" }, { status: 400 });

    await prisma.propertyImage.deleteMany({ where: { propertyId: id } });
    await prisma.property.delete({ where: { id } });

    return NextResponse.json({ message: "Supprimé avec succès" });
  } catch (error) {
    console.error("DELETE property error:", error);
    return NextResponse.json({ error: "Erreur suppression" }, { status: 500 });
  }
}
