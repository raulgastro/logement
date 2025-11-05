"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  const [searchParams, setSearchParams] = useState({
    destination: "",
    propertyType: "",
    rentalType: "",
    dates: "",
  })

  // Slider Hero
  const images = [
    "/hero1.jpg",
    "/hero2.jpg",
    "/hero3.jpg",
    "/hero4.jpg",
  ]
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000) // change toutes les 5 secondes
    return () => clearInterval(interval)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    window.location.href = `/logements?${params.toString()}`
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.8,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Votre prochain logement vous attend
          </h1>
          <p className="text-xl text-white/90 mb-8 text-balance">
            Découvrez nos locations à Mayotte, La Réunion, Guadeloupe, Luxembourg, Suisse et France
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-lg p-6 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-primary" size={18} />
                  <Input
                    type="text"
                    placeholder="Où allez-vous ?"
                    className="pl-10"
                    value={searchParams.destination}
                    onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Type de logement</label>
                <select
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchParams.propertyType}
                  onChange={(e) => setSearchParams({ ...searchParams, propertyType: e.target.value })}
                >
                  <option value="">Tous les types</option>
                  <option value="studio">Studio</option>
                  <option value="t1">T1</option>
                  <option value="t2">T2</option>
                  <option value="villa">Villa</option>
                  <option value="maison">Maison</option>
                  <option value="chalet">Chalet</option>
                  <option value="mobile-home">Mobile Home</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Type de location</label>
                <select
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchParams.rentalType}
                  onChange={(e) => setSearchParams({ ...searchParams, rentalType: e.target.value })}
                >
                  <option value="">Tous les types</option>
                  <option value="saisonniere">Saisonnière</option>
                  <option value="longue-duree">Longue durée</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Dates</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-primary" size={18} />
                  <Input
                    type="text"
                    placeholder="Sélectionner dates"
                    className="pl-10"
                    value={searchParams.dates}
                    onChange={(e) => setSearchParams({ ...searchParams, dates: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white">
              <Search className="mr-2" size={18} />
              Rechercher
            </Button>
          </form>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Pourquoi choisir TropicalLocation ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🏠",
                title: "Large sélection",
                description: "Studios, appartements, villas et chalets dans les plus beaux endroits",
              },
              {
                icon: "💳",
                title: "Paiement sécurisé",
                description: "Transactions protégées via Stripe pour votre tranquillité",
              },
              {
                icon: "🌍",
                title: "Partout en France",
                description: "Locations disponibles à Mayotte, La Réunion, Guadeloupe et plus",
              },
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-foreground-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à réserver ?</h2>
          <p className="text-lg mb-8 text-white/90">Explorez nos logements et trouvez votre destination idéale</p>
          <Link href="/logements">
            <Button className="bg-white text-primary hover:bg-surface">Voir tous les logements</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
