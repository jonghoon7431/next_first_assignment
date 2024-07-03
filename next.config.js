// import { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: ["raw.githubusercontent.com"],
//   },
// };

// export default nextConfig;

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/PokeAPI/sprites/master/sprites/pokemon/**",
      },
    ],
  },
};
