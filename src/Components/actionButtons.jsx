import { data } from "../Utils/dataShape"
import PropTypes from "prop-types"
import { deepCopy } from "../Utils/utils"
import {
  generateCXCExcel,
  generateCXPExcel,
  generateDepositosExcel,
  generateLiqExcel,
  generateSalidasExcel,
  generateTrasladoExcel,
} from "../Utils/generateExcel"
import { generateZip } from "../Utils/generateZip"

export const ActionButtons = ({ setAppData, appData }) => {
  return (
    <div className="flex  justify-center">
      <button
        className="btn btn-ghost btn-sm"
        onClick={async () => {
          const depositos = await generateDepositosExcel(appData.depositos)
          const cambioscxp = await generateCXPExcel(appData.cambioscxp)
          const cambioscxc = await generateCXCExcel(appData.cambioscxc)
          const liquidaciones = await generateLiqExcel(appData.liquidaciones)
          const salidas = await generateSalidasExcel(appData.salidas)
          const traslados = await generateTrasladoExcel(appData.traslados)

          generateZip({
            cambioscxp,
            depositos,
            cambioscxc,
            liquidaciones,
            salidas,
            traslados,
          })
        }}
      >
        Generar excel
      </button>

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
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => {
                    setAppData(deepCopy(data))
                  }}
                >
                  Si
                </button>
                <button className="btn btn-sm">No</button>
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
