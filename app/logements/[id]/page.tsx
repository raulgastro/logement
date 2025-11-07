// app/logements/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type PropertyType = {
  id: string;
  name: string;
  city: string;
  region: string;
  address: string;
  price: number;
  rentalType: string;
  rating: number;
  reviews: number;
  description: string;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  image?: string;
  images?: { id: string; url: string }[];
};

export default function PropertyDetailPage() {
  const { id } = useParams() as { id: string };
  const [property, setProperty] = useState<PropertyType | null>(null);
  const [idx, setIdx] = useState(0);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    age: "",
    ville: "",
    contact: "",
    situation: "",
    profession: "",
    revenu: "",
    dureeBail: "",
    nbPersonnes: "",
    dispoVisite: "",
    dateArrivee: "",
    dateDepart: "",
  });

  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Charger le logement
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/properties");
        const data = await res.json();
        const found = data.find((p: any) => p.id === id);
        if (found) {
          if (typeof found.amenities === "string") {
            try {
              found.amenities = JSON.parse(found.amenities);
            } catch {
              found.amenities = [];
            }
          }
          setProperty(found);
        }
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [id]);

  // Calcul automatique du prix total
  useEffect(() => {
    if (!property) return;
    if (!formData.dateArrivee || !formData.dateDepart) {
      setTotal(0);
      return;
    }
    const a = new Date(formData.dateArrivee);
    const b = new Date(formData.dateDepart);
    const diff = b.getTime() - a.getTime();
    const nights = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    setTotal(nights * property.price);
  }, [formData.dateArrivee, formData.dateDepart, property]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Nouveau handleSubmit (relié à Prisma)
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;

    if (!formData.nom || !formData.prenom || !formData.contact || !formData.dateArrivee || !formData.dateDepart) {
      setMessage({ type: "error", text: "Veuillez remplir tous les champs obligatoires." });
      return;
    }

    const reservationData = {
  logementNom: property.name, // ✅ envoie le nom du logement
  ...formData,
  total,
};

    try {
      setSubmitting(true);
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData),
      });
     // ✅ 2. Notification Formspree
  await fetch("https://formspree.io/f/xzzypbqv", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(reservationData),
  });
      if (res.ok) {
        setMessage({ type: "success", text: "✅ Réservation enregistrée avec succès !" });
        setFormData({
          nom: "",
          prenom: "",
          age: "",
          ville: "",
          contact: "",
          situation: "",
          profession: "",
          revenu: "",
          dureeBail: "",
          nbPersonnes: "",
          dispoVisite: "",
          dateArrivee: "",
          dateDepart: "",
        });
        setTotal(0);
      } else {
        setMessage({ type: "error", text: "❌ Erreur lors de la réservation." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Erreur de réseau" });
    } finally {
      setSubmitting(false);
    }
  };

  if (!property) return <div className="p-8">Chargement du logement...</div>;

  const images =
    property.images && property.images.length > 0
      ? property.images
      : property.image
      ? [{ id: "main", url: property.image }]
      : [];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{property.name}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="relative h-96 rounded overflow-hidden mb-4 bg-gray-100">
            {images.length > 0 ? (
              <img src={images[idx].url} alt={property.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">Aucune image</div>
            )}

            {images.length > 1 && (
              <>
                <button
                  onClick={() => setIdx((i) => (i === 0 ? images.length - 1 : i - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                >
                  ‹
                </button>
                <button
                  onClick={() => setIdx((i) => (i + 1) % images.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                >
                  ›
                </button>
              </>
            )}
          </div>

          <div className="bg-white p-4 rounded shadow">
            <p className="mb-3">{property.description}</p>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div><strong>Ville:</strong> {property.city}</div>
              <div><strong>Région:</strong> {property.region}</div>
              <div><strong>Chambres:</strong> {property.bedrooms}</div>
              <div><strong>Salles de bain:</strong> {property.bathrooms}</div>
              <div><strong>Note:</strong> {property.rating} ({property.reviews} avis)</div>
              <div><strong>Type:</strong> {property.rentalType}</div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">Équipements</h3>
              <ul className="list-disc pl-5 mt-2">
                {Array.isArray(property.amenities)
                  ? property.amenities.map((a, i) => <li key={i}>{a}</li>)
                  : null}
              </ul>
            </div>
          </div>
        </div>

        <aside className="bg-white p-4 rounded shadow">
          <div className="mb-4">
            <div className="text-2xl font-bold">
              {property.price.toFixed(2)} €{" "}
              <span className="text-sm font-normal">/ nuit</span>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" className="p-2 border rounded" required />
              <input name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" className="p-2 border rounded" required />
              <input name="age" value={formData.age} onChange={handleChange} placeholder="Âge" type="number" className="p-2 border rounded" />
              <input name="ville" value={formData.ville} onChange={handleChange} placeholder="Ville de résidence" className="p-2 border rounded" />
              <input name="contact" value={formData.contact} onChange={handleChange} placeholder="Téléphone" className="p-2 border rounded" required />
              <input name="situation" value={formData.situation} onChange={handleChange} placeholder="Situation matrimoniale" className="p-2 border rounded" />
              <input name="profession" value={formData.profession} onChange={handleChange} placeholder="Profession" className="p-2 border rounded" />
              <input name="revenu" value={formData.revenu} onChange={handleChange} placeholder="Revenu mensuel approximatif" type="number" className="p-2 border rounded" />
              <input name="dureeBail" value={formData.dureeBail} onChange={handleChange} placeholder="Durée de bail" className="p-2 border rounded" />
              <input name="nbPersonnes" value={formData.nbPersonnes} onChange={handleChange} placeholder="Nombre de personnes" type="number" className="p-2 border rounded" />
              <label className="flex flex-col">
                <span className="text-sm">Date de visite</span>
                <input name="dispoVisite" value={formData.dispoVisite} onChange={handleChange} type="date" className="p-2 border rounded" />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <label className="flex flex-col">
                <span className="text-sm">Date d'arrivée</span>
                <input name="dateArrivee" value={formData.dateArrivee} onChange={handleChange} type="date" className="p-2 border rounded" required />
              </label>
              <label className="flex flex-col">
                <span className="text-sm">Date de départ</span>
                <input name="dateDepart" value={formData.dateDepart} onChange={handleChange} type="date" className="p-2 border rounded" required />
              </label>
            </div>

            <div className="mt-2">
              <div className="text-sm text-gray-600">
                Prix par nuit: <strong>{property.price.toFixed(2)} €</strong>
              </div>
              <div className="text-lg font-semibold mt-1">
                Prix total estimé: <span className="text-blue-600">{total.toFixed(2)} €</span>
              </div>
            </div>

            {message && (
              <div
                className={`p-2 rounded ${
                  message.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white p-2 rounded"
            >
              {submitting ? "Enregistrement..." : "Soumettre la réservation"}
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}
