import {
  Accordion,
  AccordionSummary,
  Typography,
  Box,
  ButtonGroup,
  Button,
  styled,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  TextField,
} from "@mui/material/";
import { ExpandMore, Close, ManageSearch } from "@mui/icons-material/";
import { useState } from "react";
import PropTypes from "prop-types";
import Create from "src/admin/components/cataloguing/thesaurus/create"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Subject() {
  const [open, setOpen] = useState(false);
  const [cataloguing, setCataloguing] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="content"
          id="header"
          sx={{ borderBottom: 1 }}
        >
          <Typography variant="h7" component="div" gutterBottom>
            Assuntos
          </Typography>
        </AccordionSummary>
        <Button
          sx={{ m: 3 }}
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}
        >
          Termo Tópico
        </Button>
      </Accordion>
      
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Termo Tópico
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Box>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          <IconButton aria-label="searh" size="large">
            <ManageSearch fontSize="inherit" />
          </IconButton>
        </Box>
        <Button 
        variant="outlined" 
        size="small"
        sx={{mt:2}}
        onClick={() => {setCataloguing(true)}}
        >Novo</Button>
          
        </DialogContent>
      </BootstrapDialog>
      <Create open={cataloguing} setCataloguing={setCataloguing} />
    </>
  );
}
