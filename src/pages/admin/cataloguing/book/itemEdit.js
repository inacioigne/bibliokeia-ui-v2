import { ItemContext } from "src/admin/contexts/itemContext";
import { useState, useEffect, useContext } from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material/";
import { useForm, useFieldArray } from "react-hook-form";
import DatafieldEdit from "./datafieldEdit";
import schema from "src/schema/marc_book.json";
import Leader from "src/admin/components/cataloguing/marc/leader";
import Tag008 from "src/admin/components/cataloguing/marc/tag008";
import {
  Container,
  Tabs,
  Tab,
  Box,
  Button,
  Snackbar,
  IconButton,
  Alert,
} from "@mui/material";

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
  console.log('ItemEdit: ', item )

  const [value, setValueTabs] = useState(0);

  const [book, setBook] = useState(null);

  const onSubmit = (data) => {
    pass;
  };


  const { control, handleSubmit, setValue } = useForm({
    defaultValues: item
    // {
    //   datafields: { 
    //     650: item?.datafields[650],
    //     700: [{}],
    //     856: [{}],
    //   },
    // },
  });

  const {
    fields: Fields650,
    append: Append650,
    remove: Remove650,
  } = useFieldArray({ control, name: "datafields[650]" });

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
      </form>
    </Box>
  );

/*   if (item) {
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
        </form>
      </Box>
    );
  } else {
    return <h1>ITEM TESTE</h1>;
  } */
}
