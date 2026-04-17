import { useEffect } from 'react'
import GdprBadge from './GdprBadge'

function Avatar({ naam, logoUrl }) {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt=""
        aria-hidden="true"
        className="w-16 h-16 rounded-2xl object-contain bg-white/60 p-1 shrink-0"
        style={{ border: '1px solid rgba(141,209,245,0.3)' }}
        onError={e => { e.currentTarget.style.display = 'none' }}
      />
    )
  }
  const initials = naam
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()
  return (
    <div
      className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl shrink-0 text-white"
      style={{ background: 'linear-gradient(135deg, #005577, #8dd1f5)' }}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

export default function ToolModal({ tool, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handler = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handler)
    }
  }, [onClose])

  if (!tool) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,34,51,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-tool-naam"
    >
      <div
        className="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{ borderRadius: 24, boxShadow: '0 24px 64px rgba(0,85,119,0.25)' }}
      >
        {/* Header */}
        <div className="p-6" style={{ borderBottom: '1px solid rgba(141,209,245,0.2)' }}>
          <div className="flex items-start gap-4">
            <Avatar naam={tool.naam} logoUrl={tool.logo_url} />
            <div className="flex-1 min-w-0">
              <h2
                id="modal-tool-naam"
                className="text-xl font-bold leading-tight font-headline"
                style={{ color: '#002233' }}
              >
                {tool.naam}
              </h2>
              {tool.categorie && (
                <p className="text-sm mt-0.5 font-label uppercase tracking-wide" style={{ color: '#005577' }}>
                  {tool.categorie}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-2xl leading-none p-1 rounded-lg transition-colors"
              style={{ color: '#446677' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#002233' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#446677' }}
              aria-label="Sluiten"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {tool.beschrijving && (
            <p className="leading-relaxed font-body" style={{ color: '#446677' }}>
              {tool.beschrijving}
            </p>
          )}

          {/* Doelgroep + prijs pills */}
          <div className="flex flex-wrap gap-2">
            {tool.voor_leerkracht && (
              <span
                className="px-3 py-1 rounded-full text-sm font-medium font-label"
                style={{ backgroundColor: 'rgba(0,85,119,0.08)', color: '#005577', border: '1px solid rgba(0,85,119,0.2)' }}
              >
                &#128105;&#8205;&#127979; Leerkracht
              </span>
            )}
            {tool.voor_leerling && (
              <span
                className="px-3 py-1 rounded-full text-sm font-medium font-label"
                style={{ backgroundColor: 'rgba(0,85,119,0.08)', color: '#005577', border: '1px solid rgba(0,85,119,0.2)' }}
              >
                &#127891; Leerling
              </span>
            )}
            {tool.gratis && (
              <span
                className="px-3 py-1 rounded-full text-sm font-medium font-label"
                style={{ backgroundColor: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }}
              >
                Gratis beschikbaar
              </span>
            )}
          </div>

          {/* Prijs */}
          {tool.prijs_info && (
            <div>
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-1 font-label"
                style={{ color: '#8dd1f5' }}
              >
                Prijs
              </h3>
              <p className="text-sm font-body" style={{ color: '#002233' }}>
                {tool.prijs_info}
              </p>
            </div>
          )}

          {/* GDPR */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-2 font-label"
              style={{ color: '#8dd1f5' }}
            >
              GDPR-status
            </h3>
            <GdprBadge status={tool.gdpr_status} />
            {tool.gdpr_toelichting && (
              <p className="mt-2 text-sm leading-relaxed font-body" style={{ color: '#446677' }}>
                {tool.gdpr_toelichting}
              </p>
            )}
          </div>

          {/* Use cases */}
          {tool.use_cases && tool.use_cases.length > 0 && (
            <div>
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-2 font-label"
                style={{ color: '#8dd1f5' }}
              >
                Waarvoor gebruiken?
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {tool.use_cases.map(uc => (
                  <span
                    key={uc}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium font-label"
                    style={{ backgroundColor: 'rgba(141,209,245,0.12)', color: '#005577', border: '1px solid rgba(141,209,245,0.25)' }}
                  >
                    {uc}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Website link */}
          {tool.website_url && (
            <a
              href={tool.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-btn flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all font-label uppercase tracking-wide"
              style={{ background: 'linear-gradient(90deg, #005577, #0077aa)', color: '#fff' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>open_in_new</span>
              Website bezoeken
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
