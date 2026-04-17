import GdprBadge from './GdprBadge'

const CAT_COLORS = {
  Tekstgeneratie:  { bg: '#eff6ff', text: '#1d4ed8' },
  Beeldgeneratie: { bg: '#fdf2f8', text: '#9d174d' },
  Onderzoek:       { bg: '#eef2ff', text: '#3730a3' },
  Communicatie:    { bg: '#f0fdf4', text: '#15803d' },
  Video:           { bg: '#fff7ed', text: '#c2410c' },
}

function Avatar({ naam, logoUrl }) {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt=""
        aria-hidden="true"
        className="w-12 h-12 rounded-xl object-contain bg-gray-50 p-1 shrink-0"
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
      className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base shrink-0"
      style={{ backgroundColor: '#ede9fe', color: '#6d3aed' }}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

function CategorieBadge({ categorie }) {
  const c = CAT_COLORS[categorie] || { bg: '#f3f4f6', text: '#374151' }
  return (
    <span
      className="px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ backgroundColor: c.bg, color: c.text }}
    >
      {categorie}
    </span>
  )
}

export default function ToolCard({ tool, onClick }) {
  return (
    <button
      onClick={() => onClick(tool)}
      className="w-full text-left bg-white rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 focus-visible:outline-none"
      style={{
        border: '1px solid #e2e4ea',
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.05)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#6d3aed'
        e.currentTarget.style.boxShadow = '0 4px 12px 0 rgb(109 58 237 / 0.12)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#e2e4ea'
        e.currentTarget.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.05)'
      }}
      onFocus={e => {
        e.currentTarget.style.borderColor = '#6d3aed'
        e.currentTarget.style.boxShadow = '0 0 0 3px rgb(109 58 237 / 0.15)'
      }}
      onBlur={e => {
        e.currentTarget.style.borderColor = '#e2e4ea'
        e.currentTarget.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.05)'
      }}
      aria-label={`Meer info over ${tool.naam}`}
    >
      <div className="flex items-start gap-3">
        <Avatar naam={tool.naam} logoUrl={tool.logo_url} />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-base leading-tight" style={{ color: '#1e1f2e' }}>
            {tool.naam}
          </p>
          <div className="mt-1.5">
            <CategorieBadge categorie={tool.categorie} />
          </div>
        </div>
      </div>

      {tool.beschrijving && (
        <p
          className="text-sm leading-relaxed"
          style={{
            color: '#4b5166',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {tool.beschrijving}
        </p>
      )}

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {tool.voor_leerkracht && tool.voor_leerling ? (
          <span
            className="px-2 py-0.5 rounded-full text-xs font-medium"
            style={{ backgroundColor: '#ede9fe', color: '#6d3aed' }}
          >
            Leerkracht &amp; leerling
          </span>
        ) : tool.voor_leerkracht ? (
          <span
            className="px-2 py-0.5 rounded-full text-xs font-medium"
            style={{ backgroundColor: '#ede9fe', color: '#6d3aed' }}
          >
            Leerkracht
          </span>
        ) : tool.voor_leerling ? (
          <span
            className="px-2 py-0.5 rounded-full text-xs font-medium"
            style={{ backgroundColor: '#ede9fe', color: '#6d3aed' }}
          >
            Leerling
          </span>
        ) : null}

        {tool.gratis && (
          <span
            className="px-2 py-0.5 rounded-full text-xs font-medium"
            style={{ backgroundColor: '#f0fdf4', color: '#15803d' }}
          >
            Gratis beschikbaar
          </span>
        )}

        <GdprBadge status={tool.gdpr_status} />
      </div>
    </button>
  )
}
