import { AgGridReact } from "ag-grid-react"
import PropTypes from "prop-types"
import { useMemo, useState } from "react"
import { processDataFromClipboard } from "../Utils/utils"

export default function VisualizadorLlenado({ llenado, setLlenado }) {
  const cellSelection = useMemo(() => {
    return {
      handle: {
        mode: "fill",
      },
    }
  }, [])

  const [colDefs] = useState([
    {
      headerName: "Cuenta",
      flex: 1.8,
      field: "cuenta",
    },
    {
      headerName: "Inicial",
      field: "inicial",
    },
    {
      headerName: "Final",
      field: "final",
    },
    {
      headerName: "Delta",
      field: "delta",
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
  const onCellValueChanged = () => {}

  return (
    <div
      className="ag-theme-quartz" // applying the Data Grid theme
      style={{ height: "600px", width: "100%" }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact
        rowData={llenado}
        columnDefs={colDefs}
        rowHeight={30}
        headerHeight={30}
        defaultColDef={defaultColDef}
        cellSelection={cellSelection}
        suppressMovableColumns={true}
        onCellValueChanged={onCellValueChanged}
        tooltipShowDelay={200}
        processDataFromClipboard={(p) =>
          processDataFromClipboard(p, (newRows) => {
            setLlenado([...llenado, ...newRows])
          })
        }
      />
    </div>
  )
}

VisualizadorLlenado.propTypes = {
  props: PropTypes.object,
  llenado: PropTypes.array, // llenado is optional
  setLlenado: PropTypes.func,
}
