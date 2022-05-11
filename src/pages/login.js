import { Container, Snackbar  } from "@mui/material/";
import { useState } from "react";
import FormLogin from "src/auth/formLogin";
import FormRegister from "src/auth/formRegister";

export default function Login() {
  const [visible, setVisible] = useState(0);
  const [openSnack, setSnack] = useState(false)

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <FormLogin 
      display={visible} 
      setVisible={setVisible} 
      />
      <FormRegister 
      display={visible} 
      setVisible={setVisible} 
      alert={setSnack}
      />
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={() => {setSnack(false)}}
        message="Usuário cadastrado com sucesso!"
        //action={action}
      />
    </Container>
  );
}
