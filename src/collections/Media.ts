import type { CollectionConfig } from "payload";

// Uploaded images (news covers, project photos). Files are stored under
// /public/media so they serve directly.
export const Media: CollectionConfig = {
  slug: "media",
  access: { read: () => true },
  upload: {
    staticDir: "public/media",
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "card", width: 800, height: 600, position: "centre" },
      { name: "wide", width: 1600, height: 900, position: "centre" },
    ],
  },
  fields: [
    { name: "alt", type: "text", label: "Alt text" },
  ],
};
