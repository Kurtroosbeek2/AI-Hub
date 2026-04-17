const SECTIONS = [
  {
    title: 'Zo gebruik je AI als leerkracht',
    icon: '\ud83e\uddd1\u200d\ud83c\udfeb',
    items: [
      {
        title: 'Start met een duidelijke opdracht',
        text: 'Geef altijd context: je vak, het niveau van je leerlingen en wat je exact nodig hebt. Hoe specifieker de vraag, hoe beter het resultaat.',
      },
      {
        title: 'Gebruik AI als assistent, niet als vervanger',
        text: 'AI maakt een eerste versie — jij verfijnt die met jouw expertise. Controleer altijd de inhoud op correctheid voor je ze gebruikt.',
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
    title: 'GDPR — wat mag en wat niet?',
    icon: '\ud83d\udd12',
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
        title: 'Bij twijfel: vraag de ICT-coördinator',
        text: 'De school heeft GDPR-afspraken. Raadpleeg de ICT-coördinator voor gebruik van een nieuwe tool die nog niet beoordeeld is.',
      },
    ],
  },
  {
    title: 'AI en inclusie — zo help je leerlingen met zorgnoden',
    icon: '\ud83e\udd1d',
    items: [
      {
        title: 'Teksten vereenvoudigen voor leerlingen met leesproblemen',
        text: 'Plak een moeilijke tekst en vraag AI om een versie in “klare taal” of “B1-niveau Nederlands”.',
      },
      {
        title: 'Alternatieve uitleg op maat',
        text: 'Vraag AI om een concept op 5 manieren uit te leggen: met analogie, concreet voorbeeld, stap-voor-stap, visueel beschreven, …',
      },
      {
        title: 'Gepersonaliseerde oefeningen voor extra ondersteuning',
        text: 'Beschrijf het type oefening en het leerlingniveau (geanonimiseerd) — AI genereert maatwerkoefeningen in seconden.',
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
        <span className="text-2xl" aria-hidden="true">{icon}</span>
        <h2 className="text-lg font-bold" style={{ color: '#1e1f2e' }}>{title}</h2>
      </div>
      <div className="space-y-3">
        {items.map((tip, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-4"
            style={{ border: '1px solid #e2e4ea', boxShadow: '0 1px 3px rgb(0 0 0 / 0.04)' }}
          >
            <h3 className="font-semibold text-sm mb-1" style={{ color: '#1e1f2e' }}>
              {tip.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#4b5166' }}>
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
        <>
          {i > 0 && (
            <div style={{ borderTop: '1px solid #e2e4ea' }} />
          )}
          <Section key={s.title} title={s.title} icon={s.icon} items={s.items} />
        </>
      ))}
    </div>
  )
}
