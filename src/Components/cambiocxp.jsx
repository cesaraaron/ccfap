import { AgGridReact } from "ag-grid-react" // React Data Grid Component
import "ag-grid-enterprise"
import { auxiliares, cxp } from "../../datamodel"
import { useMemo, useState } from "react"
import PropTypes from "prop-types"
import { dataTypeDefinitions } from "../Utils/dataTypeDefs"

Cambioscxp.propTypes = {
  appData: PropTypes.shape({
    cambioscxp: PropTypes.array.isRequired,
  }).isRequired,
  setAppData: PropTypes.func.isRequired,
}

export default function Cambioscxp({ appData, setAppData }) {
  const cellSelection = useMemo(() => {
    return {
      handle: {
        mode: "fill",
      },
    }
  }, [])

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState([
    {
      field: "Fecha",
      cellDataType: "date",
    },
    {
      field: "Cuenta Origen",
      cellEditor: "agRichSelectCellEditor",

      cellEditorParams: {
        values: cxp,
        allowTyping: true,
        filterList: true,
        highlightMatch: true,
      },
    },
    {
      field: "Subcuenta Origen",
      cellEditor: "agRichSelectCellEditor",
      cellEditorParams: ({ data }) => {
        if (data["Cuenta Origen"] == null) return
        return {
          values: Object.values(auxiliares[data["Cuenta Origen"]]),
          allowTyping: true,
          filterList: true,
          highlightMatch: true,
        }
      },
    },
    {
      field: "Cuenta destino",
      cellEditor: "agRichSelectCellEditor",
      cellEditorParams: {
        values: Object.keys(auxiliares),
        allowTyping: true,
        filterList: true,
        highlightMatch: true,
      },
    },
    {
      field: "Subcuenta destino",
      cellEditor: "agRichSelectCellEditor",
      cellEditorParams: ({ data }) => {
        if (data["Cuenta destino"] == null) return
        return {
          values: Object.values(auxiliares[data["Cuenta destino"]]),
          allowTyping: true,
          filterList: true,
          highlightMatch: true,
        }
      },
    },
    { field: "Monto", cellDataType: "number" },

    { field: "Descripcion" },
  ])

  const defaultColDef = {
    flex: 1,
    editable: true,
    enableSorting: false,
    sortable: false,
    suppressHeaderMenuButton: true,
    wrapHeaderText: true,
    suppressHeaderContextMenu: true,
  }

  return (
    // wrapping container with theme & size
    <div
      className="ag-theme-quartz w-full" // applying the Data Grid theme
      style={{ height: 500 }} // the Data Grid will fill the size of the parent container
    >
      <div className="p-2">
        <button
          className="btn btn-sm"
          onClick={() =>
            setAppData({ ...appData, cambioscxp: [...appData.cambioscxp, []] })
          }
        >
          Agregar linea
        </button>
      </div>
      <AgGridReact
        rowData={appData.cambioscxp}
        rowHeight={35}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        cellSelection={cellSelection}
        dataTypeDefinitions={dataTypeDefinitions}
        suppressMovableColumns={true}
      />
    </div>
  )
}
