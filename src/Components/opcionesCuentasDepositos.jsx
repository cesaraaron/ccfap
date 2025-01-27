import { AgGridReact } from "ag-grid-react"
import { useMemo, useState } from "react"
import {
  getAccountNamesWithCodes,
  processDataFromClipboard,
  uniqueArr,
} from "../Utils/utils"
import { depositos, originalDepositos } from "../../datamodel"

export default function CuentasDepositos() {
  let defaultState = { cuentasDepositos: "" }
  const optionsString = localStorage.getItem("options")

  if (optionsString) {
    const optionsParsed = JSON.parse(optionsString)

    if (optionsParsed) {
      defaultState = optionsParsed
    }
  }

  const [state, setState] = useState(defaultState)

  const cellSelection = useMemo(() => {
    return {
      handle: {
        mode: "fill",
      },
    }
  }, [])

  const [colDefs] = useState([
    {
      headerName: "Codigos separados por comas",
      field: "codigo",
      cellDataType: "string",
      tooltipValueGetter: () => "Codigos de cuentas contables para depositos",
    },
    {
      headerName: "Resultado",
      field: "resultado",
      flex: 1.5,
      editable: false,
      cellRenderer: "agAnimateShowChangeCellRenderer",
      cellClass: "font-bold",
      tooltipValueGetter: () =>
        "Resultado de los codigos de cuentas contables para depositos",
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
    const rowNode = p.api.getDisplayedRowAtIndex(0)

    const nuevasCuentasDepositos = getAccountNamesWithCodes(rowNode.data.codigo)

    rowNode.setDataValue("resultado", nuevasCuentasDepositos.join(","))

    depositos.depositos = uniqueArr([
      ...originalDepositos,
      ...nuevasCuentasDepositos.filter((v) => v !== "No disponible"),
    ])

    localStorage.setItem(
      "options",
      JSON.stringify({ ...state, cuentasDepositos: rowNode.data.codigo }),
    )
    setState({ ...state, cuentasDepositos: rowNode.data.codigo })
  }

  return (
    <div>
      <div className="flex flex-col">
        <div
          className="ag-theme-quartz" // applying the Data Grid theme
          style={{ height: "200px" }} // the Data Grid will fill the size of the parent container
        >
          <AgGridReact
            rowData={[
              {
                codigo: state.cuentasDepositos,
                resultado: getAccountNamesWithCodes(
                  state.cuentasDepositos,
                ).join(","),
              },
            ]}
            columnDefs={colDefs}
            rowHeight={35}
            defaultColDef={defaultColDef}
            cellSelection={cellSelection}
            suppressMovableColumns={true}
            onCellValueChanged={onCellValueChanged}
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
