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
    },
    { headerName: "N Referencia", field: "nReferencia" },
    { headerName: "Descripcion", field: "descripcion" },
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
              traslados: [...appData.traslados, { id: generateId() }],
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
          rowData={appData.traslados}
          columnDefs={colDefs}
          rowHeight={35}
          defaultColDef={defaultColDef}
          cellSelection={cellSelection}
          dataTypeDefinitions={dataTypeDefinitions}
          suppressMovableColumns={true}
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
