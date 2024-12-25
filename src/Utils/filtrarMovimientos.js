import {
  depositos,
  auxiliares,
  bancos,
  cxp,
  mayores,
  cxc,
  salidas,
} from "../../datamodel"
import { isValidDate, hasAnyChar } from "./utils"

/**
 *
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
 *
 * @param {Array<import('./dataShape').CambioCXP>} data - An array of objects containing deposit information.
 * @returns {Array<import('./dataShape').CambioCXP>}  - An array of objects containing credit information.
 */
export const filterInvalidCXP = (data) => {
  return data.filter(
    ({
      fecha,
      monto,
      cuentaOrigen,
      subCuentaOrigen,
      cuentaDestino,
      subCuentaDestino,
      descripcion = "0",
      referencia = 0,
    }) => {
      if (
        isValidDate(fecha) &&
        !isNaN(monto) &&
        monto > 0 &&
        hasAnyChar(cuentaOrigen) &&
        hasAnyChar(subCuentaOrigen) &&
        hasAnyChar(cuentaDestino) &&
        hasAnyChar(subCuentaDestino) &&
        hasAnyChar(descripcion) &&
        referencia !== undefined
      ) {
        if (!cxp.includes(cuentaOrigen)) return false

        const auxiliaresValues = Object.values(auxiliares[cuentaOrigen])

        if (!auxiliaresValues.includes(subCuentaOrigen)) return false

        if (mayores[cuentaDestino] == undefined) return false

        const subCuentaDestinoValues = Object.values(auxiliares[cuentaDestino])

        if (!subCuentaDestinoValues.includes(subCuentaDestino)) return false

        return true
      }
      return false
    },
  )
}

/**
 *
 * @param {Array<import('./dataShape').CambioCXC>} data
 * @returns {Array<import('./dataShape').CambioCXC>}
 */
export const filterInvalidCXC = (data) => {
  return data.filter(
    ({
      fecha,
      monto,
      cuentaOrigen,
      subCuentaOrigen,
      cuentaDestino,
      subCuentaDestino,
      descripcion = "0",
      referencia = 0,
    }) => {
      if (
        isValidDate(fecha) &&
        !isNaN(monto) &&
        monto > 0 &&
        hasAnyChar(cuentaOrigen) &&
        hasAnyChar(subCuentaOrigen) &&
        hasAnyChar(cuentaDestino) &&
        hasAnyChar(subCuentaDestino) &&
        hasAnyChar(descripcion) &&
        referencia !== undefined
      ) {
        if (!cxc.includes(cuentaOrigen)) return false

        const auxiliaresValues = Object.values(auxiliares[cuentaOrigen])

        if (!auxiliaresValues.includes(subCuentaOrigen)) return false

        if (mayores[cuentaDestino] == undefined) return false

        const subCuentaDestinoValues = Object.values(auxiliares[cuentaDestino])

        if (!subCuentaDestinoValues.includes(subCuentaDestino)) return false

        return true
      }
      return false
    },
  )
}

/**
 *
 * @param {Array<import('./dataShape').Liquidacion>} data
 * @returns {Array<import('./dataShape').Liquidacion>}
 */
export const filterInvalidLiq = (data) => {
  const filteredData = data.filter(
    ({
      bancoDestino,
      fecha,
      montoBanco,
      comisiones,
      isvComisiones,
      retencionISR,
      retencionISV,
      referencia = 0,
      bancoPertenece,
    }) => {
      if (!Object.values(bancos).includes(bancoDestino)) {
        return false
      }
      if (!isValidDate(fecha)) {
        return false
      }
      if (isNaN(montoBanco)) {
        return false
      }
      if (isNaN(comisiones)) {
        return false
      }
      if (isNaN(isvComisiones)) {
        return false
      }
      if (isNaN(retencionISR)) {
        return false
      }
      if (isNaN(retencionISV)) {
        return false
      }
      if (referencia === undefined) {
        return false
      }
      if (!Object.values(bancos).includes(bancoPertenece)) {
        return false
      }
      return true
    },
  )
  return filteredData
}

/**
 *
 * @param {Array<import('./dataShape').Salida>} data - An array of objects containing deposit information.
 * @returns {Array<import('./dataShape').Salida>}  - An array of objects containing credit information.
 */
export const filterInvalidSalidas = (data) => {
  const dataFiltered = data.filter(
    ({
      fecha,
      cuentaOrigen,
      subCuentaOrigen,
      banco,
      monto,
      tipoSalida,
      nCheque,
      descripcion,
    }) => {
      if (!isValidDate(fecha)) return false

      if (!salidas.includes(cuentaOrigen)) return false

      const auxiliaresValues = Object.values(auxiliares[cuentaOrigen])

      if (!auxiliaresValues.includes(subCuentaOrigen)) return false

      if (!Object.values(bancos).includes(banco)) return false

      if (isNaN(monto)) return false

      if (isNaN(nCheque)) return false
      if (!hasAnyChar(descripcion)) return false

      if (!(tipoSalida == "Cheque" || tipoSalida == "Transferencia"))
        return false

      return true
    },
  )
  return dataFiltered
}

/**
 *
 * @param {Array<import('./dataShape').Traslado>} data
 * @returns {Array<import('./dataShape').Traslado>}
 */
export const filterInvalidTraslados = (data) => {
  const filteredData = data.filter(
    ({
      fecha,
      bancoOrigen,
      bancoDestino,
      monto,
      tipoSalida,
      nReferencia,
      descripcion,
    }) => {
      if (!isValidDate(fecha)) return false

      if (!Object.values(bancos).includes(bancoOrigen)) return false

      if (!Object.values(bancos).includes(bancoDestino)) return false

      if (isNaN(monto)) return false

      if (!(tipoSalida == "Cheque" || tipoSalida == "Transferencia"))
        return false

      if (isNaN(nReferencia)) return false

      if (!hasAnyChar(descripcion)) return false

      return true
    },
  )
  return filteredData
}
