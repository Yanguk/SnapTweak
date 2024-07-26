const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	assetPrefix: isProd ? '/SnapTweak' : undefined
};

export default nextConfig;
