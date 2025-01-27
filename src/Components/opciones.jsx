import CuentasDepositos from "./opcionesCuentasDepositos"
import CuentasSalidas from "./opcionesCuentasSalidas"
import OpcionesCXCEmp from "./opcionesCXCEmp"

export default function Opciones(props) {
  return (
    <div className="p-2">
      <div className="collapse bg-base-200 mb-2">
        <input type="checkbox" />
        <div className="collapse-title text-base">
          Agregar codigos de empleados
        </div>
        <div className="collapse-content">
          <OpcionesCXCEmp {...props} />
        </div>
      </div>
      <div className="collapse bg-base-200 mb-2">
        <input type="checkbox" />
        <div className="collapse-title text-base">
          Cuentas Adicionales Para Depósitos Bancarios (Pmt 2304)
        </div>
        <div className="collapse-content">
          <CuentasDepositos {...props} />
        </div>
      </div>
      <div className="collapse bg-base-200 mb-2">
        <input type="checkbox" />
        <div className="collapse-title text-base">
          Cuentas Adicionales Para Transferencias Bancarias (Pmt 2305)
        </div>
        <div className="collapse-content">
          <CuentasSalidas {...props} />
        </div>
      </div>
    </div>
  )
}
