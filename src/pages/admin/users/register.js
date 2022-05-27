import * as React from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Typography,
  Divider,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  Snackbar,
  Alert

} from "@mui/material";
import { theme } from "src/theme";
import { DashboardLayout } from "src/layouts/dashboard-layout";
import Layout from "src/layouts/layoutMain";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
//import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { IMaskInput } from "react-imask";
import PropTypes from "prop-types";
import { api } from "src/services/api";


const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(00) 00000-0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function UserRegister() {
  const [birth, setBirth] = useState(new Date());
  const [sex, setSex] = useState("");
  const [cellphone, setCellphone] = useState(null);
  const [vinculo, setVinculo] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnack, setSnack] = useState({
    visible: false, 
    msg: null,
    severity: null,
    anchorOrigin: { vertical: 'top', horizontal: 'left' }
  })

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: event.target.name.value,
      surname: event.target.surname.value,
      birth: `${birth.getDate()}/${
        birth.getMonth() + 1
      }/${birth.getFullYear()}`,
      sex: sex,
      vinculo: vinculo,
      addressStreet: event.target.addressStreet.value,
      addressNumber: event.target.addressNumber.value,
      addressDistrict: event.target.addressDistrict.value,
      addressCity: event.target.addressCity.value,
      addressCep: event.target.addressCep.value,
      email: event.target.email.value,
      cellphone: cellphone,
      password: event.target.password.value
    };

    api
      .post("user/register", data)
      .then((res) => {
        if (res.status === 201) {
          //setLoading(false);
          //setVisible(0);
          setSnack({
            visible: true,
            msg: 'Cadastro realizado com sucesso!',
            severity: "success",
            anchorOrigin: { vertical: "bottom", horizontal: "left" },
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          setLoading(false);
          setSnack({
            visible: true,
            msg: error.response.data.detail,
            severity: "error",
            anchorOrigin: { vertical: "top", horizontal: "center" },
          });
        }
      });

    console.log(data);
  };

  return (
    <>
      <Head>
        <title> BiblioKeia | Cadastro de usuários </title>
      </Head>
      <Container>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
            backgroundColor: theme.palette.background.default,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Typography variant="h3" gutterBottom component="div">
              Identificação
            </Typography>
            <Divider />
            <Box sx={{ mt: 2, mb: 2, display: "flex", gap: 3 }}>
              <TextField label="Nome" variant="standard" name="name" />
              <TextField label="Sobrenome" variant="standard" name="surname" />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Data de Nascimento"
                  inputFormat="dd/MM/yyyy"
                  value={birth}
                  onChange={(newValue) => {
                    setBirth(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </LocalizationProvider>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="sex-label">Sexo</InputLabel>
                <Select
                  labelId="sex-label"
                  id="sex"
                  value={sex}
                  onChange={(event) => {
                    setSex(event.target.value);
                  }}
                  label="Sexo"
                >
                  <MenuItem value="">
                    <em></em>
                  </MenuItem>
                  <MenuItem value={"M"}>Masculino</MenuItem>
                  <MenuItem value={"F"}>Feminino</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="vinculo">Vínculo</InputLabel>
                <Select
                  labelId="vinculo"
                  id="vinculo"
                  value={vinculo}
                  onChange={(event) => {
                    setVinculo(event.target.value);
                  }}
                  label="Vinculo"
                >
                  <MenuItem value="">
                    <em></em>
                  </MenuItem>
                  <MenuItem value={"Mestrando"}>Mestrando</MenuItem>
                  <MenuItem value={"Doutorando"}>Doutorando</MenuItem>
                  <MenuItem value={"Pesquisador"}>Pesquisador</MenuItem>
                  <MenuItem value={"Estagiario"}>Estagiário</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Typography variant="h3" gutterBottom component="div">
              Endereço
            </Typography>
            <Divider />
            <Box sx={{ mt: 2, mb: 2, display: "flex", gap: 3 }}>
              <TextField
                sx={{ width: "30rem" }}
                label="Rua"
                variant="standard"
                name="addressStreet"
              />
              <TextField
                sx={{ width: "5rem" }}
                label="Número"
                variant="standard"
                name="addressNumber"
              />
              <TextField
                label="Bairro"
                variant="standard"
                name="addressDistrict"
              />
              <TextField label="Cidade" variant="standard" name="addressCity" />
              <TextField label="CEP" variant="standard" name="addressCep" />
            </Box>
            <Typography variant="h3" gutterBottom component="div">
              Contato
            </Typography>
            <Divider />
            <Box sx={{ mt: 2, mb: 2, display: "flex", gap: 3 }}>
              <TextField
                sx={{ width: "30rem" }}
                label="Email"
                variant="standard"
                name="email"
              />
              <FormControl variant="standard">
                <InputLabel htmlFor="formatted-text-mask-input">
                  Celular
                </InputLabel>
                <Input
                  value={cellphone}
                  onChange={(event) => {
                    setCellphone(event.target.value);
                  }}
                  name="cellphone"
                  id="formatted-text-mask-input"
                  inputComponent={TextMaskCustom}
                />
              </FormControl>
            </Box>
            <Typography variant="h3" gutterBottom component="div">
              Login
            </Typography>
            <Divider />
            <Box sx={{ mt: 2, mb: 2, display: "flex", gap: 3 }}>
            <TextField label="Senha" variant="standard" name="password" />
              
            </Box>

            <Button variant="outlined" type="submit">
              Salvar
            </Button>

            {/* <LoadingButton
              sx={{ m: 2 }}
              onClick={handleSubmit()}
              loading={loading}
              variant="outlined"
            >
              Salvar
            </LoadingButton> */}
          </form>
        </Box>
      </Container>
      <Snackbar
        open={openSnack.visible}
        autoHideDuration={6000}
        onClose={() => {setSnack({visible: false, msg: null})}}
        anchorOrigin={openSnack.anchorOrigin}
      >
        <Alert severity={openSnack.severity}>{openSnack.msg}</Alert>
      </Snackbar>
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
