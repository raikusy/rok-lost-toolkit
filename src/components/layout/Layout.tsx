import type { NextPage } from "next";
import { Page } from "@geist-ui/react";
import Image from "next/image";

import logo from "../../../public/raiku-logo.png";

const Layout: NextPage = ({ children }) => {
  return (
    <Page>
      <Page.Header className="text-center">
        <Image src={logo} alt="Raiku GaminGG" width={200} height={200} />
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
