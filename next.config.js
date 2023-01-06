/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  },
  images: {
    domains: ['res.cloudinary.com'],
},
}

module.exports = nextConfig
