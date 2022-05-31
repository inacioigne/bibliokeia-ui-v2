import {
  Dialog,
  DialogTitle,
  Divider,
  Box,
  TextField,
  IconButton,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import AddIcon from "@mui/icons-material/Add";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { api } from "src/services/api"

export default function Loan(props) {
  const { onClose, value: valueProp, open, user, ...other } = props;
  const [exemplares, setExemplares] = useState([])
  const [registros, setRegistros] = useState([])

  const makeLoan = () => {
    console.log(exemplares, registros, user);
    
    api.post(`/circulation/loan/${user}`, registros)
    .then((response) => {
      console.log(response)
    })

  }

  const { control, handleSubmit } = useForm({
    defaultValues: {
      exemplar: "",
    },
  });
  const onSubmit = data => {
    setRegistros(prevState => [...prevState, data.exemplar])
    api.get(`/acervo/exemplar/${data.exemplar}`)
    .then((response) => {
      setExemplares(prevState => [...prevState, response.data])
    })
    
    

  }

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      //onClose={handleClose}
      open={open}
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      //TransitionProps={{ onEntering: handleEntering }}
      {...other}
    >
      <DialogTitle>Empréstimo</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="exemplar"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Exemplar" variant="outlined" />
              )}
            />

            <IconButton color="primary" type="submit">
              <AddIcon />
            </IconButton>
          </form>
        </Box>
        <Box>
        {exemplares.map((exemplar, index) => (
          <Box key={index}>
          <h3>{exemplar.title}</h3>
            
          </Box>
            

        ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={makeLoan}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

Loan.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
