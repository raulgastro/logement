export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-8">Politique de confidentialité</h1>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Collecte de données</h2>
            <p className="text-foreground-secondary">
              TropicalLocation collecte les informations personnelles que vous nous fournissez volontairement, notamment
              lors de la création d'un compte ou de la réservation d'un logement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Utilisation des données</h2>
            <p className="text-foreground-secondary">
              Vos données personnelles sont utilisées pour traiter vos réservations, vous envoyer des confirmations et
              des mises à jour, et améliorer nos services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Protection des données</h2>
            <p className="text-foreground-secondary">
              Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles contre
              l'accès non autorisé, la modification ou la divulgation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Vos droits</h2>
            <p className="text-foreground-secondary">
              Vous avez le droit d'accéder, de corriger ou de supprimer vos données personnelles. Pour exercer ces
              droits, veuillez nous contacter à contact@tropicallocation.fr
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
