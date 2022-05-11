import {
  Box,
  Typography,
  TextField,
  Card,
  CardHeader,
  Avatar,
   
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import { red } from "@mui/material/colors";
import { useForm, Controller } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useContext, useState } from "react";
import { api } from "src/services/api"


export default function FormRegister({ display, setVisible, alert }) {


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: ""
      
    },
  });

  const [loading, setLoading] = useState(false);




  async function signUp(data) {
    setLoading(!loading);

    api.post("usuarios", data)
    .then(res => {
      if (res.status === 200) {
        setLoading(false)
        setVisible(0)
        alert(true)

      }
      })

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
            <CloseIcon />
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
                <TextField {...field} label="Usuário" variant="standard" />
              )}
            />
            {errors.username?.type === "required" &&
              "Entre com o nome de usuário"}
              <Controller
              control={control}
              name="email"
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} label="Email" variant="standard" />
              )}
            />
            {errors.email && "Email é obrigatório"}
            <Controller
              control={control}
              name="password"
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} label="Senha" variant="standard" />
              )}
            />
            {errors.password && "Você esqueceu a senha"}
            
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
