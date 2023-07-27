import RichTextEditor from "components/Editor";
import Layout from "components/layout/Layout";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Fancy Mail Tool ~ Rise of Kingdoms</title>
        <meta
          name="description"
          content="Fancy Mail Tool ~ Rise of Kingdoms | Make Fancy Mails with ease for Event Plans, Kingdom Announcments, WAR instructions!"
        />
      </Head>
      <RichTextEditor />
    </Layout>
  );
};

export default Home;
