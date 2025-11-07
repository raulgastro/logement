"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export default function Home() {
  const [searchParams, setSearchParams] = useState({
    destination: "",
    propertyType: "",
    rentalType: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
  })

  // 🖼️ Slider Hero
  const images = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg", "/hero4.jpg"]
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) params.append(key, value.toString())
    })
    window.location.href = `/logements?${params.toString()}`
  }

  return (
    <div className="min-h-screen">
      {/* 🏝️ Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden mb-10 md:mb-20">
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.8,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Votre prochain logement vous attend
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Découvrez nos locations à Mayotte, La Réunion, Guadeloupe, Luxembourg, Suisse et France
          </p>

          {/* 🔍 Barre de recherche */}
          <form
            onSubmit={handleSearch}
            className="relative z-20 rounded-lg shadow-lg p-6 max-w-4xl mx-auto"
            style={{ backgroundColor: '#2258cbba' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Destination */}
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-white" size={18} />
                  <select
                    className="w-full pl-10 pr-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-black"
                    value={searchParams.destination}
                    onChange={(e) =>
                      setSearchParams({ ...searchParams, destination: e.target.value })
                    }
                  >
                    <option value="">Sélectionner...</option>
                    <option value="mayotte">Mayotte</option>
                    <option value="reunion">La Réunion</option>
                    <option value="guadeloupe">Guadeloupe</option>
                    <option value="luxembourg">Luxembourg</option>
                    <option value="suisse">Suisse</option>
                    <option value="france">France</option>
                  </select>
                </div>
              </div>

              {/* Type de logement */}
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Type de logement</label>
                <select
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-black"
                  value={searchParams.propertyType}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, propertyType: e.target.value })
                  }
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

              {/* Type de location */}
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Type de location</label>
                <select
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-black"
                  value={searchParams.rentalType}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, rentalType: e.target.value })
                  }
                >
                  <option value="">Tous les types</option>
                  <option value="saisonniere">Saisonnière</option>
                  <option value="longue-duree">Longue durée</option>
                </select>
              </div>

              {/* 📅 Dates */}
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Dates</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${
                        searchParams.startDate && searchParams.endDate
                          ? ""
                          : "text-muted-foreground"
                      }`}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {searchParams.startDate && searchParams.endDate ? (
                        <>
                          {format(searchParams.startDate, "dd MMM")} -{" "}
                          {format(searchParams.endDate, "dd MMM yyyy")}
                        </>
                      ) : (
                        <span>Sélectionner les dates</span>
                      )}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="range"
                      selected={{
                        from: searchParams.startDate,
                        to: searchParams.endDate,
                      }}
                      onSelect={(range: any) => {
                        if (!range?.from) return
                        const today = new Date()
                        const start = range.from
                        const end = range.to ?? range.from

                        if (start < today) {
                          alert("La date de début ne peut pas être antérieure à aujourd'hui.")
                          return
                        }
                        if (range.to && range.to < range.from) {
                          alert("La date de fin ne peut pas être avant la date de début.")
                          return
                        }

                        setSearchParams({
                          ...searchParams,
                          startDate: start,
                          endDate: end,
                        })
                      }}
                      numberOfMonths={2}
                      locale={fr}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white"
            >
              <Search className="mr-2" size={18} />
              Rechercher
            </Button>
          </form>
        </div>
      </section>

      {/* 🌟 Features */}
      <section className="py-16 bg-surface mt-16 md:mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pourquoi choisir TropicalLocation ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🏠",
                title: "Large sélection",
                description:
                  "Studios, appartements, villas et chalets dans les plus beaux endroits",
              },
              {
                icon: "💳",
                title: "Paiement sécurisé",
                description:
                  "Transactions protégées via Stripe pour votre tranquillité",
              },
              {
                icon: "🌍",
                title: "Partout en France",
                description:
                  "Locations disponibles à Mayotte, La Réunion, Guadeloupe et plus",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-[#2258cbba] active:bg-[#2258cbba] hover:text-white active:text-white transform hover:scale-105 cursor-pointer"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Prêt à réserver ?</h2>
          <p className="text-lg mb-8 text-white/90">
            Explorez nos logements et trouvez votre destination idéale
          </p>
          <Link href="/logements">
            <Button className="bg-white text-primary hover:bg-surface">
              Voir tous les logements
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
