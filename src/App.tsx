import React, { useState } from "react";
import ModalWindow from "./components/modal";

const App = () => {
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);

  const insertQuantity = (value: string) => {
    if (/^\d+$/.test(value) || !value.length) {
      if (!/^[0]/.test(value)) setQuantity(value);
    }
  };

  const insertPrice = (value: string) => {
    if (/^\d+$|^\d+[\.]*[0-9]{0,2}$/.test(value) || !value.length)
      setPrice(value);
  };

  const addItem = () => {
    setModal(true);
    console.log(
      `add ${quantity} units of ${name}, total price: ${
        Number(quantity) * Number(price)
      }`
    );
  };

  const refresh = () => {
    setName("");
    setQuantity("");
    setPrice("");
  };

  const deleteAll = () => {
    console.log("deleting all");
  };

  const closeModal = () => {
    setModal(false);
    refresh();
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
            <span className="plus">+</span>Add item
          </button>
        </form>
        <button className="refresh" onClick={refresh}>
          Refresh
        </button>
        <button className="refresh" onClick={deleteAll}>
          Delete all
        </button>
        <div className="total">Total sum: {}$</div>
      </main>
      {modal ? (
        <ModalWindow
          closeModal={closeModal}
          content={
            <React.Fragment>
              <p>
                You have added {quantity} item(s) of {name}!<br /> Total price
                is:{" "}
                <strong>
                  {(Number(quantity) * Number(price)).toFixed(2)}$
                </strong>
              </p>
            </React.Fragment>
          }
        />
      ) : null}
    </div>
  );
};

export default App;
