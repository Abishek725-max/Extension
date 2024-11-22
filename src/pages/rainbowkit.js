import React, { useEffect, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  connectorsForWallets,
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
  lightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import {
  rainbowWallet,
  metaMaskWallet,
  walletConnectWallet,
  coinbaseWallet,
} from "@rainbow-me/rainbowkit/wallets";

import { WagmiProvider } from "wagmi";
import { createConfig, http } from "@wagmi/core";
import { mainnet, holesky } from "@wagmi/core/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createSiweMessage, parseSiweMessage } from "viem/siwe";
import "@rainbow-me/rainbowkit/styles.css";
import { getCookies, removeCookies, setCookies } from "../utils/cookies";

/*const url = "http://localhost:8081"*/
const url = "https://dataapi.openledger.dev";
//const url = 'http://35.200.162.126:8081';
//const url = 'http://192.168.18.55:8081';
const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        rainbowWallet,
        metaMaskWallet,
        walletConnectWallet,
        coinbaseWallet,
      ],
    },
  ],
  {
    appName: "open_db",
    projectId: "5f0d281fdf1893ddf2216780b2f54753",
  }
);

const config = createConfig({
  //autoConnect: true,
  connectors,
  chains: [mainnet, holesky],
  transports: {
    [mainnet.id]: http(),
    [holesky.id]: http(),
  },
});

const queryClient = new QueryClient();

const RainbowKitWallet = ({ children }) => {
  const [authStatus, setAuthStatus] = useState("unauthenticated");
  useEffect(() => {
    let auth_token = getCookies();
    const fetchUser = async () => {
      if (auth_token !== null) {
        setAuthStatus("authenticated");
      } else {
        setAuthStatus("unauthenticated");
      }
    };
    fetchUser();
  }, [setAuthStatus]);

  const authAdaptor = createAuthenticationAdapter({
    getNonce: async () => {
      const response = await fetch(url + "/api/v1/auth/nonce");
      const {
        data: { nonce },
      } = await response.json();
      return nonce;
    },

    createMessage: ({ nonce, address, chainId }) => {
      return createSiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce,
      });
    },

    verify: async ({ message, signature }) => {
      const verifyRes = await fetch(url + "/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: parseSiweMessage(message),
          signature,
        }),
      });
      const {
        data: { token },
      } = await verifyRes.json();

      if (token != "") {
        // localStorage.setItem("token_id", token);
        setCookies(token);
        setAuthStatus("authenticated");
        return true;
      }
      return false;
    },

    signOut: async () => {
      // localStorage.removeItem("token_id");
      removeCookies();
      setAuthStatus("unauthenticated");
      //await fetch('http://localhost:8081/logout');
    },
  });

  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitAuthenticationProvider
            adapter={authAdaptor}
            status={authStatus}
          >
            <RainbowKitProvider
              modalSize="compact"
              theme={{
                lightMode: lightTheme({
                  accentColor: "#356ff5",
                  accentColorForeground: "white",
                  borderRadius: "medium",
                  fontStack: "system",
                  overlayBlur: "small",
                }),
                darkMode: darkTheme({
                  accentColor: "#356ff5",
                  accentColorForeground: "white",
                  borderRadius: "medium",
                  fontStack: "system",
                  overlayBlur: "small",
                }),
              }}
            >
              {children}
            </RainbowKitProvider>
          </RainbowKitAuthenticationProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
};
export default RainbowKitWallet;
