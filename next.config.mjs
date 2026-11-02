// Private URL for the admin dashboard, kept out of the public repo. The pages
// stay in src/app/admin/; this maps /<slug> onto them and src/proxy.js hides
// the real /admin. See src/lib/adminPath.js. Unset (or "admin") changes nothing.
const adminSlug = process.env.NEXT_PUBLIC_ADMIN_PATH;
if (adminSlug && !/^[a-z0-9-]{8,}$/i.test(adminSlug)) {
  throw new Error(
    "NEXT_PUBLIC_ADMIN_PATH must be at least 8 characters of letters, digits or dashes."
  );
}
const privateAdmin = adminSlug && adminSlug !== "admin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The login page is a client component and cannot export metadata, so keep
  // the whole private path out of search results with a header instead.
  async headers() {
    if (!privateAdmin) return [];
    return [
      {
        source: `/${adminSlug}/:path*`,
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async rewrites() {
    if (!privateAdmin) return [];
    return {
      beforeFiles: [
        { source: `/${adminSlug}`, destination: "/admin" },
        { source: `/${adminSlug}/:path*`, destination: "/admin/:path*" },
      ],
    };
  },
  images: {
    // Serve images as-is instead of through Vercel's image optimizer. The
    // Hobby plan's optimization quota ran out on 2026-10-31 and every
    // /_next/image request then returned 402
    // OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED, so every project cover and
    // the hero photo rendered as broken images. The static files themselves
    // were fine. Keep source images reasonably sized, since nothing resizes
    // them now.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
