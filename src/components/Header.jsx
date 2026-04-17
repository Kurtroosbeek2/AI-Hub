export default function Header() {
  return (
    <header
      style={{
        backgroundColor: '#005577',
        borderBottom: '1px solid rgba(141, 209, 245, 0.2)',
        boxShadow: '0 2px 20px rgba(0, 85, 119, 0.25)',
      }}
    >
      <div
        style={{
          maxWidth: 1152,
          margin: '0 auto',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(141, 209, 245, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          <span className="material-symbols-outlined" style={{ color: '#8dd1f5', fontSize: 22 }}>hub</span>
        </div>
        <div>
          <h1
            style={{
              fontSize: 18,
              fontWeight: 800,
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              background: 'linear-gradient(to right, #ffffff, #8dd1f5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            AI Tools voor Leerkrachten
          </h1>
          <p
            style={{
              fontSize: 10,
              color: 'rgba(141, 209, 245, 0.8)',
              fontFamily: '"Space Grotesk", sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontWeight: 600,
              margin: 0,
              marginTop: 2,
            }}
          >
            Miniemeninstituut Leuven
          </p>
        </div>
      </div>
    </header>
  )
}
