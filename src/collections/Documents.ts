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
      options: [
        "Guide",
        "Presentation",
        "Report",
        "One-pager",
        "Legal",
        "Region brief",
        "Sector offer",
      ],
      defaultValue: "Guide",
    },
    { name: "description", type: "textarea" },
    {
      name: "file",
      type: "upload",
      relationTo: "media",
      admin: { description: "Upload a file, or use externalUrl instead." },
      validate: (
        value: unknown,
        { data }: { data?: { externalUrl?: string | null } },
      ) => {
        const external = String(data?.externalUrl ?? "").trim();
        if (!value && !external) {
          return "Upload a file or provide an external URL.";
        }
        return true;
      },
    },
    {
      name: "externalUrl",
      type: "text",
      admin: { description: "Optional external link if not uploading a file." },
      validate: (
        value: unknown,
        { data }: { data?: { file?: unknown } },
      ) => {
        const external = String(value ?? "").trim();
        if (!data?.file && !external) {
          return "Upload a file or provide an external URL.";
        }
        if (external === "#") {
          return "Enter a real URL, not #.";
        }
        return true;
      },
    },
    { name: "dateLabel", type: "text", admin: { placeholder: "2026" } },
  ],
};
