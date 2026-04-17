const SECTIONS = [
  {
    title: 'Zo gebruik je AI als leerkracht',
    icon: 'school',
    items: [
      {
        title: 'Start met een duidelijke opdracht',
        text: 'Geef altijd context: je vak, het niveau van je leerlingen en wat je exact nodig hebt. Hoe specifieker de vraag, hoe beter het resultaat.',
      },
      {
        title: 'Gebruik AI als assistent, niet als vervanger',
        text: 'AI maakt een eerste versie \u2014 jij verfijnt die met jouw expertise. Controleer altijd de inhoud op correctheid voor je ze gebruikt.',
      },
      {
        title: 'Bewaar goede prompts als sjabloon',
        text: 'Sla effectieve opdrachten op in Word of OneNote zodat je ze snel hergebruikt voor vergelijkbare taken.',
      },
      {
        title: 'Vraag meerdere varianten',
        text: 'Laat AI de tekst of oefening op verschillende niveaus genereren (makkelijker/moeilijker, formeel/informeel) en kies de beste versie.',
      },
      {
        title: 'AI helpt bij differentiatie',
        text: 'Vraag dezelfde leerstof op meerdere niveaus: vereenvoudigd Nederlands, extra herhaling, of verrijking voor snelle leerlingen.',
      },
    ],
  },
  {
    title: 'GDPR \u2014 wat mag en wat niet?',
    icon: 'lock',
    items: [
      {
        title: 'Geen namen of persoonsgegevens invoeren',
        text: 'Typ nooit de naam, klas, adres of andere identificerende gegevens van een leerling in een AI-tool. Anonimiseer altijd.',
      },
      {
        title: 'Schoolaccount = veiliger',
        text: 'Microsoft Copilot via je schoolaccount verwerkt data in de EU-tenant van de school. Voor andere tools geldt dit niet automatisch.',
      },
      {
        title: 'Schakel geheugen uit bij Google en ChatGPT',
        text: 'Bij Google Gemini en ChatGPT kun je het geheugen uitschakelen zodat jouw gesprekken niet worden bewaard voor modeltraining.',
      },
      {
        title: 'Leerlingenwerk = privacygevoelig',
        text: 'Laat leerlingen geen persoonlijk werk invoeren in niet-goedgekeurde tools. Gebruik schooltools of geanonimiseerde teksten.',
      },
      {
        title: 'Bij twijfel: vraag de ICT-co\u00f6rdinator',
        text: 'De school heeft GDPR-afspraken. Raadpleeg de ICT-co\u00f6rdinator voor gebruik van een nieuwe tool die nog niet beoordeeld is.',
      },
    ],
  },
  {
    title: 'AI en inclusie \u2014 zo help je leerlingen met zorgnoden',
    icon: 'diversity_3',
    items: [
      {
        title: 'Teksten vereenvoudigen voor leerlingen met leesproblemen',
        text: 'Plak een moeilijke tekst en vraag AI om een versie in \u201cklare taal\u201d of \u201cB1-niveau Nederlands\u201d.',
      },
      {
        title: 'Alternatieve uitleg op maat',
        text: 'Vraag AI om een concept op 5 manieren uit te leggen: met analogie, concreet voorbeeld, stap-voor-stap, visueel beschreven, \u2026',
      },
      {
        title: 'Gepersonaliseerde oefeningen voor extra ondersteuning',
        text: 'Beschrijf het type oefening en het leerlingniveau (geanonimiseerd) \u2014 AI genereert maatwerkoefeningen in seconden.',
      },
      {
        title: 'Visuele ondersteuning bij moeilijke begrippen',
        text: 'Gebruik Canva AI of Adobe Firefly om ondersteunende beelden te maken bij instructies of abstracte begrippen.',
      },
      {
        title: 'Meertalige leerlingen ondersteunen',
        text: 'AI kan uitleg geven in de moedertaal van een leerling naast het Nederlands, wat begrip aanzienlijk kan versnellen.',
      },
    ],
  },
]

function Section({ title, icon, items }) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, #005577, #8dd1f5)' }}
        >
          <span className="material-symbols-outlined text-white" style={{ fontSize: 18 }}>{icon}</span>
        </div>
        <h2 className="text-lg font-bold font-headline" style={{ color: '#002233' }}>{title}</h2>
      </div>
      <div className="space-y-3">
        {items.map((tip, i) => (
          <div
            key={i}
            className="glass-card rounded-xl p-4 transition-all"
          >
            <h3 className="font-semibold text-sm mb-1 font-headline" style={{ color: '#002233' }}>
              {tip.title}
            </h3>
            <p className="text-sm leading-relaxed font-body" style={{ color: '#446677' }}>
              {tip.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function TabTips() {
  return (
    <div className="space-y-10">
      {SECTIONS.map((s, i) => (
        <div key={s.title}>
          {i > 0 && (
            <div style={{ borderTop: '1px solid rgba(141,209,245,0.2)', marginBottom: '2.5rem' }} />
          )}
          <Section title={s.title} icon={s.icon} items={s.items} />
        </div>
      ))}
    </div>
  )
}
