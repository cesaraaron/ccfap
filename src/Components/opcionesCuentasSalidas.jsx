import { AgGridReact } from "ag-grid-react"
import { useMemo, useState } from "react"
import {
  getSalidasAdicionalesWithCodes,
  processDataFromClipboard,
  uniqueArr,
} from "../Utils/utils"
import { originalSalidas, salidas } from "../../datamodel"

export default function CuentasSalidas() {
  let defaultState = { cuentasSalidas: "" }
  const optionsString = localStorage.getItem("options")

  if (optionsString) {
    const optionsParsed = JSON.parse(optionsString)

    if (optionsParsed) {
      defaultState = optionsParsed
    }
  }

  const [state, setState] = useState(defaultState)

  const [colDefs] = useState([
    {
      headerName: "Codigos separados por comas",
      field: "codigo",
      cellDataType: "string",
      tooltipValueGetter: () =>
        "Codigos de cuentas contables para transferencias",
    },
    {
      headerName: "Resultado",
      field: "resultado",
      flex: 1.5,
      editable: false,
      cellRenderer: "agAnimateShowChangeCellRenderer",
      cellClass: "font-bold",
      tooltipValueGetter: () =>
        "Resultado de los codigos de cuentas contables para transferencias",
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

    const nuevasCuentasSalidas = getSalidasAdicionalesWithCodes(
      rowNode.data.codigo,
    )

    rowNode.setDataValue("resultado", nuevasCuentasSalidas.join(","))

    salidas.salidas = uniqueArr([
      ...originalSalidas,
      ...nuevasCuentasSalidas.filter((v) => v !== "No disponible"),
    ])

    localStorage.setItem(
      "options",
      JSON.stringify({ ...state, cuentasSalidas: rowNode.data.codigo }),
    )
    setState({ ...state, cuentasSalidas: rowNode.data.codigo })
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
                codigo: state.cuentasSalidas,
                resultado: getSalidasAdicionalesWithCodes(
                  state.cuentasSalidas,
                ).join(","),
              },
            ]}
            columnDefs={colDefs}
            rowHeight={35}
            defaultColDef={defaultColDef}
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
