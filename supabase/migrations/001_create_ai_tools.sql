-- ============================================================
-- AI Tools Database — Miniemeninstituut Leuven
-- Plak dit volledig in de Supabase SQL Editor en klik RUN
-- ============================================================

-- 1. Tabel aanmaken
CREATE TABLE IF NOT EXISTS ai_tools (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  naam             TEXT        NOT NULL,
  logo_url         TEXT,
  beschrijving     TEXT,
  website_url      TEXT,
  gratis           BOOLEAN     DEFAULT false,
  prijs_info       TEXT,
  voor_leerkracht  BOOLEAN     DEFAULT false,
  voor_leerling    BOOLEAN     DEFAULT false,
  gdpr_status      TEXT        CHECK (gdpr_status IN ('OK', 'Opgelet', 'Niet aanbevolen')),
  gdpr_toelichting TEXT,
  use_cases        TEXT[]      DEFAULT '{}',
  categorie        TEXT,
  actief           BOOLEAN     DEFAULT true,
  aangemaakt_op    TIMESTAMPTZ DEFAULT now()
);

-- 2. Unieke naam (zodat seed idempotent is bij heruitvoering)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'ai_tools_naam_key'
  ) THEN
    ALTER TABLE ai_tools ADD CONSTRAINT ai_tools_naam_key UNIQUE (naam);
  END IF;
END $$;

-- 3. Row Level Security
ALTER TABLE ai_tools ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read" ON ai_tools;
CREATE POLICY "anon_read" ON ai_tools
  FOR SELECT TO anon
  USING (true);

-- 4. Seed data (ON CONFLICT zorgt dat heruitvoering veilig is)
INSERT INTO ai_tools
  (naam, beschrijving, website_url, gratis, prijs_info,
   voor_leerkracht, voor_leerling,
   gdpr_status, gdpr_toelichting, use_cases, categorie)
VALUES
  (
    'ChatGPT',
    'Krachtige AI-chatbot van OpenAI voor tekst genereren, vragen beantwoorden, samenvatten en meer. Breed inzetbaar voor leerkrachten én leerlingen.',
    'https://chatgpt.com',
    true, 'Gratis / Plus $20/maand',
    true, true,
    'Opgelet',
    'Data wordt verwerkt buiten de EU. Opt-out voor trainingsdata is mogelijk via accountinstellingen.',
    ARRAY['Lesvoorbereiding','Teksten schrijven','Vragen beantwoorden','Samenvatten','Differentiatie'],
    'Tekstgeneratie'
  ),
  (
    'Microsoft Copilot',
    'AI-assistent van Microsoft, geïntegreerd in het Microsoft 365 schoolaccount. Veiligste keuze voor schoolgebruik dankzij EU-dataverwerking.',
    'https://copilot.microsoft.com',
    true, 'Gratis via schoolaccount',
    true, true,
    'OK',
    'Schoolaccount garandeert dataverwerking in de EU-tenant. Geen training op schooldata.',
    ARRAY['Lesvoorbereiding','E-mails schrijven','Documenten samenvatten','Teams-integratie','Presentaties'],
    'Tekstgeneratie'
  ),
  (
    'Google Gemini',
    'AI-assistent van Google met brede mogelijkheden voor tekst, analyse en creatief werk. Integratie met Google Workspace.',
    'https://gemini.google.com',
    true, 'Gratis / Advanced €22/maand',
    true, true,
    'Opgelet',
    'Standaard is geheugen actief; dit is uitschakelbaar in de instellingen. Gebruik bij voorkeur met schoolaccount.',
    ARRAY['Teksten schrijven','Onderzoek','Google Docs integratie','Samenvatten','Vertalen'],
    'Tekstgeneratie'
  ),
  (
    'NotebookLM',
    'AI-tool van Google om eigen documenten en bronnen te analyseren en samen te vatten. Ideaal voor onderzoek met specifieke bronnen.',
    'https://notebooklm.google.com',
    true, 'Gratis',
    true, true,
    'Opgelet',
    'Google-dienst met beperkte EU-garanties. Gebruik geen gevoelige leerlingdata.',
    ARRAY['Bronnen samenvatten','Onderzoeksondersteuning','Vragen stellen over teksten','Leermateriaal verwerken'],
    'Onderzoek'
  ),
  (
    'Adobe Firefly',
    'AI-beeldgenerator van Adobe, getraind op gelicentieerde content. Veilig voor gebruik in schoolcontext zonder auteursrechtproblemen.',
    'https://firefly.adobe.com',
    true, 'Gratis (maandelijkse credits) / Creative Cloud',
    true, false,
    'OK',
    'Europese dataverwerking, getraind op gelicentieerde beelden. Geen auteursrechtproblemen.',
    ARRAY['Afbeeldingen genereren','Illustraties voor lessen','Creatieve projecten','Visueel leermateriaal'],
    'Beeldgeneratie'
  ),
  (
    'HeyGen',
    'AI-videotool waarmee je realistische AI-avatars kunt inzetten voor uitlegvideo\'s. Maak gepersonaliseerde videolessen zonder camera.',
    'https://heygen.com',
    true, 'Gratis (1 min/maand) / Pro $29/maand',
    true, false,
    'Opgelet',
    'Servers in de VS. Geen leerlingdata verwerken. Enkel voor leerkrachten-content.',
    ARRAY['Uitlegvideo\'s maken','Gepersonaliseerde lessen','Meertalige content','Avatar-presentaties'],
    'Video'
  ),
  (
    'Canva AI',
    'AI-functies geïntegreerd in Canva: afbeeldingen genereren, teksten schrijven, presentaties opmaken. Gebruiksvriendelijk voor leerkrachten én leerlingen.',
    'https://canva.com',
    true, 'Gratis / Pro €13/maand',
    true, true,
    'Opgelet',
    'Australisch bedrijf met EU-verwerkingsopties. Controleer privacy-instellingen bij schoolgebruik.',
    ARRAY['Visueel leermateriaal','Presentaties','Posters en affiches','Afbeeldingen genereren','Sociale media'],
    'Beeldgeneratie'
  ),
  (
    'Claude',
    'AI-assistent van Anthropic, bekend om genuanceerde antwoorden en sterk redeneren. Geen training op gebruikersdata bij de gratis versie.',
    'https://claude.ai',
    true, 'Gratis / Pro $20/maand',
    true, true,
    'Opgelet',
    'Servers in de VS, maar Anthropic gebruikt geen conversatiedata voor training. Transparant privacybeleid.',
    ARRAY['Teksten schrijven','Complexe vragen','Code uitleggen','Analyseren','Lesmateriaal opstellen'],
    'Tekstgeneratie'
  )
ON CONFLICT (naam) DO NOTHING;

-- 5. Controleer resultaat
SELECT naam, categorie, gdpr_status, actief FROM ai_tools ORDER BY naam;
