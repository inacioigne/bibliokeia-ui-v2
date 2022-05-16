import Layout from "src/admin/layout";
import { parseCookies } from "nookies";
import { Container, Box, Tabs, Tab } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { ItemProvider } from "src/admin/contexts/itemContext";
import MetadataEdit from "src/components/cataloguing/metadataEdit"


export default function ItemEdit() {

  return (
    <ItemProvider>
      <Container>
        <h1>Edit</h1>
      {/* <MetadataEdit /> */}
      
      </Container>
    </ItemProvider>
  );
}

ItemEdit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async (ctx) => {
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
