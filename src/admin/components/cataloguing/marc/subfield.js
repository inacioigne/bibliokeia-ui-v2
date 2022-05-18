import { Controller } from "react-hook-form";
import {
    Accordion,
    AccordionSummary,
    TextField,
    Typography,
    Box,
    ButtonGroup,
    Button,
  } from "@mui/material/";
  import { useContext, useEffect, useState } from "react";
  import { ItemContext } from "src/admin/contexts/itemContext"

export default function Subfield(props) {

    const { item_id, item } = useContext(ItemContext);
    console.log('SB: ', item?.datafields[props.metadata.tag].subfields[props.subfield.value])
     const  v = async () => {
        return 'x'
    }


    
  return (

    <Controller
      key={props.index}
      name={`datafields[${props.metadata.tag}].subfields.${props.subfield.value}`}
      control={props.control}
      defaultValue={ v }
      rules={{ required: props.subfield.required ? true : false }}
      render={({ field }) => (
        <TextField
          {...field}
          label={props.subfield.label}
          variant="outlined"
          size="small"
          fullWidth
        />
      )}
    />  
  ) 
}
