import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "ag-grid-community/styles/ag-grid.css" // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"
import "./App.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
