const CONFIG = {
  OK: {
    bg: '#f0fdf4', text: '#15803d', icon: '\u2713', label: 'GDPR OK',
  },
  Opgelet: {
    bg: '#fffbeb', text: '#b45309', icon: '\u26a0', label: 'GDPR: Opgelet',
  },
  'Niet aanbevolen': {
    bg: '#fef2f2', text: '#b91c1c', icon: '\u2715', label: 'GDPR: Niet aanbevolen',
  },
}

export default function GdprBadge({ status }) {
  const c = CONFIG[status] || CONFIG['Opgelet']
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ backgroundColor: c.bg, color: c.text }}
    >
      {c.icon} {c.label}
    </span>
  )
}
