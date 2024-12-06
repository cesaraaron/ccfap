import { AgGridReact } from "ag-grid-react" // React Data Grid Component
import "ag-grid-enterprise"
import { depositos } from "../../datamodel"
import { useMemo, useState } from "react"

export default function Depositos() {
  // const depositosHeaders = [
  //   "Fecha",
  //   "Cuenta Origen",
  //   "Subcuenta Origen",
  //   "Banco",
  //   "Monto",
  //   "Descripcion",
  //   "Referencia",
  // ]

  const cellSelection = useMemo(() => {
    return {
      handle: {
        mode: "fill",
      },
    }
  }, [])

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState([
    { field: "Fecha" },
    {
      field: "Cuenta Origen",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: { values: depositos },
    },
    { field: "Subcuenta Origen" },
    { field: "Banco" },
    { field: "Descripcion" },
    { field: "Referencia" },
  ])

  const defaultColDef = {
    flex: 0.5,
    editable: true,
    resizable: true,
  }

  return (
    // wrapping container with theme & size
    <div
      className="ag-theme-quartz w-full" // applying the Data Grid theme
      style={{ height: 500 }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact
        rowData={[{}, {}, {}, {}]}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        cellSelection={cellSelection}
        undoRedoCellEditing={true}
      />
    </div>
  )
}
