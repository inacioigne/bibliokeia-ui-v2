import {
  Accordion,
  AccordionSummary,
  Typography,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material/";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Controller } from "react-hook-form";

export default function Leader(props) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="content"
        id="header"
        sx={{ borderBottom: 1 }}
      >
        <Typography variant="h7" component="div" gutterBottom>
          Lider
        </Typography>
      </AccordionSummary>
      <Grid container spacing={2} gap={2} sx={{ p: 3, mt: 1 }}>
        {/** 00-04 - Tamanho do registro */}
        <Controller
          name={"leader.leader04"}
          control={props.control}
          defaultValue="####"
          render={({ field }) => (
            <TextField
              {...field}
              label="00-04 - Tamanho do registro"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        />
        {/** 05 - Status do registro */}
        <Controller
          name={`leader.leader05`}
          control={props.control}
          defaultValue="a"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="05 - Status do registro"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="a" value="a">
                a - Aumento no nível de catalogação
              </MenuItem>
              <MenuItem key="c" value="c">
                c - Alterado ou revisado
              </MenuItem>
              <MenuItem key="d" value="d">
                d - Excluído
              </MenuItem>
              <MenuItem key="n" value="n">
                n - Novo
              </MenuItem>
              <MenuItem key="o" value="o">
                o - Obsoleto
              </MenuItem>
            </TextField>
          )}
        />
        {/** 06 - Tipo de registro */}
        <Controller
          name={`leader.leader06`}
          control={props.control}
          defaultValue="z"
          render={({ field }) => (
            <TextField
              {...field}
              //select
              label="06 - Tipo de registro"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        />
        {/** 07-08 - Undefined character positions */}
        <Controller
          name={`leader.leader07`}
          control={props.control}
          defaultValue="##"
          render={({ field }) => (
            <TextField
              {...field}
              label="07-08 - Indefinido"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        />
      
        {/** 09 - Esquema */}
        <Controller
          name={`leader.leader09`}
          control={props.control}
          defaultValue="#"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="09 - Esquema de Codificação"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="#" value="#">
                # - MARC-8
              </MenuItem>
              <MenuItem key="a" value="a">
                a - UCS/Unicode
              </MenuItem>
            </TextField>
          )}
        />
        {/** 10 - Número de indicadores */}
        <Controller
          name={"leader.leader10"}
          control={props.control}
          defaultValue="2"
          render={({ field }) => (
            <TextField
              {...field}
              label="10 - Número de indicadores"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        />
        {/** 11 - Número de subcampos */}
        <Controller
          name={"leader.leader11"}
          control={props.control}
          defaultValue="2"
          render={({ field }) => (
            <TextField
              {...field}
              label="11 - Número de subcampos"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        />
        {/** 12-16 - Endereço dos dados */}
        <Controller
          name={"leader.leader16"}
          control={props.control}
          defaultValue="#####"
          render={({ field }) => (
            <TextField
              {...field}
              label="12-16 - Endereço dos dados"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        />
        {/** 17 - Nível de Codificação */}
        <Controller
          name={`leader.leader17`}
          control={props.control}
          defaultValue="n"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="17 - Nível de Codificação"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="n" value="n">
              n - Complete authority record
              </MenuItem>
              <MenuItem key="o" value="o">
              o - Incomplete authority record
              </MenuItem>
            </TextField>
          )}
        />
        {/** 18 - Punctuation policy */}
        <Controller
          name={`leader.leader18`}
          control={props.control}
          defaultValue="#"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="18 - Forma de Catalogação Descritiva"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="#" value="#">
              # - No information provided
              </MenuItem>
              <MenuItem key="c" value="c">
              c - Punctuation omitted
              </MenuItem>
              <MenuItem key="i" value="i">
              i - Punctuation included
              </MenuItem>
              <MenuItem key="u" value="u">
                u - Desconhecido
              </MenuItem>
            </TextField>
          )}
        />
        {/** 19 - Indefinido */}
        <Controller
          name={`leader.leader19`}
          control={props.control}
          defaultValue="#"
          render={({ field }) => (
            <TextField
              {...field}
            
              label="19 - Nível de registro"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
              InputProps={{
                readOnly: true,
              }}
           />
             
          )}
        />
        {/** 20 - Tamanho da parte correspondente ao tamanho do campo */}
        <Controller
          name={"leader.leader20"}
          control={props.control}
          defaultValue="4"
          render={({ field }) => (
            <TextField
              {...field}
              label="20 - Tamanho da parte"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        />
        {/** 21 - Tamanho da posição do caractere de início */}
        <Controller
          name={"leader.leader21"}
          control={props.control}
          defaultValue="5"
          render={({ field }) => (
            <TextField
              {...field}
              label="21 - Tamanho da posição"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        />
        {/** 22 - Tamanho da parte definida para implementação */}
        <Controller
          name={"leader.leader22"}
          control={props.control}
          defaultValue="0"
          render={({ field }) => (
            <TextField
              {...field}
              label="22 - Tamanho da parte definida para implementação"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        />
        {/** 23 - Entrada não definida */}
        <Controller
          name={"leader.leader22"}
          control={props.control}
          defaultValue="0"
          render={({ field }) => (
            <TextField
              {...field}
              label="23 - Entrada não definida"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        />
      </Grid>
    </Accordion>
  );
}
