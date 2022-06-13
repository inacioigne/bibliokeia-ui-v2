import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  styled,
  Skeleton
} from "@mui/material/";
import Image from "next/image";
import Link from 'next/link'
import { purple } from "@mui/material/colors";

export default function CardList({
  title,
  author,
  local,
  publisher,
  year,
  subjects,
  cdd,
  cutter,
  resources,
  itemId
}) {

  let img = false

  if (resources) {
    let [img] = resources.filter(function (resource) {
      return resource.subfields['3'] === 'capa'
    }
    ) 

  } 

  const SubjectButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
    padding: "1px 5px",
    marginLeft: 3,
  }));
  return (
    <Card sx={{ display: "flex" }}>
    {img ?
      <Image
        src={
            img.subfields.u
        }
        width={155}
        height={200}
      /> :
      <Skeleton variant="rectangular" width={155} height={200} />
    }
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {`${title} / ${author}`}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {`Publicação: ${local}${publisher}${year}.`}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Assunto:
            </Typography>
            {subjects.map((subject, index) => (
              <SubjectButton key={index} >{subject.subfields.a}</SubjectButton>
            ))}
          </Box>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
              {`Número de chamda: ${cdd} ${cutter}`}
           
          </Typography>
          <Box sx={{ "& button": { mt: 2, ml: 1 } }}>
          <Link href={`/admin/cataloguing/${itemId}`}>
            <Button size="small" variant="outlined">
              Detalhes
            </Button>
            </Link>
            <Button size="small" variant="outlined">
              Emprestar
            </Button>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
