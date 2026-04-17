import { useState } from 'react'
import Header from '../components/Header'
import TabAlleTools from './TabAlleTools'
import TabBeslishulp from './TabBeslishulp'
import TabTips from './TabTips'

const TABS = [
  { id: 'tools',      label: 'Alle tools',           icon: 'grid_view' },
  { id: 'beslishulp', label: 'Welke tool gebruik ik?', icon: 'help_outline' },
  { id: 'tips',       label: 'Tips voor gebruik',    icon: 'lightbulb' },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('tools')

  return (
    <div className="min-h-screen">
      <Header />

      {/* Sticky tab bar */}
      <div
        className="sticky top-0 z-10"
        style={{
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(141,209,245,0.25)',
          boxShadow: '0 2px 12px rgba(0,85,119,0.06)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex" role="tablist" aria-label="Navigatietabbladen">
            {TABS.map(tab => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-1.5 px-4 py-3.5 text-sm font-semibold transition-all border-b-2 -mb-px font-label uppercase tracking-wide"
                style={{
                  borderBottomColor: activeTab === tab.id ? '#005577' : 'transparent',
                  color: activeTab === tab.id ? '#005577' : '#446677',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.id === 'tools' ? 'Tools' : tab.id === 'beslishulp' ? 'Gids' : 'Tips'}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'tools'      && <TabAlleTools />}
        {activeTab === 'beslishulp' && <TabBeslishulp />}
        {activeTab === 'tips'       && <TabTips />}
      </main>
    </div>
  )
}
