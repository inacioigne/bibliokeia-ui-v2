import Head from "next/head";
import { Box, Container, Typography, Divider, TextField   } from "@mui/material";
import { theme } from "src/theme";
import { DashboardLayout } from "src/layouts/dashboard-layout";
import Layout from "src/layouts/layoutMain";
import { ThemeProvider } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";

export default function UserRegister() {

    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
          name: "",
          password: "",
        },
      });

  return (
    <>
      <Head>
        <title> BiblioKeia | Cadastro de usuários </title>
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
      <Typography variant="h3" gutterBottom component="div">
        Identificação
      </Typography>
      <Divider />
      <Box sx={{ mt: 2}}>
      <TextField id="outlined-basic" label="Nome" variant="outlined" />
      <Controller
              control={control}
              name="name"
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} label="Nome" variant="standard" />
              )}
            />

      </Box>
      
      

      </Container>
        
      </Box>
    </>
  );
}

UserRegister.getLayout = function getLayout(page) {
    return (
      <Layout>
        <ThemeProvider theme={theme}>
          <DashboardLayout>{page}</DashboardLayout>
        </ThemeProvider>
      </Layout>
    );
  };