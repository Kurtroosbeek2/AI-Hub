import GdprBadge from './GdprBadge'

const CAT_COLORS = {
  Tekstgeneratie:  { bg: 'rgba(0, 85, 119, 0.1)',   text: '#005577' },
  Beeldgeneratie:  { bg: 'rgba(141, 209, 245, 0.2)', text: '#004466' },
  Onderzoek:       { bg: 'rgba(0, 85, 119, 0.08)',  text: '#005577' },
  Communicatie:    { bg: 'rgba(5, 150, 105, 0.1)',   text: '#065f46' },
  Video:           { bg: 'rgba(217, 119, 6, 0.1)',   text: '#92400e' },
}

function Avatar({ naam, logoUrl }) {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt=""
        aria-hidden="true"
        style={{
          width: 48, height: 48, borderRadius: 14,
          objectFit: 'contain',
          backgroundColor: 'rgba(141, 209, 245, 0.1)',
          padding: 4, flexShrink: 0,
        }}
        onError={e => { e.currentTarget.style.display = 'none' }}
      />
    )
  }
  const initials = naam.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
  return (
    <div
      aria-hidden="true"
      style={{
        width: 48, height: 48, borderRadius: 14,
        background: 'linear-gradient(135deg, #005577, #8dd1f5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontWeight: 800, fontSize: 15,
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  )
}

function CategorieBadge({ categorie }) {
  const c = CAT_COLORS[categorie] || { bg: 'rgba(0, 85, 119, 0.08)', text: '#005577' }
  return (
    <span
      style={{
        padding: '2px 10px', borderRadius: 9999,
        fontSize: 10, fontWeight: 700,
        fontFamily: '"Space Grotesk", sans-serif',
        textTransform: 'uppercase', letterSpacing: '0.05em',
        backgroundColor: c.bg, color: c.text,
      }}
    >
      {categorie}
    </span>
  )
}

export default function ToolCard({ tool, onClick }) {
  return (
    <button
      onClick={() => onClick(tool)}
      className="glass-card"
      style={{
        width: '100%', textAlign: 'left', borderRadius: 24,
        padding: 20, display: 'flex', flexDirection: 'column',
        gap: 12, cursor: 'pointer',
        transition: 'all 0.2s ease', outline: 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(0, 85, 119, 0.5)'
        e.currentTarget.style.boxShadow = '0 8px 28px rgba(141, 209, 245, 0.35)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(141, 209, 245, 0.35)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
      onFocus={e => {
        e.currentTarget.style.borderColor = '#005577'
        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 85, 119, 0.15)'
      }}
      onBlur={e => {
        e.currentTarget.style.borderColor = 'rgba(141, 209, 245, 0.35)'
        e.currentTarget.style.boxShadow = 'none'
      }}
      aria-label={`Meer info over ${tool.naam}`}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <Avatar naam={tool.naam} logoUrl={tool.logo_url} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontWeight: 700, fontSize: 15, fontFamily: '"Plus Jakarta Sans", sans-serif', color: '#002233', lineHeight: 1.3, margin: 0 }}>
            {tool.naam}
          </p>
          <div style={{ marginTop: 6 }}>
            <CategorieBadge categorie={tool.categorie} />
          </div>
        </div>
      </div>

      {tool.beschrijving && (
        <p
          style={{
            fontSize: 13, color: '#446677', lineHeight: 1.6, margin: 0,
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}
        >
          {tool.beschrijving}
        </p>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
        {tool.voor_leerkracht && tool.voor_leerling ? (
          <span style={{ padding: '3px 10px', borderRadius: 9999, fontSize: 10, fontWeight: 700, fontFamily: '"Space Grotesk", sans-serif', textTransform: 'uppercase', letterSpacing: '0.04em', backgroundColor: 'rgba(0,85,119,0.08)', color: '#005577' }}>Leerkracht &amp; Leerling</span>
        ) : tool.voor_leerkracht ? (
          <span style={{ padding: '3px 10px', borderRadius: 9999, fontSize: 10, fontWeight: 700, fontFamily: '"Space Grotesk", sans-serif', textTransform: 'uppercase', letterSpacing: '0.04em', backgroundColor: 'rgba(0,85,119,0.08)', color: '#005577' }}>Leerkracht</span>
        ) : tool.voor_leerling ? (
          <span style={{ padding: '3px 10px', borderRadius: 9999, fontSize: 10, fontWeight: 700, fontFamily: '"Space Grotesk", sans-serif', textTransform: 'uppercase', letterSpacing: '0.04em', backgroundColor: 'rgba(0,85,119,0.08)', color: '#005577' }}>Leerling</span>
        ) : null}
        {tool.gratis && (
          <span style={{ padding: '3px 10px', borderRadius: 9999, fontSize: 10, fontWeight: 700, fontFamily: '"Space Grotesk", sans-serif', textTransform: 'uppercase', letterSpacing: '0.04em', backgroundColor: 'rgba(5,150,105,0.1)', color: '#065f46' }}>Gratis</span>
        )}
        <GdprBadge status={tool.gdpr_status} />
      </div>
    </button>
  )
}
