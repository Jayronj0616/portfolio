// Absolute origin of the deployed site, used for canonical URLs, Open Graph
// tags, robots.txt and the sitemap. Set NEXT_PUBLIC_SITE_URL once the site has
// a custom domain; until then Vercel supplies the production hostname itself.
// Returns null when neither is available (plain local dev), so callers can
// skip absolute URLs rather than emit a wrong one.
export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelHost) return `https://${vercelHost}`;

  return null;
}
