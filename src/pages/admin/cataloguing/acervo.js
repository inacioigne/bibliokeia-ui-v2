import { api } from "src/services/solr_acervo";
import Layout from "src/layouts/layoutMain";
import { ThemeProvider } from "@mui/material/styles";
import { DashboardLayout } from "src/layouts/dashboard-layout";
import { theme } from "src/theme";
import Link from 'next/link'
import {
  Card,
  Box,
  Container,
  CardContent,
  Typography,
  Skeleton,
  Button,
  CardActions,
  TextField,
  IconButton
} from "@mui/material/";
import SearchIcon from '@mui/icons-material/Search';
import { useForm, useFieldArray } from "react-hook-form";
import { Controller } from "react-hook-form";

export default function Acervo({ docs }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      "search": ''
    }
  });

  const onSubmit = data => console.log(data);

  return (
    <Container>
      <Box sx={{display: "flex", m: 2, justifyContent: "center"}}>
      {/* <TextField id="outlined-basic" label="Busca" size={"small"} variant="outlined" /> */}
      <form  onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="search"
        control={control}
        render={({ field }) => 
        <TextField 
        {...field}
        label={"search"}
        size={"small"}
         />}
      />
      <IconButton 
      onClick={handleSubmit(onSubmit)}
      aria-label="search" size="large">
      <SearchIcon />

      </IconButton>
      </form>
     

      </Box>
      
      {docs.map((doc, index) => (
        <Card key={index} sx={{ display: "flex", m: 3 }}>
          <Skeleton variant="rectangular" width={150} height={195} />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <Typography component="div" variant="h6">
                  {doc.title}
                </Typography>
                <Typography component="div" variant="h6" sx={{ ml: 1 }}>
                  {doc.subtitle}
                </Typography>
              </Box>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {doc.responsibilities}
              </Typography>
              {doc.termo_topico.map((termo, index_termo) => (

                <Button key={index_termo} variant="outlined" size="small" sx={{mr: 1}}>{termo}</Button>
              ))}

              

            </CardContent>
            <CardActions>
            <Link href={`/admin/cataloguing/${doc.id}`}>
            <Button>Detalhes</Button>
            </Link>
            

            </CardActions>
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
