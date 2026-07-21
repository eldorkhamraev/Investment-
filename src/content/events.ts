export type EventItem = {
  slug: string;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  type: "Forum" | "Delegation" | "Webinar" | "Workshop" | "Other";
  excerpt: string;
  body: string[];
  registrationUrl?: string;
  image?: string;
};

export const EVENTS: EventItem[] = [
  {
    slug: "ict-week-2026",
    title: "ICT Week Uzbekistan 2026 — Investment track",
    date: "2026-09-15",
    endDate: "2026-09-18",
    location: "Tashkent",
    type: "Forum",
    excerpt:
      "Government, international investors and technology companies convene on the future of IT investment in Uzbekistan.",
    image: "/news/news-ictweek.webp",
    body: [
      "ICT Week brings together policymakers, IT Park companies and foreign investors for a concentrated week of forums, exhibitions and bilateral meetings.",
      "The Investment Project Office hosts and supports the investment track — introductions, project briefings and follow-up after the event.",
      "Exact agenda and registration details are published as the dates approach. Contact the office to be added to the investor invitation list.",
    ],
  },
  {
    slug: "digital-investor-briefing-q3",
    title: "Digital investor briefing — Q3",
    date: "2026-08-20",
    location: "Online + Tashkent",
    type: "Webinar",
    excerpt:
      "A working briefing on open opportunities in AI compute, data centres and IT Park market entry.",
    image: "/sector-ai.jpg",
    body: [
      "A focused briefing for qualified investors covering pipeline projects, incentive updates and how the office supports market entry.",
      "Sessions typically include a ministry overview, two project deep-dives and an open Q&A with the Investment Project Office team.",
      "Request an invitation via the contact form (interest: Event or briefing).",
    ],
  },
  {
    slug: "japan-cooperation-follow-up",
    title: "Japan cooperation — animation & IT education follow-up",
    date: "2026-07-10",
    location: "Tashkent / Tokyo (hybrid)",
    type: "Delegation",
    excerpt:
      "Follow-up engagements from METI, MIC and JICA working visits on AI, outsourcing and talent.",
    image: "/news/news-japan-visit.png",
    body: [
      "Building on working visits with Japanese government and industry, the office continues bilateral follow-up on IT education, animation talent and outsourcing partnerships.",
      "Companies interested in Japan–Uzbekistan digital cooperation can request introductions through the office.",
    ],
  },
  {
    slug: "soft-landing-clinic",
    title: "Soft-landing clinic for founding teams",
    date: "2026-06-12",
    location: "IT Park, Tashkent",
    type: "Workshop",
    excerpt:
      "Practical clinic on registration, IT-Visa, banking and first hires for foreign technology teams.",
    image: "/services-hero.jpg",
    body: [
      "A hands-on clinic covering the first 90 days of market entry: legal structure, IT Park residency, visas and operational setup.",
      "Designed for founding teams and expansion leads who are past exploratory interest and ready to execute.",
    ],
  },
];

export function getEvent(slug: string) {
  return EVENTS.find((e) => e.slug === slug) ?? null;
}

export function upcomingEvents(limit = 3) {
  return [...EVENTS]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
}

export function formatEventDate(iso: string, end?: string) {
  const opts: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const start = new Date(iso).toLocaleDateString("en-US", opts);
  if (!end) return start;
  return `${start} – ${new Date(end).toLocaleDateString("en-US", opts)}`;
}
