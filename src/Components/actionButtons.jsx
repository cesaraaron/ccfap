import { data } from "../Utils/dataShape"
import PropTypes from "prop-types"
import { deepCopy } from "../Utils/deepCopy"

export const ActionButtons = ({ setAppData }) => {
  return (
    <div className="flex pt-8 justify-center">
      <button className="btn btn-ghost btn-sm">Generar excel</button>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-sm btn-ghost"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Limpiar todo
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Borrar todo</h3>
          <p className="py-2">
            Toda la informacion de toda la pagina será borrada, ¿Está seguro?
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <div className="space-x-3">
                <button className="btn">No</button>

                <button
                  className="btn btn-error"
                  onClick={() => {
                    setAppData(deepCopy(data))
                  }}
                >
                  Si
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

ActionButtons.propTypes = {
  appData: PropTypes.object.isRequired,
  setAppData: PropTypes.func.isRequired,
}
