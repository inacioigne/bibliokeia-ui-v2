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
  ButtonGroup,
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
import { useState, useEffect  } from "react";
import Image from "next/image";
import { useRouter } from 'next/router'
import ImgProfile from "src/admin/components/users/img_profile"

export default function UserDetails({user_id}) {

  const [image, setImage] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [data, setData] = useState(null);
  const [btnVisible, setBtnVisible] = useState(true);
  
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const getUser = async () => {
    const response = await api.get(`/user/${user_id}`);
    setData(response.data);
    if (response.data.img) {
      setUserImg(response.data.img)

    }
    

  };

  useEffect(() => {  
    getUser()  

  }, [])



  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
      console.log("IMG: ", createObjectURL);

    }
  };

  const uploadToServer = async (event) => {
    event.preventDefault();
    const body = new FormData();

    body.append("file", image);

    const response = await api.post(`user/${user_id}/imagem`, body, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (response.status === 201) {
      const res = await api.get(`/user/${user_id}`);
      const img = await res.data.img;
      setUserImg(img);
      setBtnVisible(false)

    }

    console.log("RES: ", response);
  };

  const buttons = [
    <Button key="cancel">Cancelar</Button>,
    <Button key="salve">Salvar</Button>,
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Card>
        <CardHeader title={<Typography variant="h5">{data?.name}</Typography>} />
        <Divider />
       
        <CardContent>
          <Box sx={{ display: "flex", gap: 2 }}>
      {/*       {createObjectURL && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  "& > *": {
                    m: 1,
                  },
                }}
              >
                <Image src={createObjectURL} width={155} height={200} />
                <ButtonGroup sx={ btnVisible ? { display: "flex"} : { display: "None"} }
                size="small" aria-label="small button group">
                  <Button key="cancel">Cancelar</Button>
                  <Button key="salve" onClick={uploadToServer}>Salvar</Button>
                </ButtonGroup>
              </Box>
            )}
 */}
            <form onSubmit={uploadToServer}>
              <Input
                sx={{ display: "none" }}
                name="img"
                type="file"
                onChange={uploadToClient}
                id="img_profile"
              />
              <label htmlFor="img_profile">
              <ImgProfile userImg={userImg} 
              createObjectURL={createObjectURL}
              uploadToServer={uploadToServer}
              btnVisible={btnVisible}
              />
                {/* <Box
                  sx={ createObjectURL ? {display: 'None'} :
                      {
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 155,
                          height: 200,
                          border: 1,
                        }
                  }
                >
                { userImg ? 
                  <Image src={userImg} width={155} height={200} /> :

                  <Avatar
                    sx={{
                      bgcolor: red[500],
                      width: 80,
                      height: 80,
                    }}
                    aria-label="recipe"
                  >
                    <AddAPhotoIcon sx={{ fontSize: 50 }} />
                  </Avatar> }
                </Box> */}
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
                  {`${data?.addressStreet}, 
            ${data?.addressNumber},
             ${data?.addressDistrict} - ${data?.addressCity}`}
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
                  {`${data?.addressCep}`}
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
                  {`${data?.vinculo}`}
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
                  {`${data?.email}`}
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
                  {`${data?.cellphone}`}
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
  //console.log("User_ID: ", user_id);
  // Fetch data from external API
  /* const res = await api.get(`/user/${user_id}`);
  const data = await res.data; */
  //console.log('User: ', res)

  // Pass data to the page via props
  return { props: { user_id } };
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
