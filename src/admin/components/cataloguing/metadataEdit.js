import { Box, Tabs, Tab, Button } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { ItemContext } from "src/admin/contexts/itemContext";
import Lider from "src/components/marc/lider";
import FieldMarc from "src/components/marc/edit/field";
import Tag008 from "src/components/marc/edit/tag008";
import Tag090 from "src/components/marc/edit/tag090";
import marc from "src/schema/marc_book.json";
import Time from "src/function/time"
import { api } from "src/services/api"
import { useRouter } from "next/router";
import FieldSubject from "src/components/marc/edit/fieldSubject"

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MetadataEdit() {
  const router = useRouter();
  const { item, item_id} = useContext(ItemContext);

  const [value, setValue] = useState(0);

  const tags0 = marc.datafields.filter(function (currentValue) {
    return currentValue.tag[0] == "0";
  });
  const tags1 = marc.datafields.filter(function (currentValue) {
    return currentValue.tag[0] == "1";
  });
  const tags2 = marc.datafields.filter(function (currentValue) {
    return currentValue.tag[0] == "2";
  });
  const tags3 = marc.datafields.filter(function (currentValue) {
    return currentValue.tag[0] == "3";
  });
  const tags4 = marc.datafields.filter(function (currentValue) {
    return currentValue.tag[0] == "4";
  });
  const tags5 = marc.datafields.filter(function (currentValue) {
    return currentValue.tag[0] == "5";
  });
  
  const [metaAssunto] = marc.datafields.filter(function (currentValue) {
    return currentValue.tag == "650";
  });
  const assuntos = item?.datafields['650']
  const tags7 = marc.datafields.filter(function (currentValue) {
    return currentValue.tag[0] == "7";
  });
  const recursos = item?.datafields['856']
  const [metaRecursos] = marc.datafields.filter(function (currentValue) {
    return currentValue.tag == "856";
  });
  const tags8 = marc.datafields.filter(function (currentValue) {
    return currentValue.tag[0] == "8" & !currentValue.repeatable;
  });


  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    {/** Lider */}
    let lider = formData.getAll("lider");
    {
      /**  Control Fields */
    }
    const tag008 = formData.getAll("008");
    const controfields = {
      "003": "BR-MnINPA",
      "005": Time(),
      "008": tag008.join(""),
    };

    {
      /** Datafiels - Subfields */
    }

    const datafields = new Object();

    for (const [k, v] of formData.entries()) {
      let tag = k.split(".")[0];
      let code = k.split(".")[1];
      if ((v != "") & (k != "lider") & (k != "008") & !k.includes("Ind")) {
        if (Object.keys(datafields).includes(tag)) {
          datafields[tag]["subfields"][code] = v;
        } else {
          datafields[tag] = { subfields: { [code]: v } };
          datafields[tag]["indicators"] = {
            Ind1: formData.get(tag + ".Ind1"),
            Ind2: formData.get(tag + ".Ind2"),
          };
        }
      }
    }

    Object.entries(datafields).map(([k, v]) => {
      if (k.includes("r")) {
        let tag = k.split("_")[1];
        if (Object.keys(datafields).includes(tag)) {
          datafields[tag].push(v);
          delete datafields[k];
        } else {
          datafields[tag] = [v];
          delete datafields[k];
        }
      }
    });

    const marc = {
      leader: lider.join("").replaceAll("|", " "),
      controlfields: controfields,
      datafields: datafields,
    };
    {
      /** POST ITEM */
    }
    api
      .put(`cataloging/item/${item_id}`, marc)
      .then(function (response) {
        if (response.status == 200) {
          router.push(`/cataloguing/item/${item_id}`);
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    //console.log("SUBMIT: ", marc)
    
  };
 
  return (
    <Box>
      <Tabs
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        variant="fullWidth"
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
      <form onSubmit={handleSubmit}>
        <Box>
          <Box
            sx={
              value == 0 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
            <Lider />
            <Tag008 />
            {tags0.map((e, i) => (
              <FieldMarc key={i} meta={e} dados={item?.datafields[e.tag]} />
            ))}

            <Tag090 dados={item?.datafields['090']}/>
          </Box>
          <Box
            sx={
              value == 1 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
            {tags1.map((e, i) => (
              <FieldMarc key={i} meta={e} dados={item?.datafields[e.tag]} />
            ))}
          </Box>
          <Box
            sx={
              value == 2 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
            {tags2.map((e, i) => (
              <FieldMarc key={i} meta={e} dados={item?.datafields[e.tag]} />
            ))}
          </Box>
          <Box
            sx={
              value == 3 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
            {tags3.map((e, i) => (
              <FieldMarc key={i} meta={e} dados={item?.datafields[e.tag]} />
            ))}
          </Box>
          <Box
            sx={
              value == 4 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
            {tags4.map((e, i) => (
              <FieldMarc key={i} meta={e} dados={item?.datafields[e.tag]} />
            ))}
          </Box>
          <Box
            sx={
              value == 5 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
            {tags5.map((e, i) => (
              <FieldMarc key={i} meta={e} dados={item?.datafields[e.tag]} />
            ))}
          </Box>
          <Box
            sx={
              value == 6 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
            {assuntos?.map((e, i) => (
             
              <FieldSubject meta={metaAssunto} dados={e}  />
            ))}
             {/* <FieldMarc key={i} index={i} meta={metaAssunto} dados={e} /> */}
            {/* <FieldSubject meta={metaAssunto} /> */}
          </Box>
          <Box
            sx={
              value == 7 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
            {tags7.map((e, i) => (
              <FieldMarc key={i} meta={e} dados={item?.datafields[e.tag]} />
            ))}
          </Box>
          <Box
            sx={
              value == 8 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
            {recursos?.map((e, i) => (
              <FieldMarc key={i} meta={metaRecursos} dados={e} />
            ))}
            {tags8.map((e, i) => (
              <FieldMarc key={i} meta={e} dados={item?.datafields[e.tag]} />
            ))}
          </Box>
          
        </Box>
        <Button variant="outlined" sx={{ m: 2 }} type="submit">
            Salvar
          </Button>
      </form>
    </Box>
  );
}
