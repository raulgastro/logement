import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 🧾 GET — Liste toutes les réservations (avec nom du logement)
export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      include: {
        property: {
          select: { name: true }, // 🔹 Récupère le nom du logement
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // 🔹 On reformate la réponse pour afficher le nom du logement
    const formatted = reservations.map((r) => ({
      ...r,
      logementNom: r.property.name,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des réservations :", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des réservations" },
      { status: 500 }
    );
  }
}

// 🧾 POST — Crée une nouvelle réservation à partir du nom du logement
export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("📦 Données reçues du front :", data);

    // Vérifie que le nom du logement est présent
    if (!data.logementNom) {
      return NextResponse.json(
        { error: "Le nom du logement est manquant." },
        { status: 400 }
      );
    }

    // 🔍 Recherche du logement correspondant
    const property = await prisma.property.findFirst({
      where: { name: data.logementNom },
    });

    if (!property) {
      return NextResponse.json(
        { error: `Aucun logement trouvé pour le nom "${data.logementNom}".` },
        { status: 404 }
      );
    }

    // ✅ Validation et conversion des champs
    const arrivalDate =
      !isNaN(Date.parse(data.dateArrivee)) ? new Date(data.dateArrivee) : null;
    const departureDate =
      !isNaN(Date.parse(data.dateDepart)) ? new Date(data.dateDepart) : null;

    if (!arrivalDate || !departureDate) {
      return NextResponse.json(
        { error: "Les dates d’arrivée et de départ sont invalides." },
        { status: 400 }
      );
    }

    const totalPrice = parseFloat(data.total);
    if (isNaN(totalPrice)) {
      return NextResponse.json(
        { error: "Le prix total est invalide." },
        { status: 400 }
      );
    }

    // 🧩 Création de la réservation
    const reservation = await prisma.reservation.create({
      data: {
        propertyId: property.id, // 🔹 Liaison via l’ID du logement trouvé
        name: data.nom,
        prenom: data.prenom,
        phone: data.contact,
        city: data.ville || null,
        age: data.age ? Number(data.age) : null,
        maritalStatus: data.situation || null,
        profession: data.profession || null,
        income: data.revenu ? Number(data.revenu) : null,
        leaseDuration: data.dureeBail || null,
        occupants: data.nbPersonnes ? Number(data.nbPersonnes) : null,
        visitDate:
          data.dispoVisite && !isNaN(Date.parse(data.dispoVisite))
            ? new Date(data.dispoVisite)
            : null,
        arrivalDate,
        departureDate,
        totalPrice,
      },
      include: {
        property: { select: { name: true } }, // 🔹 Pour inclure le nom dans la réponse
      },
    });

    // 🔹 Reformate la réponse pour renvoyer le nom du logement
    const response = {
      ...reservation,
      logementNom: reservation.property.name,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("❌ Erreur lors de la création de la réservation :", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
