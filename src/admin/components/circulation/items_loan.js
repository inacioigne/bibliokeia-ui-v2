import {
  Divider,
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  Typography,
  TableRow,
  TableBody,
  Button
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(title, exemplar, loan, due, protein) {
  return { title, exemplar, loan, due, protein };
}

const rows = [
  createData("Frozen yoghurt", "22-0001", "01/06/2022", "09/06/2022", 4.0),
  createData("Ice cream sandwich", "01/06/2022", "09/06/2022", 37, 4.3),
  createData("Eclair", "22-0003", "01/06/2022", "09/06/2022", 6.0),
  createData("Cupcake", "22-0003", "01/06/2022", "09/06/2022", 4.3),
  createData("Gingerbread", "22-0003", "01/06/2022", "09/06/2022", 3.9),
];

export default function ItemsLoan() {
  return (
    <Box sx={{ mt: 2 }}>
      <Divider />
      <Typography variant="h6" sx={{ mt: 1 }}>
        Obras emprestadas
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Título</StyledTableCell>
              <StyledTableCell align="right">Exemplar</StyledTableCell>
              <StyledTableCell align="right">Empréstimo</StyledTableCell>
              <StyledTableCell align="right">Vencimento</StyledTableCell>
              <StyledTableCell align="right">Devolução</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.title}
                </StyledTableCell>
                <StyledTableCell align="right">{row.exemplar}</StyledTableCell>
                <StyledTableCell align="right">{row.loan}</StyledTableCell>
                <StyledTableCell align="right">{row.due}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    // sx={{ mt: 2 }}
                    onClick={() => {
                      console.log("ok");
                    }}
                  >
                    Devolver
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
