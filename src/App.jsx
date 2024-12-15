import { useState } from "react"
import Movimientos from "./Components/movimientos"
import Visualizador from "./Components/visualizador"
import { data } from "./Utils/dataShape"
import { ActionButtons } from "./Components/actionButtons"
import { deepCopy } from "./Utils/deepCopy"
import Split from "react-split"

const App = () => {
  const [appData, setAppData] = useState(deepCopy(data))

  return (
    <div>
      <div className="app">
        <Split
          sizes={[50, 50]} // Initial size percentages of the panes
          minSize={100} // Minimum size for each pane in pixels
          gutterSize={4} // Size of the draggable divider
          direction="horizontal" // 'horizontal' for side-by-side, 'vertical' for stacked
          className="split"
        >
          <div className="flex-col space-y-4 p-4">
            <Movimientos appData={appData} setAppData={setAppData} />
            <ActionButtons appData={appData} setAppData={setAppData} />
          </div>
          <div className="p-4">
            <Visualizador />
          </div>
        </Split>
      </div>
    </div>
  )
}

export default App
