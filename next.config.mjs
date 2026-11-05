/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hub estático de DignityAI servido desde public/dignityai
  async rewrites() {
    return [{ source: '/dignityai', destination: '/dignityai/index.html' }];
  },
  async redirects() {
    return [{ source: '/dignityai/', destination: '/dignityai', permanent: false }];
  },
};

export default nextConfig;
