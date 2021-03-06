import {
  Box,
  Typography,
  TextField,
  Card,
  CardHeader,
  Avatar,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton
} from "@mui/material/";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { useForm, Controller } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useContext, useState } from "react";
import { api } from "src/services/api";

export default function FormRegister({ display, setVisible, alert }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  async function signUp(data) {
    setLoading(!loading);
    //console.log(data)
    api
      .post("user/register", data)
      .then((res) => {
        if (res.status === 201) {
          setLoading(false);
          setVisible(0);
          alert({
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
          alert({
            visible: true,
            msg: error.response.data.detail,
            severity: "error",
            anchorOrigin: { vertical: "top", horizontal: "center" },
          });
        }
      }); 
  }

  return (
    <Card sx={display === 1 ? { minWidth: 400 } : { display: "none" }}>
      <CardHeader
        action={
          <Avatar
            onClick={() => {
              setVisible(0);
            }}
            sx={{ bgcolor: red[500], cursor: "pointer" }}
          >
            <Close />
          </Avatar>
        }
      />
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        borderLeft={5}
        borderColor="secondary.main"
        //mt={5}
        pl={5}
      >
        Cadastro
      </Typography>
      <Box pl={5} pr={5}>
        <form
        //onSubmit={handleSubmit(signUp)}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Controller
              control={control}
              name="name"
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} label="Usu??rio" variant="standard" />
              )}
            />
            {errors.username?.type === "required" &&
              "Entre com o nome de usu??rio"}
            <Controller
              control={control}
              name="email"
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} label="Email" variant="standard" />
              )}
            />
            {errors.email && "Email ?? obrigat??rio"}
            
            <Controller
              control={control}
              name="password"
              rules={{ required: true }}
              render={({ field }) => (
                // <TextField {...field} label="Senha" variant="standard" />
                <FormControl variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
            <Input {...field}
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            //value={values.password}
            //onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => { setShowPassword(!showPassword)}}
                  //onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
              
            </FormControl>
              )}
            />
            {errors.password && "Voc?? esqueceu a senha"}
            

            <Box
              sx={{ display: "flex", justifyContent: "center" }}
              mt={3}
              mb={5}
            >
              <LoadingButton
                onClick={handleSubmit(signUp)}
                loading={loading}
                variant="outlined"
                sx={{ width: "15rem" }}
              >
                Salvar
              </LoadingButton>
            </Box>
          </Box>
        </form>
      </Box>
    </Card>
  );
}
