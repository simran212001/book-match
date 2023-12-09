//  Next.js modules
import Head from "next/head";
import { NextPage } from "next";
// Components
import AppBar from "@/components/AppBar";
import LineGraph from "@/components/LineGraph";
import QuestionForm from "@/components/QuestionForm";
import NameForm from "@/components/NameForm";
import BookList from "@/components/BookList";
//  Constants
import { appTitle } from "utils/constants";

const Home: NextPage = () => {
  return (
    <div className="mb-8">
      <Head>
        <title>{appTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <AppBar />
      <NameForm />
      <QuestionForm />
      <LineGraph />
      <BookList />
    </div>
  );
};

export default Home;
