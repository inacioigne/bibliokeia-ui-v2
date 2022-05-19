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
import Indicators from "src/admin/components/cataloguing/marc/indicators";
import Subfield from "./subfield";
import Leader from "src/admin/components/cataloguing/marc/leader";
import Tag008 from "src/admin/components/cataloguing/marc/tag008";

export default function DatafieldEdit({ control, item, metadata }) {
    // metadata.subfields.map((subfield, index) => (
    //     console.log('SB:', subfield)
    //   ))
  return (
    <Accordion defaultExpanded={metadata.expanded}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="content"
        id="header"
        sx={{ borderBottom: 1 }}
      >
        <Typography variant="h7" component="div" gutterBottom>
          {metadata.description}
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
                metadata={metadata.indicators.Ind1}
                control={control}
                label="Ind1"
                name={`datafields[${metadata.tag}].indicators.Ind1`}
              />

              <Indicators
                metadata={metadata.indicators.Ind2}
                control={control}
                label="Ind2"
                name={`datafields[${metadata.tag}].indicators.Ind2`}
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
        
            {metadata.subfields.map((subfield, index) => (
              <Subfield key={index} item={item} control={control} subfield={subfield} metadata={metadata} />
            ))}
          </Box>
        </Box>
      </Box>
    </Accordion>
  );
}
