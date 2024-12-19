import { AgGridReact } from "ag-grid-react" // React Data Grid Component
import "ag-grid-enterprise"
import { auxiliares, cxc } from "../../datamodel"
import { useMemo, useState } from "react"
import PropTypes from "prop-types"
import { dataTypeDefinitions } from "../Utils/dataTypeDefs"
import { generateId } from "../Utils/utils"

Cambioscxc.propTypes = {
  appData: PropTypes.shape({
    cambioscxc: PropTypes.array.isRequired,
  }).isRequired,
  setAppData: PropTypes.func.isRequired,
}

export default function Cambioscxc({ appData, setAppData }) {
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
      headerName: "Fecha",
      field: "fecha",
      cellDataType: "date",
    },
    {
      headerName: "Cuenta Origen",
      field: "cuentaOrigen",
      cellEditor: "agRichSelectCellEditor",

      cellEditorParams: {
        values: cxc,
        allowTyping: true,
        filterList: true,
        highlightMatch: true,
      },
    },
    {
      headerName: "Subcuenta Origen",
      field: "subCuentaOrigen",
      cellEditor: "agRichSelectCellEditor",
      cellEditorParams: ({ data }) => {
        if (data["cuentaOrigen"] == null) return
        return {
          values: Object.values(auxiliares[data["cuentaOrigen"]]),
          allowTyping: true,
          filterList: true,
          highlightMatch: true,
        }
      },
    },
    {
      headerName: "Cuenta destino",
      field: "cuentaDestino",
      cellEditor: "agRichSelectCellEditor",
      cellEditorParams: {
        values: Object.keys(auxiliares),
        allowTyping: true,
        filterList: true,
        highlightMatch: true,
      },
    },
    {
      headerName: "Subcuenta destino",
      field: "subCuentaDestino",
      cellEditor: "agRichSelectCellEditor",
      cellEditorParams: ({ data }) => {
        if (data["cuentaDestino"] == null) return
        return {
          values: Object.values(auxiliares[data["cuentaDestino"]]),
          allowTyping: true,
          filterList: true,
          highlightMatch: true,
        }
      },
    },
    {
      headerName: "Monto",
      field: "monto",
      cellDataType: "number",
      valueFormatter: (p) =>
        p.value > 0
          ? new Intl.NumberFormat("en-EN", {
              minimumFractionDigits: 2,
            }).format(p.value)
          : p.value,
    },

    {
      headerName: "Descripción",
      field: "descripcion",
    },
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
    <div className="flex flex-col">
      <div className="p-2">
        <button
          className="btn btn-sm"
          onClick={() =>
            setAppData({
              ...appData,
              cambioscxc: [...appData.cambioscxc, { id: generateId() }],
            })
          }
        >
          Agregar linea
        </button>
      </div>
      <div
        className="ag-theme-quartz w-full" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={appData.cambioscxc}
          columnDefs={colDefs}
          rowHeight={35}
          defaultColDef={defaultColDef}
          cellSelection={cellSelection}
          dataTypeDefinitions={dataTypeDefinitions}
          suppressMovableColumns={true}
        />
      </div>
    </div>
  )
}
