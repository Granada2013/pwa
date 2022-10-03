import React, { useState, useEffect } from "react";
import db, { ShoppingItem } from "./db";
import { useLiveQuery } from "dexie-react-hooks";

interface Props {
  filter: string;
}

const ShoppingList = (props: Props) => {
  const [total, setTotal] = useState<number>(0);

  let shoppingList: any = useLiveQuery(async () => {
    let list;
    if (props.filter === "All") list = await db.shoppingList.toArray();
    else
      list = await db.shoppingList
        .where("category")
        .equals(props.filter)
        .toArray();
    return list;
  }, [props.filter]);

  useEffect(() => {
    if (shoppingList?.length) {
      let sum = shoppingList?.reduce(
        (previous: number, current: ShoppingItem) =>
          previous + Number(current.numQuantity) * Number(current.numPrice),
        0
      );
      setTotal(sum);
    } else setTotal(0);
  }, [shoppingList]);

  const deleteItem = async (id?: number) => {
    if (id) {
      await db.shoppingList.delete(id);
    }
  };

  return (
    <React.Fragment>
      <div className="list">
        {shoppingList?.length ? (
          shoppingList.map((item: ShoppingItem, i: number) => (
            <div key={i} className="listItem">
              <p style={{ width: "135px" }}>{item.name}</p>
              <p style={{ flexGrow: "1" }}>
                ${item.numPrice} * {item.numQuantity}
              </p>
              <button className="roundBtn" onClick={() => deleteItem(item.id)}>
                X
              </button>
            </div>
          ))
        ) : (
          <p>No items found</p>
        )}
      </div>
      <div className="total">Total sum: ${total.toFixed(2)}</div>
    </React.Fragment>
  );
};

export default ShoppingList;
