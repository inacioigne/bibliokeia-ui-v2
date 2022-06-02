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
  TableContainer,
  Paper,
  Table,
  TableHead 
} from "@mui/material";
import { api } from "src/services/api";
//import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
//import { red } from "@mui/material/colors";
import { useState, useEffect } from "react";
//import Image from "next/image";
//import { useRouter } from "next/router";
import ImgProfile from "src/admin/components/users/img_profile";
import Loan from "src/admin/components/circulation/loan";
import ItemsLoan from "src/admin/components/circulation/items_loan";

export default function UserDetails({ user_id }) {
  const [image, setImage] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [data, setData] = useState(null);
  const [btnVisible, setBtnVisible] = useState(true);

  //MODAL
  const [open, setOpen] = useState(false);
  const handleClose = (value) => {
    setOpen(false);
    //setSelectedValue(value);
  };

  const [createObjectURL, setCreateObjectURL] = useState(null);

  const getUser = async () => {
    const response = await api.get(`/user/${user_id}`);
    setData(response.data);
    if (response.data.img) {
      setUserImg(response.data.img);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
      setBtnVisible(false);
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
        <CardHeader
          title={<Typography variant="h5">{data?.name}</Typography>}
        />
        <Divider />

        <CardContent>
          <Box sx={{ display: "flex", gap: 2 }}>
            <form onSubmit={uploadToServer}>
              <Input
                sx={{ display: "none" }}
                name="img"
                type="file"
                onChange={uploadToClient}
                id="img_profile"
              />
              <label htmlFor="img_profile">
                <ImgProfile
                  userImg={userImg}
                  createObjectURL={createObjectURL}
                  uploadToServer={uploadToServer}
                  btnVisible={btnVisible}
                />
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
              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 2 }}
                onClick={() => {
                  setOpen(true);
                }}
              >
                Emprestar
              </Button>
            </Box>
          </Box>
          <ItemsLoan />
          
        </CardContent>
      </Card>
      <Loan open={open} onClose={handleClose} user={user_id} />
    </Box>
  );
}

export async function getServerSideProps(context) {
  //const router = useRouter();
  const { user_id } = context.query;

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
