'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type Locale = 'en' | 'fr' | 'sw' | 'rw'

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.ecosystem': 'Ecosystem',
    'nav.ogera': 'Ogera MVP',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Transforming Africa Through Innovation',
    'hero.subtitle': 'Pioneering AI-driven digital solutions across education, healthcare, retail, and beyond. Building the future of African technology, one innovation at a time.',
    'hero.exploreEcosystem': 'Explore Our Ecosystem',
    'hero.startJourney': 'Start Your Journey',
    
    // Services
    'services.title': 'Our Comprehensive Ecosystem',
    'services.subtitle': 'Nine integrated platforms working together to transform Africa\'s digital landscape',
    'services.education.title': 'Education Platform',
    'services.education.desc': 'Revolutionizing learning with AI-powered educational tools and personalized learning experiences.',
    'services.healthcare.title': 'Healthcare Solutions',
    'services.healthcare.desc': 'Digital health platforms connecting patients, providers, and systems for better healthcare outcomes.',
    'services.retail.title': 'Retail & Commerce',
    'services.retail.desc': 'Next-generation e-commerce and retail management solutions for African businesses.',
    'services.hospitality.title': 'Hospitality Tech',
    'services.hospitality.desc': 'Comprehensive hospitality management systems designed for Africa\'s growing tourism industry.',
    'services.realestate.title': 'Real Estate',
    'services.realestate.desc': 'Smart property management and real estate solutions for Africa\'s urban development.',
    'services.transport.title': 'Transport & Logistics',
    'services.transport.desc': 'Intelligent transportation and logistics platforms optimizing movement across the continent.',
    'services.hr.title': 'HR Management',
    'services.hr.desc': 'Human resource solutions tailored for Africa\'s diverse and dynamic workforce.',
    'services.inventory.title': 'Inventory & Billing',
    'services.inventory.desc': 'Streamlined inventory management and billing systems for businesses of all sizes.',
    'services.government.title': 'Government & NGO',
    'services.government.desc': 'Digital governance solutions empowering public sector efficiency and transparency.',
    
    // Projects
    'projects.title': 'Introducing Our Projects',
    'projects.ogera.title': 'Ogera Platform Preview',
    'projects.ogera.subtitle': 'Coming Soon',
    'projects.requestAccess': 'Request Early Access',
    
    // Journey
    'journey.title': 'Our Journey & Vision',
    'journey.subtitle': 'From our foundation in Kigali to our vision of continental transformation, discover the milestones that define our commitment to African innovation.',
    'journey.2025.foundation.title': '2025 - Foundation',
    'journey.2025.foundation.desc': 'Established in Kigali, Rwanda with a vision to transform African technology landscape through innovative solutions.',
    'journey.2025.ogera.title': '2025 - Ogera MVP Launch',
    'journey.2025.ogera.desc': 'Launching our flagship platform integrating AI-driven solutions across multiple sectors.',
    'journey.2026.expansion.title': '2026 - Regional Expansion',
    'journey.2026.expansion.desc': 'Expanding operations to Kenya, Uganda, and Tanzania, bringing our solutions to East Africa.',
    'journey.2027.continental.title': '2027 - Continental Reach',
    'journey.2027.continental.desc': 'Scaling across Africa, establishing partnerships and local presence in key markets.',
    
    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Ready to transform your business? Let\'s discuss how Sybella Systems can help you achieve your digital transformation goals.',
    'contact.name': 'Full Name',
    'contact.email': 'Email Address',
    'contact.company': 'Company',
    'contact.phone': 'Phone Number',
    'contact.message': 'Message',
    'contact.sendMessage': 'Send Message',
    'contact.subscribe': 'Subscribe to Newsletter',
    'contact.required': 'Required',
    
    // Footer
    'footer.description': 'Transforming Africa through innovative software and AI-driven digital solutions.',
    'footer.solutions': 'Solutions',
    'footer.company': 'Company',
    'footer.contactInfo': 'Contact Info',
    'footer.location': 'Kigali, Rwanda',
    'footer.phone': '+250 789 123 456',
    'footer.email': 'info@sybellasystems.com',
    'footer.copyright': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookie Policy'
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.ecosystem': 'Écosystème',
    'nav.ogera': 'Ogera MVP',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Transformer l\'Afrique par l\'Innovation',
    'hero.subtitle': 'Pionnier des solutions numériques alimentées par l\'IA dans l\'éducation, la santé, le commerce de détail et au-delà. Construire l\'avenir de la technologie africaine, une innovation à la fois.',
    'hero.exploreEcosystem': 'Explorer Notre Écosystème',
    'hero.startJourney': 'Commencer Votre Voyage',
    
    // Services
    'services.title': 'Notre Écosystème Complet',
    'services.subtitle': 'Neuf plateformes intégrées travaillant ensemble pour transformer le paysage numérique de l\'Afrique',
    'services.education.title': 'Plateforme d\'Éducation',
    'services.education.desc': 'Révolutionner l\'apprentissage avec des outils éducatifs alimentés par l\'IA et des expériences d\'apprentissage personnalisées.',
    'services.healthcare.title': 'Solutions de Santé',
    'services.healthcare.desc': 'Plateformes de santé numérique connectant patients, prestataires et systèmes pour de meilleurs résultats de santé.',
    'services.retail.title': 'Commerce de Détail',
    'services.retail.desc': 'Solutions de commerce électronique et de gestion de détail de nouvelle génération pour les entreprises africaines.',
    'services.hospitality.title': 'Technologie d\'Hospitalité',
    'services.hospitality.desc': 'Systèmes de gestion d\'hospitalité complets conçus pour l\'industrie touristique croissante de l\'Afrique.',
    'services.realestate.title': 'Immobilier',
    'services.realestate.desc': 'Solutions intelligentes de gestion immobilière et immobilières pour le développement urbain de l\'Afrique.',
    'services.transport.title': 'Transport & Logistique',
    'services.transport.desc': 'Plateformes de transport et logistique intelligentes optimisant les mouvements à travers le continent.',
    'services.hr.title': 'Gestion RH',
    'services.hr.desc': 'Solutions de ressources humaines adaptées à la main-d\'œuvre africaine diverse et dynamique.',
    'services.inventory.title': 'Inventaire & Facturation',
    'services.inventory.desc': 'Systèmes de gestion d\'inventaire et de facturation rationalisés pour les entreprises de toutes tailles.',
    'services.government.title': 'Gouvernement & ONG',
    'services.government.desc': 'Solutions de gouvernance numérique autonomisant l\'efficacité et la transparence du secteur public.',
    
    // Projects
    'projects.title': 'Présentation de Nos Projets',
    'projects.ogera.title': 'Aperçu de la Plateforme Ogera',
    'projects.ogera.subtitle': 'Bientôt Disponible',
    'projects.requestAccess': 'Demander un Accès Anticipé',
    
    // Journey
    'journey.title': 'Notre Parcours & Vision',
    'journey.subtitle': 'De notre fondation à Kigali à notre vision de transformation continentale, découvrez les jalons qui définissent notre engagement envers l\'innovation africaine.',
    'journey.2025.foundation.title': '2025 - Fondation',
    'journey.2025.foundation.desc': 'Établi à Kigali, Rwanda avec une vision de transformer le paysage technologique africain grâce à des solutions innovantes.',
    'journey.2025.ogera.title': '2025 - Lancement Ogera MVP',
    'journey.2025.ogera.desc': 'Lancement de notre plateforme phare intégrant des solutions alimentées par l\'IA dans plusieurs secteurs.',
    'journey.2026.expansion.title': '2026 - Expansion Régionale',
    'journey.2026.expansion.desc': 'Expansion des opérations au Kenya, en Ouganda et en Tanzanie, apportant nos solutions à l\'Afrique de l\'Est.',
    'journey.2027.continental.title': '2027 - Portée Continentale',
    'journey.2027.continental.desc': 'Mise à l\'échelle à travers l\'Afrique, établissant des partenariats et une présence locale sur les marchés clés.',
    
    // Contact
    'contact.title': 'Entrer en Contact',
    'contact.subtitle': 'Prêt à transformer votre entreprise ? Discutons de la façon dont Sybella Systems peut vous aider à atteindre vos objectifs de transformation numérique.',
    'contact.name': 'Nom Complet',
    'contact.email': 'Adresse E-mail',
    'contact.company': 'Entreprise',
    'contact.phone': 'Numéro de Téléphone',
    'contact.message': 'Message',
    'contact.sendMessage': 'Envoyer le Message',
    'contact.subscribe': 'S\'abonner à la Newsletter',
    'contact.required': 'Requis',
    
    // Footer
    'footer.description': 'Transformer l\'Afrique grâce à des logiciels innovants et des solutions numériques alimentées par l\'IA.',
    'footer.solutions': 'Solutions',
    'footer.company': 'Entreprise',
    'footer.contactInfo': 'Informations de Contact',
    'footer.location': 'Kigali, Rwanda',
    'footer.phone': '+250 789 123 456',
    'footer.email': 'info@sybellasystems.com',
    'footer.copyright': 'Tous droits réservés.',
    'footer.privacy': 'Politique de Confidentialité',
    'footer.terms': 'Conditions de Service',
    'footer.cookies': 'Politique des Cookies'
  },
  sw: {
    // Navigation
    'nav.home': 'Nyumbani',
    'nav.about': 'Kuhusu',
    'nav.ecosystem': 'Mfumo wa Mazingira',
    'nav.ogera': 'Ogera MVP',
    'nav.blog': 'Blogu',
    'nav.contact': 'Mawasiliano',
    
    // Hero Section
    'hero.title': 'Kubadilisha Afrika Kupitia Ubunifu',
    'hero.subtitle': 'Kiongozi wa suluhisho za kidijitali zilizotengenezwa na AI katika elimu, afya, rejareja, na zaidi. Kujenga teknolojia ya Afrika ya baadaye, ubunifu mmoja kwa wakati.',
    'hero.exploreEcosystem': 'Chunguza Mfumo wa Mazingira Wetu',
    'hero.startJourney': 'Anza Safari Yako',
    
    // Services
    'services.title': 'Mfumo wa Mazingira Wetu wa Kikamilifu',
    'services.subtitle': 'Jukwaa tisa zilizounganishwa zinazofanya kazi pamoja kubadilisha mazingira ya kidijitali ya Afrika',
    'services.education.title': 'Jukwaa la Elimu',
    'services.education.desc': 'Kubadilisha kujifunza kwa vifaa vya elimu vya AI na uzoefu wa kujifunza wa kibinafsi.',
    'services.healthcare.title': 'Suluhisho za Afya',
    'services.healthcare.desc': 'Jukwaa la afya la kidijitali linalounganisha wagonjwa, watoa huduma, na mifumo kwa matokeo bora ya afya.',
    'services.retail.title': 'Rejareja na Biashara',
    'services.retail.desc': 'Suluhisho za e-commerce za kizazi kipya na usimamizi wa rejareja kwa biashara za Afrika.',
    'services.hospitality.title': 'Teknolojia ya Ukarimu',
    'services.hospitality.desc': 'Mifumo ya usimamizi wa ukarimu ya kikamilifu iliyoundwa kwa sekta ya utalii inayokua ya Afrika.',
    'services.realestate.title': 'Mali za Kinyumba',
    'services.realestate.desc': 'Suluhisho za usimamizi wa mali na mali za kinyumba za akili kwa maendeleo ya mijini ya Afrika.',
    'services.transport.title': 'Usafiri na Ulogistics',
    'services.transport.desc': 'Jukwaa la usafiri na logistics za akili zinazoboresha harakati kote bara.',
    'services.hr.title': 'Usimamizi wa Rasilimali za Watu',
    'services.hr.desc': 'Suluhisho za rasilimali za watu zilizoundwa kwa ajili ya wafanyakazi wa Afrika wenye utofauti na nguvu.',
    'services.inventory.title': 'Hesabu na Utoaji wa Bili',
    'services.inventory.desc': 'Mifumo ya usimamizi wa hesabu na utoaji wa bili iliyorahisishwa kwa biashara za ukubwa wowote.',
    'services.government.title': 'Serikali na NGO',
    'services.government.desc': 'Suluhisho za utawala wa kidijitali zinazowezesha ufanisi na uwazi wa sekta ya umma.',
    
    // Projects
    'projects.title': 'Kutangaza Miradi Yetu',
    'projects.ogera.title': 'Kiongozi cha Jukwaa la Ogera',
    'projects.ogera.subtitle': 'Inakuja Hivi Karibuni',
    'projects.requestAccess': 'Omba Ufikiaji wa Mapema',
    
    // Journey
    'journey.title': 'Safari Yetu na Maono',
    'journey.subtitle': 'Kutoka msingi wetu huko Kigali hadi maono yetu ya mabadiliko ya bara, gundua hatua muhimu zinazofafanua jitihada zetu za ubunifu wa Afrika.',
    'journey.2025.foundation.title': '2025 - Msingi',
    'journey.2025.foundation.desc': 'Imeanzishwa huko Kigali, Rwanda na maono ya kubadilisha mazingira ya teknolojia ya Afrika kupitia suluhisho za ubunifu.',
    'journey.2025.ogera.title': '2025 - Uzinduzi wa Ogera MVP',
    'journey.2025.ogera.desc': 'Kuzindua jukwaa letu la bendera linalounganisha suluhisho za AI katika sekta nyingi.',
    'journey.2026.expansion.title': '2026 - Panua Kanda',
    'journey.2026.expansion.desc': 'Kupanua shughuli za Kenya, Uganda, na Tanzania, kuleta suluhisho zetu Afrika Mashariki.',
    'journey.2027.continental.title': '2027 - Kufikia Bara',
    'journey.2027.continental.desc': 'Kupima kote Afrika, kuanzisha ushirikiano na uwepo wa ndani katika soko muhimu.',
    
    // Contact
    'contact.title': 'Pata Mawasiliano',
    'contact.subtitle': 'Uko tayari kubadilisha biashara yako? Hebu tujadili jinsi Sybella Systems inaweza kukusaidia kufikia malengo yako ya mabadiliko ya kidijitali.',
    'contact.name': 'Jina Kamili',
    'contact.email': 'Anwani ya Barua pepe',
    'contact.company': 'Kampuni',
    'contact.phone': 'Nambari ya Simu',
    'contact.message': 'Ujumbe',
    'contact.sendMessage': 'Tuma Ujumbe',
    'contact.subscribe': 'Jiandikishe kwa Jarida',
    'contact.required': 'Inahitajika',
    
    // Footer
    'footer.description': 'Kubadilisha Afrika kupitia programu za ubunifu na suluhisho za kidijitali za AI.',
    'footer.solutions': 'Suluhisho',
    'footer.company': 'Kampuni',
    'footer.contactInfo': 'Taarifa za Mawasiliano',
    'footer.location': 'Kigali, Rwanda',
    'footer.phone': '+250 789 123 456',
    'footer.email': 'info@sybellasystems.com',
    'footer.copyright': 'Haki zote zimehifadhiwa.',
    'footer.privacy': 'Sera ya Faragha',
    'footer.terms': 'Masharti ya Huduma',
    'footer.cookies': 'Sera ya Vidakuzi'
  },
  rw: {
    // Navigation
    'nav.home': 'Urugo',
    'nav.about': 'Ibyerekeye',
    'nav.ecosystem': 'Sisitemu y\'ibidukikije',
    'nav.ogera': 'Ogera MVP',
    'nav.blog': 'Blogu',
    'nav.contact': 'Kwemeza',
    
    // Hero Section
    'hero.title': 'Guhindura Afurika binyuze mu Bwoba',
    'hero.subtitle': 'Guteza imbere ibisubizo bya digital byatezimbere na AI mu buhinzi, ubuzima, ibicuruzwa, n\'ibindi. Gushyiraho isi y\'ikoranabuhanga rya Afurika, ubwoba rumwe ku gihe.',
    'hero.exploreEcosystem': 'Shakisha Sisitemu y\'ibidukikije yacu',
    'hero.startJourney': 'Tangira urugendo rwawe',
    
    // Services
    'services.title': 'Sisitemu y\'ibidukikije yacu yuzuye',
    'services.subtitle': 'Amashami atandatu yashyizwe hamwe akora hamwe guhindura isura ya digital ya Afurika',
    'services.education.title': 'Urubuga rw\'uburezi',
    'services.education.desc': 'Guhindura kwiga hamwe n\'ibikoresho by\'uburezi byatezimbere na AI n\'ubuhanga bwo kwiga bwawe.',
    'services.healthcare.title': 'Ibisubizo by\'ubuzima',
    'services.healthcare.desc': 'Amashami y\'ubuzima ya digital ahurira abarwayi, abatanga serivisi, n\'amashami kugira ngo habe ibyiza by\'ubuzima.',
    'services.retail.title': 'Ibicuruzwa n\'ubucuruzi',
    'services.retail.desc': 'Ibisubizo by\'e-commerce by\'ikinyejana gishya n\'amashami yo gucunga ibicuruzwa by\'ubucuruzi bwa Afurika.',
    'services.hospitality.title': 'Ikoranabuhanga ry\'ubwoba',
    'services.hospitality.desc': 'Amashami y\'ubucunga bw\'ubwoba yuzuye yateguwe kugira ngo yishyire mu mwuka w\'ubukerarugendo bwa Afurika.',
    'services.realestate.title': 'Imari y\'ubwoba',
    'services.realestate.desc': 'Ibisubizo by\'ubucunga bw\'ubwoba n\'imari y\'ubwoba by\'ubwoba kugira ngo byishyire mu iterambere ry\'imidugudu ya Afurika.',
    'services.transport.title': 'Ubwoba n\'ubwoba',
    'services.transport.desc': 'Amashami y\'ubwoba n\'ubwoba by\'ubwoba byongera ubwoba ku bwoba.',
    'services.hr.title': 'Ubucunga bw\'abantu',
    'services.hr.desc': 'Ibisubizo by\'abantu byateguwe kugira ngo byishyire mu bwoba bwa Afurika bwo gutandukana n\'ubwoba.',
    'services.inventory.title': 'Ubwoba n\'ubwoba',
    'services.inventory.desc': 'Amashami y\'ubwoba n\'ubwoba by\'ubwoba byongera ubwoba ku bwoba.',
    'services.government.title': 'Leta n\'NGO',
    'services.government.desc': 'Ibisubizo by\'ubwoba by\'ubwoba byongera ubwoba ku bwoba.',
    
    // Projects
    'projects.title': 'Gutangaza Amashami yacu',
    'projects.ogera.title': 'Icyerekezo cy\'Urubuga rwa Ogera',
    'projects.ogera.subtitle': 'Riraza vuba',
    'projects.requestAccess': 'Saba ubwoba bwa mbere',
    
    // Journey
    'journey.title': 'Urugendo rwacu n\'Icyerekezo',
    'journey.subtitle': 'Kuva mu bwoba bwawe hano Kigali kugeza ku bwoba bwawe bwo guhindura isi, menya amashami y\'ubwoba yashyizwe mu bwoba bwawe bwo guhindura isi.',
    'journey.2025.foundation.title': '2025 - Ubwoba',
    'journey.2025.foundation.desc': 'Byashyizweho hano Kigali, Rwanda hamwe n\'icyerekezo cyo guhindura isura y\'ikoranabuhanga rya Afurika binyuze mu bisubizo by\'ubwoba.',
    'journey.2025.ogera.title': '2025 - Gushyiraho Ogera MVP',
    'journey.2025.ogera.desc': 'Gushyiraho urubuga rwacu rw\'ubwoba ruhurira ibisubizo byatezimbere na AI mu bwoba bwinshi.',
    'journey.2026.expansion.title': '2026 - Kwongera ubwoba',
    'journey.2026.expansion.desc': 'Kwongera ubwoba bwa Kenya, Uganda, na Tanzania, kuza ibisubizo byacu mu bwoba bwa Afurika.',
    'journey.2027.continental.title': '2027 - Gufata ubwoba',
    'journey.2027.continental.desc': 'Kwongera ubwoba bwa Afurika, gushyiraho ubwoba n\'ubwoba bwa ndani mu bwoba bwa mbere.',
    
    // Contact
    'contact.title': 'Kwemeza',
    'contact.subtitle': 'Uko tayari guhindura ubwoba bwawe? Reka tujadile uko Sybella Systems ishobora gufasha kugera ku bwoba bwawe bwo guhindura isi ya digital.',
    'contact.name': 'Izina ryuzuye',
    'contact.email': 'Aderesi ya email',
    'contact.company': 'Kampani',
    'contact.phone': 'Numero ya telefone',
    'contact.message': 'Ubutumwa',
    'contact.sendMessage': 'Ohereza ubutumwa',
    'contact.subscribe': 'Kwiyandikisha kuri Newsletter',
    'contact.required': 'Birakenewe',
    
    // Footer
    'footer.description': 'Guhindura Afurika binyuze mu bwoba bwa software n\'ibisubizo bya digital byatezimbere na AI.',
    'footer.solutions': 'Ibisubizo',
    'footer.company': 'Kampani',
    'footer.contactInfo': 'Amakuru y\'ubwoba',
    'footer.location': 'Kigali, Rwanda',
    'footer.phone': '+250 789 123 456',
    'footer.email': 'info@sybellasystems.com',
    'footer.copyright': 'Ubwoba bwose burabitswe.',
    'footer.privacy': 'Politiki y\'ubwoba',
    'footer.terms': 'Amabwiriza ya serivisi',
    'footer.cookies': 'Politiki y\'amakuki'
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')

  const t = (key: string): string => {
    return translations[locale][key] || translations['en'][key] || key
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
