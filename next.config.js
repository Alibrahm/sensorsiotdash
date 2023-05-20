/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    env: {
        GOOGLE_CLIENT_ID: "1021110901906-lru2hetvust69trm4shurnts8t8n9lvd.apps.googleusercontent.com",
        GOOGLE_CLIENT_SECRET: "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",

        // GITHUB_ID: "b4d18396ed3611d8f8ac",
        // GITHUB_SECRET: "1779a43f7d4d4f3256197e8575242acf325cb569",
    },
 
}

module.exports = nextConfig
