import {
  Accordion,
  AccordionSummary,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material/";
import { ExpandMore } from "@mui/icons-material/";
import { Controller } from "react-hook-form";

const CreateDate = () => {
  const date = new Date();
  const year = date.getFullYear().toString().substr(-2);
  const m = date.getMonth() + 1;
  const month = m < 10 ? "0" + m.toString() : m.toString();
  const day =
    date.getDate() < 10
      ? "0" + date.getDate().toString()
      : date.getDate().toString();
  const today = year + month + day;

  return today;
};

export default function Tag008(props) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="content"
        id="header"
        sx={{ borderBottom: 1 }}
      >
        008 - CAMPO DE TAMANHO FIXO
      </AccordionSummary>
      <Grid container spacing={2} gap={2} sx={{ p: 3, mt: 1 }}>
        {/** 00-05 - Data de entrada */}
        <Controller
          name={"tag008.tag008_05"}
          control={props.control}
          defaultValue={CreateDate()}
          render={({ field }) => (
            <TextField
              {...field}
              label="00-05 - Data de entrada"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            />
          )}
        />
        {/** 06 - Direct or indirect geographic subdivision */}
        <Controller
          name={"tag008.tag008_06"}
          control={props.control}
          defaultValue="#"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="06 - Direct or indirect geographic subdivision"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="#" value="#">
                # - Not subdivided geographically
              </MenuItem>
              <MenuItem key="d" value="d">
                d - Subdivided geographically-direct
              </MenuItem>
              <MenuItem key="i" value="i">
                i - Subdivided geographically-indirect
              </MenuItem>
              <MenuItem key="n" value="n">
                n - Not applicable
              </MenuItem>
              <MenuItem key="|" value="|">
                | - N??o codificado
              </MenuItem>
            </TextField>
          )}
        />
        {/** 07 - Romanization scheme */}
        <Controller
          name={"tag008.tag008_07"}
          control={props.control}
          defaultValue="a"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="07 - Romanization scheme"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="a" value="a">
                a - International standard
              </MenuItem>
              <MenuItem key="b" value="b">
                b - National standard
              </MenuItem>
              <MenuItem key="c" value="c">
                c - National library association standard
              </MenuItem>
              <MenuItem key="d" value="d">
                d - National library or bibliographic agency standard
              </MenuItem>
              <MenuItem key="e" value="e">
                e - Local standard
              </MenuItem>
              <MenuItem key="f" value="f">
                f - Standard of unknown origin
              </MenuItem>
              <MenuItem key="g" value="g">
                g - Conventional romanization or conventional form of name in
                language of cataloging agency
              </MenuItem>
              <MenuItem key="n" value="n">
                n - Not applicable
              </MenuItem>
              <MenuItem key="|" value="|">
                | - N??o codificado
              </MenuItem>
            </TextField>
          )}
        />
        {/** 08 - Language of catalog */}
        <Controller
          name={"tag008.tag008-08"}
          control={props.control}
          defaultValue="|"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="08 - Language of catalog"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="#" value="#">
                # - No information provided
              </MenuItem>
              <MenuItem key="b" value="b">
                b - English and French
              </MenuItem>
              <MenuItem key="f" value="f">
                e - English only
              </MenuItem>
              <MenuItem key="f" value="f">
                f - French only
              </MenuItem>
              <MenuItem key="|" value="|">
                | - N??o codificado
              </MenuItem>
            </TextField>
          )}
        />
        {/** 09 - Kind of record*/}
        <Controller
          name={"tag008.tag008-09"}
          control={props.control}
          defaultValue="|"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="09 - Kind of record"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="a" value="a">
                a - Established heading
              </MenuItem>
              <MenuItem key="b" value="b">
                b - Untraced reference
              </MenuItem>
              <MenuItem key="c" value="c">
              c - Traced reference
              </MenuItem>
              <MenuItem key="d" value="d">
              d - Subdivision
              </MenuItem>
              <MenuItem key="e" value="e">
              e - Node label
              </MenuItem>
              <MenuItem key="f" value="f">
              f - Established heading and subdivision
              </MenuItem>
              <MenuItem key="g" value="g">
              g - Reference and subdivision
              </MenuItem>
              <MenuItem key="|" value="|">
                | - N??o codificado
              </MenuItem>
             
            </TextField>
          )}
        />
        {/** 10 - Descriptive cataloging rules */}
        <Controller
          name={"tag008.tag008-10"}
          control={props.control}
          defaultValue="a"
          render={({ field }) => (
            <TextField
              select
              {...field}
              label="10 - Descriptive cataloging rules"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="a" value="a">
              a - Earlier rules
              </MenuItem>
              <MenuItem key="b" value="b">
              b - AACR 1
              </MenuItem>
              <MenuItem key="c" value="c">
              c - AACR 2
              </MenuItem>
              <MenuItem key="d" value="d">
              d - AACR 2 compatible heading
              </MenuItem>
              <MenuItem key="z" value="z">
              z - Other
              </MenuItem>
              <MenuItem key="n" value="n">
              n - Not applicable
              </MenuItem>
              <MenuItem key="|" value="|">
                | - N??o codificado
              </MenuItem>
            </TextField>
          )}
        />
        {/** 11 - Subject heading system/thesaurus */}
        <Controller
          name={"tag008.tag008_11"}
          control={props.control}
          defaultValue="a"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="11 - Subject heading"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              
              <MenuItem key="a" value="a">
              a - Library of Congress Subject Headings
              </MenuItem>
              <MenuItem key="b" value="b">
              b - LC subject headings for children's literature
              </MenuItem>
              <MenuItem key="c" value="c">
              c - Medical Subject Headings
              </MenuItem>
              <MenuItem key="d" value="d">
              d - National Agricultural Library subject authority file
              </MenuItem>
              <MenuItem key="k" value="k">
              k - Canadian Subject Headings
              </MenuItem>
              <MenuItem key="n" value="n">
              n - Not applicable
              </MenuItem>
              <MenuItem key="r" value="r">
              r - Art and Architecture Thesaurus
              </MenuItem>
              <MenuItem key="s" value="s">
              s - Sears List of Subject Heading
              </MenuItem>
              <MenuItem key="r" value="r">
              v - R??pertoire de vedettes-mati??re
              </MenuItem>
              <MenuItem key="s" value="s">
              z - Other
              </MenuItem>
              <MenuItem key="|" value="|">
                | - N??o codificado
              </MenuItem>
            </TextField>
          )}
        />
        {/** 12 - Type of series */}
        <Controller
          name={"tag008.tag008-23"}
          control={props.control}
          defaultValue="a"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="12 - Type of series"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
     
              <MenuItem key="a" value="a">
              a - Monographic series
              </MenuItem>
              <MenuItem key="b" value="b">
              b - Multipart item
              </MenuItem>
              <MenuItem key="c" value="c">
              c - Series-like phrase
              </MenuItem>
              <MenuItem key="n" value="n">
              n - Not applicable
              </MenuItem>
              <MenuItem key="z" value="z">
              z - Other
              </MenuItem>
              
              <MenuItem key="|" value="|">
                | - N??o codificado
              </MenuItem>
            </TextField>
          )}
        />
        {/** 24-27 Natureza do conte??do */}
        <Controller
          name={"tag008.tag008-27"}
          control={props.control}
          defaultValue="#"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="24-27 - Natureza do conte??do"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="#" value="#">
                # - Nenhum dos c??digos seguintes
              </MenuItem>
              <MenuItem key="a" value="a">
                a - Resumos
              </MenuItem>
              <MenuItem key="b" value="b">
                b - Bibliografias
              </MenuItem>
              <MenuItem key="c" value="c">
                c - Cat??logos
              </MenuItem>
              <MenuItem key="d" value="d">
                d - Dicion??rios
              </MenuItem>
              <MenuItem key="e" value="e">
                e - Enciclop??dia
              </MenuItem>
              <MenuItem key="f" value="f">
                f - Manuais
              </MenuItem>
              <MenuItem key="g" value="g">
                g - Artigos jur??dicos
              </MenuItem>
              <MenuItem key="i" value="i">
                i - ??ndices
              </MenuItem>
              <MenuItem key="j" value="j">
                j - Patentes
              </MenuItem>
              <MenuItem key="k" value="k">
                k - Discografias
              </MenuItem>
              <MenuItem key="l" value="l">
                l - Legisla????o
              </MenuItem>
              <MenuItem key="m" value="m">
                m - Teses e disserta????es
              </MenuItem>
              <MenuItem key="n" value="n">
                n - Revis??o de literatura
              </MenuItem>
              <MenuItem key="o" value="o">
                o - Recens??o
              </MenuItem>
              <MenuItem key="p" value="p">
                p - Textos programados
              </MenuItem>
              <MenuItem key="q" value="q">
                q - Filmografia
              </MenuItem>
              <MenuItem key="r" value="r">
                r - Diret??rios
              </MenuItem>
              <MenuItem key="s" value="s">
                s - Estat??sticas
              </MenuItem>
              <MenuItem key="t" value="t">
                t - Relat??rios t??cnicos
              </MenuItem>
              <MenuItem key="u" value="u">
                u - Normas/Especifica????es
              </MenuItem>
              <MenuItem key="w" value="w">
                w - Relat??rio de legisla????o
              </MenuItem>
              <MenuItem key="y" value="y">
                y - Anu??rios
              </MenuItem>
              <MenuItem key="z" value="z">
                z - Tratados
              </MenuItem>
              <MenuItem key="2" value="2">
                2 - Separata
              </MenuItem>
              <MenuItem key="5" value="5">
                5 - Calend??rios
              </MenuItem>
              <MenuItem key="6" value="6">
                6 - Hist??ria em quadrinhos
              </MenuItem>
              <MenuItem key="|" value="|">
                | - N??o codificado
              </MenuItem>
            </TextField>
          )}
        />
        {/** 28 - Publica????o governamental */}
        <Controller
          name={"tag008.tag008-28"}
          control={props.control}
          defaultValue="#"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="28 - Publica????o governamental"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="#" value="#">
                # - Publica????o n??o oficial
              </MenuItem>
              <MenuItem key="a" value="a">
                a - Publica????o de regi??o aut??noma
              </MenuItem>
              <MenuItem key="c" value="c">
                c - Multilocal
              </MenuItem>
              <MenuItem key="f" value="f">
                f - Federal/Nacional
              </MenuItem>
              <MenuItem key="i" value="i">
                i - Internacional Intergovernamental
              </MenuItem>
              <MenuItem key="l" value="l">
                l - Local (Municipal)
              </MenuItem>
              <MenuItem key="m" value="m">
                m - Interestadual
              </MenuItem>
              <MenuItem key="o" value="o">
                o - Publica????o governamental
              </MenuItem>
              <MenuItem key="s" value="s">
                s - Estado, prov??ncia, territ??rio, jurisdi????o, etc.
              </MenuItem>
              <MenuItem key="u" value="u">
                u - Ignorado
              </MenuItem>
              <MenuItem key="z" value="z">
                z - Outro
              </MenuItem>
              <MenuItem key="|" value="|">
                | - N??o codificado
              </MenuItem>
            </TextField>
          )}
        />
        {/** 29 - Publica????o de Confer??ncia */}
        <Controller
          name={"tag008.tag008-29"}
          control={props.control}
          defaultValue="0"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="29 - Publica????o de Confer??ncia"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="0" value="0">
                0 - N??o ?? publica????o de confer??ncia
              </MenuItem>
              <MenuItem key="1" value="1">
                1 - ?? uma publica????o de confer??ncia
              </MenuItem>
              <MenuItem key="|" value="|">
                | - N??o codificado
              </MenuItem>
            </TextField>
          )}
        />
        {/** 30 - Obra comemorativa */}
        <Controller
          name={"tag008.tag008-30"}
          control={props.control}
          defaultValue="0"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="30 - Obra comemorativa"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="0" value="0">
                0 - N??o ?? uma obra comemorativa
              </MenuItem>
              <MenuItem key="1" value="1">
                1 - ?? uma colet??nea de homenagem
              </MenuItem>
              <MenuItem key="|" value="|">
                | - N??o codificado
              </MenuItem>
            </TextField>
          )}
        />
        {/** 31 - ??ndice */}
        <Controller
          name={"tag008.tag008-31"}
          control={props.control}
          defaultValue="0"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="31 - ??ndice"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="0" value="0">
                0 - Sem ??ndice
              </MenuItem>
              <MenuItem key="1" value="1">
                1 - Inclui ??ndice
              </MenuItem>
              <MenuItem key="|" value="|">
                | - N??o codificado
              </MenuItem>
            </TextField>
          )}
        />
        {/** 32 - Indefinido */}
        <Controller
          name={"tag008.tag008-32"}
          control={props.control}
          defaultValue="#"
          render={({ field }) => (
            <TextField
              {...field}
              label="32 - Indefinido"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            />
          )}
        />
        {/** 33 - Forma liter??ria */}
        <Controller
          name={"tag008.tag008-33"}
          control={props.control}
          defaultValue="0"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="31 - ??ndice"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="0" value="0">
                0 - N??o ?? uma obra de fic????o
              </MenuItem>
              <MenuItem key="1" value="1">
                1 - Fic????o
              </MenuItem>
              <MenuItem key="d" value="d">
                d - Drama
              </MenuItem>
              <MenuItem key="f" value="f">
                f - Romance
              </MenuItem>
              <MenuItem key="h" value="h">
                h - Humor, s??tira, etc.
              </MenuItem>
              <MenuItem key="i" value="i">
                i - Cartas
              </MenuItem>
              <MenuItem key="j" value="j">
                j - Contos
              </MenuItem>
              <MenuItem key="m" value="m">
                m - Mais de uma forma liter??ria
              </MenuItem>
              <MenuItem key="p" value="p">
                p - Poesia
              </MenuItem>
              <MenuItem key="s" value="s">
                s - Discursos
              </MenuItem>
              <MenuItem key="u" value="u">
                u - Desconhecida
              </MenuItem>
              <MenuItem key="|" value="|">
                | - N??o codificado
              </MenuItem>
            </TextField>
          )}
        />
        {/** 34 - Biografia */}
        <Controller
          name={"tag008.tag008-34"}
          control={props.control}
          defaultValue="0"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="31 - ??ndice"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="0" value="0">
                0 - N??o ?? uma obra de fic????o
              </MenuItem>
              <MenuItem key="1" value="1">
                1 - Fic????o
              </MenuItem>
              <MenuItem key="d" value="d">
                d - Drama
              </MenuItem>
              <MenuItem key="f" value="f">
                f - Romance
              </MenuItem>
              <MenuItem key="h" value="h">
                h - Humor, s??tira, etc.
              </MenuItem>
              <MenuItem key="i" value="i">
                i - Cartas
              </MenuItem>
              <MenuItem key="j" value="j">
                j - Contos
              </MenuItem>
              <MenuItem key="m" value="m">
                m - Mais de uma forma liter??ria
              </MenuItem>
              <MenuItem key="p" value="p">
                p - Poesia
              </MenuItem>
              <MenuItem key="s" value="s">
                s - Discursos
              </MenuItem>
              <MenuItem key="u" value="u">
                u - Desconhecida
              </MenuItem>
              <MenuItem key="|" value="|">
                | - N??o codificado
              </MenuItem>
            </TextField>
          )}
        />
        {/** 35-37 Idioma */}
        <Controller
          name={"tag008.tag008-37"}
          control={props.control}
          defaultValue="por"
          render={({ field }) => (
            <TextField
              {...field}
              label="35-37 Idioma"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            />
          )}
        />
        {/** 38 - Registro modificado */}
        <Controller
          name={"tag008.tag008-38"}
          control={props.control}
          defaultValue="#"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="38 - Registro modificado"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="#" value="#">
                # - N??o modificado
              </MenuItem>
              <MenuItem key="s" value="s">
                s - Abreviado
              </MenuItem>
              <MenuItem key="d" value="d">
                d - Informa????o omitida
              </MenuItem>
              <MenuItem key="x" value="x">
                x - Faltam caracteres
              </MenuItem>
              <MenuItem key="r" value="r">
                r - Fichas em escrita original
              </MenuItem>
              <MenuItem key="o" value="o">
                o - Fichas romanizadas
              </MenuItem>
              <MenuItem key="|" value="|">
                | - N??o codificado
              </MenuItem>
            </TextField>
          )}
        />
        {/** 39 - Fonte de cataloga????o */}
        <Controller
          name={"tag008.tag008-39"}
          control={props.control}
          defaultValue="#"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="39 - Fonte de cataloga????o"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="#" value="#">
                # - Ag??ncia bibliogr??fica nacional
              </MenuItem>
              <MenuItem key="c" value="c">
                c - Cataloga????o Cooperativa
              </MenuItem>
              <MenuItem key="d" value="d">
                d - Outra
              </MenuItem>
              <MenuItem key="u" value="u">
                u - Desconhecida
              </MenuItem>
              <MenuItem key="|" value="|">
                | - N??o codificado
              </MenuItem>
            </TextField>
          )}
        />
      </Grid>
    </Accordion>
  );
}
