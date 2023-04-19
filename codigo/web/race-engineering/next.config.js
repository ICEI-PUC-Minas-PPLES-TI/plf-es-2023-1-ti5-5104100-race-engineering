/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

//Acrescentei essa parte abaixo
module.exports = {
  images: {
    domains: ["images.unsplash.com", "openweathermap.org"],
  },
};
