import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/Login";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>
);
