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
import { useCallback, useState } from "react"

export const ActionButtons = ({ setAppData, appData }) => {
  const [showAlert, setShowAlert] = useState(false)

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

          if (
            depositos == undefined &&
            cambioscxp == undefined &&
            cambioscxc == undefined &&
            liquidaciones == undefined &&
            salidas == undefined &&
            traslados == undefined
          ) {
            setShowAlert(true)
            return
          }

          generateZip(
            {
              cambioscxp,
              depositos,
              cambioscxc,
              liquidaciones,
              salidas,
              traslados,
            },
            appData,
          )
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
                  Aceptar
                </button>
                <button className="btn btn-sm">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
      {showAlert && (
        <ErrorAlert showAlert={showAlert} setShowAlert={setShowAlert} />
      )}
    </div>
  )
}

ActionButtons.propTypes = {
  appData: PropTypes.object.isRequired,
  setAppData: PropTypes.func.isRequired,
}

const ErrorAlert = ({ showAlert, setShowAlert }) => {
  const handleClose = useCallback(() => {
    setShowAlert(false)
  }, [setShowAlert]) // Dependency added here

  return (
    <div className="fixed top-8 z-50 duration-300" onClick={handleClose}>
      {showAlert && (
        <div role="alert" className="alert shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info h-6 w-6 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div>
            <div className="text-xs">
              Sin informacion para exportar o los movimientos son invalidos.
            </div>
          </div>
          <button
            className="btn btn-sm btn-circle btn-ghost"
            onClick={handleClose}
          >
            &times; {/* Close Icon */}
          </button>
        </div>
      )}
    </div>
  )
}

ErrorAlert.propTypes = {
  showAlert: PropTypes.bool.isRequired, // expecting a boolean
  setShowAlert: PropTypes.func.isRequired, // expecting a function
}
