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
  Typography,
  Avatar
} from "@mui/material";
import PropTypes from "prop-types";
import { Add, Remove } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { api } from "src/services/api"
import { pink  } from '@mui/material/colors';

export default function Loan(props) {
  const { onClose, getLoans, value: valueProp, open, user, ...other } = props;
  const [exemplares, setExemplares] = useState([])
  const [registros, setRegistros] = useState([])

  const makeLoan = () => {    
    api.post(`/circulation/loan/${user}`, registros)
    .then((response) => {
      if (response.status == 200) {
        handleClose()
        getLoans()
        //console.log(response)

      }
     
    })

  }

  const { control, handleSubmit } = useForm({
    defaultValues: {
      exemplar: "",
    },
  });
  const onSubmit = data => {
    console.log(exemplares.length)
    if (exemplares.length < 5) {
      setRegistros(prevState => [...prevState, data.exemplar])
    api.get(`/acervo/exemplar/${data.exemplar}`)
    .then((response) => {
      setExemplares(prevState => [...prevState, response.data])
    })
      
    } else {
      alert('Só é possível emprestar 5 obras por usuário.')

    }
  }

  const handleClose = () => {
    //onClose(selectedValue);
    onClose();
    setExemplares([])
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
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="exemplar"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Exemplar" variant="outlined" />
              )}
            />

            <IconButton color="primary" type="submit" size="large" edge="end">
              <Add  fontSize="inherit" />
            </IconButton>
          </form>
        </Box>
        <Box>
          
        {exemplares.map((exemplar, index) => (
          <>
         
          <Divider sx={{mt:2}}/>
          <Box key={index} sx={{ mt:2, display: "flex", alignItems: "center"}}>
            <Box sx={{ display: "flex"}}>

           
            
            <Typography
                  variant="subtitle1"
                  color="text.primary"
                  component="div"
                  sx={{mr:1}}
                >
                  {exemplar.title} /
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {exemplar.exemplar}
                </Typography>
                </Box>
                <IconButton color="primary" onClick={() => {
                  const ex = exemplares.filter((e, i) =>{
                    return i !== index

                  })
                  setExemplares(ex)
                }}>
                  <Avatar sx={{ width: 24, height: 24, bgcolor: pink[500]}}>
                  <Remove />

                  </Avatar>
              
            </IconButton>
          </Box>
          </>
            

        ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleClose}
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
  //selectedValue: PropTypes.string.isRequired,
};
