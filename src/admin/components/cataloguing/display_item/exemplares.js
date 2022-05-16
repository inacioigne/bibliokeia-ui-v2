import {
  Box,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { api } from "src/services/api";
import { useContext, useRef, useState, useCallback } from "react";
import { ItemContext } from "src/admin/contexts/itemContext";
import DeleteIcon from "@mui/icons-material/Delete";



export default function Exemplares(props) {
  const {
    item_id,
    rowsEx,
    setRowsEx,
    checkboxExemplares,
    setCheckboxExemplares,
    snackbar, setSnackbar, handleCloseSnackbar
  } = useContext(ItemContext);
  const [selectionModel, setSelectionModel] = useState([]);

  const handleDelete = () => {
    const newRow = rowsEx.filter((row) => {
      return !selectionModel.includes(row.id);
    });

    const pr = new Promise((resolve, reject) => {
      setPromiseArguments({ resolve, reject, newRow, selectionModel });
    });

 
  };

  {
    /** CONFIRMAÇÃO */
  }
  const handleYes = async () => {
    const { newRow, selectionModel, reject, resolve } = promiseArguments;
    try {
      //FAZER O DELETE
      selectionModel.forEach((ex_id) => {
        api
          .delete(`/cataloging/exemplar/${ex_id}`)
          //.then((response) => console.log("DEL: ", response))
          .catch((error) => {
            if (error.response) {
              console.log(error.response);
            }
          });
      });
      setRowsEx(newRow);

      setPromiseArguments(null);
      setCheckboxExemplares(!checkboxExemplares)
    } catch (error) {
      //setSnackbar({ children: "Name can't be empty", severity: "error" });
      reject(selectionModel);
      setPromiseArguments(null);
      setCheckboxExemplares(!checkboxExemplares)
    }
  };
  const handleNo = () => {
    const { newRow, selectionModel } = promiseArguments;
    //resolve(selectionModel);
    //console.log("NO: ", promiseArguments)
    setPromiseArguments(null);
    setCheckboxExemplares(!checkboxExemplares)
  };
  const noButtonRef = useRef(null);
  const handleEntered = () => {
    //not used
  };
  const [promiseArguments, setPromiseArguments] = useState(null);
  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }
    const { newRow, selectionModel } = promiseArguments;

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Deseja excluir os exemplares?</DialogTitle>
        <DialogContent dividers>
          {
            rowsEx.filter((row) => {
      return selectionModel.includes(row.id);
     }).map((row) => (            
            <p key={row.id}>{row.number}</p>
          ))}
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            Não
          </Button>
          <Button onClick={handleYes}>Sim</Button>
        </DialogActions>
      </Dialog>
    );
  };
 
  const handleNoUpdate = () => {
    const { oldRow, resolve } = promiseUpdateEx;
    resolve(oldRow);
 
    setPromiseUpdateEx(null);

  };
  const handleYesUpdate = async () => {
    const { newRow, oldRow, reject, resolve } = promiseUpdateEx;
    try {

      //console.log("NEWROW: ", newRow)
      api.put(`/cataloging/exemplar/${newRow.id}`, newRow)
      .then((response) => console.log("UPDATE: ", response))
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
      setSnackbar({ children: 'Exemplar atualizado', severity: 'success' });
      resolve(newRow);
      setPromiseUpdateEx(null);
    } catch (error) {
      //setSnackbar({ children: "Name can't be empty", severity: "error" });
      console.log("ERROU!!!: ", error)
      reject(oldRow);
      setPromiseUpdateEx(null);
    }
  };

  const renderConfirmUpdate = () => {
    if (!promiseUpdateEx) {
      return null;
    }
    const { newRow, oldRow } = promiseUpdateEx;
    const mutation = computeMutation(newRow, oldRow);
    
    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseUpdateEx}
      >
        <DialogTitle>Deseja substituir: </DialogTitle>
        <DialogContent dividers>
          {`${mutation}?`}
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNoUpdate}>
            Não
          </Button>
          <Button onClick={handleYesUpdate}>Sim</Button>
        </DialogActions>
      </Dialog>
    );
  };
  function computeMutation(newRow, oldRow) {
    if (newRow.library !== oldRow.library) {      
      return `${oldRow.library} por ${newRow.library}`;
    }
    if (newRow.volume !== oldRow.volume) {      
      return `${oldRow.volume} por ${newRow.volume}`;
    }
    if (newRow.ex !== oldRow.ex) {      
      return `${oldRow.ex} por ${newRow.ex}`;
    }
    if (newRow.shelf !== oldRow.shelf) {      
      return `${oldRow.shelf} por ${newRow.shelf}`;
    }
    if (newRow.callnumber !== oldRow.callnumber) {      
      return `${oldRow.callnumber} por ${newRow.callnumber}`;
    }
    if (newRow.collection !== oldRow.collection) {      
      return `${oldRow.collection} por ${newRow.collection}`;
    }
    if (newRow.status !== oldRow.status) {      
      return `${oldRow.status} por ${newRow.status}`;
    }
    
    return null;
  }
  const [promiseUpdateEx, setPromiseUpdateEx] = useState(null);
  const updateEx = useCallback(
    (newRow, oldRow) =>
    new Promise((resolve, reject) => {
      
      const mutation = computeMutation(newRow, oldRow);
      if (mutation) {
        setPromiseUpdateEx({ resolve, reject, newRow, oldRow });
        //console.log('UP: ', promiseUpdateEx)

      } else {
                 resolve(oldRow);
              }


    }), [])
  

  return (
    <Box>
      {renderConfirmDialog()}
      {renderConfirmUpdate()}

      <Box style={{ height: 250, width: "100%" }}>
        <DataGrid
          columns={[
            { field: "library",  headerName: 'Biblioteca', width: 200, editable: true },
            { field: "shelf", headerName: 'Localização', width: 150, editable: true },
            { field: "callnumber", headerName: 'Chamada', width: 150, editable: true },
            { field: "collection", headerName: 'Coleção', width: 150, editable: true },
            { field: "volume", headerName: 'Volume', editable: true },
            { field: "ex", headerName: 'Exemplar', editable: true },
            { field: "number", headerName: 'Registro',},
            { field: "status", headerName: 'Status', editable: true },
          ]}
          rows={rowsEx}
          hideFooter
          checkboxSelection={checkboxExemplares}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
          experimentalFeatures={{ newEditingApi: true }}
          processRowUpdate={updateEx}
       
        />
      </Box>
      <Button
        sx={checkboxExemplares ? { mt: 1 } : { display: "none" }}
        aria-label="delete"
        size="small"
        variant="outlined"
        onClick={handleDelete}
      >
        Excluir <DeleteIcon />
      </Button>
      <Button
        sx={checkboxExemplares ? { mt: 1, ml: 1 } : { display: "none" }}
        aria-label="delete"
        size="small"
        variant="outlined"
        onClick={handleDelete}
      >
        Cancelar 
      </Button>
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Box>
  );
}
