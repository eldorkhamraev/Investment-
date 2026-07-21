import type { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
  slug: "events",
  labels: { singular: "Event", plural: "Events" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "type", "published"],
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
      name: "date",
      type: "date",
      required: true,
      admin: { date: { pickerAppearance: "dayOnly" } },
    },
    {
      name: "endDate",
      type: "date",
      admin: { date: { pickerAppearance: "dayOnly" } },
    },
    { name: "location", type: "text" },
    {
      name: "type",
      type: "select",
      options: ["Forum", "Delegation", "Webinar", "Workshop", "Other"],
      defaultValue: "Forum",
    },
    { name: "excerpt", type: "textarea" },
    { name: "body", type: "textarea" },
    { name: "registrationUrl", type: "text" },
    { name: "coverImage", type: "upload", relationTo: "media" },
  ],
};
