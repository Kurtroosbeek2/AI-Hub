const CONFIG = {
  OK: {
    bg: 'rgba(5, 150, 105, 0.1)',
    text: '#065f46',
    icon: '\u2713',
    label: 'GDPR OK',
  },
  Opgelet: {
    bg: 'rgba(217, 119, 6, 0.1)',
    text: '#92400e',
    icon: '\u26a0',
    label: 'GDPR: Opgelet',
  },
  'Niet aanbevolen': {
    bg: 'rgba(220, 38, 38, 0.1)',
    text: '#991b1b',
    icon: '\u2715',
    label: 'Niet aanb.',
  },
}

export default function GdprBadge({ status }) {
  const c = CONFIG[status] || CONFIG['Opgelet']
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '3px 10px',
        borderRadius: 9999,
        fontSize: 10,
        fontWeight: 700,
        fontFamily: '"Space Grotesk", sans-serif',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        backgroundColor: c.bg,
        color: c.text,
      }}
    >
      {c.icon} {c.label}
    </span>
  )
}
