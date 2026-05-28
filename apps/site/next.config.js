const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	sassOptions: {
		includePaths: [path.join(__dirname, "src", "lib", "styles")],
	},
	/* TODO: Remove redirects once we have the new site up and running */
	async redirects() {
		return [
			{
				source: "/apply",
				destination: "/",
				permanent: false,
			},
			{
				source: "/apply/hacker",
				destination: "/",
				permanent: false,
			},
			{
				source: "/apply-mentor",
				destination: "/",
				permanent: false,
			},
			{
				source: "/auth",
				destination: "/",
				permanent: false,
			},
			{
				source: "/guest-login",
				destination: "/",
				permanent: false,
			},
			{
				source: "/login",
				destination: "/",
				permanent: false,
			},
			{
				source: "/logout",
				destination: "/",
				permanent: false,
			},
			{
				source: "/portal",
				destination: "/",
				permanent: false,
			},
			{
				source: "/mentor",
				destination: "/",
				permanent: false,
			},
			{
				source: "/incident",
				destination: "/",
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
