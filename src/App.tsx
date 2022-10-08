import React, { useState, useEffect } from "react";
import ModalWindow from "./components/modal";
import db from "./db";
import ShoppingList from "./list";
import Select from "./components/select";
import Tabs from "./components/tabs";

const App = () => {
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [status, setStatus] = useState<"default" | "success" | "fail">(
    "default"
  );
  const [btnDisable, setBtnDisable] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("All");

  const CATEGORIES = ["Greenery", "Dairy", "Meat", "Other"];

  useEffect(() => {
    if (!modal) refresh();
    else setBtnDisable(true);
  }, [modal]);

  useEffect(() => {
    setBtnDisable(!(name && category && price && quantity));
  }, [name, category, price, quantity]);

  const insertQuantity = (value: string) => {
    if (!value.length) setQuantity("");
    else if (/^\d+$/.test(value) && !/^[0]/.test(value)) setQuantity(value);
  };

  const insertPrice = (value: string) => {
    if (/^\d+$|^\d+[\.]*[0-9]{0,2}$/.test(value) || !value.length)
      setPrice(value);
  };

  const addItem = async () => {
    let numPrice = Number(price);
    let numQuantity = Number(quantity);
    try {
      const id = await db.shoppingList.add({
        name,
        category,
        numQuantity,
        numPrice,
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
    setCategory("");
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
          <Select
            itemsList={CATEGORIES}
            onChange={(item) => setCategory(item)}
            placeholder={"Select category"}
            value={category}
          />
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
            disabled={btnDisable}
          >
            <div className="roundBtn">+</div>Add item
          </button>
        </form>
        <div className="buttons">
          <button className="refresh" onClick={refresh}>
            Refresh
          </button>
          <button className="refresh" onClick={deleteAll}>
            Delete all
          </button>
        </div>
        <Tabs
          options={["All", ...CATEGORIES]}
          defaultOption="All"
          onChange={setFilter}
        />
        <ShoppingList filter={filter} />
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
