"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";

type PropertyItem = any;
type ReservationItem = any;

interface FormValues {
  id?: string;
  name: string;
  type: string;
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
  amenities: string;
  imageFile?: FileList;
  galleryFiles?: FileList;
}

export default function AdminPage() {
  const { register, handleSubmit, reset, setValue } = useForm<FormValues>();
  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [reservations, setReservations] = useState<ReservationItem[]>([]);
  const [previewGallery, setPreviewGallery] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null); // ✅ pour l’accordéon

  // 🔹 Charger logements et réservations
  const fetchProperties = async () => {
    const res = await fetch("/api/admin/properties");
    const data = await res.json();
    setProperties(data);
  };

  const fetchReservations = async () => {
    const res = await fetch("/api/reservations");
    const data = await res.json();
    setReservations(data);
  };

  useEffect(() => {
    fetchProperties();
    fetchReservations();
  }, []);

  const handleGalleryPreview = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const previews = Array.from(files).map((f) => URL.createObjectURL(f));
    setPreviewGallery(previews);
  };

  const readFileAsDataUrl = (file: File) =>
    new Promise<string>((resolve) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result as string);
      r.readAsDataURL(file);
    });

  // 🔹 Ajouter ou modifier un logement
  const onSubmit = async (data: FormValues) => {
    let mainImage = "";
    if (data.imageFile && data.imageFile.length > 0) {
      mainImage = await readFileAsDataUrl(data.imageFile[0]);
    }

    const gallery: string[] = [];
    if (data.galleryFiles && data.galleryFiles.length > 0) {
      for (const f of Array.from(data.galleryFiles)) {
        gallery.push(await readFileAsDataUrl(f));
      }
    }

    const payload = {
      ...data,
      amenities: (data.amenities || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      image: mainImage,
      gallery,
    };

    if (editingId) {
      await fetch("/api/admin/properties", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...payload }),
      });
    } else {
      await fetch("/api/admin/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    reset();
    setPreviewGallery([]);
    setEditingId(null);
    fetchProperties();
  };

  const handleEdit = (p: PropertyItem) => {
    setEditingId(p.id);
    setValue("name", p.name);
    setValue("type", p.type);
    setValue("city", p.city);
    setValue("region", p.region);
    setValue("address", p.address);
    setValue("price", p.price);
    setValue("rentalType", p.rentalType);
    setValue("rating", p.rating);
    setValue("reviews", p.reviews);
    setValue("description", p.description);
    setValue("bedrooms", p.bedrooms);
    setValue("bathrooms", p.bathrooms);
    setValue(
      "amenities",
      Array.isArray(p.amenities) ? p.amenities.join(", ") : p.amenities
    );
    setPreviewGallery(p.images ? p.images.map((img: any) => img.url) : []);
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/admin/properties", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchProperties();
  };

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* 🔸 En-tête */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin — Logements & Réservations</h1>
        <button
          onClick={() => {
            localStorage.removeItem("admin");
            window.location.href = "/";
          }}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Déconnexion
        </button>
      </div>

      {/* 🏠 Formulaire logements */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white p-4 rounded shadow mb-6"
      >
        <input {...register("name")} placeholder="Nom" required className="p-2 border rounded" />
        <input {...register("type")} placeholder="Type" className="p-2 border rounded" />
        <input {...register("city")} placeholder="Ville" className="p-2 border rounded" />
        <input {...register("region")} placeholder="Région" className="p-2 border rounded" />
        <input {...register("address")} placeholder="Adresse" className="p-2 border rounded" />
        <input type="number" {...register("price")} placeholder="Prix (€)" className="p-2 border rounded" />
        <input {...register("rentalType")} placeholder="Type location" className="p-2 border rounded" />
        <input type="number" {...register("rating")} placeholder="Note" className="p-2 border rounded" />
        <input type="number" {...register("reviews")} placeholder="Avis" className="p-2 border rounded" />
        <input {...register("description")} placeholder="Description" className="p-2 border rounded md:col-span-2" />
        <input type="number" {...register("bedrooms")} placeholder="Chambres" className="p-2 border rounded" />
        <input type="number" {...register("bathrooms")} placeholder="Salles de bain" className="p-2 border rounded" />
        <input {...register("amenities")} placeholder="Équipements (séparés par ,)" className="p-2 border rounded md:col-span-2" />

        <div className="md:col-span-2">
          <label className="block mb-1">Image principale</label>
          <input type="file" {...register("imageFile")} accept="image/*" />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1">Galerie (plusieurs images)</label>
          <input type="file" {...register("galleryFiles")} accept="image/*" multiple onChange={handleGalleryPreview} />
          <div className="mt-2 flex gap-2 flex-wrap">
            {previewGallery.map((src, i) => (
              <img key={i} src={src} alt={"preview-" + i} className="w-24 h-24 object-cover rounded" />
            ))}
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end gap-2">
          {editingId && (
            <button
              type="button"
              onClick={() => {
                reset();
                setEditingId(null);
                setPreviewGallery([]);
              }}
              className="px-3 py-2 border rounded"
            >
              Annuler
            </button>
          )}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {editingId ? "Mettre à jour" : "Ajouter"}
          </button>
        </div>
      </form>

      {/* 🏠 Liste logements */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Logements</h2>
        <ul className="space-y-2">
          {properties.map((p) => (
            <li key={p.id} className="flex justify-between items-center p-3 bg-white rounded shadow">
              <div>
                <div className="font-medium">{p.name} — {p.city}</div>
                <div className="text-sm text-gray-600">{p.price} € — {p.type}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(p)} className="px-2 py-1 bg-yellow-500 text-white rounded">Modifier</button>
                <button onClick={() => handleDelete(p.id)} className="px-2 py-1 bg-red-600 text-white rounded">Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 📋 Réservations (accordéon) */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Réservations récentes</h2>
        <ul className="space-y-2">
          {reservations.map((r) => (
            <li
              key={r.id}
              onClick={() => toggleOpen(r.id)}
              className="p-4 bg-white rounded shadow cursor-pointer transition hover:shadow-lg"
            >
              <div className="flex justify-between items-center">
                <div className="font-semibold text-lg">{r.logementNom || "Logement inconnu"}</div>
                <span className="text-gray-500 text-sm">
                  {openId === r.id ? "▲ Fermer" : "▼ Voir détails"}
                </span>
              </div>

              {openId === r.id && (
                <div className="mt-3 text-sm text-gray-700 border-t pt-2 animate-fadeIn">
                  <strong>Nom:</strong> {r.name} {r.prenom} <br />
                  <strong>Téléphone:</strong> {r.phone} <br />
                  <strong>Ville:</strong> {r.city || "—"} <br />
                  <strong>Âge:</strong> {r.age || "—"} <br />
                  <strong>Situation:</strong> {r.maritalStatus || "—"} <br />
                  <strong>Profession:</strong> {r.profession || "—"} <br />
                  <strong>Revenu:</strong> {r.income ? `${r.income} €` : "—"} <br />
                  <strong>Durée du bail:</strong> {r.leaseDuration || "—"} <br />
                  <strong>Occupants:</strong> {r.occupants || "—"} <br />
                  <strong>Date visite:</strong>{" "}
                  {r.visitDate ? new Date(r.visitDate).toLocaleDateString() : "—"} <br />
                  <strong>Arrivée:</strong> {new Date(r.arrivalDate).toLocaleDateString()} <br />
                  <strong>Départ:</strong> {new Date(r.departureDate).toLocaleDateString()} <br />
                  <strong>Total:</strong> <span className="text-blue-600 font-semibold">{r.totalPrice} €</span> <br />
                  <strong>Créé le:</strong> {new Date(r.createdAt).toLocaleString()}
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}