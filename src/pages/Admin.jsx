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

const inputCls = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid #e2e4ea',
  borderRadius: 8,
  fontSize: 14,
  color: '#1e1f2e',
  backgroundColor: '#fff',
  outline: 'none',
}

function FormField({ label, children, full }) {
  return (
    <div style={{ gridColumn: full ? '1 / -1' : undefined }}>
      <label
        style={{
          display: 'block',
          fontSize: 13,
          fontWeight: 600,
          color: '#1e1f2e',
          marginBottom: 6,
        }}
      >
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
          style={{ fontSize: 14, color: '#6d3aed', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          ← Terug
        </button>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1e1f2e', margin: 0 }}>
          {tool.id ? 'Tool bewerken' : 'Nieuwe tool toevoegen'}
        </h2>
      </div>

      <div style={{ backgroundColor: '#fff', border: '1px solid #e2e4ea', borderRadius: 16, padding: 24, boxShadow: '0 1px 4px rgb(0 0 0 / 0.05)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          <FormField label="Naam *">
            <input type="text" value={form.naam} onChange={e => set('naam', e.target.value)} required style={inputCls} onFocus={e => { e.target.style.borderColor = '#6d3aed' }} onBlur={e => { e.target.style.borderColor = '#e2e4ea' }} />
          </FormField>
          <FormField label="Categorie">
            <select value={form.categorie} onChange={e => set('categorie', e.target.value)} style={inputCls}>
              {CATEGORIEEN.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </FormField>
          <FormField label="Website URL">
            <input type="url" value={form.website_url} onChange={e => set('website_url', e.target.value)} style={inputCls} onFocus={e => { e.target.style.borderColor = '#6d3aed' }} onBlur={e => { e.target.style.borderColor = '#e2e4ea' }} placeholder="https://..." />
          </FormField>
          <FormField label="Logo URL">
            <input type="url" value={form.logo_url} onChange={e => set('logo_url', e.target.value)} style={inputCls} onFocus={e => { e.target.style.borderColor = '#6d3aed' }} onBlur={e => { e.target.style.borderColor = '#e2e4ea' }} placeholder="https://..." />
          </FormField>
          <FormField label="Beschrijving" full>
            <textarea value={form.beschrijving} onChange={e => set('beschrijving', e.target.value)} rows={3} style={{ ...inputCls, resize: 'vertical' }} onFocus={e => { e.target.style.borderColor = '#6d3aed' }} onBlur={e => { e.target.style.borderColor = '#e2e4ea' }} />
          </FormField>
          <FormField label="Prijsinfo">
            <input type="text" value={form.prijs_info} onChange={e => set('prijs_info', e.target.value)} style={inputCls} onFocus={e => { e.target.style.borderColor = '#6d3aed' }} onBlur={e => { e.target.style.borderColor = '#e2e4ea' }} />
          </FormField>
          <FormField label="GDPR-status">
            <select value={form.gdpr_status} onChange={e => set('gdpr_status', e.target.value)} style={inputCls}>
              {GDPR_OPTIES.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </FormField>
          <FormField label="GDPR-toelichting" full>
            <textarea value={form.gdpr_toelichting} onChange={e => set('gdpr_toelichting', e.target.value)} rows={2} style={{ ...inputCls, resize: 'vertical' }} onFocus={e => { e.target.style.borderColor = '#6d3aed' }} onBlur={e => { e.target.style.borderColor = '#e2e4ea' }} />
          </FormField>
          <FormField label="Use cases (komma-gescheiden)" full>
            <input type="text" value={form.use_cases} onChange={e => set('use_cases', e.target.value)} style={inputCls} onFocus={e => { e.target.style.borderColor = '#6d3aed' }} onBlur={e => { e.target.style.borderColor = '#e2e4ea' }} placeholder="Lesvoorbereiding, Samenvatten, ..." />
          </FormField>
          <div style={{ gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            {[{ key: 'gratis', label: 'Gratis beschikbaar' }, { key: 'voor_leerkracht', label: 'Voor leerkrachten' }, { key: 'voor_leerling', label: 'Voor leerlingen' }, { key: 'actief', label: 'Zichtbaar (actief)' }].map(({ key, label }) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, color: '#4b5166' }}>
                <input type="checkbox" checked={!!form[key]} onChange={e => set(key, e.target.checked)} style={{ width: 16, height: 16, accentColor: '#6d3aed' }} />
                {label}
              </label>
            ))}
          </div>
        </div>
        {message && <p style={{ marginTop: 16, fontSize: 14, color: message.startsWith('Fout') ? '#b91c1c' : '#15803d' }}>{message}</p>}
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <button onClick={() => onSave(form)} disabled={saving || !form.naam} style={{ padding: '10px 24px', backgroundColor: '#6d3aed', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: saving || !form.naam ? 'not-allowed' : 'pointer', opacity: saving || !form.naam ? 0.6 : 1 }}>
            {saving ? 'Opslaan…' : 'Opslaan'}
          </button>
          <button onClick={onCancel} style={{ padding: '10px 24px', backgroundColor: '#fff', color: '#4b5166', border: '1px solid #e2e4ea', borderRadius: 8, fontSize: 14, cursor: 'pointer' }}>Annuleren</button>
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
      <div style={{ minHeight: '100vh', backgroundColor: '#f4f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <div style={{ backgroundColor: '#fff', border: '1px solid #e2e4ea', borderRadius: 20, padding: 36, width: '100%', maxWidth: 380, boxShadow: '0 4px 20px rgb(0 0 0 / 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(135deg, #6d3aed, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 16 }}>AI</div>
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#1e1f2e', textAlign: 'center', margin: 0 }}>Beheerdersomgeving</h1>
          <p style={{ fontSize: 13, color: '#8b90a7', textAlign: 'center', marginTop: 4, marginBottom: 24 }}>AI Tools — Miniemeninstituut Leuven</p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1e1f2e', marginBottom: 6 }}>E-mailadres</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoFocus style={{ ...inputCls, display: 'block' }} onFocus={e => { e.target.style.borderColor = '#6d3aed' }} onBlur={e => { e.target.style.borderColor = '#e2e4ea' }} placeholder="admin@school.be" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1e1f2e', marginBottom: 6 }}>Wachtwoord</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ ...inputCls, display: 'block' }} onFocus={e => { e.target.style.borderColor = '#6d3aed' }} onBlur={e => { e.target.style.borderColor = '#e2e4ea' }} />
            </div>
            {authError && <p style={{ fontSize: 13, color: '#b91c1c', margin: 0 }}>{authError}</p>}
            <button type="submit" disabled={authLoading} style={{ padding: '11px 0', backgroundColor: '#6d3aed', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: 'pointer', opacity: authLoading ? 0.7 : 1 }}>
              {authLoading ? 'Aanmelden…' : 'Aanmelden'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  /* ---- Admin dashboard ---- */
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f5f7' }}>
      <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #e2e4ea', boxShadow: '0 1px 4px rgb(0 0 0 / 0.06)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg, #6d3aed, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 12 }}>AI</div>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: '#1e1f2e' }}>Admin — AI Tools</p>
              <p style={{ margin: 0, fontSize: 12, color: '#8b90a7' }}>Miniemeninstituut Leuven</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a href="/" style={{ fontSize: 13, color: '#6d3aed', textDecoration: 'none' }}>← Publieke weergave</a>
            <button onClick={handleLogout} style={{ fontSize: 13, color: '#8b90a7', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.color = '#b91c1c' }} onMouseLeave={e => { e.currentTarget.style.color = '#8b90a7' }}>Afmelden</button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '32px 16px' }}>
        {editing ? (
          <ToolForm tool={editing} onSave={saveTool} onCancel={() => { setEditing(null); setMessage('') }} saving={saving} message={message} />
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1e1f2e', margin: 0 }}>Alle tools ({tools.length})</h2>
              <button onClick={() => { setEditing(EMPTY_TOOL); setMessage('') }} style={{ padding: '9px 18px', backgroundColor: '#6d3aed', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>+ Tool toevoegen</button>
            </div>
            {message && !editing && (
              <div style={{ marginBottom: 16, padding: '12px 16px', borderRadius: 10, fontSize: 14, backgroundColor: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }}>{message}</div>
            )}
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 0' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', border: '4px solid #ede9fe', borderTopColor: '#6d3aed', animation: 'spin 0.8s linear infinite' }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {tools.map(tool => (
                  <div key={tool.id} style={{ backgroundColor: '#fff', border: '1px solid #e2e4ea', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 16, opacity: tool.actief ? 1 : 0.55, boxShadow: '0 1px 3px rgb(0 0 0 / 0.04)' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 600, fontSize: 15, color: '#1e1f2e' }}>{tool.naam}</span>
                        <span style={{ padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 600, backgroundColor: '#ede9fe', color: '#6d3aed' }}>{tool.categorie}</span>
                        {!tool.actief && <span style={{ padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 600, backgroundColor: '#f3f4f6', color: '#6b7280' }}>verborgen</span>}
                      </div>
                      <p style={{ margin: '3px 0 0', fontSize: 13, color: '#8b90a7', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tool.beschrijving}</p>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                      <button onClick={() => { setEditing(tool); setMessage('') }} style={{ padding: '7px 14px', fontSize: 13, border: '1px solid #e2e4ea', borderRadius: 8, backgroundColor: '#fff', color: '#4b5166', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#6d3aed'; e.currentTarget.style.color = '#6d3aed' }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e4ea'; e.currentTarget.style.color = '#4b5166' }}>Bewerken</button>
                      <button onClick={() => toggleActief(tool)} style={{ padding: '7px 14px', fontSize: 13, border: `1px solid ${tool.actief ? '#e2e4ea' : '#bbf7d0'}`, borderRadius: 8, backgroundColor: '#fff', color: tool.actief ? '#8b90a7' : '#15803d', cursor: 'pointer' }}>{tool.actief ? 'Verbergen' : 'Tonen'}</button>
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
