const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	sassOptions: {
		includePaths: [path.join(__dirname, "src", "lib", "styles")],
	},

	async redirects() {
		const ihSiteUrl =
			process.env.IH_SITE_URL ||
			(process.env.NODE_ENV === "development"
				? "http://localhost:3001"
				: "https://irvinehacks.com");

		return [
			{
				source: "/admin/:path*",
				destination: `${ihSiteUrl}/admin/:path*`,
				permanent: false,
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
