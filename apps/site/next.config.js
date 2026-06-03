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
				destination: "https://forms.gle/nxRU44y9Gd5mrmXUA",
				permanent: true,
			},
			{
				source: "/mentor",
				destination: "https://forms.gle/fwWJtsQ3GXQFGjS47",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
