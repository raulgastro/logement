"use client"

import { useEffect, useState } from "react"

export default function AdminPage() {
  const [properties, setProperties] = useState([])
  const [form, setForm] = useState({
    name: "",
    type: "",
    city: "",
    region: "",
    address: "",
    price: "",
    rentalType: "",
    rating: "",
    reviews: "",
    image: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    amenities: "",
  })

  // 🔹 Charger les logements depuis ton API Prisma
  useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data))
  }, [])

  // 🔹 Gérer les champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // 🔹 Envoyer un nouveau logement
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch("/api/properties/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
        rating: parseFloat(form.rating),
        reviews: parseInt(form.reviews),
        bedrooms: parseInt(form.bedrooms),
        bathrooms: parseInt(form.bathrooms),
        amenities: form.amenities.split(",").map((a) => a.trim()),
      }),
    })
    alert("Logement ajouté ✅")
    setForm({
      name: "",
      type: "",
      city: "",
      region: "",
      address: "",
      price: "",
      rentalType: "",
      rating: "",
      reviews: "",
      image: "",
      description: "",
      bedrooms: "",
      bathrooms: "",
      amenities: "",
    })
  }

  // 🔹 Supprimer un logement
  const handleDelete = async (id: string) => {
    if (confirm("Supprimer ce logement ?")) {
      await fetch(`/api/properties/delete/${id}`, { method: "DELETE" })
      setProperties(properties.filter((p: any) => p.id !== id))
    }
  }

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🛠️ Admin – Gestion des logements</h1>

      <form onSubmit={handleSubmit} className="space-y-4 border p-6 rounded-lg shadow-sm bg-white">
        <input type="text" name="name" placeholder="Nom du logement" onChange={handleChange} value={form.name} className="border p-2 w-full rounded" required />
        <input type="text" name="city" placeholder="Ville" onChange={handleChange} value={form.city} className="border p-2 w-full rounded" required />
        <input type="text" name="region" placeholder="Région" onChange={handleChange} value={form.region} className="border p-2 w-full rounded" required />
        <input type="text" name="address" placeholder="Adresse" onChange={handleChange} value={form.address} className="border p-2 w-full rounded" required />
        <input type="text" name="price" placeholder="Prix" onChange={handleChange} value={form.price} className="border p-2 w-full rounded" required />
        <input type="text" name="image" placeholder="URL de l’image" onChange={handleChange} value={form.image} className="border p-2 w-full rounded" />
        <textarea name="description" placeholder="Description" onChange={handleChange} value={form.description} className="border p-2 w-full rounded" />
        <input type="text" name="amenities" placeholder="Équipements (séparés par des virgules)" onChange={handleChange} value={form.amenities} className="border p-2 w-full rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Ajouter</button>
      </form>

      <h2 className="text-2xl font-semibold mt-10 mb-4">📋 Liste des logements</h2>
      <ul className="space-y-2">
        {properties.map((p: any) => (
          <li key={p.id} className="border p-4 rounded flex justify-between items-center bg-gray-50">
            <span>{p.name} — {p.city}</span>
            <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-800">Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
