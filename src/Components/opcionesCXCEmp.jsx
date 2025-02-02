import { AgGridReact } from "ag-grid-react"
import { useMemo, useState } from "react"
import { hasAnyChar, processDataFromClipboard } from "../Utils/utils"
import { auxiliares } from "../../datamodel"

export default function OpcionesCXCEmp() {
  let defaultState = [{}]
  let optionsState = {}

  const optionsString = localStorage.getItem("options")

  if (optionsString) {
    const optionsParsed = JSON.parse(optionsString)

    if (Array.isArray(optionsParsed?.cxcEmpleados)) {
      defaultState = optionsParsed.cxcEmpleados
    }

    if (optionsParsed) {
      optionsState = optionsParsed
    }
  }

  const [state, setState] = useState(defaultState)
  const [options] = useState(optionsState)

  const cellSelection = useMemo(() => {
    return {
      handle: {
        mode: "fill",
      },
    }
  }, [])

  const [colDefs] = useState([
    {
      headerName: "Codigo",
      field: "codigo",
      flex: 0.5,
      cellDataType: "number",
      valueParser: (params) => {
        const value =
          typeof params.newValue === "string"
            ? params.newValue.trim().replace(",", "")
            : params.newValue
        return Number(value) > 0 ? Number(value) : null
      },
      tooltipValueGetter: () => "Codigo del empleado",
    },

    {
      headerName: "Nombre",
      field: "nombre",
      tooltipValueGetter: () => "Nombre del empleado",
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
  const rowClassRules = useMemo(() => {
    return {
      "bg-red-50": (p) => p.data.codigo == null || p.data.nombre == null,
      "bg-green-50": (p) => p.data.codigo !== null && p.data.nombre !== null,
    }
  }, [])

  const onCellValueChanged = () => {
    auxiliares["CXC Empleados"] = {}
    const isEmpty = state.every(
      (item) => item.codigo == null && item.nombre == null,
    )

    if (isEmpty) {
      auxiliares["CXC Empleados"] = {}
      localStorage.setItem(
        "options",
        JSON.stringify({ ...options, cxcEmpleados: [] }),
      )

      return
    }

    const obj = {}
    const arr = []

    state.forEach((item) => {
      if (item.codigo > 0 && hasAnyChar(item.nombre)) {
        obj[item.codigo] = item.nombre
        arr.push(item)
      }
    })

    auxiliares["CXC Empleados"] = obj
    localStorage.setItem(
      "options",
      JSON.stringify({ ...options, cxcEmpleados: arr }),
    )
  }
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex justify-end">
          <div className="">
            <button
              className="btn btn-xs btn-circle"
              onClick={() => {
                setState([...state, {}])
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
          className="ag-theme-quartz" // applying the Data Grid theme
          style={{ height: "400px" }} // the Data Grid will fill the size of the parent container
        >
          <AgGridReact
            rowData={state}
            columnDefs={colDefs}
            rowHeight={35}
            defaultColDef={defaultColDef}
            cellSelection={cellSelection}
            suppressMovableColumns={true}
            onCellValueChanged={onCellValueChanged}
            rowClassRules={rowClassRules}
            tooltipShowDelay={200}
            processDataFromClipboard={(p) =>
              processDataFromClipboard(p, (newRows) => {
                setState([...state, ...newRows])
              })
            }
          />
        </div>
      </div>
    </div>
  )
}
