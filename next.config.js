/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    nextauth_secret: process.env.NEXTAUTH_SECRET,
    keycloak: {
      client_id: process.env.KEYCLOAK_CLIENT_ID,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
      url: process.env.KEYCLOAK_URL,
      realm: process.env.KEYCLOAK_REALM,
    },
  },
  publicRuntimeConfig: {
    url: process.env.URL,
    apiUrl: process.env.API_URL,
  },
  output: "standalone",
};

module.exports = nextConfig;
