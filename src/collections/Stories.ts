import type { CollectionConfig } from "payload";

export const Stories: CollectionConfig = {
  slug: "stories",
  labels: { singular: "Success story", plural: "Success stories" },
  admin: {
    useAsTitle: "company",
    defaultColumns: ["company", "sector", "published"],
  },
  access: { read: () => true },
  fields: [
    { name: "company", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { position: "sidebar" },
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar" },
    },
    { name: "sector", type: "text" },
    { name: "country", type: "text" },
    { name: "highlight", type: "text" },
    { name: "excerpt", type: "textarea" },
    { name: "coverImage", type: "upload", relationTo: "media" },
    { name: "body", type: "textarea" },
    {
      name: "order",
      type: "number",
      admin: { position: "sidebar", description: "Lower numbers show first." },
    },
  ],
};
