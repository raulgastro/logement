"use client"

import { useState, useMemo, useEffect } from "react"
import { MapPin, Heart, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface Property {
  id: string
  name: string
  type: string
  city: string
  region: string
  address: string
  price: number
  rentalType: string
  bedrooms: number
  image?: string
  images?: { id: string; url: string }[]
}

export default function ListingsPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [filters, setFilters] = useState({
    destination: "",
    propertyType: "",
    rentalType: "",
    minPrice: 0,
    maxPrice: 5000,
    minBedrooms: 0,
  })
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])

  // 🔹 Charger les logements depuis ton API
  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("/api/admin/properties")
        const data = await res.json()
        setProperties(data)
      } catch (err) {
        console.error("Erreur chargement propriétés:", err)
      }
    }
    fetchProperties()
  }, [])

  // 🔹 Filtres dynamiques
  const filteredListings = useMemo(() => {
    return properties.filter((listing) => {
      const matchesDestination =
        !filters.destination ||
        listing.region.toLowerCase().includes(filters.destination.toLowerCase()) ||
        listing.city.toLowerCase().includes(filters.destination.toLowerCase())

      const matchesType = !filters.propertyType || listing.type === filters.propertyType
      const matchesRentalType = !filters.rentalType || listing.rentalType === filters.rentalType
      const matchesPrice = listing.price >= filters.minPrice && listing.price <= filters.maxPrice
      const matchesBedrooms = listing.bedrooms >= filters.minBedrooms

      return matchesDestination && matchesType && matchesRentalType && matchesPrice && matchesBedrooms
    })
  }, [filters, properties])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const resetFilters = () => {
    setFilters({
      destination: "",
      propertyType: "",
      rentalType: "",
      minPrice: 0,
      maxPrice: 5000,
      minBedrooms: 0,
    })
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Nos Logements</h1>
          <p className="text-foreground-secondary">
            {filteredListings.length} logement{filteredListings.length !== 1 ? "s" : ""} disponible
            {filteredListings.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">Filtres</h2>
                {Object.values(filters).some((v) => v !== "" && v !== 0 && v !== 5000) && (
                  <button
                    onClick={resetFilters}
                    className="text-sm text-primary hover:text-primary-dark transition-colors"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Destination */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Destination</label>
                  <Input
                    type="text"
                    placeholder="Rechercher..."
                    value={filters.destination}
                    onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
                    className="w-full"
                  />
                </div>

                {/* Type de logement */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Type de logement</label>
                  <select
                    value={filters.propertyType}
                    onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Tous les types</option>
                    <option value="studio">Studio</option>
                    <option value="t1">T1</option>
                    <option value="t2">T2</option>
                    <option value="villa">Villa</option>
                    <option value="maison">Maison</option>
                    <option value="chalet">Chalet</option>
                    <option value="bungalow">Bungalow</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="loft">Loft</option>
                    <option value="mobile-home">Mobile Home</option>
                    <option value="gite">Gîte</option>
                  </select>
                </div>

                {/* Type de location */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Type de location</label>
                  <select
                    value={filters.rentalType}
                    onChange={(e) => setFilters({ ...filters, rentalType: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Tous les types</option>
                    <option value="saisonniere">Saisonnière</option>
                    <option value="longue-duree">Longue durée</option>
                  </select>
                </div>

                {/* 🎚️ Filtre par prix */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Prix par nuit: {filters.minPrice}€ - {filters.maxPrice}€
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      value={filters.minPrice}
                      onChange={(e) =>
                        setFilters({ ...filters, minPrice: Number.parseInt(e.target.value) })
                      }
                      className="w-full accent-blue-600"
                    />
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        setFilters({ ...filters, maxPrice: Number.parseInt(e.target.value) })
                      }
                      className="w-full accent-blue-600"
                    />
                  </div>
                </div>

                {/* Chambres */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Chambres minimum</label>
                  <select
                    value={filters.minBedrooms}
                    onChange={(e) => setFilters({ ...filters, minBedrooms: Number.parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="0">Toutes</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="flex-1">
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((listing) => (
                  <Link key={listing.id} href={`/logements/${listing.id}`}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
                      <div className="relative h-48 overflow-hidden bg-surface">
                        <img
                          src={listing.image || listing.images?.[0]?.url || "/placeholder.svg"}
                          alt={listing.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            toggleFavorite(listing.id)
                          }}
                          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
                        >
                          <Heart
                            size={20}
                            className={favorites.includes(listing.id) ? "fill-red-500 text-red-500" : "text-foreground"}
                          />
                        </button>
                      </div>

                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="font-semibold text-foreground mb-1 line-clamp-2">{listing.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-foreground-secondary mb-3">
                          <MapPin size={16} />
                          <span>{listing.region}</span>
                        </div>
                        <div className="mt-auto pt-4 border-t border-border">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-primary">{listing.price}€</span>
                            <span className="text-foreground-secondary">
                              {listing.rentalType === "saisonniere" ? "/nuit" : "/mois"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-foreground-secondary text-lg mb-4">Aucun logement ne correspond à vos critères</p>
                <Button onClick={resetFilters} variant="outline">
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
