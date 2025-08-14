/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.ibb.co.com',
                pathname: '/VchDSN9R/Blue-Modern-Business-Corporate-Logo-1.png', 
            },
        ],
    },
};

export default nextConfig;
