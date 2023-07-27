import type { NextPage } from "next";
import { Page } from "@geist-ui/react";
import Image from "next/image";
import { Twitter, Youtube } from "@geist-ui/react-icons";

const Layout: NextPage = ({ children }) => {
  return (
    <Page className="min-h-screen" render="effect-seo">
      <Page.Header className="p-4 text-center flex justify-between items-center align-middle">
        <Image
          src="/raiku-logo.png"
          alt="Raiku GaminGG"
          width={170}
          height={170}
        />
        <div className="w-full text-center">
          <h2>Fancy Mail Tool ✍️ Rise of Kingdoms</h2>
        </div>
        <Image
          src="/logo_rok.png"
          alt="Rise of Kingdoms"
          width={267}
          height={120}
        />
      </Page.Header>
      <Page.Content className="min-h-full overflow-hidden p-4 my-8">
        {children}
      </Page.Content>
      <Page.Footer
        style={{ position: "relative" }}
        className="text-center p-4 overflow-hidden"
      >
        <a
          href="https://www.buymeacoffee.com/raiku"
          target="_blank"
          rel="noreferrer"
          className="box-border"
        >
          <Image
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
            alt="Buy Me A Coffee"
            height={60}
            width={217}
            className="shadow-md block"
          />
        </a>
        <h4>Developed with 🖤 by Raiku</h4>
      </Page.Footer>
    </Page>
  );
};

export default Layout;
