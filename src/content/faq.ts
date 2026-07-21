export type FaqItem = { q: string; a: string; category: string };

export const FAQ: FaqItem[] = [
  {
    category: "Mandate",
    q: "What does the Investment Project Office do?",
    a: "We are a structural unit of the Ministry of Digital Technologies. We attract investment, grants and partnerships into Uzbekistan's digital sector and help foreign technology companies enter and expand in the market — from first meeting through registration, visas, incentives and aftercare.",
  },
  {
    category: "Mandate",
    q: "How is this different from invest.gov.uz?",
    a: "invest.gov.uz is the national Investment Promotion Agency covering the whole economy. We focus specifically on digital technologies, IT Park pathways and technology FDI. For non-digital sectors, we typically point you to the national portal.",
  },
  {
    category: "Market entry",
    q: "How long does company registration take?",
    a: "With guided support, many technology companies can be structured and registered within weeks. Exact timing depends on ownership structure, licensing needs and whether you join IT Park. We map the path on the first call.",
  },
  {
    category: "Market entry",
    q: "Do I need to visit Uzbekistan before incorporating?",
    a: "Not always. Much of the early process can start remotely. Soft-landing visits are useful before hiring and leasing, and we help sequence travel efficiently.",
  },
  {
    category: "Incentives",
    q: "What is IT Park Zero Risk?",
    a: "A preferential regime for qualifying IT Park residents: no corporate income tax, VAT or social tax, and a flat 7.5% personal income tax — designed for export-oriented technology businesses. See the program page for eligibility details.",
  },
  {
    category: "Incentives",
    q: "What is the IT-Visa?",
    a: "A streamlined residence pathway for IT founders, investors and specialists, valid for up to three years. We help you understand eligibility and sequence it with company setup.",
  },
  {
    category: "Investment",
    q: "Can you introduce us to specific projects?",
    a: "Yes. Browse the projects portfolio and success stories, then contact us with your sector interest. We share deeper briefs under NDA where appropriate and arrange meetings with relevant counterparts.",
  },
  {
    category: "Investment",
    q: "Do you only work with large FDI?",
    a: "No. We work with landmark infrastructure FDI, mid-size delivery centres, grant-backed talent partnerships and startups entering via IT Park. Tell us your ticket size and model — we will say honestly if we are the right door.",
  },
  {
    category: "Process",
    q: "What happens after I submit the contact form?",
    a: "The inquiry reaches our team. We typically reply within a few business days, clarify your goals, and propose a discovery call. From there we map structure, incentives and next steps.",
  },
  {
    category: "Process",
    q: "Is there a fee for your services?",
    a: "Core facilitation for foreign investors engaging the digital sector is provided as part of our public mandate. Specific paid advisory or third-party services (legal, audit, real estate) are introduced transparently when needed.",
  },
];

export const FAQ_CATEGORIES = [...new Set(FAQ.map((f) => f.category))];
