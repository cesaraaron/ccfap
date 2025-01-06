import { useState } from "react"
import Movimientos from "./Components/movimientos"
import Visualizador from "./Components/visualizador"
import { data } from "./Utils/dataShape"
import { ActionButtons } from "./Components/actionButtons"
import { deepCopy } from "./Utils/utils"
import Split from "react-split"
import { auxiliares } from "../datamodel"

const App = () => {
  const [appData, setAppData] = useState(deepCopy(data))
  const [showVisualizador, setShowVisualizador] = useState(false)

  const optionsString = localStorage.getItem("options")

  if (optionsString) {
    const parsedOptions = JSON.parse(optionsString)

    if (Array.isArray(parsedOptions.cxcEmpleados)) {
      const obj = {}
      parsedOptions.cxcEmpleados.forEach((item) => {
        if (item.codigo > 0 && /./.test(item.nombre)) {
          obj[item.codigo] = item.nombre
        }
      })
      auxiliares["CXC Empleados"] = obj
    }
  }

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

            <div className="p-4">
              <Visualizador />
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
