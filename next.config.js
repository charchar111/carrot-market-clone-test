/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "imagedelivery.net",
      "customer-5cl8o9i7l8w678o9.cloudflarestream.com",
      // CLOUDFLARE_CUSTOMER_SUBDOMAIN
    ],
  },
  // plugins: ["prettier-plugin-tailwindcss"],
};

module.exports = nextConfig;
