import RichTextEditor from "components/Editor";
import Layout from "components/layout/Layout";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Rise of Kingdom - Lost Toolkit</title>
      </Head>
      <RichTextEditor />
    </Layout>
  );
};

export default Home;
