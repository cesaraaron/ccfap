import { AgGridReact } from "ag-grid-react" // React Data Grid Component
import "ag-grid-enterprise"
import { bancos } from "../../datamodel"
import { useMemo, useState } from "react"
import PropTypes from "prop-types"
import { dataTypeDefinitions } from "../Utils/dataTypeDefs"
import {
  generateId,
  objIsEmpty,
  processDataFromClipboard,
} from "../Utils/utils"
import { filterInvalidLiq } from "../Utils/filtrarMovimientos"

Liquidaciones.propTypes = {
  appData: PropTypes.shape({
    liquidaciones: PropTypes.array.isRequired,
  }).isRequired,
  setAppData: PropTypes.func.isRequired,
}

export default function Liquidaciones({ appData, setAppData }) {
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
      headerName: "Banco Destino",
      field: "bancoDestino",
      cellEditor: "agRichSelectCellEditor",

      cellEditorParams: {
        values: Object.values(bancos),
        allowTyping: true,
        filterList: true,
        highlightMatch: true,
      },
      tooltipValueGetter: () =>
        "Banco donde esta la liquidacion, casi siempre es Banco CXC Tesoreria",
      flex: 1.5,
    },
    {
      headerName: "Fecha",
      field: "fecha",
      cellEditor: "agDateStringCellEditor",
    },
    {
      headerName: "Monto banco",
      field: "montoBanco",
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
      tooltipValueGetter: () => "Monto que pago el banco",
    },
    {
      headerName: "Comisiones",
      field: "comisiones",
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
      tooltipValueGetter: () =>
        "Comisiones de la liquidacion, si existen, valor puede dejarse en blanco",
    },
    {
      headerName: "Retencion ISR",
      field: "retencionISR",
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
      tooltipValueGetter: () =>
        "Devolucion ISV, si existe, puede dejarse en blanco",
    },
    {
      headerName: "Banco pertenece",
      field: "bancoPertenece",
      cellEditor: "agRichSelectCellEditor",

      tooltipValueGetter: () =>
        "Banco al que pertenece la liquidacion, Atlantida, BAC etc.",

      cellEditorParams: {
        values: Object.values(bancos),
        allowTyping: true,
        filterList: true,
        highlightMatch: true,
      },
      flex: 1.5,
    },
    {
      headerName: "ISV Comisiones",
      field: "isvComisiones",
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

      tooltipValueGetter: () =>
        "ISV de las comisiones, si existen, valor puede dejarse en blanco",
    },
    {
      headerName: "Retencion ISV",
      field: "retencionISV",
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

      tooltipValueGetter: () => "Dejar en blanco, no se usa en Honduras",
    },
    {
      headerName: "Referencia",
      field: "referencia",
      tooltipValueGetter: () =>
        "Referencia de la liquidacion, puede dejarse en blanco",
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

  const onCellValueChanged = () => {
    const valid = filterInvalidLiq(appData.liquidaciones)
    if (valid.length === 0) return

    setAppData({ ...appData, liquidaciones: appData.liquidaciones })
  }

  const rowClassRules = useMemo(() => {
    return {
      "bg-red-50": (params) => {
        const valid = filterInvalidLiq([params.data])
        return objIsEmpty(params.data)
          ? false
          : valid.length === 0 && Object.values(params.data).length > 1
      },
      "bg-green-50": (params) => {
        const valid = filterInvalidLiq([params.data])
        return valid.length > 0
      },
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

  return (
    // wrapping container with theme & size
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex flex-grow justify-center items-center p-2">
          <h1 className="text-lg">Liquidaciones bancarias</h1>
        </div>
        <div className="p-2">
          <button
            className="btn btn-xs btn-circle"
            onClick={() =>
              setAppData({
                ...appData,
                liquidaciones: [...appData.liquidaciones, { id: generateId() }],
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
          rowData={appData.liquidaciones}
          columnDefs={colDefs}
          rowHeight={35}
          defaultColDef={defaultColDef}
          cellSelection={cellSelection}
          dataTypeDefinitions={dataTypeDefinitions}
          suppressMovableColumns={true}
          tooltipShowDelay={200}
          statusBar={statusBar}
          rowClassRules={rowClassRules}
          onCellValueChanged={onCellValueChanged}
          processDataFromClipboard={(p) =>
            processDataFromClipboard(p, (newRows) => {
              setAppData({
                ...appData,
                liquidaciones: [...appData.liquidaciones, ...newRows],
              })
            })
          }
        />
      </div>
    </div>
  )
}
