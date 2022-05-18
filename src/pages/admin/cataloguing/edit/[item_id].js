import { parseCookies } from "nookies";
import { Container, Box, Tabs, Tab } from "@mui/material";
import { useState, useEffect, useContext } from "react";
//import MetadataEdit from "src/components/cataloguing/metadataEdit"
import { ItemProvider } from 'src/admin/contexts/itemContext'
import { DashboardLayout } from "src/layouts/dashboard-layout";
import Layout from "src/layouts/layoutMain";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "src/theme";
import ItemEdit from "src/admin/components/cataloguing/edit/item_edit"




export default function Edit() { 

  return (
    <ItemProvider>
      <ItemEdit />

    </ItemProvider>
  );
}



ItemEdit.getLayout = function getLayout(page) {
  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <DashboardLayout>{page}</DashboardLayout>
      </ThemeProvider>
    </Layout>
  );
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
