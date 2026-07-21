import type { CollectionConfig } from "payload";

// Investment projects. Editors add these from the admin panel.
export const Projects: CollectionConfig = {
  slug: "projects",
  labels: { singular: "Project", plural: "Projects" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "sector", "status", "published"],
  },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      unique: true,
      admin: {
        position: "sidebar",
        description: "URL slug for /projects/[slug]. Auto-suggested from title if empty.",
      },
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar", description: "Show this on the website." },
    },
    {
      name: "year",
      type: "text",
      admin: { position: "sidebar", description: "e.g. 2026" },
    },
    {
      name: "sector",
      type: "select",
      options: [
        "AI & Computing",
        "Digital Infrastructure",
        "IT Outsourcing & BPO",
        "Creative & Gaming",
        "Fintech & Startups",
        "Digital Education",
        "Human Capital",
        "Ecosystem",
        "Milestone",
        "Investment Climate",
      ],
    },
    {
      name: "status",
      type: "text",
      admin: { description: "e.g. FDI · $3.5B, Phase 1 · 2026, Open." },
    },
    { name: "coverImage", type: "upload", relationTo: "media" },
    { name: "description", type: "textarea" },
    {
      name: "order",
      type: "number",
      admin: { position: "sidebar", description: "Lower numbers show first." },
    },
  ],
};
