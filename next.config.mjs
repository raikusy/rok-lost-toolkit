/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.buymeacoffee.com",
      },
    ],
  },
};

export default nextConfig;
