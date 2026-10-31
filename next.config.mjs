/** @type {import('next').NextConfig} */
const nextConfig = {
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
