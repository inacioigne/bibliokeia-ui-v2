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

export default function Subfield({ item, control, subfield, metadata }) {
  return (
    <Controller
    name={`datafields[${metadata.tag}].subfields.${subfield.value}`}
    control={control}
    defaultValue={ "" }
    rules={{ required: true }}
    render={({ field }) => (
      <TextField
        {...field}
        label={subfield.label}
        variant="outlined"
        size="small"
        fullWidth
      />
    )}
  />)
  /* if (item?.datafields[metadata.tag]) {
    return (
      <Controller
        name={`datafields[${metadata.tag}].subfields.${subfield.value}`}
        control={control}
        defaultValue={item?.datafields[metadata.tag].subfields[subfield.value]}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            label={subfield.label}
            variant="outlined"
            size="small"
            fullWidth
          />
        )}
      />
    );
  } else {
    return (
      <Controller
        name={`datafields[${metadata.tag}].subfields.${subfield.value}`}
        control={control}
        defaultValue={""}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            label={subfield.label}
            variant="outlined"
            size="small"
            fullWidth
          />
        )}
      />
    );
  } */
}
