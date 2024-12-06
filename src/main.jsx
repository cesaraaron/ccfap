import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { registerAllModules } from "handsontable/registry"
import App from "./App.jsx"
import "handsontable/dist/handsontable.full.min.css"
import "ag-grid-community/styles/ag-grid.css" // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"
import "./App.css"

registerAllModules()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
