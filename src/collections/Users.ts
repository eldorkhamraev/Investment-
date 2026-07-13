import type { CollectionConfig } from "payload";

// Admin users who log in to manage content.
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email" },
  fields: [
    { name: "name", type: "text" },
  ],
};
