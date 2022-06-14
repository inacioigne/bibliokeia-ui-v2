import { api } from "src/services/solr_acervo";
import Layout from "src/layouts/layoutMain";
import { ThemeProvider } from "@mui/material/styles";
import { DashboardLayout } from "src/layouts/dashboard-layout";
import { theme } from "src/theme";
import {
  Card,
  Box,
  Container,
  CardContent,
  Typography,
  Skeleton,
} from "@mui/material/";

export default function Acervo({ docs }) {
  console.log("A: ", docs);

  return (
    <Container>
      {docs.map((doc, index) => (
        <Card key={index} sx={{ display: "flex", m: 3 }}>
          <Skeleton variant="rectangular" width={150} height={195} />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div"  variant="h6" >
                {doc.title}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {doc.author}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      ))}
    </Container>
  );
}

export async function getStaticProps() {
  const res = await api.get("/acervo/select?", {
    params: {
      q: "*:*",
    },
  });

  const data = await res.data.response;
  const docs = await data.docs;

  return {
    props: {
      docs,
    },
  };
}

Acervo.getLayout = function getLayout(page) {
  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <DashboardLayout>{page}</DashboardLayout>
      </ThemeProvider>
    </Layout>
  );
};
