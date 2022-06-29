/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: false,
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["kluppdevelopment.s3.sa-east-1.amazonaws.com"]
  }
}

module.exports = nextConfig

