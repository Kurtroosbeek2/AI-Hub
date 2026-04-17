import { useEffect } from 'react'
import GdprBadge from './GdprBadge'

function Avatar({ naam, logoUrl }) {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt=""
        aria-hidden="true"
        className="w-16 h-16 rounded-2xl object-contain bg-gray-50 p-1 shrink-0"
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
      className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl shrink-0"
      style={{ backgroundColor: '#ede9fe', color: '#6d3aed' }}
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
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-tool-naam"
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: '0 20px 60px rgb(0 0 0 / 0.2)' }}
      >
        {/* Header */}
        <div className="p-6" style={{ borderBottom: '1px solid #e2e4ea' }}>
          <div className="flex items-start gap-4">
            <Avatar naam={tool.naam} logoUrl={tool.logo_url} />
            <div className="flex-1 min-w-0">
              <h2
                id="modal-tool-naam"
                className="text-xl font-bold leading-tight"
                style={{ color: '#1e1f2e' }}
              >
                {tool.naam}
              </h2>
              {tool.categorie && (
                <p className="text-sm mt-0.5" style={{ color: '#8b90a7' }}>
                  {tool.categorie}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-2xl leading-none p-1 rounded-lg transition-colors"
              style={{ color: '#8b90a7' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#1e1f2e' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#8b90a7' }}
              aria-label="Sluiten"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {tool.beschrijving && (
            <p className="leading-relaxed" style={{ color: '#4b5166' }}>
              {tool.beschrijving}
            </p>
          )}

          {/* Doelgroep + prijs pills */}
          <div className="flex flex-wrap gap-2">
            {tool.voor_leerkracht && (
              <span
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ backgroundColor: '#ede9fe', color: '#6d3aed' }}
              >
                &#128105;&#8205;&#127979; Leerkracht
              </span>
            )}
            {tool.voor_leerling && (
              <span
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ backgroundColor: '#ede9fe', color: '#6d3aed' }}
              >
                &#127891; Leerling
              </span>
            )}
            {tool.gratis && (
              <span
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ backgroundColor: '#f0fdf4', color: '#15803d' }}
              >
                Gratis beschikbaar
              </span>
            )}
          </div>

          {/* Prijs */}
          {tool.prijs_info && (
            <div>
              <h3
                className="text-xs font-semibold uppercase tracking-wide mb-1"
                style={{ color: '#8b90a7' }}
              >
                Prijs
              </h3>
              <p className="text-sm" style={{ color: '#1e1f2e' }}>
                {tool.prijs_info}
              </p>
            </div>
          )}

          {/* GDPR */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-wide mb-2"
              style={{ color: '#8b90a7' }}
            >
              GDPR-status
            </h3>
            <GdprBadge status={tool.gdpr_status} />
            {tool.gdpr_toelichting && (
              <p className="mt-2 text-sm leading-relaxed" style={{ color: '#4b5166' }}>
                {tool.gdpr_toelichting}
              </p>
            )}
          </div>

          {/* Use cases */}
          {tool.use_cases && tool.use_cases.length > 0 && (
            <div>
              <h3
                className="text-xs font-semibold uppercase tracking-wide mb-2"
                style={{ color: '#8b90a7' }}
              >
                Waarvoor gebruiken?
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {tool.use_cases.map(uc => (
                  <span
                    key={uc}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium"
                    style={{ backgroundColor: '#f4f5f7', color: '#4b5166' }}
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
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-medium text-sm transition-colors"
              style={{ backgroundColor: '#6d3aed', color: '#fff' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#5b2fd6' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#6d3aed' }}
            >
              Website bezoeken →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
