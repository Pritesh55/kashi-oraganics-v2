/** @type {import('next').NextConfig} */
// ---------------------------------------


export const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  experimental: {
    scrollRestoration: true,
  },
};

