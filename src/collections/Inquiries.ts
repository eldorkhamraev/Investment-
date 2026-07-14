import type { CollectionConfig } from "payload";

// Contact-form submissions. Anyone can create one (the public form posts here);
// only logged-in staff can read, edit or delete them from the admin panel.
export const Inquiries: CollectionConfig = {
  slug: "inquiries",
  labels: { singular: "Inquiry", plural: "Inquiries" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "interest", "status", "createdAt"],
    description: "Messages sent through the website contact form.",
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Read", value: "read" },
        { label: "Replied", value: "replied" },
      ],
      admin: {
        position: "sidebar",
        description: "Mark messages as you work through them.",
      },
    },
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "company", type: "text" },
    { name: "country", type: "text" },
    { name: "interest", type: "text" },
    { name: "message", type: "textarea", required: true },
  ],
};
