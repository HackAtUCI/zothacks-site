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
				destination: "https://forms.gle/2vZ1pqNWk27qZc236",
				permanent: true,
			},
			{
				source: "/mentor",
				destination: "https://forms.gle/RBJ6RL1LBpmGfk3w6",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
