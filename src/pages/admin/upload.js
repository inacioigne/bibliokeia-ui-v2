import { Input, Container, Button } from "@mui/material";
import { useState } from "react";
import { api } from "src/services/api";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

export default function Upload() {
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
    // console.log("file", image)
    body.append("file", image);

    // const response = await fetch("/api/upload", {
    //   method: "POST",
    //   body
    // });
    const response = await api.post("/user/imagem", body, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    console.log("IMG: ", response);
  };

  return (
    <Container>
      <h1>Upload</h1>
      <form onSubmit={uploadToServer}>
        <Input
          sx={{ display: "none" }}
          name="img"
          type="file"
          onChange={uploadToClient}
          id="img_profile"
        />
        <label htmlFor="img_profile">
          <AddAPhotoIcon />
        </label>

        <Button variant="outlined" type="submit">
          Salvar
        </Button>
      </form>
      <img src={createObjectURL} />
    </Container>
  );
}
