import Layout from "src/layouts/layoutMain";
import { ThemeProvider } from "@mui/material/styles";
import { DashboardLayout } from "src/layouts/dashboard-layout";
import { theme } from "src/theme";
import { Box, Container, InputBase, IconButton, Card, CardContent, Typography, Button} from "@mui/material/";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";

export default function Acervo() {
  return (
    <Container>
      <Box sx={{display: "flex", justifyContent: 'center'}}>
      <Box sx={{ display: "flex", mt: 3, border: 1, borderRadius: 5, width: "300px" }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Busca"
          inputProps={{ "aria-label": "busca" }}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Box>

      </Box>
      <Box>
          <Card sx={{ display: 'flex' }}>
          {/* <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="/static/images/cards/live-from-space.jpg"
        alt="Live from space album cover"
      /> */}
      <Image
          src={"https://images-na.ssl-images-amazon.com/images/I/61ukqo09V1L._SY344_BO1,204,203,200_QL70_ML2_.jpg"}
          width={155}
          height={200} 
        />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto'}}>
          <Typography component="div" variant="h5">
            Histórias assustadoras para contar à noite / Edgar Allan Poe
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Publicação: São Paulo: Companhia das Letras, 2020.
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Assunto: Terror; Horror
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Número de chamda: 856.7 P589h
          </Typography>
          <Box sx={{ '& button': { mt: 2, ml: 1 } }}>
          <Button size="small" variant="outlined">Detalhes</Button>
          <Button size="small" variant="outlined">Emprestar</Button>

          </Box>
          
          

          </CardContent>
          
          </Box>
              

          </Card>
      </Box>

      
    </Container>
  );
}

Acervo.getLayout = function getLayout(page) {
  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <DashboardLayout>{page}</DashboardLayout>
      </ThemeProvider>
    </Layout>
  );
};
