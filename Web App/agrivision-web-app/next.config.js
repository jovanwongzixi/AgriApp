/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        BASE_URL: process.env.NEXT_PUBLIC_BASE_URL ? process.env.NEXT_PUBLIC_BASE_URL : ''
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                pathname: '/**',
            }
        ]
    }
}

module.exports = nextConfig
