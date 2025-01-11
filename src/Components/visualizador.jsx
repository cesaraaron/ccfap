import { useState } from "react"
import VisualizadorLlenado from "./visualizadorLlenado"
import { VisualizadorVisualizador } from "./visualizadorVisualizador"

const RightPanel = (props) => {
  const [activeTab, setActiveTab] = useState("llenado")

  return (
    <div>
      {/* Tab List */}
      <div role="tablist" className="tabs tabs-bordered">
        <button
          role="tab"
          className={`tab ${activeTab === "llenado" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("llenado")}
        >
          Llenado
        </button>
        <button
          role="tab"
          className={`tab ${activeTab === "visualizador" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("visualizador")}
        >
          Visualizador
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "llenado" && (
          <div id="llenado-content">
            <VisualizadorLlenado {...props} />
          </div>
        )}
        {activeTab === "visualizador" && (
          <div id="visualizador-content">
            <VisualizadorVisualizador {...props} />
          </div>
        )}
      </div>
    </div>
  )
}

export default RightPanel
