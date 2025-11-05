import { Linkedin, Mail } from "lucide-react"

export default function TeamPage() {
  const team = [
    {
      id: 1,
      name: "Claire Rousseau",
      role: "Fondatrice & PDG",
      bio: "Passionnée par le tourisme et l'immobilier depuis 15 ans. Claire a fondé TropicalLocation pour démocratiser l'accès aux locations de qualité.",
      image: "/professional-woman-ceo.jpg",
      linkedin: "#",
    },
    {
      id: 2,
      name: "Thomas Moreau",
      role: "Directeur Opérationnel",
      bio: "Expert en gestion de propriétés et service client avec plus de 12 ans d'expérience. Thomas assure la qualité de chaque logement.",
      image: "/professional-man-operations.jpg",
      linkedin: "#",
    },
    {
      id: 3,
      name: "Amélie Fontaine",
      role: "Responsable Marketing",
      bio: "Spécialiste en stratégie digitale et communication. Amélie crée des expériences engageantes pour nos clients.",
      image: "/professional-woman-marketing.jpg",
      linkedin: "#",
    },
    {
      id: 4,
      name: "Marc Delorme",
      role: "Responsable Technique",
      bio: "Développeur full-stack avec 10 ans d'expérience. Marc construit la plateforme qui rend tout possible.",
      image: "/professional-man-tech.jpg",
      linkedin: "#",
    },
    {
      id: 5,
      name: "Nathalie Petit",
      role: "Responsable Qualité",
      bio: "Garantit que chaque propriété répond à nos standards élevés. Nathalie visite régulièrement nos logements.",
      image: "/professional-woman-quality.jpg",
      linkedin: "#",
    },
    {
      id: 6,
      name: "David Laurent",
      role: "Responsable Support Client",
      bio: "Disponible 24/7 pour aider nos clients. David et son équipe assurent une satisfaction maximale.",
      image: "/professional-man-support.jpg",
      linkedin: "#",
    },
  ]

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-center">Notre équipe</h1>
          <p className="text-center text-foreground-secondary max-w-2xl mx-auto">
            Rencontrez les personnes passionnées qui font fonctionner TropicalLocation et qui s'engagent à vous offrir
            la meilleure expérience
          </p>
        </div>
      </div>

      {/* Team Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${member.image})` }} />

              {/* Content */}
              <div className="p-6">
                <h3 className="font-semibold text-lg text-foreground mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-foreground-secondary mb-4 leading-relaxed">{member.bio}</p>

                {/* Social Links */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  <a
                    href={member.linkedin}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-surface hover:bg-primary hover:text-white transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-surface hover:bg-primary hover:text-white transition-colors"
                    title="Email"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Nos valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Excellence</h3>
              <p className="text-sm text-foreground-secondary">Nous visons l'excellence dans chaque détail</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🤝</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Confiance</h3>
              <p className="text-sm text-foreground-secondary">La confiance est le fondement de nos relations</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💡</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Innovation</h3>
              <p className="text-sm text-foreground-secondary">Nous innovons pour améliorer votre expérience</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🌍</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Durabilité</h3>
              <p className="text-sm text-foreground-secondary">Nous nous engageons pour un avenir durable</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
