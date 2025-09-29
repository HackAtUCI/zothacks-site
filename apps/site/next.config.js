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
				destination: "https://docs.google.com/forms/d/e/1FAIpQLSc68omDO40vn16-QmmdrvVgdLh9vFN623u5hLOG64je8t_VQA/viewform?usp=dialog",
				permanent: true,
			},
		];
	},

	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: `${process.env.IH_BACKEND_URL || "https://irvinehacks.com"}/:path*`,
			},
		];
	},
};

module.exports = nextConfig;
