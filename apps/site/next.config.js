const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	sassOptions: {
		includePaths: [path.join(__dirname, "src", "lib", "styles")],
	},
	async redirects() {
		return [
			{
				source: "/apply",
				destination: "/",
				permanent: true,
			},
			{
				source: "/mentor",
				destination: "/",
				permanent: true,
			},
		];
	},

	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: `${process.env.IH_BACKEND_URL || "https://irvinehacks.com/api"}/:path*`,
			},
		];
	},
};

module.exports = nextConfig;
