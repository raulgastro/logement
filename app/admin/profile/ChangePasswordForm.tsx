"use client"

import { useState } from "react"

interface Props { adminId: string }

export default function ChangePasswordForm({ adminId }: Props) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) return setMessage("Les mots de passe ne correspondent pas.")

    const res = await fetch("/api/admin/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminId, currentPassword, newPassword }),
    })
    const data = await res.json()
    setMessage(data.message)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-sm gap-2">
      <input type="password" placeholder="Mot de passe actuel" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="p-2 border rounded"/>
      <input type="password" placeholder="Nouveau mot de passe" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="p-2 border rounded"/>
      <input type="password" placeholder="Confirmer nouveau mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="p-2 border rounded"/>
      <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors">
        Changer le mot de passe
      </button>
      {message && <p className="text-red-600 mt-1">{message}</p>}
    </form>
  )
}
