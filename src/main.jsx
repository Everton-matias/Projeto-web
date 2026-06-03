import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Home from "./pages/Home";
import Login from "./pages/login";
import  {EditarPerfil}  from "./Editarperfil";
import  TelaCompletaEditarPerfil  from "./telaCompletaEditarPerfil";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TelaCompletaEditarPerfil/>
  </StrictMode>,
);
