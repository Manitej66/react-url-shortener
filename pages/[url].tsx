import Axios from "axios";
import { GetServerSideProps } from "next";

const Url = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { url } = context.params;

  const home =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://zf.vercel.app";

  const info = await Axios.post(`${home}/api/getShortUrl`, {
    url: url,
  });
  return {
    redirect: {
      destination: info.data,
      permanent: true,
    },
  };
};

export default Url;
