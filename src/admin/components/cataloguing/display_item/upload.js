import { api } from "src/services/api";
import { ItemContext } from "src/admin/contexts/itemContext";
import { useState, useEffect, useContext } from "react";
import { Input, Container, Button, Box } from "@mui/material";
import ImgItem from "src/admin/components/cataloguing/display_item/img_item";

export default function UploadImg() {
  const { item, item_id } = useContext(ItemContext);
  const [image, setImage] = useState(null);
  const [itemImg, setItemImg] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [btnVisible, setBtnVisible] = useState(true);

  const getItemImg = async () => {
    const response = await api.get(`cataloguing/item/${item_id}/imagem`);
    //setData(response.data);
    if (response.status == 200) {
        setItemImg(`http://localhost:8000/cataloguing/item/${item_id}/imagem`);
    } 
  };

  const uploadToServer = async (event) => {
    event.preventDefault();
    const body = new FormData();
    body.append("file", image);

    const response = await api.post(
      `cataloguing/item/${item_id}/imagem`,
      body,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    if (response.status === 201) {
        // const res = await api.get(`/user/${user_id}`);
        // const img = await res.data.img;
        setItemImg(`http://localhost:8000/cataloguing/item/${item_id}/imagem`);
        setBtnVisible(false);
      }
  
      console.log("RES: ", response);

  };

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  useEffect(() => {
    getItemImg();
  }, []);

  

  return (
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
          <ImgItem
            itemImg={itemImg}
            createObjectURL={createObjectURL}
            uploadToServer={uploadToServer}
            btnVisible={btnVisible}
          />
        </label>
      </form>
    </Box>
  );
}
