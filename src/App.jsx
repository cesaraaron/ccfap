import { useState } from "react"
import Movimientos from "./Components/movimientos"
import Visualizador from "./Components/visualizador"
import { data } from "./Utils/dataShape"
import { ActionButtons } from "./Components/actionButtons"
import {
  deepCopy,
  getDepositosAdicionalesWithCodes,
  getSalidasAdicionalesWithCodes,
  uniqueArr,
} from "./Utils/utils"
import Split from "react-split"
import {
  auxiliares,
  depositos,
  originalDepositos,
  originalSalidas,
  salidas,
} from "../datamodel"

const App = () => {
  const optionsString = localStorage.getItem("options")

  if (optionsString) {
    const parsedOptions = JSON.parse(optionsString)

    if (Array.isArray(parsedOptions?.cxcEmpleados)) {
      const obj = {}
      parsedOptions.cxcEmpleados.forEach((item) => {
        if (item.codigo > 0 && /./.test(item.nombre)) {
          obj[item.codigo] = item.nombre
        }
      })
      auxiliares["CXC Empleados"] = obj
    }

    if (parsedOptions?.cuentasDepositos) {
      const cuentasAdicionales = getDepositosAdicionalesWithCodes(
        parsedOptions.cuentasDepositos,
      ).filter((v) => v !== "No disponible")

      depositos.depositos = uniqueArr([
        ...originalDepositos,
        ...cuentasAdicionales,
      ])
    }

    if (parsedOptions?.cuentasSalidas) {
      const cuentasSalidas = getSalidasAdicionalesWithCodes(
        parsedOptions.cuentasSalidas,
      ).filter((v) => v !== "No disponible")

      salidas.salidas = uniqueArr([...originalSalidas, ...cuentasSalidas])
    }
  }

  const [appData, setAppData] = useState(deepCopy(data))
  const [llenado, setLlenado] = useState([{}])
  const [showVisualizador, setShowVisualizador] = useState(false)

  return (
    <div>
      {showVisualizador ? (
        <div className="app">
          <Split
            sizes={[60, 40]} // Initial size percentages of the panes
            minSize={[600, 400]} // Minimum size for each pane in pixels
            gutterSize={4} // Size of the draggable divider
            direction="horizontal" // 'horizontal' for side-by-side, 'vertical' for stacked
            className="split"
          >
            <div className="flex-col p-4">
              <Movimientos
                appData={appData}
                setAppData={setAppData}
                showVisualizador={showVisualizador}
                setShowVisualizador={setShowVisualizador}
              />
              <ActionButtons appData={appData} setAppData={setAppData} />
            </div>

            <div className=" p-4">
              <Visualizador
                appData={appData}
                setAppData={setAppData}
                llenado={llenado}
                setLlenado={setLlenado}
              />
            </div>
          </Split>
        </div>
      ) : (
        <div className="flex-col p-4">
          <Movimientos
            appData={appData}
            setAppData={setAppData}
            showVisualizador={showVisualizador}
            setShowVisualizador={setShowVisualizador}
          />
          <ActionButtons appData={appData} setAppData={setAppData} />
        </div>
      )}
    </div>
  )
}

export default App
