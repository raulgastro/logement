"use client"

import { useEffect, useRef, useState } from "react"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const timer = useRef<NodeJS.Timeout | null>(null)
  const warningTimer = useRef<NodeJS.Timeout | null>(null)
  const [showWarning, setShowWarning] = useState(false)

  const TIMEOUT = 10 * 60 * 1000
  const WARNING_BEFORE = 60 * 1000

  useEffect(() => {
    const resetTimer = () => {
      if (timer.current) clearTimeout(timer.current)
      if (warningTimer.current) clearTimeout(warningTimer.current)
      setShowWarning(false)

      warningTimer.current = setTimeout(() => setShowWarning(true), TIMEOUT - WARNING_BEFORE)
      timer.current = setTimeout(() => signOut({ callbackUrl: "/login" }), TIMEOUT)
    }

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"]
    events.forEach((event) => window.addEventListener(event, resetTimer))
    resetTimer()

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer))
      if (timer.current) clearTimeout(timer.current)
      if (warningTimer.current) clearTimeout(warningTimer.current)
    }
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <Link href="/admin" className="hover:bg-gray-700 transition-colors p-2 rounded">Tableau de bord</Link>
        <Link href="/admin/profile" className="hover:bg-gray-700 transition-colors p-2 rounded">Profil</Link>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mt-auto bg-red-600 p-2 rounded hover:bg-red-700 transition-colors"
        >
          Déconnexion
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>

      {/* Popup warning */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-5 right-5 bg-orange-500 text-black p-4 rounded shadow-lg z-50 flex items-center gap-3"
          >
            <span>⚠️ Votre session va expirer dans 1 minute.</span>
            <button
              onClick={() => setShowWarning(false)}
              className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition-colors"
            >
              Rester connecté
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
