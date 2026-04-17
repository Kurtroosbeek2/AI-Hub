import { useState } from 'react'
import Header from '../components/Header'
import TabAlleTools from './TabAlleTools'
import TabBeslishulp from './TabBeslishulp'
import TabTips from './TabTips'

const TABS = [
  { id: 'tools',      label: 'Alle tools' },
  { id: 'beslishulp', label: 'Welke tool gebruik ik?' },
  { id: 'tips',       label: 'Tips voor gebruik' },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('tools')

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f4f5f7' }}>
      <Header />

      {/* Sticky tab bar */}
      <div
        className="sticky top-0 z-10 bg-white"
        style={{ borderBottom: '1px solid #e2e4ea', boxShadow: '0 1px 4px rgb(0 0 0 / 0.06)' }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex" role="tablist" aria-label="Navigatietabbladen">
            {TABS.map(tab => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-5 py-4 text-sm font-medium transition-colors border-b-2 -mb-px"
                style={{
                  borderBottomColor: activeTab === tab.id ? '#6d3aed' : 'transparent',
                  color: activeTab === tab.id ? '#6d3aed' : '#4b5166',
                }}
              >
                {tab.label}
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
