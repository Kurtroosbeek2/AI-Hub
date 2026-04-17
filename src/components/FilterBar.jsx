function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 14px',
        borderRadius: 9999,
        fontSize: 11,
        fontWeight: 700,
        fontFamily: '"Space Grotesk", sans-serif',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: `1.5px solid ${active ? '#005577' : 'rgba(141, 209, 245, 0.6)'}`,
        backgroundColor: active ? '#005577' : 'rgba(255, 255, 255, 0.7)',
        color: active ? '#fff' : '#446677',
        backdropFilter: 'blur(8px)',
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.borderColor = '#005577'
          e.currentTarget.style.color = '#005577'
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.borderColor = 'rgba(141, 209, 245, 0.6)'
          e.currentTarget.style.color = '#446677'
        }
      }}
      aria-pressed={active}
    >
      {children}
    </button>
  )
}

const DIVIDER = (
  <div
    aria-hidden="true"
    style={{ width: 1, height: 22, backgroundColor: 'rgba(141, 209, 245, 0.4)', flexShrink: 0, alignSelf: 'center' }}
  />
)

export default function FilterBar({ filters, onChange, categories }) {
  const toggle = (key, value) =>
    onChange(prev => ({ ...prev, [key]: prev[key] === value ? '' : value }))
  const set = (key, value) => onChange(prev => ({ ...prev, [key]: value }))
  const hasActive =
    filters.zoek || filters.doelgroep || filters.kostprijs ||
    filters.gdpr  || filters.categorie

  return (
    <div style={{ marginBottom: 28 }}>
      {/* Zoekbalk — terminal style */}
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <span
          className="material-symbols-outlined"
          aria-hidden="true"
          style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', color: 'rgba(141,209,245,0.8)', fontSize: 20, pointerEvents: 'none' }}
        >
          search
        </span>
        <input
          type="search"
          placeholder="Zoek een AI-tool…"
          value={filters.zoek}
          onChange={e => set('zoek', e.target.value)}
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            borderBottom: '2px solid rgba(141, 209, 245, 0.5)',
            padding: '10px 4px 10px 32px',
            fontSize: 16,
            color: '#002233',
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            fontFamily: 'Manrope, sans-serif',
          }}
          onFocus={e => {
            e.currentTarget.style.borderBottomColor = '#005577'
            e.currentTarget.style.boxShadow = '0 4px 12px -2px rgba(141, 209, 245, 0.35)'
          }}
          onBlur={e => {
            e.currentTarget.style.borderBottomColor = 'rgba(141, 209, 245, 0.5)'
            e.currentTarget.style.boxShadow = 'none'
          }}
          aria-label="Zoek een AI-tool"
        />
      </div>

      {/* Filterchips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: '"Space Grotesk", sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8dd1f5', flexShrink: 0 }}>Doelgroep</span>
        <Chip active={filters.doelgroep === 'leerkracht'} onClick={() => toggle('doelgroep', 'leerkracht')}>Leerkracht</Chip>
        <Chip active={filters.doelgroep === 'leerling'}   onClick={() => toggle('doelgroep', 'leerling')}>Leerling</Chip>
        <Chip active={filters.doelgroep === 'beiden'}     onClick={() => toggle('doelgroep', 'beiden')}>Beiden</Chip>
        {DIVIDER}
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: '"Space Grotesk", sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8dd1f5', flexShrink: 0 }}>Prijs</span>
        <Chip active={filters.kostprijs === 'gratis'}   onClick={() => toggle('kostprijs', 'gratis')}>Gratis</Chip>
        <Chip active={filters.kostprijs === 'betalend'} onClick={() => toggle('kostprijs', 'betalend')}>Betalend</Chip>
        {DIVIDER}
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: '"Space Grotesk", sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8dd1f5', flexShrink: 0 }}>GDPR</span>
        <Chip active={filters.gdpr === 'OK'}              onClick={() => toggle('gdpr', 'OK')}>&#10003; OK</Chip>
        <Chip active={filters.gdpr === 'Opgelet'}         onClick={() => toggle('gdpr', 'Opgelet')}>&#9888; Opgelet</Chip>
        <Chip active={filters.gdpr === 'Niet aanbevolen'} onClick={() => toggle('gdpr', 'Niet aanbevolen')}>&#10005; Niet aanb.</Chip>
        {categories.length > 0 && (
          <>
            {DIVIDER}
            <span style={{ fontSize: 10, fontWeight: 700, fontFamily: '"Space Grotesk", sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8dd1f5', flexShrink: 0 }}>Categorie</span>
            <select
              value={filters.categorie}
              onChange={e => set('categorie', e.target.value)}
              style={{
                padding: '6px 14px', borderRadius: 9999,
                fontSize: 11, fontWeight: 700,
                fontFamily: '"Space Grotesk", sans-serif',
                textTransform: 'uppercase', letterSpacing: '0.05em',
                border: '1.5px solid rgba(141, 209, 245, 0.6)',
                backgroundColor: 'rgba(255,255,255,0.7)',
                color: '#446677', outline: 'none',
                backdropFilter: 'blur(8px)',
              }}
              aria-label="Filter op categorie"
            >
              <option value="">Alle</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </>
        )}
        {hasActive && (
          <button
            onClick={() => onChange({ zoek: '', doelgroep: '', kostprijs: '', gdpr: '', categorie: '' })}
            style={{
              padding: '6px 14px', borderRadius: 9999,
              fontSize: 11, fontWeight: 700,
              fontFamily: '"Space Grotesk", sans-serif',
              textTransform: 'uppercase', letterSpacing: '0.06em',
              border: '1.5px solid rgba(220, 38, 38, 0.3)',
              backgroundColor: 'rgba(255,255,255,0.7)',
              color: '#991b1b', cursor: 'pointer',
            }}
          >
            &times; Wis filters
          </button>
        )}
      </div>
    </div>
  )
}
