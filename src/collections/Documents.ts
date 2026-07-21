import type { CollectionConfig } from "payload";

export const Documents: CollectionConfig = {
  slug: "documents",
  labels: { singular: "Document", plural: "Documents" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "published"],
  },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true },
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
    {
      name: "category",
      type: "select",
      options: ["Guide", "Presentation", "Report", "One-pager", "Legal"],
      defaultValue: "Guide",
    },
    { name: "description", type: "textarea" },
    {
      name: "file",
      type: "upload",
      relationTo: "media",
      admin: { description: "Upload a file, or use externalUrl instead." },
    },
    {
      name: "externalUrl",
      type: "text",
      admin: { description: "Optional external link if not uploading a file." },
    },
    { name: "dateLabel", type: "text", admin: { placeholder: "2026" } },
  ],
};
