import type { NextPage } from "next";
// import Head from "next/head";
// import styles from "styles/Home.module.css";
import { Page } from "@geist-ui/react";

const Layout: NextPage = ({ children }) => {
  return (
    <Page>
      <Page.Header className="text-center">
        <h2>Rise of Kingdoms: Lost Toolkit</h2>
      </Page.Header>
      <Page.Content className="min-h-full">{children}</Page.Content>
      <Page.Footer className="text-center">
        <h4>Created with ❤️ by Raiku (KD#2417)</h4>
      </Page.Footer>
    </Page>
  );
};

export default Layout;
