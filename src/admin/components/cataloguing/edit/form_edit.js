import ItemEdit from "src/admin/components/cataloguing/edit/item_edit";
import { useContext } from "react";
import { ItemContext } from "src/admin/contexts/itemContext";
import Skeleton from '@mui/material/Skeleton';

export default function FormEdit() {
  const { item } = useContext(ItemContext);
  if (item) {
    return <ItemEdit item={item} />;
  } else {
    return <Skeleton variant="text" />;
  }
}
