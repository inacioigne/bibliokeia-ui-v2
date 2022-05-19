import { parseCookies } from "nookies";
import { Container, Box, Tabs, Tab } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { ItemProvider } from 'src/admin/contexts/itemContext'
import { DashboardLayout } from "src/layouts/dashboard-layout";
import Layout from "src/layouts/layoutMain";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "src/theme";
import { useForm, useFieldArray } from "react-hook-form";
import schema from "src/schema/marc_book.json";
import Leader from "src/admin/components/cataloguing/marc/leader";
import Tag008 from "src/admin/components/cataloguing/marc/tag008";
import DatafieldEdit from "src/admin/components/cataloguing/marc/dafield_edit";
import { ItemContext } from "src/admin/contexts/itemContext"
//import { CompressOutlined } from "@mui/icons-material";

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


export default function ItemEdit() { 
  const { item_id, item } = useContext(ItemContext);

    const [value, setValueTabs] = useState(0);
    //const { handleSubmit, control, setValue} = useForm();
   
    const {
      control,
      register,
      handleSubmit,
    setValue,
      formState: { errors },
    } = useForm( {
      defaultValues: {datafields: {'020': {subfields: {a: 'ISBN'}}}}
     
    });


      if (item) {
          setValue("datafields['020'].subfields.a", 'porra');
      }


      const onSubmit = (data) => {pass}
      return (
        <Box sx={{ p: 2}}>
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
                metadata={field}
                control={control}
                //values={item?.datafields[field.tag]}
                 />
            //   <Datafield
            //     key={index}
            //     control={control}
            //     metadata={field}
            //     errors={errors}
            //     values={item?.datafields[field.tag]}
            //   />
            ))}
          </Box>

        </form>
     

      </Box>
      )

    

    
}