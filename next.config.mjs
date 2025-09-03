/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",       // Unsplash images
      "d7aqjcds6mrq5.cloudfront.net", // Your CloudFront images
    ],
  },
};

export default nextConfig;
