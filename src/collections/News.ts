import type { CollectionConfig } from "payload";

// News / announcements. Editors add these from the admin panel.
export const News: CollectionConfig = {
  slug: "news",
  labels: { singular: "News item", plural: "News" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "tag", "publishedDate", "published"],
  },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "published",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar", description: "Show this on the website." },
    },
    {
      name: "publishedDate",
      type: "date",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" },
      },
    },
    {
      name: "tag",
      type: "text",
      admin: { description: "Short label, e.g. AI & Data, Investment." },
    },
    { name: "coverImage", type: "upload", relationTo: "media" },
    {
      name: "excerpt",
      type: "textarea",
      admin: { description: "One or two sentences shown on cards." },
    },
    { name: "body", type: "richText" },
  ],
};
