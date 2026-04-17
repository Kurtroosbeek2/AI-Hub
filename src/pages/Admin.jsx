import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const CATEGORIEEN = ['Tekstgeneratie', 'Beeldgeneratie', 'Onderzoek', 'Communicatie', 'Video']
const GDPR_OPTIES = ['OK', 'Opgelet', 'Niet aanbevolen']

const EMPTY_TOOL = {
  naam: '',
  logo_url: '',
  beschrijving: '',
  website_url: '',
  gratis: true,
  prijs_info: '',
  voor_leerkracht: true,
  voor_leerling: false,
  gdpr_status: 'Opgelet',
  gdpr_toelichting: '',
  use_cases: '',
  categorie: 'Tekstgeneratie',
  actief: true,
}

const inputStyle = {
  width: '100%',
  padding: '9px 12px',
  border: '1px solid rgba(141,209,245,0.4)',
  borderRadius: 8,
  fontSize: 14,
  color: '#002233',
  backgroundColor: 'rgba(255,255,255,0.8)',
  outline: 'none',
  fontFamily: 'Manrope, sans-serif',
  transition: 'border-color 0.15s',
}

const focusStyle = { borderColor: '#005577', boxShadow: '0 0 0 3px rgba(0,85,119,0.08)' }
const blurStyle  = { borderColor: 'rgba(141,209,245,0.4)', boxShadow: 'none' }

function FormField({ label, children, full }) {
  return (
    <div style={{ gridColumn: full ? '1 / -1' : undefined }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#8dd1f5', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: '"Space Grotesk", sans-serif' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

function ToolForm({ tool, onSave, onCancel, saving, message }) {
  const [form, setForm] = useState({
    id:               tool.id,
    aangemaakt_op:    tool.aangemaakt_op,
    naam:             tool.naam             ?? '',
    logo_url:         tool.logo_url         ?? '',
    beschrijving:     tool.beschrijving     ?? '',
    website_url:      tool.website_url      ?? '',
    gratis:           tool.gratis           ?? true,
    prijs_info:       tool.prijs_info       ?? '',
    voor_leerkracht:  tool.voor_leerkracht  ?? true,
    voor_leerling:    tool.voor_leerling    ?? false,
    gdpr_status:      tool.gdpr_status      ?? 'Opgelet',
    gdpr_toelichting: tool.gdpr_toelichting ?? '',
    use_cases: Array.isArray(tool.use_cases)
      ? tool.use_cases.join(', ')
      : (tool.use_cases ?? ''),
    categorie: tool.categorie ?? 'Tekstgeneratie',
    actief:    tool.actief    ?? true,
  })

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <button
          onClick={onCancel}
          style={{ fontSize: 14, color: '#005577', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
          Terug
        </button>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#002233', margin: 0, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
          {tool.id ? 'Tool bewerken' : 'Nieuwe tool toevoegen'}
        </h2>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(141,209,245,0.35)', borderRadius: 20, padding: 28, boxShadow: '0 4px 24px rgba(0,85,119,0.08)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          <FormField label="Naam *">
            <input type="text" value={form.naam} onChange={e => set('naam', e.target.value)} required style={inputStyle} onFocus={e => Object.assign(e.target.style, focusStyle)} onBlur={e => Object.assign(e.target.style, blurStyle)} />
          </FormField>
          <FormField label="Categorie">
            <select value={form.categorie} onChange={e => set('categorie', e.target.value)} style={inputStyle} onFocus={e => Object.assign(e.target.style, focusStyle)} onBlur={e => Object.assign(e.target.style, blurStyle)}>
              {CATEGORIEEN.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </FormField>
          <FormField label="Website URL">
            <input type="url" value={form.website_url} onChange={e => set('website_url', e.target.value)} style={inputStyle} onFocus={e => Object.assign(e.target.style, focusStyle)} onBlur={e => Object.assign(e.target.style, blurStyle)} placeholder="https://..." />
          </FormField>
          <FormField label="Logo URL">
            <input type="url" value={form.logo_url} onChange={e => set('logo_url', e.target.value)} style={inputStyle} onFocus={e => Object.assign(e.target.style, focusStyle)} onBlur={e => Object.assign(e.target.style, blurStyle)} placeholder="https://..." />
          </FormField>
          <FormField label="Beschrijving" full>
            <textarea value={form.beschrijving} onChange={e => set('beschrijving', e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} onFocus={e => Object.assign(e.target.style, focusStyle)} onBlur={e => Object.assign(e.target.style, blurStyle)} />
          </FormField>
          <FormField label="Prijsinfo">
            <input type="text" value={form.prijs_info} onChange={e => set('prijs_info', e.target.value)} style={inputStyle} onFocus={e => Object.assign(e.target.style, focusStyle)} onBlur={e => Object.assign(e.target.style, blurStyle)} />
          </FormField>
          <FormField label="GDPR-status">
            <select value={form.gdpr_status} onChange={e => set('gdpr_status', e.target.value)} style={inputStyle} onFocus={e => Object.assign(e.target.style, focusStyle)} onBlur={e => Object.assign(e.target.style, blurStyle)}>
              {GDPR_OPTIES.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </FormField>
          <FormField label="GDPR-toelichting" full>
            <textarea value={form.gdpr_toelichting} onChange={e => set('gdpr_toelichting', e.target.value)} rows={2} style={{ ...inputStyle, resize: 'vertical' }} onFocus={e => Object.assign(e.target.style, focusStyle)} onBlur={e => Object.assign(e.target.style, blurStyle)} />
          </FormField>
          <FormField label="Use cases (komma-gescheiden)" full>
            <input type="text" value={form.use_cases} onChange={e => set('use_cases', e.target.value)} style={inputStyle} onFocus={e => Object.assign(e.target.style, focusStyle)} onBlur={e => Object.assign(e.target.style, blurStyle)} placeholder="Lesvoorbereiding, Samenvatten, ..." />
          </FormField>
          <div style={{ gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            {[
              { key: 'gratis',         label: 'Gratis beschikbaar' },
              { key: 'voor_leerkracht', label: 'Voor leerkrachten' },
              { key: 'voor_leerling',   label: 'Voor leerlingen' },
              { key: 'actief',          label: 'Zichtbaar (actief)' },
            ].map(({ key, label }) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, color: '#446677', fontFamily: 'Manrope, sans-serif' }}>
                <input type="checkbox" checked={!!form[key]} onChange={e => set(key, e.target.checked)} style={{ width: 16, height: 16, accentColor: '#005577' }} />
                {label}
              </label>
            ))}
          </div>
        </div>
        {message && (
          <p style={{ marginTop: 16, fontSize: 14, color: message.startsWith('Fout') ? '#b91c1c' : '#15803d', fontFamily: 'Manrope, sans-serif' }}>
            {message}
          </p>
        )}
        <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
          <button
            onClick={() => onSave(form)}
            disabled={saving || !form.naam}
            style={{ padding: '10px 24px', background: 'linear-gradient(90deg, #005577, #0077aa)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: saving || !form.naam ? 'not-allowed' : 'pointer', opacity: saving || !form.naam ? 0.6 : 1, fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.04em' }}
          >
            {saving ? 'Opslaan\u2026' : 'Opslaan'}
          </button>
          <button
            onClick={onCancel}
            style={{ padding: '10px 24px', background: 'transparent', color: '#446677', border: '1px solid rgba(141,209,245,0.4)', borderRadius: 8, fontSize: 14, cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}
          >
            Annuleren
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false)
  const [email, setEmail]                 = useState('')
  const [password, setPassword]           = useState('')
  const [authError, setAuthError]         = useState('')
  const [authLoading, setAuthLoading]     = useState(false)
  const [tools, setTools]                 = useState([])
  const [loading, setLoading]             = useState(false)
  const [editing, setEditing]             = useState(null)
  const [saving, setSaving]               = useState(false)
  const [message, setMessage]             = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setAuthenticated(true)
    })
  }, [])

  useEffect(() => {
    if (authenticated) fetchTools()
  }, [authenticated])

  async function fetchTools() {
    setLoading(true)
    const { data } = await supabase.from('ai_tools').select('*').order('naam')
    setTools(data || [])
    setLoading(false)
  }

  async function handleLogin(e) {
    e.preventDefault()
    setAuthLoading(true)
    setAuthError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setAuthLoading(false)
    if (error) {
      setAuthError('Ongeldig e-mailadres of wachtwoord.')
    } else {
      setAuthenticated(true)
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setAuthenticated(false)
  }

  async function saveTool(formData) {
    setSaving(true)
    setMessage('')
    const { id, aangemaakt_op, ...fields } = formData
    const payload = {
      ...fields,
      use_cases: typeof fields.use_cases === 'string'
        ? fields.use_cases.split(',').map(s => s.trim()).filter(Boolean)
        : (fields.use_cases || []),
    }
    const { error } = id
      ? await supabase.from('ai_tools').update(payload).eq('id', id)
      : await supabase.from('ai_tools').insert(payload)
    setSaving(false)
    if (error) {
      setMessage('Fout: ' + error.message)
    } else {
      setMessage(id ? 'Tool bijgewerkt!' : 'Tool toegevoegd!')
      setEditing(null)
      await fetchTools()
    }
  }

  async function toggleActief(tool) {
    await supabase.from('ai_tools').update({ actief: !tool.actief }).eq('id', tool.id)
    await fetchTools()
  }

  /* ---- Login scherm ---- */
  if (!authenticated) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #002233 0%, #005577 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <div style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)', border: '1px solid rgba(141,209,245,0.35)', borderRadius: 24, padding: 40, width: '100%', maxWidth: 380, boxShadow: '0 24px 64px rgba(0,34,51,0.35)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #005577, #8dd1f5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 28, color: '#fff' }}>hub</span>
            </div>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#002233', textAlign: 'center', margin: 0, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            Beheerdersomgeving
          </h1>
          <p style={{ fontSize: 13, color: '#446677', textAlign: 'center', marginTop: 4, marginBottom: 28, fontFamily: '"Space Grotesk", sans-serif', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            AI Hub — Miniemeninstituut Leuven
          </p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#8dd1f5', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: '"Space Grotesk", sans-serif' }}>
                E-mailadres
              </label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoFocus style={{ ...inputStyle, display: 'block' }} onFocus={e => Object.assign(e.target.style, focusStyle)} onBlur={e => Object.assign(e.target.style, blurStyle)} placeholder="admin@school.be" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#8dd1f5', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: '"Space Grotesk", sans-serif' }}>
                Wachtwoord
              </label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ ...inputStyle, display: 'block' }} onFocus={e => Object.assign(e.target.style, focusStyle)} onBlur={e => Object.assign(e.target.style, blurStyle)} />
            </div>
            {authError && <p style={{ fontSize: 13, color: '#b91c1c', margin: 0, fontFamily: 'Manrope, sans-serif' }}>{authError}</p>}
            <button
              type="submit"
              disabled={authLoading}
              style={{ padding: '12px 0', background: 'linear-gradient(90deg, #005577, #0077aa)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: 'pointer', opacity: authLoading ? 0.7 : 1, fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'opacity 0.15s' }}
            >
              {authLoading ? 'Aanmelden\u2026' : 'Aanmelden'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  /* ---- Admin dashboard ---- */
  return (
    <div style={{ minHeight: '100vh', background: '#f0f9ff' }}>
      <header style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(141,209,245,0.25)', boxShadow: '0 2px 12px rgba(0,85,119,0.06)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #005577, #8dd1f5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#fff' }}>hub</span>
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: '#002233', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Admin — AI Hub</p>
              <p style={{ margin: 0, fontSize: 12, color: '#446677', fontFamily: '"Space Grotesk", sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Miniemeninstituut Leuven</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a href="/" style={{ fontSize: 13, color: '#005577', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 15 }}>arrow_back</span>
              Publieke weergave
            </a>
            <button
              onClick={handleLogout}
              style={{ fontSize: 13, color: '#446677', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Manrope, sans-serif', transition: 'color 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#b91c1c' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#446677' }}
            >
              Afmelden
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '32px 16px' }}>
        {editing ? (
          <ToolForm tool={editing} onSave={saveTool} onCancel={() => { setEditing(null); setMessage('') }} saving={saving} message={message} />
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#002233', margin: 0, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                Alle tools ({tools.length})
              </h2>
              <button
                onClick={() => { setEditing(EMPTY_TOOL); setMessage('') }}
                style={{ padding: '9px 18px', background: 'linear-gradient(90deg, #005577, #0077aa)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.04em' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
                Tool toevoegen
              </button>
            </div>

            {message && !editing && (
              <div style={{ marginBottom: 16, padding: '12px 16px', borderRadius: 10, fontSize: 14, background: 'rgba(21,128,61,0.08)', color: '#15803d', border: '1px solid #bbf7d0', fontFamily: 'Manrope, sans-serif' }}>
                {message}
              </div>
            )}

            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 0' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', border: '4px solid rgba(141,209,245,0.3)', borderTopColor: '#005577', animation: 'spin 0.8s linear infinite' }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {tools.map(tool => (
                  <div
                    key={tool.id}
                    style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(141,209,245,0.35)', borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 16, opacity: tool.actief ? 1 : 0.55, boxShadow: '0 2px 8px rgba(0,85,119,0.06)', transition: 'box-shadow 0.15s' }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 600, fontSize: 15, color: '#002233', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{tool.naam}</span>
                        <span style={{ padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 600, background: 'rgba(0,85,119,0.08)', color: '#005577', border: '1px solid rgba(0,85,119,0.15)', fontFamily: '"Space Grotesk", sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{tool.categorie}</span>
                        {!tool.actief && <span style={{ padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 600, backgroundColor: '#f3f4f6', color: '#6b7280', fontFamily: '"Space Grotesk", sans-serif' }}>verborgen</span>}
                      </div>
                      <p style={{ margin: '3px 0 0', fontSize: 13, color: '#446677', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'Manrope, sans-serif' }}>{tool.beschrijving}</p>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                      <button
                        onClick={() => { setEditing(tool); setMessage('') }}
                        style={{ padding: '7px 14px', fontSize: 13, border: '1px solid rgba(141,209,245,0.4)', borderRadius: 8, backgroundColor: 'transparent', color: '#446677', cursor: 'pointer', fontFamily: 'Manrope, sans-serif', transition: 'all 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#005577'; e.currentTarget.style.color = '#005577' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(141,209,245,0.4)'; e.currentTarget.style.color = '#446677' }}
                      >
                        Bewerken
                      </button>
                      <button
                        onClick={() => toggleActief(tool)}
                        style={{ padding: '7px 14px', fontSize: 13, border: `1px solid ${tool.actief ? 'rgba(141,209,245,0.4)' : '#bbf7d0'}`, borderRadius: 8, backgroundColor: 'transparent', color: tool.actief ? '#446677' : '#15803d', cursor: 'pointer', fontFamily: 'Manrope, sans-serif', transition: 'all 0.15s' }}
                      >
                        {tool.actief ? 'Verbergen' : 'Tonen'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
