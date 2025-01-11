import { AgGridReact } from "ag-grid-react"
import PropTypes from "prop-types"
import { useMemo, useState } from "react"

export const VisualizadorVisualizador = ({ llenado }) => {
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
      editable: false,
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
      />
    </div>
  )
}

VisualizadorVisualizador.propTypes = {
  appData: PropTypes.object,
  llenado: PropTypes.array,
}
