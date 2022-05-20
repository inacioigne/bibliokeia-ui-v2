import { DashboardLayout } from "src/layouts/dashboard-layout";
import Layout from "src/layouts/layoutMain";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "src/theme";
//import theme from "src/theme/custom_theme"
import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { Book } from "src/admin/components/cataloguing/book/book";
import { parseCookies } from "nookies";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title> BiblioKeia | Dashboard</title>
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
              <Book />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

Dashboard.getLayout = function getLayout(page) {
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
