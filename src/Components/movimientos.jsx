import Cambioscxp from "./cambiocxp"
import Cambioscxc from "./cambioscxc"
import Depositos from "./depositos"
import Liquidaciones from "./liquidaciones"
import Salidas from "./salidas"
import Traslados from "./traslados"

const LeftPanel = (props) => {
  return (
    <div>
      <div role="tablist" className="tabs tabs-sm tabs-lifted w-full">
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
    </div>
  )
}

export default LeftPanel
