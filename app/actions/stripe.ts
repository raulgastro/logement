"use server"

import { stripe } from "@/lib/stripe"

export async function createCheckoutSession(
  propertyId: string,
  propertyName: string,
  checkInDate: string,
  checkOutDate: string,
  pricePerNight: number,
  nights: number,
  guests: number,
) {
  const totalPriceInCents = Math.round(pricePerNight * nights * 100)

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: propertyName,
            description: `Réservation du ${checkInDate} au ${checkOutDate} pour ${guests} personne(s)`,
          },
          unit_amount: totalPriceInCents,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {
      propertyId,
      checkInDate,
      checkOutDate,
      guests: guests.toString(),
      nights: nights.toString(),
    },
  })

  return session.client_secret
}
