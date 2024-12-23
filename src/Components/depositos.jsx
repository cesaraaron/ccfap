import { AgGridReact } from "ag-grid-react" // React Data Grid Component
import "ag-grid-enterprise"
import { auxiliares, bancos, depositos } from "../../datamodel"
import { useMemo, useState } from "react"
import PropTypes from "prop-types"
import { dataTypeDefinitions } from "../Utils/dataTypeDefs"
import { generateId, processDataFromClipboard } from "../Utils/utils"
import {
  generateCreditosFA,
  synCreditosFA as syncCreditosFA,
} from "../Utils/generateCXC"

Depositos.propTypes = {
  appData: PropTypes.shape({
    depositos: PropTypes.array.isRequired,
    cambioscxc: PropTypes.array.isRequired,
  }).isRequired,
  setAppData: PropTypes.func.isRequired,
}

export default function Depositos({ appData, setAppData }) {
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
        values: depositos,
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
      headerName: "Banco",
      field: "banco",
      flex: 1.5,
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
    { headerName: "Descripcion", field: "descripcion" },

    { headerName: "Referencia", field: "referencia" },
  ])

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      editable: true,
      enableSorting: false,
      sortable: false,
      suppressHeaderMenuButton: true,
      wrapHeaderText: true,
      suppressHeaderContextMenu: true,
    }),
    [],
  )

  const onCellValueChanged = () => {
    const newCreditosFA = generateCreditosFA(appData.depositos)
    const oldCreditosFA = appData.cambioscxc
    const updatedCreditosFA = syncCreditosFA(
      oldCreditosFA,
      newCreditosFA,
      appData.depositos,
    )
    setAppData({ ...appData, cambioscxc: [...updatedCreditosFA] })
    // console.log("appData: ", appData)
  }

  const statusBar = useMemo(() => {
    return {
      statusPanels: [
        { statusPanel: "agTotalAndFilteredRowCountComponent" },
        { statusPanel: "agTotalRowCountComponent" },
        { statusPanel: "agFilteredRowCountComponent" },
        { statusPanel: "agSelectedRowCountComponent" },
        { statusPanel: "agAggregationComponent" },
      ],
    }
  }, [])

  return (
    // wrapping container with theme & size
    <div className="flex flex-col">
      <div className="p-2">
        <button
          className="btn btn-sm"
          onClick={() => {
            const nuevoDeposito = { id: generateId() }
            setAppData({
              ...appData,
              depositos: [...appData.depositos, nuevoDeposito],
            })
            // gridRef.api.refreshCells()
          }}
        >
          Agregar linea
        </button>
      </div>
      <div
        className="ag-theme-quartz w-full h-full" // applying the Data Grid theme
        style={{ height: "500px" }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={appData.depositos}
          columnDefs={colDefs}
          rowHeight={35}
          defaultColDef={defaultColDef}
          cellSelection={cellSelection}
          dataTypeDefinitions={dataTypeDefinitions}
          suppressMovableColumns={true}
          onCellValueChanged={onCellValueChanged}
          statusBar={statusBar}
          processDataFromClipboard={(p) =>
            processDataFromClipboard(p, (newRows) => {
              setAppData({
                ...appData,
                depositos: [...appData.depositos, ...newRows],
              })
            })
          }
        />
      </div>
    </div>
  )
}
