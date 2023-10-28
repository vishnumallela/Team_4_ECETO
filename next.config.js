/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        port: '',
        pathname: '/image/upload/**',
      },
    ],
  },
}