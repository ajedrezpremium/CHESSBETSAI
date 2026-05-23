'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Award } from 'lucide-react'

interface Props {
  gradoId: number
  totalLecciones: number
}

export function CertificateButton({ gradoId, totalLecciones }: Props) {
  const [showCert, setShowCert] = useState(false)

  useEffect(() => {
    fetch(`/api/academy/progress?gradoId=${gradoId}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const completed = data.filter((p: any) => p.completado).length
          if (completed >= totalLecciones) setShowCert(true)
        }
      })
      .catch(() => {})
  }, [gradoId, totalLecciones])

  if (!showCert) return null

  return (
    <Link
      href={`/academy/certificado/${gradoId}`}
      className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/5 px-6 py-4 text-sm font-medium text-amber-500 transition-colors hover:bg-amber-500/10"
    >
      <Award className="h-5 w-5" />
      Ver Certificado — Grado {gradoId} Completado
    </Link>
  )
}
