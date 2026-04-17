const SITUATIONS = [
  {
    icon: 'edit_note',
    vraag: 'Tekst schrijven of aanpassen voor een les?',
    tools: ['Microsoft Copilot', 'ChatGPT', 'Claude'],
    tip: 'Gebruik Copilot via je schoolaccount voor maximale GDPR-veiligheid.',
  },
  {
    icon: 'videocam',
    vraag: 'Een uitlegvideo maken zonder camera?',
    tools: ['HeyGen'],
    tip: 'Maak een AI-avatar die jouw script uitspreekt. Geen cameraschroom nodig.',
  },
  {
    icon: 'menu_book',
    vraag: 'Bronnen of documenten samenvatten?',
    tools: ['NotebookLM'],
    tip: 'Upload pdf\u2019s of websites en stel vragen over de inhoud.',
  },
  {
    icon: 'palette',
    vraag: 'Een afbeelding of illustratie genereren?',
    tools: ['Adobe Firefly', 'Canva AI'],
    tip: 'Adobe Firefly is auteursrechtelijk het veiligst voor schoolmateriaal.',
  },
  {
    icon: 'assignment',
    vraag: 'Gepersonaliseerde oefeningen maken voor leerlingen?',
    tools: ['ChatGPT', 'Claude', 'Microsoft Copilot'],
    tip: 'Geef het niveau, de leeftijd en het onderwerp op voor gerichte oefeningen.',
  },
  {
    icon: 'rate_review',
    vraag: 'Feedback geven op een leerlingtekst?',
    tools: ['Microsoft Copilot', 'Claude'],
    tip: 'Geef nooit namen of persoonsgegevens van leerlingen in!',
  },
  {
    icon: 'translate',
    vraag: 'Meertalige uitleg voor anderstalige leerlingen?',
    tools: ['Google Gemini', 'ChatGPT', 'Microsoft Copilot'],
    tip: 'Vraag om dezelfde uitleg in vereenvoudigd Nederlands \u00e9n andere talen.',
  },
  {
    icon: 'slideshow',
    vraag: 'Visueel lesmateriaal of een presentatie maken?',
    tools: ['Canva AI'],
    tip: 'Canva AI combineert ontwerp met AI-functies voor snel resultaat.',
  },
  {
    icon: 'mail',
    vraag: 'Een professionele e-mail of ouderbrief schrijven?',
    tools: ['Microsoft Copilot', 'ChatGPT', 'Claude'],
    tip: 'Geef de toon (formeel/informeel) en de doelgroep mee als context.',
  },
  {
    icon: 'calendar_month',
    vraag: 'Een lesplan of jaarplanning opstellen?',
    tools: ['ChatGPT', 'Microsoft Copilot', 'Claude'],
    tip: 'Vermeld het vak, het leerjaar en de leeruitkomsten voor de beste output.',
  },
]

export default function TabBeslishulp() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-1 font-headline" style={{ color: '#002233' }}>
          Welke AI-tool gebruik ik?
        </h2>
        <p className="font-body" style={{ color: '#446677' }}>
          Kies je situatie en zie meteen welke tool het meest geschikt is.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SITUATIONS.map((s, i) => (
          <div
            key={i}
            className="glass-card rounded-2xl p-5 transition-all"
            style={{ cursor: 'default' }}
          >
            <div className="flex items-start gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, #005577, #8dd1f5)' }}
              >
                <span className="material-symbols-outlined text-white" style={{ fontSize: 18 }}>{s.icon}</span>
              </div>
              <h3 className="font-semibold leading-snug font-headline" style={{ color: '#002233' }}>
                {s.vraag}
              </h3>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {s.tools.map(tool => (
                <span
                  key={tool}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold font-label"
                  style={{ backgroundColor: 'rgba(0,85,119,0.08)', color: '#005577', border: '1px solid rgba(0,85,119,0.2)' }}
                >
                  {tool}
                </span>
              ))}
            </div>

            {s.tip && (
              <p
                className="text-xs rounded-lg px-3 py-2 leading-relaxed font-body"
                style={{ backgroundColor: 'rgba(141,209,245,0.1)', color: '#446677', border: '1px solid rgba(141,209,245,0.2)' }}
              >
                <span className="material-symbols-outlined align-middle mr-1" style={{ fontSize: 14, color: '#8dd1f5' }}>tips_and_updates</span>
                {s.tip}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Gouden regel */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'linear-gradient(135deg, rgba(0,85,119,0.08) 0%, rgba(141,209,245,0.12) 100%)',
          border: '1px solid rgba(141,209,245,0.3)',
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, #005577, #8dd1f5)' }}
          >
            <span className="material-symbols-outlined text-white" style={{ fontSize: 20 }}>verified</span>
          </div>
          <div>
            <h3 className="font-bold text-base mb-2 font-headline" style={{ color: '#002233' }}>
              De gouden regel: gebruik Microsoft Copilot via je schoolaccount
            </h3>
            <p className="text-sm leading-relaxed font-body" style={{ color: '#446677' }}>
              Voor dagelijks schoolgebruik is{' '}
              <strong style={{ color: '#005577' }}>Microsoft Copilot via het schoolaccount</strong>{' '}
              de veiligste keuze. Data wordt verwerkt in de EU-tenant van de school,
              er is geen training op jouw gegevens, en het is gratis inbegrepen.
              Twijfel je over GDPR-compliance? Gebruik Copilot.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
