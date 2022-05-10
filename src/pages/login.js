import { useForm, Controller } from "react-hook-form";
import { Container, Box, Typography, TextField, Card } from "@mui/material/";
import { LoadingButton } from "@mui/lab";
import { useContext, useState } from "react";
import { AuthContext } from "src/auth/authContext"

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { user, signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  async function handleSignIn(data) {
    setLoading(!loading)
    const res = await signIn(data);
  }

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ minWidth: 400 }}>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          borderLeft={5}
          borderColor="secondary.main"
          mt={5}
          pl={5}
        >
          BiblioKeia
        </Typography>
        <form
        onSubmit={handleSubmit(handleSignIn)}
        >
          <Box
            pl={5}
            pr={5}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <Controller
              control={control}
              name="username"
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} label="Usuário" variant="standard" />
              )}
            />
            {errors.username?.type === "required" &&
              "Entre com o nome de usuário"}
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
            mb={3}
            >
              <LoadingButton
                onClick={handleSubmit(handleSignIn)}
                loading={loading}
                variant="outlined"
                sx={{ width: "15rem" }}
              >
                Login
              </LoadingButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
              mb={5}
            >
              <Typography variant="subtitle1" gutterBottom component="div">
                Esqueceu a senha?
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="div">
                Cadastre-se
              </Typography>
            </Box>
          </Box>
        </form>
      </Card>
    </Container>
  );
}
