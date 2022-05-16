import React from "react";
import Router from "next/router";
import { useContext, useState, useEffect, useRef, fragment } from "react";
import {
  MenuItem,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Stack,
  Snackbar,
  ButtonGroup,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
} from "@mui/material";
import { MenuBook, MoreVert, Close, ArrowDropDown } from "@mui/icons-material";
import { ItemContext } from "src/admin/contexts/itemContext";
import { api } from "src/services/api";


const options = ["Excluir Item", "Excluir Exemplares"];



export default function BtnDelete() {
  {/** CONFIRMAÇÃO DE EXCLUSÃO */}
  const [promiseArguments, setPromiseArguments] = useState(null);
  
  const handleNo = () => {
    setPromiseArguments(null);
  };

  const handleYes = async () => {

    try {
      api.delete(`cataloging/item/${item_id}`).then((response) => console.log("DELETE: ", response))
    
      // setSnackbar({ children: 'User successfully saved', severity: 'success' });

      setPromiseArguments(null);
    } catch (error) {
      console.log("ERROR!!!: ", error)
      // setSnackbar({ children: "Name can't be empty", severity: 'error' });
      // reject(oldRow);
      // setPromiseArguments(null);
    }
    Router.push("/cataloguing/book");
  };

  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }
    return (
      <Dialog
        maxWidth="xs"
        //TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
      {/* <DialogTitle dividers>Deseja excluir este item?</DialogTitle> */}
      <DialogContent dividers>
          Deseja excluir este item?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPromiseArguments(null)}>
            No
          </Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
       </Dialog>
      
    )
      
  
  }
  const { item_id, checkboxExemplares, setCheckboxExemplares } =
    useContext(ItemContext);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openDell, setOpenDell] = useState(false);
  const handleClickDell = () => {
    //console.info(`You clicked ${options[selectedIndex]}`);
    if (selectedIndex == 1) {
      setCheckboxExemplares(true);
      console.log("ID: ", selectedIndex);
    }
    if (selectedIndex == 0) {
      //api.delete(`cataloging/item/${}`)

      //console.log("EXCLUIR ITEM", item_id);
      setPromiseArguments(true)
      //Router.push("/cataloguing/book");
    }
  };
  const handleToggleDell = () => {
    setOpenDell((prevOpen) => !prevOpen);
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpenDell(false);
    //console.log("MENU: ", index)
    if (index == 1) {
      setCheckboxExemplares(true);

      // console.log("ID: ", selectedIndex)
    } else if (index == 0) {
      setCheckboxExemplares(false);
    }
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenDell(false);
  };

  return (
    <React.Fragment>
    {renderConfirmDialog()}

      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button onClick={handleClickDell}>{options[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={openDell ? "split-button-menu" : undefined}
          aria-expanded={openDell ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggleDell}
        >
          <ArrowDropDown />
        </Button>
      </ButtonGroup>
      <Popper
        open={openDell}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      // disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
