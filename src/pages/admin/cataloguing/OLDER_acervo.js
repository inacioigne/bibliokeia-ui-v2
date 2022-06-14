import Layout from "src/layouts/layoutMain";
import { ThemeProvider } from "@mui/material/styles";
import { DashboardLayout } from "src/layouts/dashboard-layout";
import { theme } from "src/theme";
import {
  Box,
  Container,
  InputBase,
  IconButton,
} from "@mui/material/";
import SearchIcon from "@mui/icons-material/Search";
import { api } from "src/services/api"
import CardList from "src/admin/components/cataloguing/display_item/card_list_item"

export default function Acervo({ data }) {

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "center", pb: 5 }}>
        <Box
          sx={{
            display: "flex",
            mt: 3,
            border: 1,
            borderRadius: 5,
            width: "300px",
          }}
        >
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
      <Box sx={{ mb: 5 }}>
        { data.items.map((item, index) => (
          <Box key={index} sx={{ mb: 2}} >
            <CardList 
            title={item.marc.datafields['245'].subfields.a}
            author={item.marc.datafields['245'].subfields.c}
            local={item.marc.datafields['260'].subfields.a}
            publisher={item.marc.datafields['260'].subfields.b}
            year={item.marc.datafields['260'].subfields.c}
            subjects={item.marc.datafields['650']}
            cdd={item.marc.datafields['082'].subfields.a}
            cutter={item.marc.datafields['090'].subfields.b}
            resources={item.marc.datafields['856']}
            img={item.img}
            itemId={item.id}
            />
            
          </Box>
          

        ))}
        
        
      </Box>
    </Container>
  );
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await api.get('acervo/item/items')
  const data = await res.data

  return {
    props: {
      data,
    },
  }
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
