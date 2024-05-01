/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "i.annihil.us",
        pathname: "**",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
