import { theme } from "src/theme";
import { DashboardLayout } from "src/layouts/dashboard-layout";
import Layout from "src/layouts/layoutMain";
import { ThemeProvider } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  Divider,
  Avatar,
  Typography,
  Input,
  IconButton,
  Menu,
  MenuItem,
  CardContent,
  Box,
  Button,
  Dialog,
  styled,
  DialogTitle,
  Stack,
  Snackbar,
} from "@mui/material";
import { api } from "src/services/api";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { red } from "@mui/material/colors";
import { useState } from "react";
import Image from "next/image";

export default function UserDetails({ data }) {

    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);

    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
          const i = event.target.files[0];
    
          setImage(i);
          setCreateObjectURL(URL.createObjectURL(i));
          
        }
      };

      const uploadToServer = async (event) => {
        event.preventDefault();
        const body = new FormData();
   
        body.append("file", image);
    
        const response = await api.post("/user/imagem", body, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
    
        console.log("IMG: ", response);
      };

  return (
    <Box sx={{ p: 2 }}>
      <Card>
        <CardHeader title={<Typography variant="h5">{data.name}</Typography>} />
        <Divider />
        <CardContent>
          <Box sx={{ display: "flex", gap: 2 }}>
              {createObjectURL && 
               <Image
               src={createObjectURL}
               width={155}
               height={200} 
             />
              }
             

         
         
              
          <form onSubmit={uploadToServer}>
          <Input
          sx={ { display: "none" }}
          name="img"
          type="file"
          onChange={uploadToClient}
          id="img_profile"
        />
        <label htmlFor="img_profile">
                 
            <Box
              sx={ createObjectURL ? {display: "none"} : {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 155,
                height: 200,
                border: 1,
              }}
            >
              
              <Avatar
                sx={{
                  bgcolor: red[500],
                  width: 80,
                  height: 80,
                }}
                aria-label="recipe"
              >
                <AddAPhotoIcon sx={{ fontSize: 50 }} />
              </Avatar>
            </Box>
            </label>
            </form> 
            <Box>
              <Box sx={{ display: "flex" }}>
                <Typography
                  sx={{ mr: 1 }}
                  variant="subtitle1"
                  color="text.primary"
                  component="div"
                >
                  Endereço:{" "}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {`${data.addressStreet}, 
            ${data.addressNumber},
             ${data.addressDistrict} - ${data.addressCity}`}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Typography
                  sx={{ mr: 1 }}
                  variant="subtitle1"
                  color="text.primary"
                  component="div"
                >
                  CEP:{" "}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {`${data.addressCep}`}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Typography
                  sx={{ mr: 1 }}
                  variant="subtitle1"
                  color="text.primary"
                  component="div"
                >
                  Vinculo:{" "}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {`${data.vinculo}`}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Typography
                  sx={{ mr: 1 }}
                  variant="subtitle1"
                  color="text.primary"
                  component="div"
                >
                  Email:{" "}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {`${data.email}`}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Typography
                  sx={{ mr: 1 }}
                  variant="subtitle1"
                  color="text.primary"
                  component="div"
                >
                  Celular:{" "}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {`${data.cellphone}`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export async function getServerSideProps(context) {
  //const router = useRouter();
  const { user_id } = context.query;
  console.log("User_ID: ", user_id);
  // Fetch data from external API
  const res = await api.get(`/user/${user_id}`);
  const data = await res.data;
  //console.log('User: ', res)

  // Pass data to the page via props
  return { props: { data } };
}

UserDetails.getLayout = function getLayout(page) {
  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <DashboardLayout>{page}</DashboardLayout>
      </ThemeProvider>
    </Layout>
  );
};
