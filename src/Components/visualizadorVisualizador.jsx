import { AgGridReact } from "ag-grid-react"
import PropTypes from "prop-types"
import { useMemo, useRef, useState } from "react"
import {
  filterInvalidCXC,
  filterInvalidCXP,
  filterInvalidDeposits,
  filterInvalidLiq,
  filterInvalidSalidas,
  filterInvalidTraslados,
} from "../Utils/filtrarMovimientos"
import { deepCopy, formatNumberWithCommas, hasAnyChar } from "../Utils/utils"

export const VisualizadorVisualizador = ({ appData, llenado }) => {
  const gridRef = useRef()
  const [vis, setVis] = useState([...deepCopy(llenado)])

  const cellSelection = useMemo(() => {
    return true
  }, [])

  // useMemo(() => {
  //   const newLlenado = updateVisualizador(appData, llenado)
  //   setVis(newLlenado)
  // }, [llenado, appData])

  const [colDefs] = useState([
    {
      headerName: "Cuenta",
      flex: 1.8,
      field: "cuenta",
    },
    {
      headerName: "Inicial",
      field: "inicial",
      cellStyle: (params) => {
        if (
          /-?\d*\.?\d+/.test(params.value) &&
          Number(params.value.trim().replaceAll(",", "")) < 0
        ) {
          return { color: "#a60d02" } // Red for negative values
        }
        return null // Default style
      },
    },
    {
      headerName: "Final",
      field: "final",
      cellStyle: (params) => {
        if (
          /-?\d*\.?\d+/.test(params.value) &&
          Number(params.value.trim().replaceAll(",", "")) < 0
        ) {
          return { color: "#a60d02" } // Red for negative values
        }
        return null // Default style
      },
    },
    {
      headerName: "Delta",
      field: "delta",
      cellStyle: (params) => {
        if (
          /-?\d*\.?\d+/.test(params.value) &&
          Number(params.value.trim().replaceAll(",", "")) < 0
        ) {
          return { color: "#a60d02" } // Red for negative values
        }
        return null // Default style
      },
      cellRenderer: "agAnimateShowChangeCellRenderer",
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
      enableCellChangeFlash: true,
    }),
    [],
  )

  const onComponentStateChanged = (p) => {
    const newLlenado = updateVisualizador(appData, llenado)

    for (let i = 0; i < newLlenado.length; i++) {
      const rowNode = p.api.getDisplayedRowAtIndex(i)
      rowNode.setDataValue("delta", newLlenado[i].delta)
      rowNode.setDataValue("final", newLlenado[i].final)
    }
  }

  const onGridReady = () => {
    const newLlenado = updateVisualizador(appData, llenado)
    setVis(newLlenado)
  }

  const getRowStyle = (params) => {
    if (params.node.rowIndex % 2 !== 0) {
      return { background: "#f7f7f7" }
    }
  }
  return (
    <div
      className="ag-theme-quartz" // applying the Data Grid theme
      style={{ height: "800px", width: "100%" }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact
        gridRef={gridRef}
        rowData={vis}
        columnDefs={colDefs}
        rowHeight={30}
        headerHeight={30}
        onComponentStateChanged={onComponentStateChanged}
        onGridReady={onGridReady}
        defaultColDef={defaultColDef}
        cellSelection={cellSelection}
        suppressMovableColumns={true}
        tooltipShowDelay={200}
        suppressScrollOnNewData={true}
        getRowStyle={getRowStyle}
      />
    </div>
  )
}

VisualizadorVisualizador.propTypes = {
  appData: PropTypes.object,
  llenado: PropTypes.array,
}

/**
 * Processes appData and llenado to perform some operation.
 * @typedef {Object} llenado
 * @property {string} cuenta
 * @property {string} inicial
 * @property {string} final
 * @property {string} delta
 *
 * @param {Object} appData - An object containing arrays as values.
 * The structure of the object is expected to be:
 * {
 *   key1: Array<*>,
 *   key2: Array<*>,
 *   ...
 * }
 * @param {Array<llenado>} llenado - An array of objects where each object
 *
 * @returns {*} - The result of processing the input data. The return type
 * depends on the specific implementation of the function.
 */
function updateVisualizador(appData, llenado) {
  const depositos = filterInvalidDeposits(appData.depositos)
  const cambioscxc = filterInvalidCXC(appData.cambioscxc)
  const cambioscxp = filterInvalidCXP(appData.cambioscxp)
  const liquidaciones = filterInvalidLiq(appData.liquidaciones)
  const salidas = filterInvalidSalidas(appData.salidas)
  const traslados = filterInvalidTraslados(appData.traslados)

  const newLlenado = llenado.map((item) => {
    if (
      !hasAnyChar(item.cuenta) ||
      !hasAnyChar(item.final) ||
      !hasAnyChar(item.delta)
    )
      return { ...item }

    const cuenta = item.cuenta.trim()
    const inicial = Number(item.inicial.trim().replaceAll(",", ""))
    const final = Number(item.final.trim().replaceAll(",", ""))

    const depositosSale = depositos.filter((d) => d.cuentaOrigen === cuenta)
    const depositosEntra = depositos.filter((d) => d.banco === cuenta)
    const dSaleAmt = depositosSale.reduce((acc, d) => acc + d.monto, 0)
    const dEntraAmt = depositosEntra.reduce((acc, d) => acc + d.monto, 0)

    const salidasEntra = salidas.filter((s) => s.cuentaOrigen === cuenta)
    const salidasSale = salidas.filter((s) => s.banco === cuenta)
    const sSaleAmt = salidasSale.reduce((acc, s) => acc + s.monto, 0)
    const sEntraAmt = salidasEntra.reduce((acc, s) => acc + s.monto, 0)

    const trasladosEntra = traslados.filter((t) => t.bancoDestino === cuenta)
    const trasladosSale = traslados.filter((t) => t.bancoOrigen === cuenta)
    const tSaleAmt = trasladosSale.reduce((acc, t) => acc + t.monto, 0)
    const tEntraAmt = trasladosEntra.reduce((acc, t) => acc + t.monto, 0)

    const cxcSale = cambioscxc.filter((c) => c.cuentaOrigen === cuenta)
    const cxcEntra = cambioscxc.filter((c) => c.cuentaDestino === cuenta)
    const cxcSaleAmt = cxcSale.reduce((acc, c) => acc + c.monto, 0)
    const cxcEntraAmt = cxcEntra.reduce((acc, c) => acc + c.monto, 0)

    const cxpSale = cambioscxp.filter((c) => c.cuentaOrigen === cuenta)
    const cxpEntra = cambioscxp.filter((c) => c.cuentaDestino === cuenta)
    const cxpSaleAmt = cxpSale.reduce((acc, c) => acc + c.monto, 0)
    const cxpEntraAmt = cxpEntra.reduce((acc, c) => acc + c.monto, 0)

    const liqEntra = liquidaciones.filter((l) => l.bancoDestino === cuenta)
    const liqEntraAmt = liqEntra.reduce((acc, l) => acc + l.montoBanco, 0)
    const liqSale = liquidaciones.reduce((acc, l) => acc + l.montoBanco, 0)
    const liqSaleAmt =
      cuenta == "Transitoria de Tarjeta de Credito" ? liqSale : 0

    const newFinal =
      final +
      dEntraAmt +
      cxcEntraAmt +
      liqEntraAmt +
      sEntraAmt +
      tEntraAmt +
      cxpSaleAmt -
      dSaleAmt -
      cxcSaleAmt -
      cxpEntraAmt -
      liqSaleAmt -
      sSaleAmt -
      tSaleAmt
    const newDelta = newFinal - inicial

    return {
      cuenta,
      inicial: formatNumberWithCommas(parseFloat(inicial).toFixed(2)),
      final: formatNumberWithCommas(parseFloat(newFinal).toFixed(2)),
      delta: formatNumberWithCommas(parseFloat(newDelta).toFixed(2)),
    }
  })

  return newLlenado
}
