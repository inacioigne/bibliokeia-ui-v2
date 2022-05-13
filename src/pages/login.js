import { Container, Snackbar, Alert } from "@mui/material/";
import { useState, useContext } from "react";
import { AuthContext } from "src/auth/authContext";
import FormLogin from "src/auth/formLogin";
import FormRegister from "src/auth/formRegister";


export default function Login() {
  const [visible, setVisible] = useState(0);
  const { open, setOpen} = useContext(AuthContext);
  const [openSnack, setSnack] = useState({
    visible: false, 
    msg: null,
    severity: null,
    anchorOrigin: { vertical: 'top', horizontal: 'left' }
  })


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
      alert={setSnack}
      />
      <FormRegister 
      display={visible} 
      setVisible={setVisible} 
      alert={setSnack}
      />
      <Snackbar
        open={openSnack.visible}
        autoHideDuration={6000}
        onClose={() => {setSnack({visible: false, msg: null})}}
        anchorOrigin={openSnack.anchorOrigin}
      >
        <Alert severity={openSnack.severity}>{openSnack.msg}</Alert>
      </Snackbar>
     
    </Container>
  );
}
