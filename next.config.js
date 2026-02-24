const fs = require('fs');
const gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);

const withTM = require('next-transpile-modules')(['mui-tel-input']);

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  reactStrictMode: false,
  // Disable output file tracing — it mass-opens all @mui/icons-material files
  // causing EMFILE: too many open files on Windows
  outputFileTracing: false,
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
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.parallelism = 1;
    return config;
  },
};
module.exports = withTM(nextConfig);
