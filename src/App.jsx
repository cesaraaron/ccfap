import { useState, useCallback } from "react"
import Movimientos from "./Components/movimientos"
import Visualizador from "./Components/visualizador"

const data = {
  depositos: [],
}

const App = () => {
  const [leftPanelWidth, setLeftPanelWidth] = useState(50) // Initial width percentage of left panel
  const [appData, setAppData] = useState(data)

  const handleMouseMove = useCallback((event) => {
    const newWidth = (event.clientX / window.innerWidth) * 100 // Calculate new width percentage
    setLeftPanelWidth(newWidth) // Update the left panel width
  }, [])

  const handleMouseUp = useCallback(() => {
    window.removeEventListener("mousemove", handleMouseMove) // Remove the event listener on mouse up
    window.removeEventListener("mouseup", handleMouseUp)
  }, [handleMouseMove])

  const handleMouseDown = useCallback(() => {
    window.addEventListener("mousemove", handleMouseMove) // Add event listeners on mouse down
    window.addEventListener("mouseup", handleMouseUp)
  }, [handleMouseMove, handleMouseUp])

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div
        style={{ width: `${leftPanelWidth}%` }}
        className="overflow-y-auto border-r border-gray-300"
      >
        <div className="p-4">
          <h2 className="text-xl text-center p-4">Movimientos</h2>
          <Movimientos appData={appData} setAppData={setAppData} />
        </div>
      </div>

      {/* Draggable Divider */}
      <div
        className="w-1 cursor-col-resize"
        onMouseDown={handleMouseDown}
        style={{ cursor: "col-resize", zIndex: 10 }}
      />

      {/* Right Panel */}
      <div
        style={{ width: `${100 - leftPanelWidth}%` }}
        className="overflow-y-auto"
      >
        <div className="p-4">
          <h2 className="text-xl text-center p-4">Visualizador</h2>
          <div className="overflow-y-auto">
            <Visualizador />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
