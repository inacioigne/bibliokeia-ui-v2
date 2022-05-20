import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import NextLink from "next/link";
import { createTheme, ThemeProvider  } from '@mui/material/styles';
import { green, orange } from '@mui/material/colors';

const outerTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        },
        // sizeSmall: {
        //   padding: '5px'
        // }
      }
    }

  }
});

export const Book = (props) => (
  <Card sx={{ height: "100%" }} {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            Livros
          </Typography>
          <Typography color="textPrimary" variant="h4">
            256
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: "error.main",
              height: 56,
              width: 56,
            }}
          >
            <MenuBookOutlinedIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NextLink href="/admin/cataloguing/book/create" passHref>
          {/* <ThemeProvider theme={outerTheme} > 
          </ThemeProvider>          */}
          <Button variant="outlined" size="small">
            Novo
          </Button>
          
        </NextLink>
      </Box>
    </CardContent>
  </Card>
);
