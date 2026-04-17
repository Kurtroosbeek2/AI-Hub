const SITUATIONS = [
  {
    icon: '\u270d\ufe0f',
    vraag: 'Tekst schrijven of aanpassen voor een les?',
    tools: ['Microsoft Copilot', 'ChatGPT', 'Claude'],
    tip: 'Gebruik Copilot via je schoolaccount voor maximale GDPR-veiligheid.',
  },
  {
    icon: '\ud83c\udfa6',
    vraag: 'Een uitlegvideo maken zonder camera?',
    tools: ['HeyGen'],
    tip: 'Maak een AI-avatar die jouw script uitspreekt. Geen cameraschroom nodig.',
  },
  {
    icon: '\ud83d\udcda',
    vraag: 'Bronnen of documenten samenvatten?',
    tools: ['NotebookLM'],
    tip: 'Upload pdf’s of websites en stel vragen over de inhoud.',
  },
  {
    icon: '\ud83c\udfa8',
    vraag: 'Een afbeelding of illustratie genereren?',
    tools: ['Adobe Firefly', 'Canva AI'],
    tip: 'Adobe Firefly is auteursrechtelijk het veiligst voor schoolmateriaal.',
  },
  {
    icon: '\ud83d\udcdd',
    vraag: 'Gepersonaliseerde oefeningen maken voor leerlingen?',
    tools: ['ChatGPT', 'Claude', 'Microsoft Copilot'],
    tip: 'Geef het niveau, de leeftijd en het onderwerp op voor gerichte oefeningen.',
  },
  {
    icon: '\ud83d\udd0d',
    vraag: 'Feedback geven op een leerlingtekst?',
    tools: ['Microsoft Copilot', 'Claude'],
    tip: 'Geef nooit namen of persoonsgegevens van leerlingen in!',
  },
  {
    icon: '\ud83c\udf0d',
    vraag: 'Meertalige uitleg voor anderstalige leerlingen?',
    tools: ['Google Gemini', 'ChatGPT', 'Microsoft Copilot'],
    tip: 'Vraag om dezelfde uitleg in vereenvoudigd Nederlands én andere talen.',
  },
  {
    icon: '\ud83d\uddbc\ufe0f',
    vraag: 'Visueel lesmateriaal of een presentatie maken?',
    tools: ['Canva AI'],
    tip: 'Canva AI combineert ontwerp met AI-functies voor snel resultaat.',
  },
  {
    icon: '\ud83d\udce7',
    vraag: 'Een professionele e-mail of ouderbrief schrijven?',
    tools: ['Microsoft Copilot', 'ChatGPT', 'Claude'],
    tip: 'Geef de toon (formeel/informeel) en de doelgroep mee als context.',
  },
  {
    icon: '\ud83d\udccb',
    vraag: 'Een lesplan of jaarplanning opstellen?',
    tools: ['ChatGPT', 'Microsoft Copilot', 'Claude'],
    tip: 'Vermeld het vak, het leerjaar en de leeruitkomsten voor de beste output.',
  },
]

export default function TabBeslishulp() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-1" style={{ color: '#1e1f2e' }}>
          Welke AI-tool gebruik ik?
        </h2>
        <p style={{ color: '#4b5166' }}>
          Kies je situatie en zie meteen welke tool het meest geschikt is.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SITUATIONS.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-5 transition-colors"
            style={{ border: '1px solid #e2e4ea', boxShadow: '0 1px 3px rgb(0 0 0 / 0.05)' }}
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl leading-none shrink-0" aria-hidden="true">{s.icon}</span>
              <h3 className="font-semibold leading-snug" style={{ color: '#1e1f2e' }}>
                {s.vraag}
              </h3>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {s.tools.map(tool => (
                <span
                  key={tool}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: '#ede9fe', color: '#6d3aed' }}
                >
                  {tool}
                </span>
              ))}
            </div>

            {s.tip && (
              <p
                className="text-xs rounded-lg px-3 py-2 leading-relaxed"
                style={{ backgroundColor: '#f4f5f7', color: '#4b5166' }}
              >
                &#128161; {s.tip}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Gouden regel */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'linear-gradient(135deg, #ede9fe 0%, #e0f2fe 100%)',
          border: '1px solid #c4b5fd',
        }}
      >
        <div className="flex items-start gap-4">
          <span className="text-3xl shrink-0" aria-hidden="true">&#11088;</span>
          <div>
            <h3 className="font-bold text-base mb-2" style={{ color: '#1e1f2e' }}>
              De gouden regel: gebruik Microsoft Copilot via je schoolaccount
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#4b5166' }}>
              Voor dagelijks schoolgebruik is{' '}
              <strong style={{ color: '#1e1f2e' }}>Microsoft Copilot via het schoolaccount</strong>{' '}
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
