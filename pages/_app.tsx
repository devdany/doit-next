import React from 'react';
import '../assets/styles/index.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import GlobalProvider from '../contexts';
import 'react-dropdown/style.css';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>DOIT SWAP</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta property="og:title" content="doitswap" />
        <meta name="twitter:title" content="doitswap" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </>
  );
}
