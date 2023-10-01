import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { MantineProvider, createTheme } from "@mantine/core";
import { BrowserRouter } from 'react-router-dom';

const appColors = [
  "#eef3ff",
  "#dee2f2",
  "#bdc2de",
  "#98a0ca",
  "#7a84ba",
  "#6672b0",
  "#5c68ac",
  "#4c5897",
  "#424e88",
  "#364379"
];

const theme = createTheme({
  primaryColor: "indigo",
  colors: {
    appColors,
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="auto" withCssVariables>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>,
);
