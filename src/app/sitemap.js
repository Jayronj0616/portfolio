import { getSiteUrl } from "@/lib/siteUrl";

export default function sitemap() {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];

  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/projects`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
