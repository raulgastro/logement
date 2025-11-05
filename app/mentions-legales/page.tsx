export default function LegalPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-8">Mentions légales</h1>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Informations légales</h2>
            <p className="text-foreground-secondary">
              <strong>Raison sociale:</strong> TropicalLocation SARL
              <br />
              <strong>Siège social:</strong> 123 Avenue des Champs, 75008 Paris, France
              <br />
              <strong>SIRET:</strong> 123 456 789 00012
              <br />
              <strong>Directeur de publication:</strong> Claire Rousseau
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Conditions d'utilisation</h2>
            <p className="text-foreground-secondary">
              L'accès et l'utilisation de ce site sont soumis aux présentes conditions d'utilisation. En accédant à ce
              site, vous acceptez d'être lié par ces conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Responsabilité</h2>
            <p className="text-foreground-secondary">
              TropicalLocation s'efforce de fournir des informations exactes et à jour sur ce site. Cependant, nous ne
              garantissons pas l'exactitude, l'exhaustivité ou l'actualité des informations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Propriété intellectuelle</h2>
            <p className="text-foreground-secondary">
              Tous les contenus de ce site (textes, images, logos, etc.) sont la propriété de TropicalLocation ou de ses
              partenaires et sont protégés par les lois sur la propriété intellectuelle.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
