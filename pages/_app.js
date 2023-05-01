import React from "react";
import { Layout } from "../components";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <Layout>
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  );
}

export default MyApp;
