import ItemEdit from "./itemEdit"
import { useState, useEffect, useContext } from "react";
import { ItemContext } from "src/admin/contexts/itemContext";

export default function FormEdit() {
    const { item_id, item } = useContext(ItemContext);
    if (item) {
        return (
       
            <ItemEdit item={item} />
            
        )
        //console.log('ITM: ', item)

    } else {
        return (
       
            <h1>'NÃO TEM'</h1>
            
        )
        //console.log('NÃO TEM')

    }
}