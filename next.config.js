/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images-na.ssl-images-amazon.com', 
      'm.media-amazon.com',
      'localhost',
      'photos.app.goo.gl'
    ],
  },
}

module.exports = nextConfig
