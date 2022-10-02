import React, { useState, useEffect } from "react";
import ModalWindow from "./components/modal";
import db from "./db";
import ShoppingList from "./components/list";
import { useLiveQuery } from "dexie-react-hooks";

const App = () => {
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [price, setPrice] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [status, setStatus] = useState<"default" | "success" | "fail">(
    "default"
  );
  const [total, setTotal] = useState<number>(0);

  const shoppingList = useLiveQuery(async () => {
    const list = await db.shoppingList.toArray();
    return list;
  });

  useEffect(() => {
    if (shoppingList?.length) {
      let sum = shoppingList?.reduce(
        (previous, current) =>
          previous + Number(current.quantity) * Number(current.numberPrice),
        0
      );
      setTotal(sum);
    } else setTotal(0);
  }, [shoppingList]);

  useEffect(() => {
    if (!modal) refresh();
  }, [modal]);

  const insertQuantity = (value: string) => {
    if (!value.length) setQuantity("");
    else if (/^\d+$/.test(value) && !/^[0]/.test(value))
      setQuantity(Number(value));
  };

  const insertPrice = (value: string) => {
    if (/^\d+$|^\d+[\.]*[0-9]{0,2}$/.test(value) || !value.length)
      setPrice(value);
  };

  const addItem = async () => {
    let numberPrice = Number(price);
    try {
      const id = await db.shoppingList.add({
        name,
        quantity,
        numberPrice,
      });

      setStatus("success");
    } catch (error) {
      setStatus("fail");
    }
    setModal(true);
  };

  const refresh = () => {
    setName("");
    setQuantity("");
    setPrice("");
  };

  const deleteAll = async () => {
    db.shoppingList.clear();
  };

  const closeModal = () => {
    setStatus("default");
    setModal(false);
  };

  return (
    <div className="container">
      <header>
        <h1 className="heading">Shopping Made Easy With Grocery App!</h1>
        <p className="subheading">
          Grocery App helps you to organize and priotize your list and keep them
          on track ✔✔✔
        </p>
      </header>
      <main>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Name of item"
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
            maxLength={10}
          ></input>
          <input
            type="text"
            name="quantity"
            value={quantity}
            placeholder="Quantity"
            onChange={(e) => insertQuantity(e.target.value)}
            autoComplete="off"
          ></input>
          <input
            type="text"
            name="price"
            value={price}
            placeholder="Price"
            onChange={(e) => insertPrice(e.target.value)}
            autoComplete="off"
          ></input>
          <button
            className="addItemBtn"
            onClick={addItem}
            disabled={!Boolean(name && quantity && price)}
          >
            <button className="roundBtn">+</button>Add item
          </button>
        </form>
        <button className="refresh" onClick={refresh}>
          Refresh
        </button>
        <button className="refresh" onClick={deleteAll}>
          Delete all
        </button>
        {shoppingList?.length ? <ShoppingList list={shoppingList} /> : null}
        <div className="total">Total sum: ${total.toFixed(2)}</div>
      </main>
      {modal ? (
        <ModalWindow
          closeModal={closeModal}
          content={
            <React.Fragment>
              {status === "success" ? (
                <p>
                  You have added {quantity} item(s) of {name}!<br /> Total price
                  is:{" "}
                  <strong>
                    ${(Number(quantity) * Number(price)).toFixed(2)}
                  </strong>
                </p>
              ) : (
                <p>
                  Sorry, something went wrong! We couldn't add item to shopping
                  list.
                </p>
              )}
            </React.Fragment>
          }
        />
      ) : null}
    </div>
  );
};

export default App;
