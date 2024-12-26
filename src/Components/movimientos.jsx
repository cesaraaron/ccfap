import Cambioscxp from "./cambiocxp"
import Cambioscxc from "./cambioscxc"
import Depositos from "./depositos"
import Liquidaciones from "./liquidaciones"
import Salidas from "./salidas"
import Traslados from "./traslados"
import PropTypes from "prop-types"

const LeftPanel = (props) => {
  return (
    <div className="flex">
      <div role="tablist" className="tabs tabs-sm tabs-lifted w-full h-full">
        <input
          type="radio"
          name="movimientos_tabs"
          role="tab"
          className="tab"
          aria-label="Depositos"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content p-2">
          <Depositos {...props} />
        </div>
        <input
          type="radio"
          name="movimientos_tabs"
          role="tab"
          className="tab"
          aria-label="Salidas"
        />
        <div role="tabpanel" className="tab-content p-2">
          <Salidas {...props} />
        </div>
        <input
          type="radio"
          name="movimientos_tabs"
          role="tab"
          className="tab"
          aria-label="Traslados"
        />
        <div role="tabpanel" className="tab-content p-2">
          <Traslados {...props} />
        </div>
        <input
          type="radio"
          name="movimientos_tabs"
          role="tab"
          className="tab"
          aria-label="Liquidaciones"
        />
        <div role="tabpanel" className="tab-content p-2">
          <Liquidaciones {...props} />
        </div>
        <input
          type="radio"
          name="movimientos_tabs"
          role="tab"
          className="tab"
          aria-label="Cambios de cxc"
        />
        <div role="tabpanel" className="tab-content p-2">
          <Cambioscxc {...props} />
        </div>
        <input
          type="radio"
          name="movimientos_tabs"
          role="tab"
          className="tab"
          aria-label="Cambios de cxp"
        />
        <div role="tabpanel" className="tab-content p-2">
          <Cambioscxp {...props} />
        </div>
      </div>
      <button
        className="btn btn-xs btn-square"
        onClick={() => props.setShowVisualizador(!props.showVisualizador)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </div>
  )
}

export default LeftPanel

LeftPanel.propTypes = {
  setShowVisualizador: PropTypes.func.isRequired,
  showVisualizador: PropTypes.bool.isRequired, // Assuming it's a boolean
}
