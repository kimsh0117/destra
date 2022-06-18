/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/auth/:path*',
        destination: '/api/auth/:path*',
      },
    ]
  },
  webpack(config) {
    // for svg image import
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    API_URL: process.env.API_URL,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_URL: process.env.API_URL,
    NODE_ENV: process.env.NODE_ENV,
    ENV_NAME: process.env.ENV_NAME,
    NEXT_AUTH_URL: process.env.NEXTAUTH_URL,
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
    removeConsole: process.env.NODE_ENV !== 'development',
  },
}

module.exports = withBundleAnalyzer({
  ...nextConfig,
})
