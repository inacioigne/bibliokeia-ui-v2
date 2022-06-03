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
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { api } from "src/services/api";
import Snack from "src/admin/components/alert/snack";
import { useState } from "react";

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

export default function ItemsLoan({ loans, setLoans }) {
  const [snack, setSnack] = useState(false);
  console.log('L: ', snack)
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
            {loans.map((loan, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {loan.title}
                </StyledTableCell>
                <StyledTableCell align="right">{loan.exemplar}</StyledTableCell>
                <StyledTableCell align="right">{loan.loan_at}</StyledTableCell>
                <StyledTableCell align="right">{loan.due}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    // sx={{ mt: 2 }}
                    onClick={async () => {
                      await api
                        .post(`circulation/devolution/${loan.exemplar}`)
                        .then((response) => {
                          if (response.status == 200) {
                            const newLoans = loans.filter((e, i) => {
                              if (i != index) {
                                return e;
                              }
                            });
                            setLoans(newLoans);
                            setSnack(true)
                    
                          }
                        });
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
      { snack && <Snack open={true} />}

      
    </Box>
  );
}
