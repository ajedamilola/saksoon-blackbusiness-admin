import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/inter";
import "@fontsource/inter/700.css";
import "@fontsource/inter/500.css";
import { CssBaseline } from "@mui/joy";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline>
      <App />
    </CssBaseline>
  </React.StrictMode>
);
