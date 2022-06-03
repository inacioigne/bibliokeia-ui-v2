import { useState } from "react";
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function Snack(props) {
    const [open, setOpen] = useState(props.open);
    console.log("sk: ", open)

    const action = (
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => {
                setOpen(false)
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
      );

    return (
        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => {
            setOpen(false)
        }}
        message="Exemplar devolvido com sucesso!"
        action={action}
      />
    )
}