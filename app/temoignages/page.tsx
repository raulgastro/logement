"use client"

import { Star } from "lucide-react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useEffect, useState, useRef } from "react"

export default function TestimonialsPage() {
  const testimonials = [
    {
      id: 1,
      name: "Marie Dupont",
      location: "Paris",
      rating: 5,
      text: "Excellente expérience ! Le logement était exactement comme décrit et l'équipe très réactive. Je recommande vivement TropicalLocation pour vos prochaines vacances.",
      image: "/woman-portrait.jpg",
    },
    {
      id: 2,
      name: "Jean Martin",
      location: "Lyon",
      rating: 5,
      text: "Parfait pour nos vacances en famille. Le service client était impeccable et la maison était magnifique.",
      image: "/man-portrait.jpg",
    },
    {
      id: 3,
      name: "Sophie Bernard",
      location: "Marseille",
      rating: 4,
      text: "Très bon rapport qualité-prix. Les équipements étaient modernes et tout était très propre.",
      image: "/smiling-woman.png",
    },
    {
      id: 4,
      name: "Pierre Leclerc",
      location: "Bordeaux",
      rating: 5,
      text: "Service impeccable du début à la fin. Merci TropicalLocation ! Une vraie découverte pour nos vacances.",
      image: "/man-happy.jpg",
    },
  ]

  const partners = [
    { name: "Airbnb", logo: "/1.jpg" },
    { name: "Booking", logo: "/2.jpg" },
    { name: "TripAdvisor", logo: "/3.jpg" },
    { name: "Expedia", logo: "/4.jpeg" },
    { name: "Hotels.com", logo: "/5.jpg" },
    { name: "Hotels.com", logo: "/6.jpg" },
    { name: "Hotels.com", logo: "/7.jpg" },
    { name: "Hotels.com", logo: "/8.jpg" },
    { name: "Hotels.com", logo: "/9.jpg" },
    { name: "Hotels.com", logo: "/10.jpg" },
    { name: "Hotels.com", logo: "/11.jpg" },
    { name: "Hotels.com", logo: "/12.png" },
    { name: "Hotels.com", logo: "/13.png" },
    { name: "Hotels.com", logo: "/14.jpg" },
    { name: "Hotels.com", logo: "/15.png" },
    { name: "Hotels.com", logo: "/16.png" },

  ]

  const [index, setIndex] = useState(0)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  // Carrousel automatique
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <div ref={ref} className="min-h-screen bg-background relative overflow-hidden">
      {/* 🌅 HERO Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/testimonials-hero.jpg')",
            y,
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-white max-w-3xl px-4"
        >
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">
            Ce que nos clients disent de nous
          </h1>
          <p className="text-lg opacity-90">
            Des centaines de voyageurs satisfaits font confiance à TropicalLocation chaque année.
          </p>
        </motion.div>
      </section>

      {/* 🌴 Témoignages */}
      <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-surface">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Témoignages</h2>
          <p className="text-foreground-secondary max-w-2xl mx-auto">
            Découvrez les expériences authentiques de nos clients à travers le monde.
          </p>
        </div>

        {/* Carrousel de témoignages */}
        <div className="flex justify-center">
          <div className="w-full max-w-3xl relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[index].id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl shadow-xl p-10 border border-border"
              >
                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: testimonials[index].rating }).map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground-secondary italic text-lg leading-relaxed mb-8">
                  “{testimonials[index].text}”
                </p>
                <div className="flex flex-col items-center">
                  <div
                    className="w-20 h-20 rounded-full bg-cover bg-center mb-4 shadow-md ring-4 ring-primary/20"
                    style={{ backgroundImage: `url(${testimonials[index].image})` }}
                  />
                  <h3 className="font-semibold text-foreground text-lg">{testimonials[index].name}</h3>
                  <p className="text-sm text-foreground-secondary">{testimonials[index].location}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Points de navigation */}
            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === index ? "bg-primary scale-125" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🤝 Nos partenaires Carousel Infini */}
<section className="bg-white py-20 border-t border-border">
  <div className="max-w-6xl mx-auto text-center mb-10">
    <h2 className="text-3xl font-bold text-foreground mb-4">Nos partenaires</h2>
    <p className="text-foreground-secondary">
      Ils nous font confiance pour offrir les meilleures expériences de location.
    </p>
  </div>

  <div className="overflow-hidden relative">
    <motion.div
      className="flex gap-8 w-max"
      animate={{ x: ["0%", "-50%"] }}
      transition={{
        x: { repeat: Infinity, repeatType: "loop", duration: 50, ease: "linear" },
      }}
    >
      {/* Doublement des logos pour boucle infinie */}
      {[...partners, ...partners].map((p, i) => (
        <motion.div
          key={i}
          className="flex-shrink-0 h-16 w-32 flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.05 }}
        >
          <img
            src={p.logo}
            alt={p.name}
            className="h-12 grayscale transition-all duration-300 hover:grayscale-0 focus:grayscale-0 active:grayscale-0"
          />
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>


      {/* 🌟 Engagements */}
      <section className="py-20 bg-surface border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Pourquoi nous choisir ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "💬", title: "Support 24/7", text: "Un service client disponible à toute heure." },
              { icon: "🏡", title: "Qualité garantie", text: "Des logements vérifiés et certifiés par nos équipes." },
              { icon: "🔒", title: "Paiement sécurisé", text: "Vos transactions protégées par Stripe et SSL." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-foreground-secondary">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <section className="bg-primary text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">Prêt à vivre votre propre expérience ?</h2>
          <p className="text-lg mb-8 opacity-90">
            Rejoignez des milliers de voyageurs satisfaits et réservez votre prochain logement dès maintenant.
          </p>
          <a
            href="/logements"
            className="inline-block bg-white text-primary px-10 py-3 rounded-full font-semibold shadow hover:shadow-lg transition-all"
          >
            Explorer les logements
          </a>
        </div>
      </section>
    </div>
  )
}
