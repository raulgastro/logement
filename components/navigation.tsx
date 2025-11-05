"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">TropicalLocation</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/logements" className="text-foreground hover:text-primary transition-colors">
              Logements
            </Link>
            <Link href="/a-propos" className="text-foreground hover:text-primary transition-colors">
              À propos
            </Link>
            <Link href="/temoignages" className="text-foreground hover:text-primary transition-colors">
              Témoignages
            </Link>
            <Link href="/team" className="text-foreground hover:text-primary transition-colors">
              Équipe
            </Link>
<Link href="/contact">
              <Button className="w-full bg-primary hover:bg-primary-dark text-white">Contact</Button>
            </Link>          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/logements" className="block px-4 py-2 text-foreground hover:bg-surface rounded">
              Logements
            </Link>
            <Link href="/a-propos" className="block px-4 py-2 text-foreground hover:bg-surface rounded">
              À propos
            </Link>
            <Link href="/temoignages" className="block px-4 py-2 text-foreground hover:bg-surface rounded">
              Témoignages
            </Link>
            <Link href="/team" className="block px-4 py-2 text-foreground hover:bg-surface rounded">
              Équipe
            </Link>
            <Link href="/contact">
              <Button className="w-full bg-primary hover:bg-primary-dark text-white">Contact</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
