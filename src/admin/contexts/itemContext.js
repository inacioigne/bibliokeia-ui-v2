import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "src/services/api";

export const ItemContext = createContext({});

export const ItemProvider = ({ children }) => {
  const router = useRouter();
  const { item_id } = router.query;

  const [item, setItem] = useState(null);
  const [rowsEx, setRowsEx] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openSnack, setOpenSnack] = useState();
  const [checkboxExemplares, setCheckboxExemplares] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  const getData = async () => {
    const response = await api.get(`cataloging/item/${item_id}`);
    setItem(response.data);
  };

  const getExemplar = async () => {
    const response = await api.get(`cataloging/exemplar/${item_id}`);
    const exm = response.data.exemplares.map((i) => {
      return {
        id: i.id,
        library: i.library,
        shelf: i.shelf,
        callnumber: i.callnumber,
        collection: i.collection,
        volume: i.volume,
        ex: i.ex,
        number: i.number,
        status: i.status,
      };
    });
    setRowsEx(exm);
  };

  useEffect(() => {
    getData();
    getExemplar();
  }, []);

  return (
    <ItemContext.Provider
      value={{
        item_id,
        item,
        rowsEx,
        setItem,
        setRowsEx,
        getData,
        getExemplar,
        openModal,
        setOpenModal,
        openSnack,
        setOpenSnack,
        checkboxExemplares,
        setCheckboxExemplares,
        snackbar,
        setSnackbar,
        handleCloseSnackbar,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
