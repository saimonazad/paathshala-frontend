import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../utils/theme";
import Layout from "../layouts/app-layout";
import { AuthProvider } from "../../authentication";
import "font-awesome/css/font-awesome.min.css";

//redux store
import withRedux from "next-redux-wrapper";

import { Provider as ReduxProvider, useStore } from "react-redux";

import { wrapper } from "../redux/store";
function MyApp(props) {
  const { Component, pageProps, router } = props;
  const store = useStore(pageProps.initialReduxState);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  if (
    router.pathname.startsWith("/signup") ||
    router.pathname.startsWith("/signin")
  ) {
    return (
      <React.Fragment>
        <Head>
          <title>Welcome to Paathshala!</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </AuthProvider>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Layout>
            <ReduxProvider store={store}>
              <Component {...pageProps} />
            </ReduxProvider>
          </Layout>
        </ThemeProvider>
      </AuthProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default wrapper.withRedux(MyApp);
