import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback, useRef, useState } from "react";
import { api } from "src/services/api"
import Snackbar from "@mui/material/Snackbar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useContext } from 'react';
import { ItemContext } from "src/admin/contexts/itemContext"

const useFakeMutation = () => {
  return useCallback(
    (item) =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          if (item.Subcampos?.trim() === "") {
            reject();
          } else {
            resolve(item);
          }
        }, 200)
      ),
    []
  );
};

function computeMutation(newRow, oldRow) {
  if (newRow.Subcampos !== oldRow.Subcampos) {
    return `Subcampo '${oldRow.Subcampos}' por '${newRow.Subcampos}`;
  }
  return null;
}

export default function TagsMarc(props) {

  const { item_id, item, setItem } = useContext(ItemContext);
  
  
  
  function setRows(item) {
    if (item.controlfields) {
      let rows = [
        {
          id: "000",
          Tag: "000",
          Ind1: "#",
          Ind2: "#",
          Subcampos: item.leader,
        },
      ];
      {/** CONTROLFIELDS */}
      for (let [k, v] of Object.entries(item.controlfields)) {
        rows.push({
          id: k,
          Tag: k,
          Ind1: "#",
          Ind2: "#",
          Subcampos: v
        })
      }

      {/** DATAFIELDS */}
        for (let [k, v] of Object.entries(item.datafields)) {
          if (! Array.isArray(v)) {
            let subfield = JSON.stringify(v.subfields)
            .replaceAll('":"',' ')
            .replace('{"', '|')
            .replaceAll('","', ' |')
            .replace('"}','')
            
            rows.push({
              id: k,
              Tag: k,
              Ind1: v.indicators.Ind1 ,
              Ind2: v.indicators.Ind2,
              Subcampos: subfield
            })
          } else {
            for (let [i, field] of Object.entries(v)) {
              let subfield = JSON.stringify(field.subfields)
              .replaceAll('":"',' ')
              .replace('{"', '|')
              .replaceAll('","', ' |')
              .replace('"}','')
              rows.push({
                id: `${k}_${i}`,
                Tag: k,
                Ind1: field.indicators.Ind1 ,
                Ind2: field.indicators.Ind2,
                Subcampos: subfield
              })
            }
          }
        }
      return rows
    } else {
      return false
    }
  }
  const rows = setRows(item)


  const cellEditable = ["245","250", "260", "300", "020", "082", "090"]
  const patchData = async (data) => {
    const res = await api.patch(
      `cataloging/item/${item_id}`, data);
      
      setItem(res.data)

  };

  const mutateRow = useFakeMutation();
  const noButtonRef = useRef(null);
  const [promiseArguments, setPromiseArguments] = useState(null);

  const [snackbar, setSnackbar] = useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          
          setPromiseArguments({ resolve, reject, newRow, oldRow });
         
        } else {
          resolve(oldRow);
        }
      }),
    []
  );

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow);
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;
    try {
      let sub = newRow.Subcampos.split("|")
      sub.shift()
      const obj = new Object();
      sub.forEach((e) => {
        obj[e.split(" ", 1)[0]] = e.substr(2);

      })

      let data = {
        tag: newRow.id,
        subfields: obj
      }
      //console.log("NEWROW: ", data)

    patchData(data).catch((err) => {
     console.error("ops! ocorreu um erro" + err);
     });
      const response = await mutateRow(newRow);
      //console.log("RES:", response);
      setSnackbar({ children: "Item atualizado com sucesso", severity: "success" });
      resolve(response);
      
      
      setPromiseArguments(null);
    } catch (error) {
      setSnackbar({ children: "Name can't be empty", severity: "error" });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const handleEntered = () => {
    //not used
  };

  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }
    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);
    
    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Tem certeza?</DialogTitle>
        <DialogContent dividers>
          {`Deseja substituir os ${mutation}.`}
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

 
  return (
    <Box sx={{ height: 400,
     '& .MuiDataGrid-cell--editable': {
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#376331' : 'rgb(217 243 190)',
        }, }}>
      {renderConfirmDialog()}
      <DataGrid
        columns={[
          { field: "Tag" },
          { field: "Ind1" },
          { field: "Ind2" },
          { field: "Subcampos", width: 600, editable: true },
        ]}
        rows={rows}
        experimentalFeatures={{ newEditingApi: true }}
        processRowUpdate={processRowUpdate}
        isCellEditable={(params) => cellEditable.includes(params.row.Tag)}
      />
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Box>
  );
}
