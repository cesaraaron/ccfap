import { auxiliares, bancos, depositos, mayores } from "../../datamodel"
import { getKeyByValue, hasAnyChar, isValidDate } from "./utils"

/**
 * Generates CXC for the FA deposits.
 * @param {Array<import('./dataShape').Deposito>} data - An array of objects containing deposit information.
 * @returns {Array<import('./dataShape').Deposito>}  - An array of objects containing credit information.
 */
export const filterInvalidDeposits = (data) => {
  return data.filter(
    ({
      fecha,
      monto,
      banco,
      cuentaOrigen,
      descripcion = "0",
      subCuentaOrigen,
      referencia = 0,
    }) => {
      if (
        isValidDate(fecha) &&
        !isNaN(monto) &&
        monto > 0 &&
        hasAnyChar(cuentaOrigen) &&
        hasAnyChar(subCuentaOrigen) &&
        hasAnyChar(banco) &&
        hasAnyChar(descripcion) &&
        referencia !== undefined
      ) {
        if (!depositos.includes(cuentaOrigen)) return false

        const auxiliaresValues = Object.values(auxiliares[cuentaOrigen])

        if (!auxiliaresValues.includes(subCuentaOrigen)) return false

        const bancoValues = Object.values(bancos)

        if (!bancoValues.includes(banco)) return false

        return true
      }
      return false
    },
  )
}

/**
 * Generates CXC for the FA deposits.
 * @param {Array<import('./dataShape').Deposito>} data - An array of objects containing deposit information.
 * @returns {Array<import('./dataShape').Deposito>}  - An array of objects containing credit information.
 */
export const mappedDepositos = (data) => {
  const depositosValidos = filterInvalidDeposits(data)

  const result = []

  depositosValidos.forEach((d) => {
    const obj = { ...d }

    const mappedSubCuentaOrigen = new Map(
      Object.keys(auxiliares[d.cuentaOrigen]).map((k) => [
        auxiliares[d.cuentaOrigen][k],
        k,
      ]),
    )

    obj.cuentaOrigen = parseInt(mayores[d.cuentaOrigen].id)
    obj.subCuentaOrigen = parseInt(mappedSubCuentaOrigen.get(d.subCuentaOrigen))
    obj.banco = parseInt(getKeyByValue(bancos, d.banco))

    result.push(obj)
  })

  return result
}
