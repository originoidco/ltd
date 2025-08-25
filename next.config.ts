import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    eslint: {
        ignoreDuringBuilds: true,
    },
    async redirects() {
        return [
            {
                source: "/careers",
                destination: "https://originoid-careers.notion.site/",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
