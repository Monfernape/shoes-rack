/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/playground',   
            destination: process.env.NODE_ENV === 'production' ? '/404' : '/playground',
          },
        ];
      },
};

export default nextConfig;
