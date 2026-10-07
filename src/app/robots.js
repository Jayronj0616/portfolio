import { getSiteUrl } from "@/lib/siteUrl";

export default function robots() {
  const siteUrl = getSiteUrl();
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/admin" },
    ...(siteUrl && { sitemap: `${siteUrl}/sitemap.xml` }),
  };
}
