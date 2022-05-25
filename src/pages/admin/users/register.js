import Head from "next/head";
import { Box, Container, Typography, Divider, TextField } from "@mui/material";
import { theme } from "src/theme";
import { DashboardLayout } from "src/layouts/dashboard-layout";
import Layout from "src/layouts/layoutMain";
import { ThemeProvider } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";

export default function UserRegister() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      surname: "",
      birth: "",
    },
  });

  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    console.log("RG: ", data);
  };

  if (errors) {
    console.log("ER: ", errors);
  }

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
          <form>
            <Typography variant="h3" gutterBottom component="div">
              Identificação
            </Typography>
            <Divider />
            <Box sx={{ mt: 2, display: "flex", gap: 3 }}>
              <Controller
                control={control}
                name="name"
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField {...field} label="Nome" variant="standard" />
                )}
              />
              <Controller
                control={control}
                name="surname"
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField {...field} label="Sobrenome" variant="standard" />
                )}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                  control={control}
                  name="birth"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <DatePicker
                      label="Basic example"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>

            <LoadingButton
              sx={{ m: 2 }}
              onClick={handleSubmit(onSubmit)}
              loading={loading}
              variant="outlined"
            >
              Salvar
            </LoadingButton>
          </form>
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
