import { AgGridReact } from "ag-grid-react" // React Data Grid Component
import "ag-grid-enterprise"
import { bancos } from "../../datamodel"
import { useMemo, useState } from "react"
import PropTypes from "prop-types"
import { dataTypeDefinitions } from "../Utils/dataTypeDefs"
import { generateId, processDataFromClipboard } from "../Utils/utils"

Traslados.propTypes = {
  appData: PropTypes.shape({
    traslados: PropTypes.array.isRequired,
  }).isRequired,
  setAppData: PropTypes.func.isRequired,
}

export default function Traslados({ appData, setAppData }) {
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
      headerName: "Banco Origen",
      field: "bancoOrigen",
      cellEditor: "agRichSelectCellEditor",

      cellEditorParams: {
        values: Object.values(bancos),
        allowTyping: true,
        filterList: true,
        highlightMatch: true,
      },
    },
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
        return Number(value)
      },
      valueFormatter: (p) =>
        p.value > 0
          ? new Intl.NumberFormat("en-EN", {
              minimumFractionDigits: 2,
            }).format(p.value)
          : p.value,
    },
    {
      headerName: "Tipo de salida",
      field: "tipoSalida",
      cellEditor: "agRichSelectCellEditor",
      cellEditorParams: {
        values: ["Transferencia", "Cheque"],
        allowTyping: true,
        filterList: true,
        highlightMatch: true,
      },
      tooltipValueGetter: () =>
        "Puede ser cheque o transferencia, puede dejarse en blanco",
    },
    {
      headerName: "N Referencia",
      field: "nReferencia",
      tooltipValueGetter: () =>
        "Numero de cheque o transferencia, puede dejarse en blanco",
    },
    {
      headerName: "Descripcion",
      field: "descripcion",
      tooltipValueGetter: () =>
        "Descripcion del traslado bancario, puede dejarse en blanco",
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

  const statusBar = useMemo(() => {
    return {
      statusPanels: [
        { statusPanel: "agSelectedRowCountComponent" },
        { statusPanel: "agAggregationComponent" },
      ],
    }
  }, [])

  return (
    // wrapping container with theme & size
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex flex-grow justify-center items-center p-2">
          <h1 className="text-lg">Traslados bancarios</h1>
        </div>
        <div className="p-2">
          <button
            className="btn btn-xs btn-circle"
            onClick={() =>
              setAppData({
                ...appData,
                traslados: [...appData.traslados, { id: generateId() }],
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
          rowData={appData.traslados}
          columnDefs={colDefs}
          rowHeight={35}
          defaultColDef={defaultColDef}
          cellSelection={cellSelection}
          dataTypeDefinitions={dataTypeDefinitions}
          suppressMovableColumns={true}
          tooltipShowDelay={200}
          statusBar={statusBar}
          processDataFromClipboard={(p) =>
            processDataFromClipboard(p, (newRows) => {
              setAppData({
                ...appData,
                traslados: [...appData.traslados, ...newRows],
              })
            })
          }
        />
      </div>
    </div>
  )
}
