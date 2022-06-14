import Box from "@mui/material/Box";
import Image from "next/image";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Skeleton from '@mui/material/Skeleton';
import { red } from "@mui/material/colors";
import { useContext } from "react";
import { ItemContext } from "src/admin/contexts/itemContext";
import UploadImg from "src/admin/components/cataloguing/display_item/upload"


export default function Record(props) {
  const { item } = useContext(ItemContext);
  


//  function getImagem() {
//    if (item?.datafields[856]) {
//     let [f] = item.datafields[856].filter((field) => {return field.subfields[3] == 'capa'})
//      return f
//    } else {
//      return false
//    }
//  }
//  const img = getImagem(props)

  

    
  return (
    <Box
      sx={
        props.value == 0
          ? { display: "block", gap: 3, mb: 2 }
          : { display: "none" }
      }
    >

      <Box sx={{ display: "flex", gap: 2 }}>
      {/** IMAGEM */}
      <UploadImg />

     {/*  {img ?
        <Image
          src={img.subfields.u}
          width={155}
          height={200} 
        />
         :
        <Skeleton variant="rectangular" width={155} height={200} />
      }
       */}

        <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
          {/** Autoria */}
          { item ?
            <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button>Autoria</Button>
            <Button style={{ textTransform: "none" }}>
              {item.datafields[245].subfields.c}
            </Button>
          </ButtonGroup> :
          <Skeleton variant="rectangular" width={250} height={35} />
          }
          
          {/** Publicação */}
          { item ?
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
          >
            <Button>Publicação</Button>
            <Button style={{ textTransform: "none" }}>
              { item.datafields[260] ? (
                `${item.datafields[260].subfields.a}
                ${item.datafields[260].subfields.b}
                ${item.datafields[260].subfields.c}`
              ) :
              "Ops!!"
              
            }
            </Button>
          </ButtonGroup> :
          <Skeleton variant="rectangular" width={300} height={35} /> }


          {/** Assuntos */}
          { item ?
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button>Assuntos</Button>

            {item.datafields[650].map((field, index) => (
              <Button key={index} style={{ textTransform: "none" }}>
                <Box
                  sx={{
                    bgcolor: red[400],
                    color: "white",
                    pl: 1,
                    pr: 1,
                    borderRadius: 1,
                  }}
                >
                  {field.subfields.a}
                </Box>
              </Button>
            ))}
          </ButtonGroup> :
          <Skeleton variant="rectangular" width={250} height={35} /> }

          {/** Chamada */}
          { item ?
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button>Chamada</Button>
            <Button style={{ textTransform: "none" }}>
              {`${item.datafields["090"].subfields.a}`}
            </Button>
          </ButtonGroup> :
          <Skeleton variant="rectangular" width={250} height={35} /> }

        </Box>
      </Box>
    </Box>
  );
}
