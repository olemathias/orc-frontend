import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

export const authOptions = {
  secret: serverRuntimeConfig.nextauth_secret,
  providers: [
    KeycloakProvider({
      clientId: serverRuntimeConfig.keycloak.client_id,
      clientSecret: serverRuntimeConfig.keycloak.client_secret,
      issuer: `${serverRuntimeConfig.keycloak.url}/realms/${serverRuntimeConfig.keycloak.realm}`,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },
  },
};

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token) {
  console.log("refresh access token");
  try {
    const url = `${serverRuntimeConfig.keycloak.url}/realms/${serverRuntimeConfig.keycloak.realm}/protocol/openid-connect/token`;

    const response = await fetch(url, {
      body: new URLSearchParams({
        client_id: serverRuntimeConfig.keycloak.client_id,
        client_secret: serverRuntimeConfig.keycloak.client_secret,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth(authOptions);
