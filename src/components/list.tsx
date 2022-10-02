import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db, { ShoppingItem } from "../db";

interface Props {
  list: Array<ShoppingItem>;
}

const ShoppingList = (props: Props) => {
  const deleteItem = async (id?: number) => {
    if (id) {
      await db.shoppingList.delete(id);
    }
  };

  return (
    <div className="list">
      {props.list.map((item, i) => (
        <div key={i} className="listItem">
          <p style={{ width: "135px" }}>{item.name}</p>
          <p style={{ flexGrow: "1" }}>
            ${item.numberPrice} * {item.quantity}
          </p>
          <button className="roundBtn" onClick={() => deleteItem(item.id)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default ShoppingList;
