import Cambioscxp from "./cambiocxp"
import Cambioscxc from "./cambioscxc"
import Depositos from "./depositos"
import Liquidaciones from "./liquidaciones"
import Opciones from "./opciones"
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
          defaultChecked={true}
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
        className="btn btn-xs btn-square mr-2"
        onClick={() => document.getElementById("my_modal_2").showModal()}
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
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
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

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box w-11/12 max-w-5xl ">
          <h3 className="font-bold text-lg">Opciones</h3>
          <Opciones props={props} />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <div className="space-x-3">
                <button className="btn btn-sm">Cerrar</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default LeftPanel

LeftPanel.propTypes = {
  setShowVisualizador: PropTypes.func.isRequired,
  showVisualizador: PropTypes.bool.isRequired, // Assuming it's a boolean
}
