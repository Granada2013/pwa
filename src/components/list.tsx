import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../db";

const ShoppingList = () => {
  const shoppingList = useLiveQuery(() => db.shoppingList.toArray());

  return (
    <React.Fragment>
      {shoppingList?.map((item, i) => (
        <div key={i}>
          {item.name}, {item.quantity} x {item.price}$
        </div>
      ))}
    </React.Fragment>
  );
};

export default ShoppingList;
