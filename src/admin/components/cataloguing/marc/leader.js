import {
  Accordion,
  AccordionSummary,
  Typography,
  Grid,
  TextField,
  MenuItem
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
              <MenuItem key="p" value="p">
                p - Catalogação da pré-publicação
              </MenuItem>
            </TextField>
          )}
        />
         {/** 06 - Tipo de registro */}
         <Controller
          name={`leader.leader06`}
          control={props.control}
          defaultValue="a"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="06 - Tipo de registro"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
             <MenuItem key="a" value="a">
            a - Material textual
            </MenuItem>
            
            <MenuItem key="c" value="c">
            c - Notação musical
            </MenuItem>
            <MenuItem key="d" value="d">
            d - Notação musical manuscrita
            </MenuItem>
            <MenuItem key="e" value="e">
            e - Material cartográfico impresso
            </MenuItem>
            <MenuItem key="f" value="f">
            f - Material cartográfico manuscrito
            </MenuItem>
            <MenuItem key="g" value="g">
            g - Mídia projetável
            </MenuItem>
            <MenuItem key="i" value="i">
            i - Gravação de som não musical
            </MenuItem>
            <MenuItem key="j" value="j">
            j - Gravação de som musical
            </MenuItem>
            <MenuItem key="k" value="k">
            k - Material gráfico
            </MenuItem>
            <MenuItem key="m" value="m">
            m - Arquivo de computador
            </MenuItem>
            <MenuItem key="o" value="o">
            o - Kit
            </MenuItem>
            <MenuItem key="p" value="p">
            p - Material misto
            </MenuItem>
            <MenuItem key="r" value="r">
            r - Artefatos tridimensionais
            </MenuItem>
            </TextField>
          )}
        />
         {/** 07 - Nível bibliográfico */}
         <Controller
          name={`leader.leader07`}
          control={props.control}
          defaultValue="m"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="06 - Tipo de registro"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="a" value="a">
            a - Artigo
            </MenuItem>
            <MenuItem key="b" value="b">
            b - Artigo seriado
            </MenuItem>
            <MenuItem key="c" value="c">
            c - Coleção
            </MenuItem>
            <MenuItem key="d" value="d">
            d - Subunidade
            </MenuItem>
            <MenuItem key="i" value="i">
            i - Recurso integrado
            </MenuItem>
            <MenuItem key="m" value="m">
            m - Monografia
            </MenuItem>
            <MenuItem key="s" value="s">
            s - Publicação seriada
            </MenuItem>
            </TextField>
          )}
        />
        {/** 08 - Tipo de controle */}
        <Controller
          name={`leader.leader08`}
          control={props.control}
          defaultValue="#"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="08 - Tipo de controle"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
             <MenuItem key="#" value="#">
            # - Tipo não especificado
            </MenuItem>
            <MenuItem key="a" value="a">
            a - Arquivístico
            </MenuItem>
            </TextField>
          )}
        />
         {/** 09 - Esquema de Codificação de Caracteres */}
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
          defaultValue="4"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="17 - Nível de Codificação"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
            <MenuItem key="#" value="#">
            #- Completo
            </MenuItem>
            <MenuItem key="1" value="1">
            1 - Completo, material não examinado
            </MenuItem>
            <MenuItem key="2" value="2">
            2 - Incompleto, material não examinado
            </MenuItem>
            <MenuItem key="3" value="3">
            3 - Abreviado
            </MenuItem>
            <MenuItem key="4" value="4">
            4 - Básico
            </MenuItem>
            <MenuItem key="5" value="5">
            5 - Parcial ou preliminar
            </MenuItem>
            <MenuItem key="7" value="7">
            7 - Mínimo
            </MenuItem>
            <MenuItem key="8" value="8">
            8 - Pré-publicação
            </MenuItem>
            <MenuItem key="u" value="u">
            u - Desconhecido
            </MenuItem>
            <MenuItem key="z" value="z">
            z- Não se aplica
            </MenuItem>
            </TextField>
          )}
        />
         {/** 18 - Forma de Catalogação Descritiva */}
         <Controller
          name={`leader.leader18`}
          control={props.control}
          defaultValue="a"
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
            # - Não é ISBD
            </MenuItem>
            <MenuItem key="a" value="a">
            a - AACR2
            </MenuItem>
            <MenuItem key="c" value="c">
            c - ISBD sem pontuação
            </MenuItem>
            <MenuItem key="i" value="i">
            i - ISBD com pontuação
            </MenuItem>
            <MenuItem key="u" value="u">
            u - Desconhecido
            </MenuItem>
            </TextField>
          )}
        />
        {/** 19 - Nível de registro de recurso em várias partes */}
        <Controller
          name={`leader.leader19`}
          control={props.control}
          defaultValue="a"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="19 - Nível de registro"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
           <MenuItem key="#" value="#">
            # - Não especificado ou não se aplica
            </MenuItem>
            <MenuItem key="a" value="a">
            a - Conjunto
            </MenuItem>
            <MenuItem key="b" value="b">
            b - Parte com título independente
            </MenuItem>
            <MenuItem key="c" value="c">
            c - Parte com título dependente
            </MenuItem>
            </TextField>
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
