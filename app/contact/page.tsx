"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-4 text-center">Nous contacter</h1>
        <p className="text-center text-foreground-secondary mb-12 max-w-2xl mx-auto">
          Vous avez des questions ? Notre équipe est là pour vous aider
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <Mail className="text-primary mb-4" size={32} />
            <h3 className="font-semibold text-lg text-foreground mb-2">Email</h3>
            <p className="text-foreground-secondary">info@tropical-location.goutsky.com</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <Phone className="text-primary mb-4" size={32} />
            <h3 className="font-semibold text-lg text-foreground mb-2">Téléphone</h3>
            <p className="text-foreground-secondary">+33 1 23 45 67 89</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <MapPin className="text-primary mb-4" size={32} />
            <h3 className="font-semibold text-lg text-foreground mb-2">Adresse</h3>
            <p className="text-foreground-secondary">123 Avenue des Champs, Paris 75008</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-lg p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nom</label>
              <Input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <Input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Message</label>
              <textarea
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Votre message..."
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white">
              Envoyer
            </Button>

            {submitted && (
              <div className="bg-success/10 border border-success text-success p-4 rounded-lg">
                Merci ! Votre message a été envoyé avec succès.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
