import { AgGridReact } from "ag-grid-react" // React Data Grid Component
import "ag-grid-enterprise"
import { auxiliares, bancos, salidas } from "../../datamodel"
import { useMemo, useState } from "react"
import PropTypes from "prop-types"
import { dataTypeDefinitions } from "../Utils/dataTypeDefs"
import { generateId, processDataFromClipboard } from "../Utils/utils"
import { generateAbonosFA, synCreditosFA } from "../Utils/generateCXC"

Salidas.propTypes = {
  appData: PropTypes.shape({
    salidas: PropTypes.array.isRequired,
    cambioscxc: PropTypes.array.isRequired,
  }).isRequired,
  setAppData: PropTypes.func.isRequired,
}

export default function Salidas({ appData, setAppData }) {
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
        values: salidas,
        allowTyping: true,
        filterList: true,
        highlightMatch: true,
      },
    },
    {
      headerName: "Subcuenta Origen",
      flex: 1.5,
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
      headerName: "Banco",
      field: "banco",
      cellEditor: "agRichSelectCellEditor",
      cellEditorParams: {
        values: Object.values(bancos),
        allowTyping: true,
        filterList: true,
        highlightMatch: true,
      },
      flex: 1.5,
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
      tooltipValueGetter: () =>
        "Puede ser cheque o transferencia, puede dejarse en blanco",
    },
    {
      headerName: "N Cheque",
      field: "nCheque",
      cellDataType: "number",
      tooltipValueGetter: () =>
        "Numero de cheque o transferencia, puede dejarse en blanco",
    },
    {
      headerName: "Descripcion",
      field: "descripcion",
      tooltipValueGetter: () =>
        "Descripcion de la salida, puede dejarse en blanco",
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

  const onCellValueChanged = () => {
    const newCreditosFA = generateAbonosFA(appData.salidas)
    const oldCreditosFA = appData.cambioscxc
    const updatedCreditosFA = synCreditosFA(
      oldCreditosFA,
      newCreditosFA,
      appData.salidas,
    )
    setAppData({ ...appData, cambioscxc: [...updatedCreditosFA] })
  }

  return (
    // wrapping container with theme & size
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex flex-grow justify-center items-center p-2">
          <h1 className="text-lg">Salidas bancarias</h1>
        </div>
        <div className="p-2">
          <button
            className="btn btn-xs btn-circle"
            onClick={() =>
              setAppData({
                ...appData,
                salidas: [...appData.salidas, { id: generateId() }],
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
          rowData={appData.salidas}
          columnDefs={colDefs}
          rowHeight={35}
          defaultColDef={defaultColDef}
          cellSelection={cellSelection}
          dataTypeDefinitions={dataTypeDefinitions}
          suppressMovableColumns={true}
          onCellValueChanged={onCellValueChanged}
          tooltipShowDelay={200}
          statusBar={statusBar}
          processDataFromClipboard={(p) =>
            processDataFromClipboard(p, (newRows) => {
              setAppData({
                ...appData,
                salidas: [...appData.salidas, ...newRows],
              })
            })
          }
        />
      </div>
    </div>
  )
}
