import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const router = createBrowserRouter(routes);

const theme = createTheme({
  typography: {
    h1: {
      fontSize: "36px",
      fontWeight: 500,
      color: "black",
      marginBottom: "40px",
    },
    h2: {
      fontSize: "24px",
      fontWeight: 500,
      color: "black",
      marginBottom: "10px",
      marginTop: 0,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#6C798C",
          textTransform: "none",
          paddingBottom: "21px",
          paddingTop: "21px",
          border: "none",
          boxShadow: "none",
          minWidth: "60%",
          fontSize: "18px",
          color: "white",
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
