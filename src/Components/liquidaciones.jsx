import { AgGridReact } from "ag-grid-react" // React Data Grid Component
import "ag-grid-enterprise"
import { bancos } from "../../datamodel"
import { useMemo, useState } from "react"
import PropTypes from "prop-types"
import { dataTypeDefinitions } from "../Utils/dataTypeDefs"
import { generateId, processDataFromClipboard } from "../Utils/utils"

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
              liquidaciones: [...appData.liquidaciones, { id: generateId() }],
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
          rowData={appData.liquidaciones}
          columnDefs={colDefs}
          rowHeight={35}
          defaultColDef={defaultColDef}
          cellSelection={cellSelection}
          dataTypeDefinitions={dataTypeDefinitions}
          suppressMovableColumns={true}
          tooltipShowDelay={200}
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
