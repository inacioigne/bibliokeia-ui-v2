import Head from "next/head";
import styles from "../styles/Home.module.css";
import { parseCookies } from "nookies";
import Layout from "src/layouts/layoutMain";
import LayoutAdmin from "src/admin/layouts/layoutAdmin";
import LayoutOpac from "src/opac/layout/layout_opac";
import Image from "next/image";
import { Box } from '@mui/material';



export default function Home() {
  return (
    <Box sx={{ 
      position: 'fixed',
      top: 0,
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
      zIndex: -1
    }}>
      <Image src="/img/bg-presentation.jpg" layout="fill" objectFit="cover" />
      <p >
      Image Component
      <br />
      as a Background
    </p>
    </Box>
  );
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      <LayoutOpac>
        <LayoutAdmin>{page}</LayoutAdmin>
      </LayoutOpac>
    </Layout>
  );
};

/* export const getServerSideProps = async (ctx) => {
  const { ["bibliokeia.token"]: token } = parseCookies(ctx);
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
 */
