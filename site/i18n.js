// Blüten Sturm — copy dictionary. Keys are the English source strings in the template.
export const LANGS = [
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "es", label: "ES" },
  { code: "it", label: "IT" }
];

// order of values: de, fr, es, it   (en = the key itself)
const T = {
  // nav
  "About": ["Über uns", "À propos", "Nosotros", "Chi siamo"],
  "Services": ["Leistungen", "Services", "Servicios", "Servizi"],
  "Work": ["Arbeiten", "Réalisations", "Proyectos", "Lavori"],
  "Academy": ["Akademie", "Académie", "Academia", "Academy"],
  "Let's talk": ["Gespräch starten", "Parlons-en", "Hablemos", "Parliamone"],

  // hero
  "Where brands bloom": ["Wo Marken blühen", "Là où les marques fleurissent", "Donde las marcas florecen", "Dove i brand fioriscono"],
  "and ideas": ["und Ideen", "et où les idées", "y las ideas", "e le idee"],
  "storm": ["stürmen", "déferlent", "arrasan", "esplodono"],
  "Marketing, creative and corporate training from Würzburg — built with the rigour of consultants and the nerve of artists.": [
    "Marketing, Kreation und Weiterbildung aus Würzburg — mit der Präzision von Beratern und dem Mut von Künstlern.",
    "Marketing, création et formation professionnelle depuis Wurtzbourg — la rigueur du conseil, l'audace des artistes.",
    "Marketing, creatividad y formación corporativa desde Wurzburgo — con el rigor de los consultores y el atrevimiento de los artistas.",
    "Marketing, creatività e formazione aziendale da Würzburg — con il rigore dei consulenti e il coraggio degli artisti."
  ],
  "Start a project": ["Projekt starten", "Lancer un projet", "Iniciar un proyecto", "Avvia un progetto"],
  "What we do": ["Was wir tun", "Ce que nous faisons", "Qué hacemos", "Cosa facciamo"],

  // marquee
  "Brand Strategy": ["Markenstrategie", "Stratégie de marque", "Estrategia de marca", "Brand strategy"],
  "Digital Marketing": ["Digitales Marketing", "Marketing digital", "Marketing digital", "Marketing digitale"],
  "Content & Social": ["Content & Social", "Contenu & social", "Contenido y social", "Content & social"],
  "Events & Experience": ["Events & Erlebnis", "Événements & expérience", "Eventos y experiencias", "Eventi & experience"],
  "Corporate Training": ["Unternehmensschulungen", "Formation en entreprise", "Formación corporativa", "Formazione aziendale"],

  // about
  "01 — The agency": ["01 — Die Agentur", "01 — L'agence", "01 — La agencia", "01 — L'agenzia"],
  "Franconian roots.": ["Fränkische Wurzeln.", "Racines franconiennes.", "Raíces franconas.", "Radici francone."],
  "European reach.": ["Europäische Reichweite.", "Portée européenne.", "Alcance europeo.", "Portata europea."],
  "Blüten Sturm was founded in Würzburg — a city of vineyards, baroque stone and stubborn craft. We kept the craft and added velocity. Today we work with Mittelstand leaders, challenger brands and institutions who need marketing that moves markets and teams able to carry it.": [
    "Blüten Sturm wurde in Würzburg gegründet — einer Stadt aus Weinbergen, barockem Stein und eigensinnigem Handwerk. Das Handwerk haben wir behalten und Tempo hinzugefügt. Heute arbeiten wir mit Mittelstandsführern, Challenger-Marken und Institutionen, die Marketing brauchen, das Märkte bewegt — und Teams, die es tragen können.",
    "Blüten Sturm est née à Wurtzbourg — une ville de vignobles, de pierre baroque et d'artisanat obstiné. Nous avons gardé l'artisanat et ajouté la vitesse. Aujourd'hui nous accompagnons des ETI, des marques challengers et des institutions qui veulent un marketing qui déplace les marchés et des équipes capables de le porter.",
    "Blüten Sturm nació en Wurzburgo — una ciudad de viñedos, piedra barroca y oficio tenaz. Conservamos el oficio y le añadimos velocidad. Hoy trabajamos con líderes del Mittelstand, marcas retadoras e instituciones que necesitan un marketing que mueva mercados y equipos capaces de sostenerlo.",
    "Blüten Sturm è nata a Würzburg — una città di vigneti, pietra barocca e artigianato ostinato. Abbiamo tenuto l'artigianato e aggiunto velocità. Oggi lavoriamo con leader del Mittelstand, brand sfidanti e istituzioni che vogliono un marketing capace di muovere i mercati e team in grado di sostenerlo."
  ],
  "One team, three disciplines: creative that gets remembered, strategy that gets signed off, and training that makes it stick inside the organisation.": [
    "Ein Team, drei Disziplinen: Kreation, die im Kopf bleibt, Strategie, die freigegeben wird, und Training, das im Unternehmen verankert.",
    "Une équipe, trois disciplines : une création mémorable, une stratégie validée, et une formation qui l'ancre dans l'organisation.",
    "Un equipo, tres disciplinas: creatividad que se recuerda, estrategia que se aprueba y formación que la fija en la organización.",
    "Un team, tre discipline: creatività che si ricorda, strategia che viene approvata e formazione che la radica nell'organizzazione."
  ],
  "Projects shipped": ["Projekte geliefert", "Projets livrés", "Proyectos entregados", "Progetti realizzati"],
  "Markets": ["Märkte", "Marchés", "Mercados", "Mercati"],
  "Leaders trained": ["Führungskräfte geschult", "Dirigeants formés", "Líderes formados", "Leader formati"],
  "Client retention": ["Kundenbindung", "Fidélisation clients", "Retención de clientes", "Fidelizzazione clienti"],

  // services
  "02 — Services": ["02 — Leistungen", "02 — Services", "02 — Servicios", "02 — Servizi"],
  "Five disciplines,": ["Fünf Disziplinen,", "Cinq disciplines,", "Cinco disciplinas,", "Cinque discipline,"],
  "one operating system.": ["ein Betriebssystem.", "un seul système.", "un solo sistema.", "un solo sistema."],
  "Engage one. Or let us run the whole stack — from positioning workshop to performance dashboard.": [
    "Buchen Sie eine. Oder überlassen Sie uns den gesamten Stack — vom Positionierungs-Workshop bis zum Performance-Dashboard.",
    "Choisissez-en une. Ou confiez-nous l'ensemble — de l'atelier de positionnement au tableau de bord de performance.",
    "Contrate una. O déjenos el conjunto completo — del taller de posicionamiento al panel de rendimiento.",
    "Attivane una. O affidaci l'intero stack — dal workshop di posizionamento alla dashboard di performance."
  ],
  "Brand strategy & positioning": ["Markenstrategie & Positionierung", "Stratégie de marque & positionnement", "Estrategia de marca y posicionamiento", "Brand strategy & posizionamento"],
  "Market and category analysis, brand architecture, naming, verbal and visual identity systems. We find the sharp edge, then build everything around it.": [
    "Markt- und Kategorieanalyse, Markenarchitektur, Naming, verbale und visuelle Identitätssysteme. Wir finden die scharfe Kante — und bauen alles darum herum.",
    "Analyse de marché et de catégorie, architecture de marque, naming, systèmes d'identité verbale et visuelle. Nous trouvons l'angle tranchant, puis construisons tout autour.",
    "Análisis de mercado y categoría, arquitectura de marca, naming y sistemas de identidad verbal y visual. Encontramos el filo y construimos todo a su alrededor.",
    "Analisi di mercato e categoria, brand architecture, naming, sistemi di identità verbale e visiva. Troviamo il taglio netto e costruiamo tutto intorno."
  ],
  "Positioning": ["Positionierung", "Positionnement", "Posicionamiento", "Posizionamento"],
  "Identity systems": ["Identitätssysteme", "Systèmes d'identité", "Sistemas de identidad", "Sistemi di identità"],
  "Naming": ["Naming", "Naming", "Naming", "Naming"],
  "Digital marketing": ["Digitales Marketing", "Marketing digital", "Marketing digital", "Marketing digitale"],
  "Performance media, SEO, CRM and marketing automation — measured against pipeline, not impressions.": [
    "Performance-Media, SEO, CRM und Marketing-Automation — gemessen an der Pipeline, nicht an Impressions.",
    "Médias à la performance, SEO, CRM et marketing automation — mesurés au pipeline, pas aux impressions.",
    "Medios de performance, SEO, CRM y automatización — medidos por pipeline, no por impresiones.",
    "Performance media, SEO, CRM e marketing automation — misurati sulla pipeline, non sulle impression."
  ],
  "Content & social": ["Content & Social", "Contenu & social", "Contenido y social", "Content & social"],
  "Editorial systems, film, photography and always-on social built for German and EU-wide audiences.": [
    "Redaktionssysteme, Film, Fotografie und Always-on-Social für deutsche und europaweite Zielgruppen.",
    "Systèmes éditoriaux, film, photographie et social always-on pour des audiences allemandes et européennes.",
    "Sistemas editoriales, vídeo, fotografía y social always-on para audiencias alemanas y europeas.",
    "Sistemi editoriali, video, fotografia e social always-on per pubblici tedeschi ed europei."
  ],
  "Events & experience": ["Events & Erlebnis", "Événements & expérience", "Eventos y experiencias", "Eventi & experience"],
  "Launches, trade fairs and internal summits — concept, production and on-site direction.": [
    "Launches, Messen und interne Summits — Konzept, Produktion und Regie vor Ort.",
    "Lancements, salons et conventions internes — concept, production et direction sur place.",
    "Lanzamientos, ferias y convenciones internas — concepto, producción y dirección en el lugar.",
    "Lanci, fiere e convention interne — concept, produzione e regia on-site."
  ],
  "Corporate training": ["Unternehmensschulungen", "Formation en entreprise", "Formación corporativa", "Formazione aziendale"],
  "Leadership development, communication and sales enablement — certified, bilingual, in-house or off-site.": [
    "Führungskräfteentwicklung, Kommunikation und Sales Enablement — zertifiziert, zweisprachig, inhouse oder extern.",
    "Développement du leadership, communication et sales enablement — certifiés, bilingues, en interne ou hors site.",
    "Desarrollo de liderazgo, comunicación y capacitación comercial — certificados, bilingües, in-house o externos.",
    "Sviluppo della leadership, comunicazione e sales enablement — certificati, bilingui, in sede o off-site."
  ],

  // why us
  "03 — Why Blüten Sturm": ["03 — Warum Blüten Sturm", "03 — Pourquoi Blüten Sturm", "03 — Por qué Blüten Sturm", "03 — Perché Blüten Sturm"],
  "Agencies pitch ideas. We are accountable for outcomes.": [
    "Agenturen präsentieren Ideen. Wir stehen für Ergebnisse ein.",
    "Les agences présentent des idées. Nous répondons des résultats.",
    "Las agencias presentan ideas. Nosotros respondemos por los resultados.",
    "Le agenzie presentano idee. Noi rispondiamo dei risultati."
  ],
  "Consultant rigour": ["Beraterische Präzision", "Rigueur de consultant", "Rigor de consultoría", "Rigore da consulenti"],
  "Every creative route is tied to a commercial thesis you can defend to a board.": [
    "Jede kreative Route hängt an einer kommerziellen These, die Sie im Vorstand vertreten können.",
    "Chaque piste créative repose sur une thèse commerciale défendable devant un conseil.",
    "Cada ruta creativa se apoya en una tesis comercial defendible ante un consejo.",
    "Ogni rotta creativa poggia su una tesi commerciale difendibile in consiglio."
  ],
  "Bilingual by default": ["Zweisprachig von Haus aus", "Bilingue par défaut", "Bilingüe por defecto", "Bilingue per natura"],
  "German and English craft copy, DACH nuance, EU-wide rollout without translation drift.": [
    "Deutsche und englische Texte auf Handwerksniveau, DACH-Nuancen, EU-weiter Rollout ohne Übersetzungsverlust.",
    "Textes soignés en allemand et en anglais, nuances DACH, déploiement européen sans dérive de traduction.",
    "Textos cuidados en alemán e inglés, matices DACH, despliegue europeo sin pérdidas en traducción.",
    "Testi curati in tedesco e inglese, sfumature DACH, rollout europeo senza derive di traduzione."
  ],
  "Senior-only teams": ["Nur Senior-Teams", "Des équipes 100 % seniors", "Equipos solo senior", "Team solo senior"],
  "The people in the pitch are the people on the work. No handover to juniors.": [
    "Wer pitcht, arbeitet auch. Keine Übergabe an Junioren.",
    "Ceux qui pitchent sont ceux qui exécutent. Aucun transfert aux juniors.",
    "Quienes presentan son quienes ejecutan. Sin traspasos a juniors.",
    "Chi presenta è chi lavora. Nessun passaggio ai junior."
  ],
  "We train the handover": ["Wir schulen die Übergabe", "Nous formons la relève", "Formamos el relevo", "Formiamo il passaggio"],
  "Campaigns end. Capability stays — your team leaves able to run it themselves.": [
    "Kampagnen enden. Kompetenz bleibt — Ihr Team kann es danach selbst.",
    "Les campagnes s'arrêtent. La compétence reste — votre équipe sait faire seule.",
    "Las campañas terminan. La capacidad se queda — su equipo sabe hacerlo solo.",
    "Le campagne finiscono. La competenza resta — il tuo team saprà farlo da solo."
  ],

  // work
  "04 — Selected work": ["04 — Ausgewählte Arbeiten", "04 — Réalisations choisies", "04 — Proyectos seleccionados", "04 — Lavori selezionati"],
  "Recent storms.": ["Jüngste Stürme.", "Tempêtes récentes.", "Tormentas recientes.", "Tempeste recenti."],
  "Request full portfolio": ["Vollständiges Portfolio anfragen", "Demander le portfolio complet", "Solicitar el portfolio completo", "Richiedi il portfolio completo"],
  "case image — 16:9": ["Fallbild — 16:9", "visuel de cas — 16:9", "imagen del caso — 16:9", "immagine case — 16:9"],
  "Rebrand · Mittelstand": ["Rebranding · Mittelstand", "Rebranding · ETI", "Rebranding · Mittelstand", "Rebranding · Mittelstand"],
  "Manufacturer, repositioned for Europe": ["Hersteller, neu positioniert für Europa", "Industriel repositionné pour l'Europe", "Fabricante reposicionado para Europa", "Produttore riposizionato per l'Europa"],
  "Placeholder — swap in the real case study, metrics and imagery.": [
    "Platzhalter — echte Case Study, Kennzahlen und Bilder einsetzen.",
    "Emplacement — insérer l'étude de cas, les chiffres et les visuels réels.",
    "Marcador — sustituir por el caso real, métricas e imágenes.",
    "Segnaposto — inserire case study, metriche e immagini reali."
  ],
  "Campaign · DACH": ["Kampagne · DACH", "Campagne · DACH", "Campaña · DACH", "Campagna · DACH"],
  "Launch campaign across three markets": ["Launch-Kampagne in drei Märkten", "Campagne de lancement sur trois marchés", "Campaña de lanzamiento en tres mercados", "Campagna di lancio in tre mercati"],
  "Training · Leadership": ["Training · Führung", "Formation · Leadership", "Formación · Liderazgo", "Formazione · Leadership"],
  "Leadership programme, 400 managers": ["Führungsprogramm, 400 Manager", "Programme de leadership, 400 managers", "Programa de liderazgo, 400 directivos", "Programma di leadership, 400 manager"],
  "Experience · Event": ["Erlebnis · Event", "Expérience · Événement", "Experiencia · Evento", "Experience · Evento"],
  "Flagship summit, Würzburg": ["Flaggschiff-Summit, Würzburg", "Sommet phare, Wurtzbourg", "Cumbre insignia, Wurzburgo", "Summit di punta, Würzburg"],

  // academy
  "05 — Corporate academy": ["05 — Unternehmensakademie", "05 — Académie d'entreprise", "05 — Academia corporativa", "05 — Academy aziendale"],
  "Training that outlives the campaign.": [
    "Training, das die Kampagne überdauert.",
    "Une formation qui survit à la campagne.",
    "Formación que sobrevive a la campaña.",
    "Formazione che sopravvive alla campagna."
  ],
  "The Blüten Sturm Academy runs modular programmes for leadership, communication, sales and marketing teams — delivered in German or English, in Würzburg, on your site, or hybrid across Europe.": [
    "Die Blüten Sturm Akademie führt modulare Programme für Führung, Kommunikation, Vertrieb und Marketing durch — auf Deutsch oder Englisch, in Würzburg, bei Ihnen oder hybrid in ganz Europa.",
    "L'Académie Blüten Sturm propose des programmes modulaires pour les équipes de direction, communication, vente et marketing — en allemand ou en anglais, à Wurtzbourg, chez vous ou en hybride partout en Europe.",
    "La Academia Blüten Sturm imparte programas modulares para equipos de dirección, comunicación, ventas y marketing — en alemán o inglés, en Wurzburgo, en su sede o híbridos por toda Europa.",
    "La Blüten Sturm Academy propone programmi modulari per team di leadership, comunicazione, vendite e marketing — in tedesco o inglese, a Würzburg, presso di voi o ibridi in tutta Europa."
  ],
  "Leadership development": ["Führungskräfteentwicklung", "Développement du leadership", "Desarrollo de liderazgo", "Sviluppo della leadership"],
  "Executive communication": ["Executive Kommunikation", "Communication des dirigeants", "Comunicación ejecutiva", "Comunicazione executive"],
  "Sales enablement": ["Sales Enablement", "Sales enablement", "Capacitación comercial", "Sales enablement"],
  "Change & culture": ["Wandel & Kultur", "Changement & culture", "Cambio y cultura", "Change & cultura"],
  "Request the curriculum": ["Curriculum anfragen", "Demander le programme", "Solicitar el programa", "Richiedi il programma"],
  "Modul I": ["Modul I", "Module I", "Módulo I", "Modulo I"],
  "Modul II": ["Modul II", "Module II", "Módulo II", "Modulo II"],
  "Modul III": ["Modul III", "Module III", "Módulo III", "Modulo III"],
  "Führung unter Druck": ["Führung unter Druck", "Diriger sous pression", "Liderar bajo presión", "Guidare sotto pressione"],
  "Two days · decision-making, delegation and conflict for new and scaling leaders.": [
    "Zwei Tage · Entscheiden, Delegieren und Konflikte für neue und wachsende Führungskräfte.",
    "Deux jours · décision, délégation et conflit pour les managers nouveaux et en croissance.",
    "Dos días · decisión, delegación y conflicto para líderes nuevos y en crecimiento.",
    "Due giorni · decisione, delega e conflitto per leader nuovi e in crescita."
  ],
  "Story & Stage": ["Story & Bühne", "Récit & scène", "Relato y escena", "Storia & palco"],
  "One day · narrative structure, pitch craft and presence on camera and in the room.": [
    "Ein Tag · Erzählstruktur, Pitch-Handwerk und Präsenz vor Kamera und im Raum.",
    "Un jour · structure narrative, art du pitch et présence à la caméra comme en salle.",
    "Un día · estructura narrativa, arte del pitch y presencia ante la cámara y en la sala.",
    "Un giorno · struttura narrativa, arte del pitch e presenza in camera e in sala."
  ],
  "Marketing für Nicht-Marketer": ["Marketing für Nicht-Marketer", "Le marketing pour les non-marketeurs", "Marketing para no marketers", "Marketing per non addetti"],
  "Half day · positioning, channels and budgets for founders and department heads.": [
    "Halbtag · Positionierung, Kanäle und Budgets für Gründer und Abteilungsleiter.",
    "Une demi-journée · positionnement, canaux et budgets pour fondateurs et chefs de service.",
    "Media jornada · posicionamiento, canales y presupuestos para fundadores y jefes de área.",
    "Mezza giornata · posizionamento, canali e budget per founder e responsabili di reparto."
  ],

  // contact
  "06 — Contact": ["06 — Kontakt", "06 — Contact", "06 — Contacto", "06 — Contatti"],
  "Let's make weather.": ["Machen wir Wetter.", "Faisons la pluie et le beau temps.", "Hagamos que cambie el clima.", "Facciamo il tempo."],
  "Tell us what you're building. We answer every serious enquiry within two working days.": [
    "Erzählen Sie uns, was Sie aufbauen. Jede seriöse Anfrage beantworten wir innerhalb von zwei Werktagen.",
    "Dites-nous ce que vous construisez. Nous répondons à toute demande sérieuse en deux jours ouvrés.",
    "Cuéntenos qué está construyendo. Respondemos a cada consulta seria en dos días laborables.",
    "Raccontaci cosa stai costruendo. Rispondiamo a ogni richiesta seria entro due giorni lavorativi."
  ],
  "Name": ["Name", "Nom", "Nombre", "Nome"],
  "Company": ["Unternehmen", "Société", "Empresa", "Azienda"],
  "Email": ["E-Mail", "E-mail", "Correo", "Email"],
  "Interested in": ["Interesse an", "Votre intérêt", "Interés en", "Interesse per"],
  "Project": ["Projekt", "Projet", "Proyecto", "Progetto"],
  "Brand strategy": ["Markenstrategie", "Stratégie de marque", "Estrategia de marca", "Brand strategy"],
  "Send enquiry": ["Anfrage senden", "Envoyer la demande", "Enviar consulta", "Invia richiesta"],
  "Blüten Sturm GmbH · Würzburg · hallo@bluetensturm.de": [
    "Blüten Sturm GmbH · Würzburg · hallo@bluetensturm.de",
    "Blüten Sturm GmbH · Wurtzbourg · hallo@bluetensturm.de",
    "Blüten Sturm GmbH · Wurzburgo · hallo@bluetensturm.de",
    "Blüten Sturm GmbH · Würzburg · hallo@bluetensturm.de"
  ],

  // footer
  "© 2026 Blüten Sturm GmbH — Where brands bloom and ideas storm.": [
    "© 2026 Blüten Sturm GmbH — Wo Marken blühen und Ideen stürmen.",
    "© 2026 Blüten Sturm GmbH — Là où les marques fleurissent et les idées déferlent.",
    "© 2026 Blüten Sturm GmbH — Donde las marcas florecen y las ideas arrasan.",
    "© 2026 Blüten Sturm GmbH — Dove i brand fioriscono e le idee esplodono."
  ],
  "Impressum": ["Impressum", "Mentions légales", "Aviso legal", "Note legali"],
  "Datenschutz": ["Datenschutz", "Confidentialité", "Privacidad", "Privacy"],
  "LinkedIn": ["LinkedIn", "LinkedIn", "LinkedIn", "LinkedIn"],

  // ---- hero ring (hero-ring.js) --------------------------------------------
  // Ring-level strings: everything a visitor sees without opening a card.
  "Würzburg · Berlin · Zürich · Wien · Milano": ["Würzburg · Berlin · Zürich · Wien · Mailand", "Wurtzbourg · Berlin · Zurich · Vienne · Milan", "Wurzburgo · Berlín · Zúrich · Viena · Milán", "Würzburg · Berlino · Zurigo · Vienna · Milano"],
  "Mittelstand leaders. Challenger brands. Nine markets.": ["Mittelstandsführer. Challenger-Marken. Neun Märkte.", "Leaders du Mittelstand. Marques challengers. Neuf marchés.", "Líderes del Mittelstand. Marcas retadoras. Nueve mercados.", "Leader del Mittelstand. Brand challenger. Nove mercati."],
  "From Würzburg we work with Mittelstand leaders, challenger brands and institutions who need marketing that moves markets — and teams able to carry it.": [
    "Von Würzburg aus arbeiten wir mit Mittelstandsführern, Challenger-Marken und Institutionen, die Marketing brauchen, das Märkte bewegt — und Teams, die es tragen können.",
    "Depuis Wurtzbourg, nous accompagnons des leaders du Mittelstand, des marques challengers et des institutions qui ont besoin d'un marketing qui fait bouger les marchés — et d'équipes capables de le porter.",
    "Desde Wurzburgo trabajamos con líderes del Mittelstand, marcas retadoras e instituciones que necesitan un marketing que mueva mercados — y equipos capaces de sostenerlo.",
    "Da Würzburg lavoriamo con leader del Mittelstand, brand challenger e istituzioni che hanno bisogno di un marketing capace di muovere i mercati — e di team in grado di portarlo avanti."
  ],
  "Scroll": ["Scrollen", "Défiler", "Desplazar", "Scorri"],
  "Selected clients": ["Ausgewählte Kunden", "Clients sélectionnés", "Clientes seleccionados", "Clienti selezionati"],

  // Service card labels. "Brand Strategy" and "Digital Marketing" already exist above.
  "Marketing Strategy": ["Marketingstrategie", "Stratégie marketing", "Estrategia de marketing", "Strategia di marketing"],
  "Creative Services": ["Kreativleistungen", "Services créatifs", "Servicios creativos", "Servizi creativi"],
  "Social Media Management": ["Social-Media-Management", "Gestion des réseaux sociaux", "Gestión de redes sociales", "Gestione social media"],
  "Content Production": ["Content-Produktion", "Production de contenus", "Producción de contenidos", "Produzione di contenuti"],
  "Website & Digital Experience": ["Website & digitale Erlebnisse", "Site web & expérience digitale", "Web y experiencia digital", "Sito web & esperienza digitale"],
  "Advertising": ["Werbung", "Publicité", "Publicidad", "Pubblicità"],
  "PR": ["PR", "Relations presse", "Relaciones públicas", "Relazioni pubbliche"],
  "Business Development Support": ["Business-Development-Support", "Appui au développement commercial", "Apoyo al desarrollo de negocio", "Supporto allo sviluppo commerciale"],
  "Event Marketing & Promotions": ["Eventmarketing & Promotion", "Marketing événementiel & promotions", "Marketing de eventos y promociones", "Marketing eventi & promozioni"],
  "Video & Multimedia": ["Video & Multimedia", "Vidéo & multimédia", "Vídeo y multimedia", "Video & multimedia"],
  "Analytics": ["Analytics", "Analytics", "Analítica", "Analytics"],
  "AI & Innovation": ["KI & Innovation", "IA & innovation", "IA e innovación", "IA & innovazione"],
  "Consulting": ["Beratung", "Conseil", "Consultoría", "Consulenza"],
  "Employer Branding": ["Employer Branding", "Marque employeur", "Marca empleadora", "Employer branding"],
  "Ongoing Client Services": ["Laufende Betreuung", "Accompagnement continu", "Servicio continuo al cliente", "Servizi continuativi"],
  "Corporate Training & Organizational Development": ["Weiterbildung & Organisationsentwicklung", "Formation & développement organisationnel", "Formación y desarrollo organizativo", "Formazione & sviluppo organizzativo"],

  // Detail-panel chrome.
  "Close": ["Schließen", "Fermer", "Cerrar", "Chiudi"],
  "Featured service": ["Schwerpunktleistung", "Service phare", "Servicio destacado", "Servizio in evidenza"],
  "What that includes": ["Was dazugehört", "Ce que cela comprend", "Qué incluye", "Cosa comprende"],


  // ---- ring drag, service boxes, packages, case work -----------------------
  "Drag to explore": ["Zum Erkunden ziehen", "Faites glisser pour explorer", "Arrastra para explorar", "Trascina per esplorare"],
  "Compact": ["Kompakt", "Compact", "Compacto", "Compatto"],
  "Premium": ["Premium", "Premium", "Premium", "Premium"],
  "Packages": ["Pakete", "Formules", "Paquetes", "Pacchetti"],
  "Indicative net prices, excluding VAT and media budget. Final scope is quoted after a briefing call.": [
    "Richtpreise netto, zzgl. MwSt. und Mediabudget. Der finale Umfang wird nach einem Briefinggespräch angeboten.",
    "Prix indicatifs hors taxes et hors budget média. Le périmètre final est chiffré après un entretien de briefing.",
    "Precios netos orientativos, sin IVA ni presupuesto de medios. El alcance final se presupuesta tras una reunión de briefing.",
    "Prezzi netti indicativi, IVA e budget media esclusi. Il perimetro finale viene quotato dopo un incontro di briefing."
  ],
  "Every service, and what it costs.": [
    "Alle Leistungen — und was sie kosten.", "Tous les services, et leur prix.",
    "Todos los servicios y lo que cuestan.", "Tutti i servizi, e quanto costano."
  ],
  "Tap any service for the detail and two package levels. Indicative net prices — final scope is quoted after a briefing call.": [
    "Leistung antippen für Details und zwei Paketstufen. Richtpreise netto — der finale Umfang wird nach einem Briefinggespräch angeboten.",
    "Touchez un service pour le détail et deux niveaux de formule. Prix indicatifs hors taxes — le périmètre final est chiffré après un briefing.",
    "Toque un servicio para ver el detalle y dos niveles de paquete. Precios netos orientativos: el alcance final se presupuesta tras un briefing.",
    "Tocca un servizio per il dettaglio e due livelli di pacchetto. Prezzi netti indicativi — il perimetro finale viene quotato dopo un briefing."
  ],
  "Reference imagery is illustrative. Full case studies, metrics and client names on request.": [
    "Die Bildwelt ist illustrativ. Vollständige Case Studies, Kennzahlen und Kundennamen auf Anfrage.",
    "Les visuels sont illustratifs. Études de cas complètes, chiffres et noms de clients sur demande.",
    "Las imágenes son ilustrativas. Casos completos, métricas y nombres de clientes a petición.",
    "Le immagini sono illustrative. Case study completi, metriche e nomi dei clienti su richiesta."
  ],
  "Positioning, identity system and rollout for a family-owned manufacturer entering three new European markets.": [
    "Positionierung, Identitätssystem und Rollout für einen Familienbetrieb beim Eintritt in drei neue europäische Märkte.",
    "Positionnement, système d'identité et déploiement pour un fabricant familial entrant sur trois nouveaux marchés européens.",
    "Posicionamiento, sistema de identidad y despliegue para un fabricante familiar que entra en tres nuevos mercados europeos.",
    "Posizionamento, sistema di identità e rollout per un produttore a conduzione familiare che entra in tre nuovi mercati europei."
  ],
  "Integrated launch across Germany, Austria and Switzerland — creative, media and measurement run by one team.": [
    "Integrierter Launch in Deutschland, Österreich und der Schweiz — Kreation, Media und Messung aus einer Hand.",
    "Lancement intégré en Allemagne, en Autriche et en Suisse — création, média et mesure pilotés par une seule équipe.",
    "Lanzamiento integrado en Alemania, Austria y Suiza: creatividad, medios y medición gestionados por un solo equipo.",
    "Lancio integrato in Germania, Austria e Svizzera — creatività, media e misurazione gestiti da un unico team."
  ],
  "A four-module leadership programme delivered to management cohorts across a distributed organisation.": [
    "Ein vierteiliges Führungsprogramm für Management-Kohorten in einer verteilten Organisation.",
    "Un programme de leadership en quatre modules déployé auprès de cohortes de managers d'une organisation distribuée.",
    "Un programa de liderazgo de cuatro módulos impartido a cohortes directivas de una organización distribuida.",
    "Un programma di leadership in quattro moduli erogato a coorti manageriali di un'organizzazione distribuita."
  ],
  "Concept, production and on-site direction for a flagship customer summit, plus the campaign that filled the room.": [
    "Konzept, Produktion und Regie vor Ort für einen Flagship-Kundengipfel — samt der Kampagne, die den Saal gefüllt hat.",
    "Conception, production et direction sur site d'un sommet client phare, ainsi que la campagne qui a rempli la salle.",
    "Concepto, producción y dirección in situ de una cumbre de clientes insignia, más la campaña que llenó la sala.",
    "Concept, produzione e regia in loco per un summit clienti di punta, più la campagna che ha riempito la sala."
  ],


  // ---- portfolio capability boxes (05) -------------------------------------
  "Portfolio": ["Portfolio", "Réalisations", "Portafolio", "Portfolio"],
  "Six things we make. Press any one to see what that looks like in practice — and what we could build for you.": [
    "Sechs Dinge, die wir machen. Tippen Sie eines an, um zu sehen, wie das in der Praxis aussieht — und was wir für Sie bauen könnten.",
    "Six choses que nous réalisons. Touchez-en une pour voir ce que cela donne en pratique — et ce que nous pourrions construire pour vous.",
    "Seis cosas que hacemos. Toque cualquiera para ver cómo se traduce en la práctica y qué podríamos construir para usted.",
    "Sei cose che realizziamo. Toccane una per vedere come si traduce nella pratica — e cosa potremmo costruire per te."
  ],
  "Brand systems": ["Markensysteme", "Systèmes de marque", "Sistemas de marca", "Sistemi di marca"],
  "Identity, guidelines and the kit that rolls it out.": [
    "Identität, Richtlinien und das Kit für den Rollout.",
    "Identité, chartes et le kit qui la déploie.",
    "Identidad, directrices y el kit que la despliega.",
    "Identità, linee guida e il kit che la distribuisce."
  ],
  "Campaign films": ["Kampagnenfilme", "Films de campagne", "Películas de campaña", "Film di campagna"],
  "Scripted, shot and cut for every placement.": [
    "Konzipiert, gedreht und für jedes Placement geschnitten.",
    "Écrits, tournés et montés pour chaque emplacement.",
    "Guionizados, rodados y montados para cada emplazamiento.",
    "Sceneggiati, girati e montati per ogni collocazione."
  ],
  "Digital products": ["Digitale Produkte", "Produits digitaux", "Productos digitales", "Prodotti digitali"],
  "Sites, configurators and tools you can run.": [
    "Websites, Konfiguratoren und Tools, die Ihr Team selbst betreibt.",
    "Sites, configurateurs et outils que vous pilotez vous-même.",
    "Sitios, configuradores y herramientas que puede gestionar usted.",
    "Siti, configuratori e strumenti che puoi gestire da solo."
  ],
  "Live experiences": ["Live-Erlebnisse", "Expériences live", "Experiencias en vivo", "Esperienze dal vivo"],
  "Stands, launches and summits, start to finish.": [
    "Messestände, Launches und Summits — von Anfang bis Ende.",
    "Stands, lancements et sommets, du début à la fin.",
    "Stands, lanzamientos y cumbres, de principio a fin.",
    "Stand, lanci e summit, dall'inizio alla fine."
  ],
  "Editorial & content": ["Editorial & Content", "Éditorial & contenu", "Editorial y contenidos", "Editoriale & contenuti"],
  "A publishing rhythm your audience can rely on.": [
    "Ein Publikationsrhythmus, auf den sich Ihr Publikum verlassen kann.",
    "Un rythme de publication sur lequel votre audience peut compter.",
    "Un ritmo de publicación en el que su audiencia puede confiar.",
    "Un ritmo editoriale su cui il tuo pubblico può contare."
  ],
  "Academy programmes": ["Akademie-Programme", "Programmes d'académie", "Programas de academia", "Programmi dell'academy"],
  "Curricula, materials and facilitator guides.": [
    "Curricula, Materialien und Trainerleitfäden.",
    "Programmes, supports et guides d'animation.",
    "Currículos, materiales y guías para facilitadores.",
    "Programmi, materiali e guide per i formatori."
  ],

  // NOT YET TRANSLATED — the detail-panel prose in hero-ring.js: the taglines,
  // descriptions, bullet lists and the two package descriptions for each of the
  // 25 panels (18 services + 7 academy entries). Those strings fall back to English
  // until rows are added here, which is deliberate: they are long-form
  // marketing copy for a marketing agency, and should be written by the same
  // people who wrote the rest of this dictionary rather than machine-drafted.
  // Add them with the English string as the key, exactly as it appears in
  // hero-ring.js, and the panel will pick them up with no code change.
};

// placeholders (form) — same value order
const P = {
  "Ihr Name": ["Ihr Name", "Votre nom", "Su nombre", "Il tuo nome"],
  "Unternehmen": ["Unternehmen", "Société", "Empresa", "Azienda"],
  "name@firma.de": ["name@firma.de", "nom@societe.fr", "nombre@empresa.es", "nome@azienda.it"],
  "Was möchten Sie erreichen?": ["Was möchten Sie erreichen?", "Que voulez-vous accomplir ?", "¿Qué quiere lograr?", "Cosa vuoi ottenere?"]
};

const IDX = { fr: 1, es: 2, it: 3 };

export function translate(str, lang) {
  const k = str.trim();
  if (lang === "en") return T[k] ? k : (P[k] ? "Your name placeholder" : null) && null;
  const row = T[k] || P[k];
  if (!row) return null;
  const i = lang === "de" ? 0 : IDX[lang];
  return row[i] || null;
}

export function hasKey(str) {
  const k = str.trim();
  return !!(T[k] || P[k]);
}

// English fallbacks for the German-authored placeholders
const EN_P = { "Ihr Name": "Your name", "Unternehmen": "Company", "name@firma.de": "name@company.com", "Was möchten Sie erreichen?": "What do you want to achieve?" };
export function englishOf(str) {
  const k = str.trim();
  return EN_P[k] || k;
}
