import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import ChangePasswordForm from "./ChangePasswordForm"

export default async function AdminProfilePage() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "admin") return <p className="p-6">Accès refusé.</p>

  const admin = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, role: true },
  })

  if (!admin) return <p className="p-6">Utilisateur introuvable.</p>

  return (
    <div className="p-6 max-w-2xl bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Profil Admin</h1>
      <p className="mb-1"><strong>Nom :</strong> {admin.name}</p>
      <p className="mb-1"><strong>Email :</strong> {admin.email}</p>
      <p className="mb-4"><strong>Rôle :</strong> {admin.role}</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Changer de mot de passe</h2>
        <ChangePasswordForm adminId={session.user.id} />
      </div>
    </div>
  )
}
