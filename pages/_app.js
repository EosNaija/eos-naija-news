import React from "react";
import { Layout } from "../components";
import { VercelProvider } from "@vercel/analytics";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <VercelProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </VercelProvider>
  );
}

export default MyApp;
