import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../lib/supabase'
import ToolCard from '../components/ToolCard'
import ToolModal from '../components/ToolModal'
import FilterBar from '../components/FilterBar'

export default function TabAlleTools() {
  const [tools, setTools]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [selected, setSelected] = useState(null)
  const [filters, setFilters]   = useState({
    zoek: '', doelgroep: '', kostprijs: '', gdpr: '', categorie: '',
  })

  useEffect(() => {
    supabase
      .from('ai_tools')
      .select('*')
      .eq('actief', true)
      .order('naam')
      .then(({ data, error: err }) => {
        if (err) setError(err.message)
        else setTools(data || [])
        setLoading(false)
      })
  }, [])

  const categories = useMemo(
    () => [...new Set(tools.map(t => t.categorie).filter(Boolean))].sort(),
    [tools],
  )

  const filtered = useMemo(() => {
    return tools.filter(t => {
      if (filters.zoek) {
        const q = filters.zoek.toLowerCase()
        const match =
          t.naam?.toLowerCase().includes(q) ||
          t.beschrijving?.toLowerCase().includes(q) ||
          t.categorie?.toLowerCase().includes(q) ||
          t.use_cases?.some(uc => uc.toLowerCase().includes(q))
        if (!match) return false
      }
      if (filters.doelgroep === 'leerkracht' && !t.voor_leerkracht) return false
      if (filters.doelgroep === 'leerling'   && !t.voor_leerling)   return false
      if (filters.doelgroep === 'beiden' && !(t.voor_leerkracht && t.voor_leerling)) return false
      if (filters.kostprijs === 'gratis'   && !t.gratis)  return false
      if (filters.kostprijs === 'betalend' &&  t.gratis)  return false
      if (filters.gdpr      && t.gdpr_status !== filters.gdpr) return false
      if (filters.categorie && t.categorie  !== filters.categorie) return false
      return true
    })
  }, [tools, filters])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20" aria-label="Laden">
        <div
          className="w-10 h-10 rounded-full border-4 animate-spin"
          style={{ borderColor: 'rgba(141,209,245,0.3)', borderTopColor: '#005577' }}
        />
      </div>
    )
  }

  if (error) {
    return (
      <div
        className="glass-card text-center py-16 rounded-2xl px-6"
        style={{ border: '1px solid rgba(239,68,68,0.2)' }}
      >
        <span className="material-symbols-outlined text-4xl mb-3 block" style={{ color: '#b91c1c' }}>error</span>
        <p className="font-semibold font-headline" style={{ color: '#b91c1c' }}>Kon tools niet laden</p>
        <p className="text-sm mt-1 font-body" style={{ color: '#446677' }}>{error}</p>
        <p className="text-sm mt-3 font-body" style={{ color: '#446677', opacity: 0.7 }}>
          Controleer of de Supabase omgevingsvariabelen correct zijn ingesteld.
        </p>
      </div>
    )
  }

  return (
    <div>
      <FilterBar filters={filters} onChange={setFilters} categories={categories} />

      {filtered.length === 0 ? (
        <div className="text-center py-16" style={{ color: '#446677' }}>
          <span className="material-symbols-outlined text-5xl mb-3 block" style={{ color: '#8dd1f5' }}>search_off</span>
          <p className="font-semibold text-lg font-headline" style={{ color: '#002233' }}>Geen tools gevonden</p>
          <p className="text-sm mt-1 font-body">Pas de filters aan om meer resultaten te zien.</p>
        </div>
      ) : (
        <>
          <p className="text-sm mb-4 font-label uppercase tracking-wide" style={{ color: '#8dd1f5' }}>
            {filtered.length} tool{filtered.length !== 1 ? 's' : ''} gevonden
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(tool => (
              <ToolCard key={tool.id} tool={tool} onClick={setSelected} />
            ))}
          </div>
        </>
      )}

      {selected && <ToolModal tool={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
