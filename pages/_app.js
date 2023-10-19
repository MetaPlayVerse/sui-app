import "../styles/globals.css";
import MainLayout from "../layout/mainLayout";
import { WalletProvider } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
// import {
//   LivepeerConfig,
//   ThemeConfig,
//   createReactClient,
// } from "@livepeer/react";
import React, { createContext, useMemo } from "react";
// import LivepeerClient from "../client";
// import { AptosClient } from "aptos";
// export const AptosContext = createContext(AptosClient);

const theme = {
  colors: {
    accent: "rgb(0, 145, 255)",
    containerBorderColor: "rgba(0, 145, 255, 0.9)",
  },
  fonts: {
    display: "Inter",
  },
};

function MyApp({ Component, pageProps }) {
  return (
    // <AptosContext.Provider value={aptosClient}>
    //   <LivepeerConfig client={LivepeerClient} theme={theme}>
    //     <MainLayout>
    //       <Component {...pageProps} />
    //     </MainLayout>
    //   </LivepeerConfig>
    // </AptosContext.Provider>

    <WalletProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </WalletProvider>


  );
}

export default MyApp;
