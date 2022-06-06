import { DashboardLayout } from "src/layouts/dashboard-layout";
import Layout from "src/layouts/layoutMain";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "src/theme";
import schema from "src/schema/marc_book.json";
import {
  Tabs,
  Tab,
  Box,
  IconButton,
  Zoom,
  Fab,
} from "@mui/material";
import { useState } from "react";
import { api } from "src/services/api";
import Leader from "src/admin/components/cataloguing/marc/leader";
import Tag008 from "src/admin/components/cataloguing/marc/tag008";
import { useForm, useFieldArray } from "react-hook-form";
import Datafield from "src/admin/components/cataloguing/marc/datafield";
import { Close, KeyboardArrowUp } from "@mui/icons-material";
import Time from "src/lib/time";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import LoadingButton from "@mui/lab/LoadingButton";
import Snack from "src/admin/components/alert/snackbar";
import Subject from "src/admin/components/cataloguing/thesaurus/subject";

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 20,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const tags0 = schema.datafields.filter(function (currentValue) {
  return currentValue.tag[0] == "0";
});

const tags1 = schema.datafields.filter((field) => {
  return field.tag[0] == "1";
});
const tags2 = schema.datafields.filter((field) => {
  return field.tag[0] == "2";
});
const tags3 = schema.datafields.filter((field) => {
  return field.tag[0] == "3";
});
const tags4 = schema.datafields.filter((field) => {
  return field.tag[0] == "4";
});
const tags5 = schema.datafields.filter((field) => {
  return field.tag[0] == "5";
});

const [tag650] = schema.datafields.filter((field) => {
  return field.tag == "650";
});
const [tag700] = schema.datafields.filter((field) => {
  return field.tag == "700";
});
const [tag856] = schema.datafields.filter((field) => {
  return field.tag == "856";
});

export default function CreateBook(props) {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  //SNACKBAR
  const [snack, setSnack] = useState(true);

  const [snackSuccess, setsnackSuccess] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnack(false);
    setsnackSuccess(false);
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

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      datafields: {
        650: [{}],
        700: [{}],
        856: [{}],
      },
    },
  });

  const {
    fields: Fields650,
    append: Append650,
    remove: Remove650,
  } = useFieldArray({ control, name: "datafields[650]" });

  const {
    fields: Fields700,
    append: Append700,
    remove: Remove700,
  } = useFieldArray({ control, name: "datafields[700]" });
  const {
    fields: Fields856,
    append: Append856,
    remove: Remove856,
  } = useFieldArray({ control, name: "datafields[856]" });

  const onSubmit = (data) => {
    setLoading(!loading);
    const leader = Object.values(data.leader); 
    const tag008 = Object.values(data.tag008);

    //EXCLUI SUBCAMPOS VAZIOS
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

    {
      /** POST ITEM */
    }
    api
      .post("/cataloging/item/create", marc)
      .then(function (response) {
        if (response.status == 201) {
          setsnackSuccess(true);
          router.push(`/admin/cataloguing/${response.data.item_id}`);
        }
        //console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    //console.log("DATA: ", marc);
  };

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Tabs
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          variant="fullWidth"
          id="back-to-top-anchor"
        >
          <Tab label="Tags 0XX" {...a11yProps(0)} sx={{ borderRight: 1 }} />
          <Tab label="Tags 1XX" {...a11yProps(1)} sx={{ borderRight: 1 }} />
          <Tab label="Tags 2XX" {...a11yProps(2)} sx={{ borderRight: 1 }} />
          <Tab label="Tags 3XX" {...a11yProps(3)} sx={{ borderRight: 1 }} />
          <Tab label="Tags 4XX" {...a11yProps(4)} sx={{ borderRight: 1 }} />
          <Tab label="Tags 5XX" {...a11yProps(5)} sx={{ borderRight: 1 }} />
          <Tab label="Tags 6XX" {...a11yProps(6)} sx={{ borderRight: 1 }} />
          <Tab label="Tags 7XX" {...a11yProps(7)} sx={{ borderRight: 1 }} />
          <Tab label="Tags 8XX" {...a11yProps(8)} sx={{ borderRight: 1 }} />
        </Tabs>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* TAGS 0XX */}
          <Box
            sx={
              value == 0 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
            <Leader control={control} />
            <Tag008 control={control} />
            {tags0.map((field, index) => (
              <Datafield
                key={index}
                control={control}
                metadata={field}
                errors={errors}
              />
            ))}
          </Box>
          {/* TAGS 1XX */}
          <Box
            sx={
              value == 1 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
            {tags1.map((field, index) => (
              <Datafield
                key={index}
                control={control}
                metadata={field}
                errors={errors}
              />
            ))}
          </Box>
          {/* TAGS 2XX */}
          <Box
            sx={
              value == 2 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
            {tags2.map((field, index) => (
              <Datafield
                key={index}
                control={control}
                metadata={field}
                errors={errors}
                snackbar={setSnack}
              />
            ))}
          </Box>
          {/* TAGS 3XX */}
          <Box
            sx={
              value == 3 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
            {tags3.map((field, index) => (
              <Datafield key={index} control={control} metadata={field} />
            ))}
          </Box>
          {/* TAGS 4XX */}
          <Box
            sx={
              value == 4 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
            {tags4.map((field, index) => (
              <Datafield key={index} control={control} metadata={field} />
            ))}
          </Box>
          {/* TAGS 5XX */}
          <Box
            sx={
              value == 5 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
            {tags5.map((field, index) => (
              <Datafield key={index} control={control} metadata={field} />
            ))}
          </Box>
          {/* TAGS 6XX */}
          <Box
            sx={
              value == 6 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
          <Subject />
            {/* <Datafield
              control={control}
              metadata={tag650}
              fields={Fields650}
              append={Append650}
              remove={Remove650}
            /> */}
          </Box>
          <Box
            sx={
              value == 7 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
            <Datafield
              control={control}
              metadata={tag700}
              fields={Fields700}
              append={Append700}
              remove={Remove700}
            />
          </Box>
          <Box
            sx={
              value == 8 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
            <Datafield
              control={control}
              metadata={tag856}
              fields={Fields856}
              append={Append856}
              remove={Remove856}
            />
          </Box>
          <LoadingButton
            sx={{ m: 2 }}
            onClick={handleSubmit(onSubmit)}
            loading={loading}
            variant="outlined"
          >
            Salvar
          </LoadingButton>
        </form>
        {errors.datafields && (
          <Snack
            open={true}
            duration={null}
            msg={`Campo ${Object.keys(errors?.datafields)} é obrigatório!`}
            severity={"warning"}
          />
        )}
        <Snack
          open={snackSuccess}
          duration={6000}
          msg={"Item registrado com sucesso!"}
          severity={"success"}
        />
      </Box>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </>
  );
}

CreateBook.getLayout = function getLayout(page) {
  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <DashboardLayout>{page}</DashboardLayout>
      </ThemeProvider>
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  const { ["bibliokeia.token"]: token } = parseCookies(ctx);
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
