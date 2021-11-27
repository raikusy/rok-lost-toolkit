import RichTextEditor from "components/Editor";
import Layout from "components/layout/Layout";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <Layout>
      <RichTextEditor />
    </Layout>
  );
};

export default Home;
