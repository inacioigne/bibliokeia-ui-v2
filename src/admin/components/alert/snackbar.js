import { Snackbar, Alert, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import { Close } from "@mui/icons-material";

export default function Snack({ open, duration, msg, severity }) {    
    
  const [snack, setSnack] = useState(open);


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnack(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      //anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={snack}
     autoHideDuration={duration}
      onClose={handleClose}
    >
      <Alert //action={null} 
      severity={severity}>
      {msg}
      </Alert>
    </Snackbar>
  );
}
