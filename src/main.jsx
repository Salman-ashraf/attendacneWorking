import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import { fetchAllEmployees } from "./features/employess/employeeSlice";
import { AuthProvider } from "./context/AuthProvider";

store.dispatch(fetchAllEmployees());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
