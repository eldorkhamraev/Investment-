import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { News } from "./collections/News";
import { Projects } from "./collections/Projects";
import { Inquiries } from "./collections/Inquiries";
import { Stories } from "./collections/Stories";
import { Events } from "./collections/Events";
import { Documents } from "./collections/Documents";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "· Investment Project Office",
    },
  },
  collections: [
    News,
    Projects,
    Stories,
    Events,
    Documents,
    Inquiries,
    Media,
    Users,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || "file:./ipo.db",
    },
  }),
  sharp,
});
