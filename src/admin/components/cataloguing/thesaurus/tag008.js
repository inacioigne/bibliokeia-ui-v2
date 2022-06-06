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
                | - Não codificado
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
                | - Não codificado
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
                | - Não codificado
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
                | - Não codificado
              </MenuItem>
             
            </TextField>
          )}
        />
        {/** 18-21 Ilustrações */}
        <Controller
          name={"tag008.tag008-21"}
          control={props.control}
          defaultValue="#"
          render={({ field }) => (
            <TextField
              select
              {...field}
              label="18-21 Ilustrações"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="#" value="#">
                # - Sem ilustrações
              </MenuItem>
              <MenuItem key="a" value="a">
                a - Com ilustrações
              </MenuItem>
              <MenuItem key="b" value="b">
                b - Mapas
              </MenuItem>
              <MenuItem key="c" value="c">
                c - Retratos
              </MenuItem>
              <MenuItem key="d" value="d">
                d - Gráficos
              </MenuItem>
              <MenuItem key="e" value="e">
                e - Plantas
              </MenuItem>
              <MenuItem key="f" value="f">
                f - Lâminas
              </MenuItem>
              <MenuItem key="g" value="g">
                g - Música
              </MenuItem>
              <MenuItem key="h" value="h">
                h - Fac-símiles
              </MenuItem>
              <MenuItem key="i" value="i">
                i - Escudo ou brasões
              </MenuItem>
              <MenuItem key="j" value="j">
                j - Tabela genealógica
              </MenuItem>
              <MenuItem key="k" value="k">
                k - Fórmulas
              </MenuItem>
              <MenuItem key="l" value="l">
                l - Amostras
              </MenuItem>
              <MenuItem key="m" value="m">
                m - Gravações
              </MenuItem>
              <MenuItem key="o" value="o">
                o - Fotografias
              </MenuItem>
              <MenuItem key="p" value="p">
                p - Iluminuras
              </MenuItem>
              <MenuItem key="|" value="|">
                | - Não codificado
              </MenuItem>
            </TextField>
          )}
        />
        {/** 22 - Público alvo */}
        <Controller
          name={"tag008.tag008-22"}
          control={props.control}
          defaultValue="#"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="22 - Público alvo"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="#" value="#">
                # - Sem publico especifico
              </MenuItem>
              <MenuItem key="a" value="a">
                a - Pré-escolar
              </MenuItem>
              <MenuItem key="b" value="b">
                b - Infantil (1o. ciclo)
              </MenuItem>
              <MenuItem key="c" value="c">
                c - Pré-adolescente (2o. ciclo)
              </MenuItem>
              <MenuItem key="d" value="d">
                d - Adolescente
              </MenuItem>
              <MenuItem key="e" value="e">
                e - Adulto
              </MenuItem>
              <MenuItem key="f" value="f">
                f - Especializado
              </MenuItem>
              <MenuItem key="g" value="g">
                g - Geral
              </MenuItem>
              <MenuItem key="h" value="h">
                j - Juvenil
              </MenuItem>
              <MenuItem key="|" value="|">
                | - Não codificado
              </MenuItem>
            </TextField>
          )}
        />
        {/** 23 - Forma do documento */}
        <Controller
          name={"tag008.tag008-23"}
          control={props.control}
          defaultValue="#"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="23 - Público alvo"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="#" value="#">
                # - Nenhum dos códigos seguintes
              </MenuItem>
              <MenuItem key="a" value="a">
                a - Microfilme
              </MenuItem>
              <MenuItem key="b" value="b">
                b - Microficha
              </MenuItem>
              <MenuItem key="c" value="c">
                c - Microopaca
              </MenuItem>
              <MenuItem key="d" value="d">
                d - Impressão ampliada
              </MenuItem>
              <MenuItem key="f" value="f">
                f - Braile
              </MenuItem>
              <MenuItem key="o" value="o">
                o – Online
              </MenuItem>
              <MenuItem key="q" value="q">
                q - Dispositivo eletrônico direto
              </MenuItem>
              <MenuItem key="r" value="r">
                r - Reprodução em impressão regular
              </MenuItem>
              <MenuItem key="s" value="s">
                s – Eletrônica
              </MenuItem>
              <MenuItem key="|" value="|">
                | - Não codificado
              </MenuItem>
            </TextField>
          )}
        />
        {/** 24-27 Natureza do conteúdo */}
        <Controller
          name={"tag008.tag008-27"}
          control={props.control}
          defaultValue="#"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="24-27 - Natureza do conteúdo"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="#" value="#">
                # - Nenhum dos códigos seguintes
              </MenuItem>
              <MenuItem key="a" value="a">
                a - Resumos
              </MenuItem>
              <MenuItem key="b" value="b">
                b - Bibliografias
              </MenuItem>
              <MenuItem key="c" value="c">
                c - Catálogos
              </MenuItem>
              <MenuItem key="d" value="d">
                d - Dicionários
              </MenuItem>
              <MenuItem key="e" value="e">
                e - Enciclopédia
              </MenuItem>
              <MenuItem key="f" value="f">
                f - Manuais
              </MenuItem>
              <MenuItem key="g" value="g">
                g - Artigos jurídicos
              </MenuItem>
              <MenuItem key="i" value="i">
                i - Índices
              </MenuItem>
              <MenuItem key="j" value="j">
                j - Patentes
              </MenuItem>
              <MenuItem key="k" value="k">
                k - Discografias
              </MenuItem>
              <MenuItem key="l" value="l">
                l - Legislação
              </MenuItem>
              <MenuItem key="m" value="m">
                m - Teses e dissertações
              </MenuItem>
              <MenuItem key="n" value="n">
                n - Revisão de literatura
              </MenuItem>
              <MenuItem key="o" value="o">
                o - Recensão
              </MenuItem>
              <MenuItem key="p" value="p">
                p - Textos programados
              </MenuItem>
              <MenuItem key="q" value="q">
                q - Filmografia
              </MenuItem>
              <MenuItem key="r" value="r">
                r - Diretórios
              </MenuItem>
              <MenuItem key="s" value="s">
                s - Estatísticas
              </MenuItem>
              <MenuItem key="t" value="t">
                t - Relatórios técnicos
              </MenuItem>
              <MenuItem key="u" value="u">
                u - Normas/Especificações
              </MenuItem>
              <MenuItem key="w" value="w">
                w - Relatório de legislação
              </MenuItem>
              <MenuItem key="y" value="y">
                y - Anuários
              </MenuItem>
              <MenuItem key="z" value="z">
                z - Tratados
              </MenuItem>
              <MenuItem key="2" value="2">
                2 - Separata
              </MenuItem>
              <MenuItem key="5" value="5">
                5 - Calendários
              </MenuItem>
              <MenuItem key="6" value="6">
                6 - História em quadrinhos
              </MenuItem>
              <MenuItem key="|" value="|">
                | - Não codificado
              </MenuItem>
            </TextField>
          )}
        />
        {/** 28 - Publicação governamental */}
        <Controller
          name={"tag008.tag008-28"}
          control={props.control}
          defaultValue="#"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="28 - Publicação governamental"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="#" value="#">
                # - Publicação não oficial
              </MenuItem>
              <MenuItem key="a" value="a">
                a - Publicação de região autônoma
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
                o - Publicação governamental
              </MenuItem>
              <MenuItem key="s" value="s">
                s - Estado, província, território, jurisdição, etc.
              </MenuItem>
              <MenuItem key="u" value="u">
                u - Ignorado
              </MenuItem>
              <MenuItem key="z" value="z">
                z - Outro
              </MenuItem>
              <MenuItem key="|" value="|">
                | - Não codificado
              </MenuItem>
            </TextField>
          )}
        />
        {/** 29 - Publicação de Conferência */}
        <Controller
          name={"tag008.tag008-29"}
          control={props.control}
          defaultValue="0"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="29 - Publicação de Conferência"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="0" value="0">
                0 - Não é publicação de conferência
              </MenuItem>
              <MenuItem key="1" value="1">
                1 - É uma publicação de conferência
              </MenuItem>
              <MenuItem key="|" value="|">
                | - Não codificado
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
                0 - Não é uma obra comemorativa
              </MenuItem>
              <MenuItem key="1" value="1">
                1 - É uma coletânea de homenagem
              </MenuItem>
              <MenuItem key="|" value="|">
                | - Não codificado
              </MenuItem>
            </TextField>
          )}
        />
        {/** 31 - Índice */}
        <Controller
          name={"tag008.tag008-31"}
          control={props.control}
          defaultValue="0"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="31 - Índice"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="0" value="0">
                0 - Sem índice
              </MenuItem>
              <MenuItem key="1" value="1">
                1 - Inclui índice
              </MenuItem>
              <MenuItem key="|" value="|">
                | - Não codificado
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
        {/** 33 - Forma literária */}
        <Controller
          name={"tag008.tag008-33"}
          control={props.control}
          defaultValue="0"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="31 - Índice"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="0" value="0">
                0 - Não é uma obra de ficção
              </MenuItem>
              <MenuItem key="1" value="1">
                1 - Ficção
              </MenuItem>
              <MenuItem key="d" value="d">
                d - Drama
              </MenuItem>
              <MenuItem key="f" value="f">
                f - Romance
              </MenuItem>
              <MenuItem key="h" value="h">
                h - Humor, sátira, etc.
              </MenuItem>
              <MenuItem key="i" value="i">
                i - Cartas
              </MenuItem>
              <MenuItem key="j" value="j">
                j - Contos
              </MenuItem>
              <MenuItem key="m" value="m">
                m - Mais de uma forma literária
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
                | - Não codificado
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
              label="31 - Índice"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="0" value="0">
                0 - Não é uma obra de ficção
              </MenuItem>
              <MenuItem key="1" value="1">
                1 - Ficção
              </MenuItem>
              <MenuItem key="d" value="d">
                d - Drama
              </MenuItem>
              <MenuItem key="f" value="f">
                f - Romance
              </MenuItem>
              <MenuItem key="h" value="h">
                h - Humor, sátira, etc.
              </MenuItem>
              <MenuItem key="i" value="i">
                i - Cartas
              </MenuItem>
              <MenuItem key="j" value="j">
                j - Contos
              </MenuItem>
              <MenuItem key="m" value="m">
                m - Mais de uma forma literária
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
                | - Não codificado
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
                # - Não modificado
              </MenuItem>
              <MenuItem key="s" value="s">
                s - Abreviado
              </MenuItem>
              <MenuItem key="d" value="d">
                d - Informação omitida
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
                | - Não codificado
              </MenuItem>
            </TextField>
          )}
        />
        {/** 39 - Fonte de catalogação */}
        <Controller
          name={"tag008.tag008-39"}
          control={props.control}
          defaultValue="#"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="39 - Fonte de catalogação"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="#" value="#">
                # - Agência bibliográfica nacional
              </MenuItem>
              <MenuItem key="c" value="c">
                c - Catalogação Cooperativa
              </MenuItem>
              <MenuItem key="d" value="d">
                d - Outra
              </MenuItem>
              <MenuItem key="u" value="u">
                u - Desconhecida
              </MenuItem>
              <MenuItem key="|" value="|">
                | - Não codificado
              </MenuItem>
            </TextField>
          )}
        />
      </Grid>
    </Accordion>
  );
}
