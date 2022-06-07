import {
  Tabs,
  Tab,
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
  DialogActions,
} from "@mui/material/";
import { Close } from "@mui/icons-material/";
import PropTypes from "prop-types";
import { useState } from "react";
import Leader from "src/admin/components/cataloguing/thesaurus/leader";
import Tag008 from "src/admin/components/cataloguing/thesaurus/tag008";
import { useForm, useFieldArray } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import Datafield from "src/admin/components/cataloguing/marc/datafield";
import schema from "src/schema/topical_term.json";
import Time from "src/lib/time";
import { api } from "src/services/api";

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const [tag150] = schema.datafields.filter((field) => {
  return field.tag == "150";
});

const [tag450] = schema.datafields.filter((field) => {
  return field.tag == "450";
});

const [tag550] = schema.datafields.filter((field) => {
  return field.tag == "550";
});

const [tag670] = schema.datafields.filter((field) => {
  return field.tag == "670";
});

const [tag750] = schema.datafields.filter((field) => {
  return field.tag == "750";
});

export default function Create({ open, setCataloguing }) {
  //console.log("S:", tag150);

  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setCataloguing(false);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      datafields: {
        450: [{}],
        550: [{}]
      },
    },
  });

  const {
    fields: Fields450,
    append: Append450,
    remove: Remove450,
  } = useFieldArray({ control, name: "datafields[450]" });

  const {
    fields: Fields550,
    append: Append550,
    remove: Remove550,
  } = useFieldArray({ control, name: "datafields[550]" });

  const onSubmit = (data) => {
    const leader = Object.values(data.leader);
    const tag008 = Object.values(data.tag008);

    for (let [k, v] of Object.entries(data.datafields)) {
      if (!Array.isArray(v)) {
       
         for (let [sk, sv] of Object.entries(v.subfields)) {
          if (!sv) {
            delete data.datafields[k].subfields[sk];
            if (Object.keys(data.datafields[k].subfields).length == 0) {
              delete data.datafields[k];
            }
          }
        } 
      } else {

        for (let [index, field] of v.entries()) {
        

             for (let [sk, sv] of Object.entries(field.subfields)) {
            if (!sv) {
              delete data.datafields[k][index].subfields[sk];
              if (
                Object.keys(data.datafields[k][index].subfields).length == 0
              ) {
                delete data.datafields[k];
              }
            }
          }   
        } 
      } 
    }
    const marc = {
      leader: leader.join(""),
      controlfields: {
        "003": "BR-MnINPA",
        "005": Time(),
        "008": tag008.join(""),
      },
      datafields: data.datafields,
    };

    api
      .post("/cataloguing/authority/150", marc)
      .then(function (response) {
        if (response.status == 201) {
          //setsnackSuccess(true);
          //router.push(`/admin/cataloguing/${response.data.item_id}`);
          console.log(response);
        }
        //console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    //console.log(marc)

    
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth={"md"}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Termo Tópico
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Tabs
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          variant="fullWidth"
        >
          <Tab label="Tags 0XX" {...a11yProps(0)} sx={{ borderRight: 1 }} />
          <Tab label="Tags 1XX" {...a11yProps(1)} sx={{ borderRight: 1 }} />
          <Tab label="Tags 2XX/3XX" {...a11yProps(2)} sx={{ borderRight: 1 }} />
          <Tab label="Tags 4XX" {...a11yProps(4)} sx={{ borderRight: 1 }} />
          <Tab label="Tags 5XX" {...a11yProps(5)} sx={{ borderRight: 1 }} />
          <Tab label="Tags 6XX" {...a11yProps(6)} sx={{ borderRight: 1 }} />
          <Tab label="Tags 7XX" {...a11yProps(7)} sx={{ borderRight: 1 }} />
        </Tabs>
        <form>
          <Box
            sx={
              value == 0 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
            <Leader control={control} />
            <Tag008 control={control} />
          </Box>
          <Box
            sx={
              value == 1 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
            <Datafield control={control} metadata={tag150} errors={errors} />
          </Box>

          <Box
            sx={
              value == 3 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
            <Datafield
              control={control}
              metadata={tag450}
              fields={Fields450}
              append={Append450}
              remove={Remove450}
            />
          </Box>
          <Box
            sx={
              value == 4 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
            <Datafield
              control={control}
              metadata={tag550}
              fields={Fields550}
              append={Append550}
              remove={Remove550}
            />
          </Box>
          <Box
            sx={
              value == 5 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
            <Datafield control={control} metadata={tag670} errors={errors} />
          </Box>
          <Box
            sx={
              value == 6 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
            <Datafield control={control} metadata={tag750} errors={errors} />
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          sx={{ m: 2 }}
          //onClick={handleSubmit(onSubmit)}
          //loading={loading}
          variant="outlined"
          size="small"
        >
          Cancelar
        </LoadingButton>
        <LoadingButton
          sx={{ m: 2 }}
          onClick={handleSubmit(onSubmit)}
          loading={loading}
          variant="outlined"
          size="small"
        >
          Salvar
        </LoadingButton>
      </DialogActions>
    </BootstrapDialog>
  );
}
