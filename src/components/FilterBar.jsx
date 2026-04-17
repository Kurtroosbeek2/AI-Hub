function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
      style={{
        backgroundColor: active ? '#6d3aed' : '#ffffff',
        color: active ? '#ffffff' : '#4b5166',
        border: `1px solid ${active ? '#6d3aed' : '#e2e4ea'}`,
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.borderColor = '#6d3aed'
          e.currentTarget.style.color = '#6d3aed'
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.borderColor = '#e2e4ea'
          e.currentTarget.style.color = '#4b5166'
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
    className="self-center shrink-0"
    style={{ width: 1, height: 24, backgroundColor: '#e2e4ea' }}
    aria-hidden="true"
  />
)

export default function FilterBar({ filters, onChange, categories }) {
  const toggle = (key, value) =>
    onChange(prev => ({ ...prev, [key]: prev[key] === value ? '' : value }))
  const set = (key, value) => onChange(prev => ({ ...prev, [key]: value }))
  const hasActive =
    filters.zoek || filters.doelgroep || filters.kostprijs ||
    filters.gdpr || filters.categorie

  return (
    <div className="mb-6 space-y-3">
      {/* Zoekbalk */}
      <div className="relative">
        <span
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base"
          aria-hidden="true"
          style={{ color: '#8b90a7' }}
        >
          &#128269;
        </span>
        <input
          type="search"
          placeholder="Zoek een AI-tool…"
          value={filters.zoek}
          onChange={e => set('zoek', e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e4ea',
            color: '#1e1f2e',
            outline: 'none',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = '#6d3aed'; e.currentTarget.style.boxShadow = '0 0 0 3px rgb(109 58 237 / 0.12)' }}
          onBlur={e => { e.currentTarget.style.borderColor = '#e2e4ea'; e.currentTarget.style.boxShadow = 'none' }}
          aria-label="Zoek een AI-tool"
        />
      </div>

      {/* Filterchips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide shrink-0" style={{ color: '#8b90a7' }}>Doelgroep</span>
        <Chip active={filters.doelgroep === 'leerkracht'} onClick={() => toggle('doelgroep', 'leerkracht')}>Leerkracht</Chip>
        <Chip active={filters.doelgroep === 'leerling'}   onClick={() => toggle('doelgroep', 'leerling')}>Leerling</Chip>
        <Chip active={filters.doelgroep === 'beiden'}     onClick={() => toggle('doelgroep', 'beiden')}>Beiden</Chip>

        {DIVIDER}

        <span className="text-xs font-semibold uppercase tracking-wide shrink-0" style={{ color: '#8b90a7' }}>Prijs</span>
        <Chip active={filters.kostprijs === 'gratis'}   onClick={() => toggle('kostprijs', 'gratis')}>Gratis</Chip>
        <Chip active={filters.kostprijs === 'betalend'} onClick={() => toggle('kostprijs', 'betalend')}>Betalend</Chip>

        {DIVIDER}

        <span className="text-xs font-semibold uppercase tracking-wide shrink-0" style={{ color: '#8b90a7' }}>GDPR</span>
        <Chip active={filters.gdpr === 'OK'}               onClick={() => toggle('gdpr', 'OK')}>&#10003; OK</Chip>
        <Chip active={filters.gdpr === 'Opgelet'}          onClick={() => toggle('gdpr', 'Opgelet')}>&#9888; Opgelet</Chip>
        <Chip active={filters.gdpr === 'Niet aanbevolen'}  onClick={() => toggle('gdpr', 'Niet aanbevolen')}>&#10005; Niet aanb.</Chip>

        {categories.length > 0 && (
          <>
            {DIVIDER}
            <span className="text-xs font-semibold uppercase tracking-wide shrink-0" style={{ color: '#8b90a7' }}>Categorie</span>
            <select
              value={filters.categorie}
              onChange={e => set('categorie', e.target.value)}
              className="px-3 py-1.5 rounded-full text-sm font-medium"
              style={{ border: '1px solid #e2e4ea', backgroundColor: '#fff', color: '#4b5166', outline: 'none' }}
              aria-label="Filter op categorie"
            >
              <option value="">Alle categorieën</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </>
        )}

        {hasActive && (
          <button
            onClick={() => onChange({ zoek: '', doelgroep: '', kostprijs: '', gdpr: '', categorie: '' })}
            className="px-3 py-1.5 rounded-full text-sm transition-colors"
            style={{ border: '1px solid #e2e4ea', color: '#8b90a7' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#dc2626'; e.currentTarget.style.borderColor = '#fca5a5' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#8b90a7'; e.currentTarget.style.borderColor = '#e2e4ea' }}
          >
            &times; Wis filters
          </button>
        )}
      </div>
    </div>
  )
}
