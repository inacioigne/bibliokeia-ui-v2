import {
  Accordion,
  AccordionSummary,
  TextField,
  Typography,
  Box,
  ButtonGroup,
  Button,
} from "@mui/material/";
import { ExpandMore } from "@mui/icons-material/";
import Indicators from "src/admin/components/cataloguing/marc/indicators"
import { Controller } from "react-hook-form";
import Subfield from "src/admin/components/cataloguing/marc/subfield"


export default function DatafieldEdit(props) {
  return (
    <Accordion defaultExpanded={props.metadata.expanded}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="content"
        id="header"
        sx={{ borderBottom: 1 }}
      >
        <Typography variant="h7" component="div" gutterBottom>
          {props.metadata.description}
        </Typography>
      </AccordionSummary>
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
            {/**INDICADORES */}
            <Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Indicators
                  metadata={props.metadata.indicators.Ind1}
                  control={props.control}
                  label="Ind1"
                  name={`datafields[${props.metadata.tag}].indicators.Ind1`}
                />

                <Indicators
                  metadata={props.metadata.indicators.Ind2}
                  control={props.control}
                  label="Ind2"
                  name={`datafields[${props.metadata.tag}].indicators.Ind2`}
                />
              </Box>
            </Box>
             {/** SUBFIELDS */}
             <Box
              sx={{
                display: "grid",
                columnGap: 3,
                rowGap: 2,
                gridTemplateColumns: "repeat(2, 1fr)",
                mb: 4,
              }}
              style={{ width: "100%" }}
            >
                {props.metadata.subfields.map((subfield, index) => (
                    <Subfield 
                    key={index} 
                    metadata={props.metadata}
                    control={props.control}
                    subfield={subfield}
                    values={props.values?.subfields[props.subfield?.value]}
                    />
                ))}
            </Box>

        </Box>
      </Box>
    </Accordion>
  );
}
