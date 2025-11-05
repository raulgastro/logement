"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* --- Hero Banner --- */}
      <section className="relative h-80 md:h-96 flex items-center justify-center overflow-hidden">
        <Image
          src="/hero3.jpg"
          alt="Vue tropicale"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="relative text-center z-10 px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            À propos de <span className="text-primary">TropicalLocation</span>
          </h1>
          <p className="mt-4 text-white/90 text-lg max-w-2xl mx-auto">
            Une aventure née dans les îles, portée par la passion du voyage et du confort.
          </p>
        </div>
      </section>

      {/* --- Content --- */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {/* Mission */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold mb-6 border-l-4 border-primary pl-4">Notre mission</h2>
          <p className="text-lg leading-relaxed text-foreground-secondary">
            Chez <strong>TropicalLocation</strong>, nous nous engageons à offrir des logements
            confortables, flexibles et authentiques à travers les territoires francophones.
            Que vous voyagiez pour le plaisir, le travail ou une nouvelle vie, nous voulons
            que votre hébergement soit la partie la plus simple et agréable de votre séjour.
          </p>
        </motion.section>

        {/* Histoire */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold mb-6 border-l-4 border-primary pl-4">Notre histoire</h2>
          <p className="text-lg leading-relaxed text-foreground-secondary">
            Fondée en <strong>2020</strong> à Mayotte, TropicalLocation est née de l’envie de
            connecter les voyageurs à des hôtes passionnés. Après un succès local, notre plateforme
            s’est étendue à <strong>La Réunion</strong>, <strong>la Guadeloupe</strong>,
            puis au <strong>Luxembourg</strong>, en <strong>Suisse</strong> et en <strong>France métropolitaine</strong>.
            Aujourd’hui, nous continuons de grandir tout en gardant une approche humaine et responsable.
          </p>
        </motion.section>

        {/* Valeurs */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold mb-10 border-l-4 border-primary pl-4">Nos valeurs</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              {
                title: "Transparence",
                desc: "Des prix clairs, sans frais cachés. La confiance commence par l’honnêteté.",
                icon: "💡",
              },
              {
                title: "Qualité",
                desc: "Chaque logement est soigneusement vérifié et sélectionné selon nos standards.",
                icon: "🏠",
              },
              {
                title: "Confiance",
                desc: "Des paiements sécurisés et une assistance disponible 7j/7 pour nos clients.",
                icon: "🤝",
              },
              {
                title: "Accessibilité",
                desc: "Des options pour tous les budgets, du studio au chalet haut de gamme.",
                icon: "🌍",
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-primary">{value.title}</h3>
                <p className="text-foreground-secondary">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* --- CTA --- */}
      <section className="bg-primary py-20 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Envie d’en savoir plus ?</h2>
        <p className="text-lg mb-8 text-white/90">
          Découvrez nos logements ou contactez notre équipe pour une collaboration.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/logements">
            <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Voir les logements
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="bg-white border-white hover:bg-white/10">
              Nous contacter
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
