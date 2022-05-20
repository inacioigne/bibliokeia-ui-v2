import ItemEdit from "src/admin/components/cataloguing/edit/item_edit";
import { useContext } from "react";
import { ItemContext } from "src/admin/contexts/itemContext";
import Skeleton from '@mui/material/Skeleton';

export default function FormEdit() {
  const { item_id, item } = useContext(ItemContext);
  if (item) {
    return <ItemEdit item={item} id={ item_id } />;
  } else {
    return <Skeleton variant="text" />;
  }
}
