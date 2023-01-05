/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CLOUD_NAME: process.env.CLOUD_NAME,
  },
  images: {
    domains: ['res.cloudinary.com'],
},
}

module.exports = nextConfig
