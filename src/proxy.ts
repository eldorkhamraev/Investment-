import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for API routes, Next.js internals, Payload
  // admin, and files with an extension (e.g. favicon.ico, images).
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
