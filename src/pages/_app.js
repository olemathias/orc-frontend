import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "utils/theme";
import createEmotionCache from "utils/createEmotionCache";
import { SessionProvider } from "next-auth/react";
import axios from "axios";
import getConfig from "next/config";

import Layout from "./_layout";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const { publicRuntimeConfig } = getConfig();

export default function App({
  Component,
  pageProps,
  user,
  emotionCache = clientSideEmotionCache,
}) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Orc</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SessionProvider session={pageProps?.session}>
          <Layout user={user}>
            <Component {...pageProps} user={user} />
          </Layout>
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
};

App.getInitialProps = async (appContext) => {
  const cookieName =
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";

  // Server Side
  if (appContext.ctx.req) {
    try {
      const response = await axios({
        method: "GET",
        url: `${publicRuntimeConfig.url}/api/auth/user`,
        headers: {
          Cookie: `${cookieName}=${appContext.ctx.req.cookies[cookieName]}`,
        },
      });
      return { user: response?.data?.user };
    } catch (e) {
      return { user: null, error: e?.data?.user };
    }
  }

  // Client Side
  const response = await fetch(`${publicRuntimeConfig.url}/api/auth/user`, {
    credentials: "same-origin",
  });
  const data = await response.json();
  return { user: data.user };
};
