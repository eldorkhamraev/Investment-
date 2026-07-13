import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { withPayload } from "@payloadcms/next/withPayload";

// Point next-intl at the request config explicitly (a stray lockfile in the
// home directory otherwise confuses workspace-root inference).
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// The project directory. `next build`/`next dev` always run from here.
const projectRoot = process.cwd();

const nextConfig: NextConfig = {
  // Pin the workspace root so other lockfiles on the machine don't cause
  // Next to infer the wrong root.
  turbopack: { root: projectRoot },
  outputFileTracingRoot: projectRoot,
  images: {
    // Placeholder image source until real photography is supplied.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default withPayload(withNextIntl(nextConfig), { devBundleServerPackages: false });
