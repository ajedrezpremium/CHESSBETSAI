'use client'

import { useRef } from 'react'
import { Shield, Award, Star, Download, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

interface CertificateViewProps {
  userName: string
  gradoNombre: string
  gradoId: number
  elo: number
  xp: number
  completadas: number
  total: number
}

export function CertificateView({
  userName,
  gradoNombre,
  gradoId,
  elo,
  xp,
  completadas,
  total,
}: CertificateViewProps) {
  const certRef = useRef<HTMLDivElement>(null)
  const date = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return
    const html = certRef.current?.outerHTML || ''
    printWindow.document.write(`
      <html>
      <head>
        <title>Certificado - Grado ${gradoId}</title>
        <style>
          @page { size: landscape; margin: 0; }
          body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #0a0a0a; font-family: system-ui, sans-serif; }
          * { box-sizing: border-box; }
          .certificate { width: 1000px; height: 700px; padding: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); border: 2px solid #b8860b; position: relative; overflow: hidden; }
          .certificate::before { content: ''; position: absolute; inset: 10px; border: 1px solid rgba(184,134,11,0.3); pointer-events: none; }
          .certificate::after { content: '♟'; position: absolute; font-size: 200px; opacity: 0.03; top: 50%; left: 50%; transform: translate(-50%,-50%); }
          h1 { color: #b8860b; font-size: 14px; letter-spacing: 4px; text-transform: uppercase; margin: 0; }
          h2 { color: #e4e4e7; font-size: 36px; margin: 12px 0 0; font-weight: 700; }
          .gold { color: #b8860b; }
          .subtitle { color: #71717a; font-size: 16px; margin: 8px 0 0; }
          .name { font-size: 42px; color: #f4f4f5; font-weight: 700; margin: 24px 0; letter-spacing: 2px; }
          .grado { font-size: 24px; color: #b8860b; font-weight: 600; margin: 8px 0; }
          .divider { width: 200px; height: 1px; background: linear-gradient(90deg, transparent, #b8860b, transparent); margin: 16px auto; }
          .meta { display: flex; gap: 40px; justify-content: center; margin-top: 16px; }
          .meta-item { color: #71717a; font-size: 13px; }
          .meta-item span { color: #e4e4e7; font-weight: 600; display: block; margin-top: 2px; }
          .footer { color: #52525b; font-size: 11px; margin-top: 24px; }
          .seal { width: 60px; height: 60px; border-radius: 50%; border: 2px solid #b8860b; display: flex; align-items: center; justify-content: center; font-size: 24px; margin: 16px auto 0; color: #b8860b; }
          @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
        </style>
      </head>
      <body>${html}</body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => printWindow.print(), 500)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link
        href={`/academy/${gradoId}`}
        className="mb-6 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300"
      >
        <ChevronLeft className="h-3 w-3" />
        Volver a Grado {gradoId}
      </Link>

      <div
        ref={certRef}
        className="certificate"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
          border: '2px solid #b8860b',
          borderRadius: '16px',
          padding: '48px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '12px',
            border: '1px solid rgba(184,134,11,0.2)',
            borderRadius: '10px',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            fontSize: '250px',
            opacity: 0.03,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            color: '#b8860b',
            pointerEvents: 'none',
          }}
        >
          ♟
        </div>

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Shield style={{ width: 32, height: 32, color: '#b8860b', margin: '0 auto 8px' }} />

          <p style={{ color: '#b8860b', fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', margin: 0 }}>
            Chess Bets Academy
          </p>

          <div style={{ width: 200, height: 1, background: 'linear-gradient(90deg, transparent, #b8860b, transparent)', margin: '16px auto' }} />

          <h1 style={{ color: '#f4f4f5', fontSize: 40, fontWeight: 700, margin: '8px 0', letterSpacing: 2 }}>
            CERTIFICADO
          </h1>

          <p style={{ color: '#71717a', fontSize: 14, margin: '8px 0' }}>
            Otorgado a
          </p>

          <p style={{ color: '#f4f4f5', fontSize: 36, fontWeight: 700, margin: '12px 0', letterSpacing: 1 }}>
            {userName}
          </p>

          <p style={{ color: '#71717a', fontSize: 14, margin: '12px 0' }}>
            Por completar el Grado {gradoId}
          </p>

          <p style={{ color: '#b8860b', fontSize: 22, fontWeight: 600, margin: '4px 0' }}>
            {gradoNombre}
          </p>

          <div style={{ width: 200, height: 1, background: 'linear-gradient(90deg, transparent, #b8860b, transparent)', margin: '20px auto' }} />

          <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 8 }}>
            <div style={{ color: '#71717a', fontSize: 12 }}>
              Fecha
              <span style={{ color: '#e4e4e7', fontWeight: 600, display: 'block', marginTop: 2 }}>{date}</span>
            </div>
            <div style={{ color: '#71717a', fontSize: 12 }}>
              ELO
              <span style={{ color: '#e4e4e7', fontWeight: 600, display: 'block', marginTop: 2 }}>{elo}</span>
            </div>
            <div style={{ color: '#71717a', fontSize: 12 }}>
              XP Total
              <span style={{ color: '#e4e4e7', fontWeight: 600, display: 'block', marginTop: 2 }}>{xp}</span>
            </div>
            <div style={{ color: '#71717a', fontSize: 12 }}>
              Lecciones
              <span style={{ color: '#e4e4e7', fontWeight: 600, display: 'block', marginTop: 2 }}>{completadas}/{total}</span>
            </div>
          </div>

          <p style={{ color: '#52525b', fontSize: 10, marginTop: 24 }}>
            Verificado digitalmente por Chess Bets Academy · {new Date().getFullYear()}
          </p>

          <div style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid #b8860b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '12px auto 0', color: '#b8860b', fontSize: 20 }}>
            <Award style={{ width: 20, height: 20 }} />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-medium text-black hover:bg-amber-400"
        >
          <Download className="h-4 w-4" />
          Descargar / Imprimir
        </button>
      </div>
    </div>
  )
}
