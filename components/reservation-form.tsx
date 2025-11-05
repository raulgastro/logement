"use client"

import type React from "react"

import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createCheckoutSession } from "@/app/actions/stripe"
import { calculateNights } from "@/lib/reservations"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface ReservationFormProps {
  propertyId: string
  propertyName: string
  pricePerNight: number
}

export default function ReservationForm({ propertyId, propertyName, pricePerNight }: ReservationFormProps) {
  const [step, setStep] = useState<"form" | "checkout">("form")
  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
    guests: 1,
  })
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const nights =
    formData.checkInDate && formData.checkOutDate ? calculateNights(formData.checkInDate, formData.checkOutDate) : 0
  const totalPrice = nights > 0 ? pricePerNight * nights : 0

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" ? Number.parseInt(value) : value,
    }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (!formData.checkInDate || !formData.checkOutDate) {
      setError("Veuillez sélectionner les dates d'arrivée et de départ")
      return
    }

    if (new Date(formData.checkInDate) >= new Date(formData.checkOutDate)) {
      setError("La date de départ doit être après la date d'arrivée")
      return
    }

    if (formData.guests < 1) {
      setError("Veuillez sélectionner au moins 1 personne")
      return
    }

    setLoading(true)

    try {
      const secret = await createCheckoutSession(
        propertyId,
        propertyName,
        formData.checkInDate,
        formData.checkOutDate,
        pricePerNight,
        nights,
        formData.guests,
      )
      setClientSecret(secret)
      setStep("checkout")
    } catch (err) {
      setError("Une erreur est survenue lors de la création de la réservation")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (step === "checkout" && clientSecret) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <button
          onClick={() => setStep("form")}
          className="text-primary hover:text-primary-dark mb-4 text-sm font-medium"
        >
          ← Retour
        </button>
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-foreground mb-6">Réserver ce logement</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Check-in Date */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Date d'arrivée</label>
          <Input
            type="date"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleInputChange}
            min={new Date().toISOString().split("T")[0]}
            className="w-full"
          />
        </div>

        {/* Check-out Date */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Date de départ</label>
          <Input
            type="date"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleInputChange}
            min={formData.checkInDate || new Date().toISOString().split("T")[0]}
            className="w-full"
          />
        </div>

        {/* Guests */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Nombre de personnes</label>
          <select
            name="guests"
            value={formData.guests}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num}>
                {num} personne{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Price Summary */}
        {nights > 0 && (
          <div className="bg-surface rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground-secondary">
                {pricePerNight}€ × {nights} nuit{nights > 1 ? "s" : ""}
              </span>
              <span className="text-foreground font-medium">{totalPrice}€</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="text-xl font-bold text-primary">{totalPrice}€</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading || nights <= 0}
          className="w-full bg-primary hover:bg-primary-dark text-white disabled:opacity-50"
        >
          {loading ? "Chargement..." : nights > 0 ? "Procéder au paiement" : "Sélectionnez les dates"}
        </Button>
      </form>
    </div>
  )
}
