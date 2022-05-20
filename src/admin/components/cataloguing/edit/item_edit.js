import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import DatafieldEdit from "src/admin/components/cataloguing/edit/datafield_edit";
import schema from "src/schema/marc_book.json";
import Leader from "src/admin/components/cataloguing/marc/leader";
import Tag008 from "src/admin/components/cataloguing/marc/tag008";
import {
  Tabs,
  Tab,
  Box,
  Button
} from "@mui/material";
import Time from "src/lib/time"

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const tags0 = schema.datafields.filter(function (currentValue) {
  return currentValue.tag[0] == "0";
});

const tags1 = schema.datafields.filter(function (currentValue) {
    return currentValue.tag[0] == "1";
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

export default function ItemEdit({ item }) {

  //const { item_id, item } = useContext(ItemContext);
  //console.log('ItemEdit: ', item )

  const [value, setValueTabs] = useState(0);

 // const [book, setBook] = useState(null);

  


  const { 
    control, 
    handleSubmit,
    formState: { errors },
   } = useForm({
    defaultValues: item
  });

  const {
    fields: Fields650,
    append: Append650,
    remove: Remove650,
  } = useFieldArray({ control, name: "datafields[650]" });

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
    console.log('DT: ', marc)
  };

  return (
    <Box sx={{ p: 2 }}>
      <Tabs
        value={value}
        onChange={(event, newValue) => {
          setValueTabs(newValue);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={
            value == 0 ? { display: "grid", rowGap: 3 } : { display: "none" }
          }
        >
          <Leader control={control} />
          <Tag008 control={control} />

          {tags0.map((field, index) => (
            <DatafieldEdit
              key={index}
              control={control}
              item={item}
              metadata={field}
            />
          ))}
        </Box>
        <Box
          sx={
            value == 1 ? { display: "grid", rowGap: 3 } : { display: "none" }
          }
        >
          {tags1.map((field, index) => (
            <DatafieldEdit
              key={index}
              control={control}
              item={item}
              metadata={field}
            />
          ))} 
        </Box>
        <Box
          sx={
            value == 2 ? { display: "grid", rowGap: 3 } : { display: "none" }
          }
        >
          {tags2.map((field, index) => (
            <DatafieldEdit
              key={index}
              control={control}
              item={item}
              metadata={field}
            />
          ))} 
        </Box>
        <Box
          sx={
            value == 3 ? { display: "grid", rowGap: 3 } : { display: "none" }
          }
        >
          {tags3.map((field, index) => (
            <DatafieldEdit
              key={index}
              control={control}
              item={item}
              metadata={field}
            />
          ))} 
        </Box>
        <Box
          sx={
            value == 4 ? { display: "grid", rowGap: 3 } : { display: "none" }
          }
        >
          {tags4.map((field, index) => (
            <DatafieldEdit
              key={index}
              control={control}
              item={item}
              metadata={field}
            />
          ))} 
        </Box>
        <Box
          sx={
            value == 5 ? { display: "grid", rowGap: 3 } : { display: "none" }
          }
        >
          {tags5.map((field, index) => (
            <DatafieldEdit
              key={index}
              control={control}
              item={item}
              metadata={field}
            />
          ))} 
        </Box>
        <Box
          sx={
            value == 6 ? { display: "grid", rowGap: 3 } : { display: "none" }
          }
        >
    
          <DatafieldEdit
              //key={index}
              control={control}
              item={item}
              metadata={tag650}
              fields={Fields650}
            append={Append650}
            remove={Remove650}
            />
       
        </Box>
        <Button
            variant="outlined"
            sx={{ m: 2 }}
            type="submit"
            onClick={() => {
              console.log(errors.datafields )
            }}
          >
            Salvar
          </Button>
      </form>
      {errors.datafields && <h1>ERROOUUU</h1>}
    </Box>
  );


}