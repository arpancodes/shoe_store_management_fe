import React from "react";
import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";
import Head from "next/head";

const Title = ({ title, noBack = false }) => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-10 md:w-5/6 w-full px-2 py-4 mx-auto">
      <Head>
        <title>
          {title} {!noBack ? "|" : ""} Shoe Verse
        </title>
      </Head>
      {!noBack && (
        <BiArrowBack
          className="text-4xl cursor-pointer"
          onClick={() => router.back()}
        />
      )}
      <span className="text-4xl">{title}</span>
    </div>
  );
};

export default Title;
