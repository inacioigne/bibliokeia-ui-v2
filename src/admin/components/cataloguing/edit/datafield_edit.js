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
  import { Controller } from "react-hook-form";
  import { Add, Remove } from "@mui/icons-material";
  
  export default function DatafieldEdit({
    control,
    item,
    metadata,
    fields,
    append,
    remove,
  }) {
    if (metadata.repeatable) {
      return (
        <Box>
          {fields.map((field, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
              }}
            >
              <Box style={{ flexGrow: 1 }}>
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
                            name={`datafields[${metadata.tag}][${index}].indicators.Ind1`}
                          />
  
                          <Indicators
                            metadata={metadata.indicators.Ind2}
                            control={control}
                            label="Ind2"
                            name={`datafields[${metadata.tag}][${index}].indicators.Ind2`}
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
                        {metadata.subfields.map((subfield, subindex) => (
                          <Controller
                            key={subindex}
                            name={`datafields[${metadata.tag}][${index}].subfields.${subfield.value}`}
                            control={control}
                            defaultValue=""
                            rules={{ required: subfield.required ? true : false }}
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
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Accordion>
              </Box>
              <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button onClick={() => append({})}>
                  <Add color="primary" />
                </Button>
                <Button onClick={() => remove(index)}>
                  <Remove color="primary" />
                </Button>
              </ButtonGroup>
            </Box>
          ))}
        </Box>
      );
    } else {
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
                  <Subfield
                    key={index}
                    item={item}
                    control={control}
                    subfield={subfield}
                    metadata={metadata}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Accordion>
      );
    }
  }
  