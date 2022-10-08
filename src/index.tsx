import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then(() =>
      navigator.serviceWorker.ready.then((worker: any) => {
        ("syncdata");
      })
    )
    .catch((err) => console.log(err));
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
