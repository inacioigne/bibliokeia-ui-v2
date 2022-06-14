import { Avatar, ButtonGroup, Box, Button } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { red } from "@mui/material/colors";
import Image from "next/image";

export default function ImgItem({
  itemImg,
  createObjectURL,
  uploadToServer,
  btnVisible,
}) {
  if (createObjectURL) {
    return (
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
        <ButtonGroup
          sx={btnVisible ? { display: "flex" } : { display: "None" }}
          size="small"
          aria-label="small button group"
        >
          <Button key="cancel">Cancelar</Button>
          <Button key="salve" onClick={uploadToServer}>
            Salvar
          </Button>
        </ButtonGroup>
      </Box>
    );
  } else if (itemImg) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 155,
          height: 200,
          border: 1,
        }}
      >
        <Image src={itemImg} width={155} height={200} />
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
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
    );
  }
}
