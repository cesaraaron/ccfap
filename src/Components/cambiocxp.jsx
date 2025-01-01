import { AgGridReact } from "ag-grid-react" // React Data Grid Component
import "ag-grid-enterprise"
import { auxiliares, cxp } from "../../datamodel"
import { useMemo, useState } from "react"
import PropTypes from "prop-types"
import { dataTypeDefinitions } from "../Utils/dataTypeDefs"
import {
  generateId,
  objIsEmpty,
  processDataFromClipboard,
} from "../Utils/utils"
import { filterInvalidCXP } from "../Utils/filtrarMovimientos"

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
      headerName: "Fecha",
      field: "fecha",
      cellEditor: "agDateStringCellEditor",
    },
    {
      headerName: "Cuenta Origen",
      field: "cuentaOrigen",
      cellEditor: "agRichSelectCellEditor",

      cellEditorParams: {
        values: cxp,
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
      valueParser: (params) => {
        const value =
          typeof params.newValue === "string"
            ? params.newValue.trim().replace(",", "")
            : params.newValue
        return Number(value) > 0 ? Number(value) : null
      },
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
      tooltipValueGetter: () =>
        "Descripcion del cambio de cuenta, puede dejarse en blanco",
    },
  ])
  const statusBar = useMemo(() => {
    return {
      statusPanels: [
        { statusPanel: "agSelectedRowCountComponent" },
        { statusPanel: "agAggregationComponent" },
      ],
    }
  }, [])

  const defaultColDef = {
    flex: 1,
    editable: true,
    enableSorting: false,
    sortable: false,
    suppressHeaderMenuButton: true,
    wrapHeaderText: true,
    suppressHeaderContextMenu: true,
  }

  const rowClassRules = useMemo(() => {
    return {
      "bg-red-50": (params) => {
        const valid = filterInvalidCXP([params.data])
        return objIsEmpty(params.data)
          ? false
          : valid.length === 0 && Object.values(params.data).length > 1
      },
      "bg-green-50": (params) => {
        const valid = filterInvalidCXP([params.data])
        return valid.length > 0
      },
    }
  }, [])

  return (
    // wrapping container with theme & size
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex flex-grow justify-center items-center p-2">
          <h1 className="text-lg">Cambios de cuenta por pagar</h1>
        </div>
        <div className="p-2">
          <button
            className="btn btn-xs btn-circle"
            onClick={() =>
              setAppData({
                ...appData,
                cambioscxp: [...appData.cambioscxp, { id: generateId() }],
              })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        className="ag-theme-quartz w-full" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={appData.cambioscxp}
          rowHeight={35}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          cellSelection={cellSelection}
          dataTypeDefinitions={dataTypeDefinitions}
          suppressMovableColumns={true}
          tooltipShowDelay={200}
          statusBar={statusBar}
          rowClassRules={rowClassRules}
          processDataFromClipboard={(p) =>
            processDataFromClipboard(p, (newRows) => {
              setAppData({
                ...appData,
                cambioscxp: [...appData.cambioscxp, ...newRows],
              })
            })
          }
        />
      </div>
    </div>
  )
}
