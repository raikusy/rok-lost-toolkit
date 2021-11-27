import RichTextEditor from "components/Editor";
import Layout from "components/layout/Layout";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Rise of Kingdom - Lost Toolkit</title>
        <meta
          name="description"
          content="Rise of Kingdoms - A tool to write mails with text styles, colors in a easy rich text editor and get the HTML code for it."
        />
      </Head>
      <RichTextEditor />
    </Layout>
  );
};

export default Home;
