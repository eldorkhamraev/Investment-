// Full article bodies for the built-in (static) news stories, keyed by slug.
// These render the /news/[slug] detail pages when the CMS has no matching
// entry (e.g. on Vercel, where the CMS database is not available). Once the
// CMS is wired to a hosted database, published articles take precedence and
// this file becomes the fallback only.

export const NEWS_BODIES: Record<string, string[]> = {
  "linkwise-ai-computing-centre": [
    "Shanghai Linkwise Data Intelligence and the Ministry of Digital Technologies of Uzbekistan have advanced plans for a $3.5 billion Modular Intelligent Computing Centre in Karakalpakstan — one of the largest foreign direct investments in the country's digital infrastructure to date.",
    "Delivered in phases, the facility will provide large-scale AI and high-performance computing capacity, with first commissioning targeted for 2027. Data-computing equipment valued at over $700 million is already earmarked for the project.",
    "The centre anchors Uzbekistan's ambition to become a regional hub for artificial intelligence and intelligent computing, positioning the country as a destination for large-scale technology investment across Central Asia.",
  ],
  "data-centre-central-asia": [
    "Uzbekistan is developing a data-centre campus with up to 300 MW of IT capacity, purpose-built for artificial intelligence and big-data workloads. The first phase is scheduled to begin in 2026.",
    "Beyond raw capacity, the project is conceived as an innovation ecosystem — attracting cloud providers, AI companies and research partners to co-locate alongside the region's fast-growing pool of digital talent.",
    "The investment reinforces the country's role as the digital gateway of Central Asia, offering the power, connectivity and scale that modern compute-intensive industries require.",
  ],
  "japan-animation-talent": [
    "The Investment Project Office, together with Japan's ELF-IN Co., has launched an initiative to train a new generation of Uzbek animation and computer-graphics professionals, backed by a grant exceeding $700,000.",
    "The programme pairs Japanese studio expertise with Uzbekistan's young, fast-growing creative workforce, opening pathways into one of the world's most demanding animation markets and a route to export Uzbek creative content globally.",
    "It reflects a broader deepening of Uzbek–Japanese cooperation that now reaches beyond IT into animation and the wider creative economy.",
  ],
  "ucell-it-talent": [
    "The Ministry of Digital Technologies and mobile operator Ucell (USM Holding) have signed a five-year Memorandum of Understanding to accelerate digital education across Uzbekistan.",
    "The partnership will align IT training with international standards and build a sustainable pipeline of skilled professionals, equipping young people with the future-ready competencies employers need.",
    "It forms part of the national effort to expand the country's developer base and support the goal of training one million programmers.",
  ],
  "lingang-technopark": [
    "Representatives of the Ministry of Digital Technologies met with Shanghai's Lin-gang Technopark to explore attracting leading Chinese technology companies to Uzbekistan.",
    "Lin-gang has drawn over $100 billion in investment over the past six years. Discussions focused on establishing a presence for Chinese firms in Uzbekistan, alongside joint startup hubs with top universities.",
    "The engagement is part of Uzbekistan's strategy to build a competitive digital economy and strengthen ties with major international technology partners.",
  ],
  "japan-visit-meti": [
    "During a working visit to Japan, the Investment Project Office held meetings across Japanese government and industry — including METI, the Ministry of Internal Affairs and Communications (MIC), and the Japan International Cooperation Agency (JICA).",
    "Talks covered AI adoption, IT outsourcing and talent mobility, building on the presence of 25 Japanese companies already resident in Uzbekistan's IT Park.",
    "The visit produced new cooperation agreements aimed at expanding IT trade, education and animation, and creating opportunities for Uzbek professionals in the Japanese market.",
  ],
  "github-developers-10x": [
    "The number of Uzbek developers on GitHub grew from 25,000 in 2020 to 275,000 in 2025 — a tenfold increase that reflects the rapid expansion of the country's technology workforce.",
    "Over the same period Uzbekistan climbed eight places in the Government AI Readiness Index, signalling growing institutional capacity alongside grassroots talent.",
    "The trend underpins the country's target of training one million programmers and its ambition to grow IT exports toward $5 billion by 2030.",
  ],
  "ict-week-2025": [
    "Tashkent hosted ICT Week 2025, bringing together international investors, technology companies and government leaders for the country's flagship IT Investment Forum.",
    "The programme showcased Uzbekistan's digital achievements — from a tenfold rise in developers to record IT exports — and set out investment opportunities across AI, data infrastructure and the creative economy.",
    "The forum reinforced the Investment Project Office's role as the single point of contact for foreign companies entering the Uzbek market.",
  ],
};
