import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	/* config options here */
	eslint: {
		ignoreDuringBuilds: true,
	},
	async redirects() {
		return [
			{
				source: "/apply",
				destination: "https://forms.gle/QpUJkTwvakYs7Cvq6",
				permanent: true,
			},
		];
	},
};

export default nextConfig
