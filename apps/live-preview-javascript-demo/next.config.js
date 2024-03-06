/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: [
      "assets.caisy.io",
      "assets.caisy.app",
      "assets.staging.caisy.io",
      "assets.staging.caisy.app",
    ],
  },
  transpilePackages: [
    "@nicolasshiken/live-preview-react",
    "@nicolasshiken/live-preview-javascript",
  ],
};
