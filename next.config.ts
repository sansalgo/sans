import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
    turbopack: {
        root: path.join(__dirname)
    },
    async rewrites() {
        return [
            {
                source: "/components/:slug.md",
                destination: "/doc.md/:slug",
            },
        ]
    },
}

export default nextConfig
