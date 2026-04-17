export default function Header() {
  return (
    <header className="bg-white" style={{ borderBottom: '2px solid #e2e4ea' }}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
          style={{ background: 'linear-gradient(135deg, #6d3aed, #8b5cf6)' }}
          aria-hidden="true"
        >
          AI
        </div>
        <div>
          <h1 className="text-lg font-bold" style={{ color: '#1e1f2e' }}>
            AI Tools voor Leerkrachten
          </h1>
          <p className="text-xs" style={{ color: '#8b90a7' }}>
            Miniemeninstituut Leuven
          </p>
        </div>
      </div>
    </header>
  )
}
