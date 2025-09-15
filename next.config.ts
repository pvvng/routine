import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "img1.kakaocdn.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "t1.kakaocdn.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
