import { AgGridReact } from "ag-grid-react" // React Data Grid Component
import "ag-grid-enterprise"
import { auxiliares, bancos, depositos } from "../../datamodel"
import { useMemo, useState } from "react"
import PropTypes from "prop-types"
import { dataTypeDefinitions } from "../Utils/dataTypeDefs"
import {
  generateId,
  getCXCFAWithFANumbers,
  getFaNumbers,
  hasFAInIt,
  objIsEmpty,
  processDataFromClipboard,
  uniqueArr,
} from "../Utils/utils"
import {
  generateCreditosFA,
  synCreditosFA as syncCreditosFA,
} from "../Utils/generateCXC"
import { filterInvalidDeposits } from "../Utils/filtrarMovimientos"

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
      cellEditorParams: () => {
        const dep = uniqueArr(depositos.depositos)
        return {
          values: dep,
          allowTyping: true,
          filterList: true,
          highlightMatch: true,
        }
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
      headerName: "Descripcion",
      field: "descripcion",
      tooltipValueGetter: () =>
        "Descripcion del deposito, puede dejarse en blanco",
    },

    {
      headerName: "Referencia",
      field: "referencia",
      tooltipValueGetter: () =>
        "Referencia del deposito, puede dejarse en blanco",
    },
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

  const onCellValueChanged = (p) => {
    console.log("onCellValueChanged", p)
    const hasCXCFA = depositos.depositos.includes("CXC Farmacias")

    if (hasCXCFA && hasFAInIt(p.newValue)) {
      const newDepositos = appData.depositos.map((d) => {
        if (!hasFAInIt(d.descripcion)) return d

        const faNumbers = getFaNumbers(d.descripcion)

        return {
          ...d,
          cuentaOrigen: "CXC Farmacias",
          subCuentaOrigen: getCXCFAWithFANumbers(faNumbers),
        }
      })
      setAppData({ ...appData, depositos: newDepositos })
    }

    const newCreditosFA = generateCreditosFA(appData.depositos)
    const oldCreditosFA = appData.cambioscxc
    const updatedCreditosFA = syncCreditosFA(
      oldCreditosFA,
      newCreditosFA,
      appData.depositos,
    )

    if (!hasCXCFA) {
      setAppData({ ...appData, cambioscxc: [...updatedCreditosFA] })
    }
  }

  const statusBar = useMemo(() => {
    return {
      statusPanels: [
        { statusPanel: "agSelectedRowCountComponent" },
        { statusPanel: "agAggregationComponent" },
      ],
    }
  }, [])

  const rowClassRules = useMemo(() => {
    return {
      "bg-red-50": (params) => {
        const validDeposits = filterInvalidDeposits([params.data])
        return objIsEmpty(params.data)
          ? false
          : validDeposits.length === 0 && Object.values(params.data).length > 1
      },
      "bg-green-50": (params) => {
        const validDeposits = filterInvalidDeposits([params.data])
        return validDeposits.length > 0
      },
    }
  }, [])

  return (
    // wrapping container with theme & size
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex flex-grow justify-center items-center p-2">
          <h1 className="text-lg">Depositos bancarios</h1>
        </div>
        <div className="p-2">
          <button
            className="btn btn-xs btn-circle"
            onClick={() => {
              const nuevoDeposito = { id: generateId() }
              setAppData({
                ...appData,
                depositos: [...appData.depositos, nuevoDeposito],
              })
            }}
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
        className="ag-theme-quartz w-full h-full" // applying the Data Grid theme
        style={{ height: "600px" }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={appData.depositos}
          columnDefs={colDefs}
          rowHeight={30}
          defaultColDef={defaultColDef}
          cellSelection={cellSelection}
          dataTypeDefinitions={dataTypeDefinitions}
          suppressMovableColumns={true}
          onCellValueChanged={onCellValueChanged}
          statusBar={statusBar}
          tooltipShowDelay={200}
          rowClassRules={rowClassRules}
          suppressScrollOnNewData={true}
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
