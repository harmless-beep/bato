/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BATO_BASE_PATH || ''
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath ? basePath + '/' : undefined,
}

module.exports = nextConfig
