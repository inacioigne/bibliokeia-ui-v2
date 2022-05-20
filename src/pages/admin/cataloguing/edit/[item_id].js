import Layout from "src/layouts/layoutMain";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "src/theme";
import { DashboardLayout } from "src/layouts/dashboard-layout";
import { ItemProvider } from 'src/admin/contexts/itemContext'
import { parseCookies } from "nookies";
import FormEdit from "src/admin/components/cataloguing/edit/form_edit"


export default function Item() {
  return (
    <ItemProvider>
      <FormEdit /> 
    </ItemProvider>
  );
}


Item.getLayout = function getLayout(page) {
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
