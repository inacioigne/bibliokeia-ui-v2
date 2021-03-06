import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { theme } from "src/theme";
import Layout from "src/layouts/layoutMain";
import { ThemeProvider } from "@mui/material/styles";
import { DashboardLayout } from "src/layouts/dashboard-layout";
import { parseCookies } from "nookies";
import {CardUser} from "src/admin/components/users/card_user"

export default function Users() {
  return (
    <>
      <Head>
        <title>BiblioKeia | Usuários</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          backgroundColor: theme.palette.background.default,
        }}
      >
      <Container maxWidth={false}>
      <Grid container spacing={3}>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
      <CardUser />
      

      </Grid>
    

      </Grid>
     

      </Container>
        
      </Box>
    </>
  );
}

Users.getLayout = function getLayout(page) {
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
