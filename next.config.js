/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    env: {
        GOOGLE_CLIENT_ID: "1021110901906-lru2hetvust69trm4shurnts8t8n9lvd.apps.googleusercontent.com",
        GOOGLE_CLIENT_SECRET: "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",
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/Water',
                permanent: true,
            },
        ]
    }
}

module.exports = nextConfig;
