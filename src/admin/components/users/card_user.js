import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NextLink from "next/link";

export const CardUser = (props) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            Usuários
          </Typography>
          <Typography color="textPrimary" variant="h4">
            56
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
              <AccountCircleIcon />
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
        <NextLink href="/admin/users/register" passHref>
          <Button variant="outlined" size="small">
            Cadastrar
          </Button>
          
        </NextLink>
      </Box>
    </CardContent>
  </Card>
);
