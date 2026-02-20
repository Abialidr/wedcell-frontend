/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  reactStrictMode: false,
  images: {
    loader: "akamai",
    path: "",
    domains: [
      "www.wedfield.com",
      "wedfield.com",
      "images.pexels.com",
      "wedfield.cloudjiffy.net",
      "wedfield.herokuapp.com",
      "www.vhv.rs",
      "vhv.rs",
      "pngset.com",
      "upload.wikimedia.org",
      "www.upload.wikimedia.org",
      "wedfield-s3-next.s3.ap-south-1.amazonaws.com",
      "localhost",
      "cdn.pixabay.com",
      "images.unsplash.com",
      "https://wedfield.s3.ap-south-1.amazonaws.com/",
      "wedfield.s3.ap-south-1.amazonaws.com",
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
module.exports = nextConfig;
