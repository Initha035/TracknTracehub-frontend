import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Nav from "./components/nav.jsx";
import AuthProvider from "./components/authcontext.jsx";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
