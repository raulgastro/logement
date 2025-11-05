import Link from "next/link"
import { MapPin, Home, DollarSign, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Property {
  id: string
  name: string
  type: string
  city: string
  region: string
  address: string
  price: number
  rentalType: string
  rating: number
  reviews: number
  image: string
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      <div
        className="h-48 bg-cover bg-center"
        style={{
          backgroundImage: `url(${property.image})`,
        }}
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-foreground">{property.name}</h3>
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium">{property.rating}</span>
            <span className="text-xs text-foreground-secondary">({property.reviews})</span>
          </div>
        </div>

        <div className="space-y-2 mb-4 text-sm text-foreground-secondary">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-primary" />
            <span>
              {property.city}, {property.region}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Home size={16} className="text-primary" />
            <span>
              {property.type} • {property.rentalType}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-primary" />
            <span className="font-semibold text-foreground">
              {property.price}€ {property.rentalType === "saisonniere" ? "/nuit" : "/mois"}
            </span>
          </div>
        </div>

        <Link href={`/logements/${property.id}`}>
          <Button className="w-full bg-primary hover:bg-primary-dark text-white">Voir les détails</Button>
        </Link>
      </div>
    </div>
  )
}
