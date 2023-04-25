import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/header.css";

import { AuthProvider } from "@/context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}
