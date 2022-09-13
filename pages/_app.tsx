/* eslint-disable @next/next/no-page-custom-font */
import React from 'react';
import app, { AppContext, AppProps } from 'next/app';
import { Provider } from 'mobx-react';
import { NextPageContext, NextComponentType } from 'next';
import initializeStore, { RootStore } from '../stores';
import Navigation from '../components/Navigation';
import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import muiTheme from '../theme'
import _JSXStyle from 'styled-jsx/style'

export type MyPageContext = NextPageContext & {
  store?: RootStore;
};

const theme = createTheme(muiTheme)

type MyAppContext = Omit<AppContext, 'Component' | 'ctx'> & {
  Component: NextComponentType;
  ctx: MyPageContext;
};

type MyAppProps = AppProps & {
  initialMobxState: RootStore;
};

class CustomApp extends app {
  store: RootStore;

  static async getInitialProps(context: MyAppContext) {
    const mobxStore = initializeStore();
    context.ctx.store = mobxStore;
    const appProps = await app.getInitialProps(context);
    return {
      ...appProps,
      initialMobxState: mobxStore,
    };
  }

  constructor(props: MyAppProps) {
    super(props);
    const isServer = typeof window === 'undefined';
    this.store = isServer
      ? props.initialMobxState
      : initializeStore(props.initialMobxState);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
        <Provider {...this.store}>
          <ThemeProvider theme={theme}>
          <_JSXStyle>{`
            body {
              margin: 0;
              padding: 0;
              font-size: 18px;
              font-weight: 400;
              line-height: 1.8;
              color: #333;
              font-family: sans-serif;
            }
          `}</_JSXStyle>
            <Navigation />
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
    );
  }
}

export default CustomApp;
