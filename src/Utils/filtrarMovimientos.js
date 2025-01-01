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
  const filledData = []

  data.forEach((item) => {
    const obj = { ...item }
    if (!hasAnyChar(obj.descripcion) || obj.descripcion == undefined)
      obj.descripcion = "0"

    if (!hasAnyChar(obj.referencia) || obj.referencia == undefined)
      obj.referencia = 0

    filledData.push(obj)
  })

  const filteredData = filledData.filter(
    ({
      fecha,
      cuentaOrigen,
      subCuentaOrigen,
      monto,
      banco,
      descripcion,
      referencia,
    }) => {
      if (!isValidDate(fecha)) return false

      if (!depositos.includes(cuentaOrigen)) return false

      const auxiliaresValues = Object.values(auxiliares[cuentaOrigen])

      if (!auxiliaresValues.includes(subCuentaOrigen)) return false

      if (monto == 0 || isNaN(monto)) return false

      if (!Object.values(bancos).includes(banco)) return false

      if (!hasAnyChar(descripcion)) return false

      if (referencia == undefined) return false

      return true
    },
  )

  return filteredData
}

/**
 *
 * @param {Array<import('./dataShape').CambioCXP>} data - An array of objects containing deposit information.
 * @returns {Array<import('./dataShape').CambioCXP>}  - An array of objects containing credit information.
 */
export const filterInvalidCXP = (data) => {
  const filledData = []

  data.forEach((item) => {
    const obj = { ...item }
    if (!hasAnyChar(obj.descripcion) || obj.descripcion == undefined)
      obj.descripcion = "0"

    filledData.push(obj)
  })

  const filteredData = filledData.filter(
    ({
      fecha,
      cuentaOrigen,
      subCuentaOrigen,
      cuentaDestino,
      subCuentaDestino,
      monto,
      descripcion,
    }) => {
      if (!isValidDate(fecha)) return false

      if (!cxp.includes(cuentaOrigen)) return false

      const auxiliaresValues = Object.values(auxiliares[cuentaOrigen])

      if (!auxiliaresValues.includes(subCuentaOrigen)) return false

      if (mayores[cuentaDestino] == undefined) return false

      const subCuentaDestinoValues = Object.values(auxiliares[cuentaDestino])

      if (!subCuentaDestinoValues.includes(subCuentaDestino)) return false

      if (monto == 0 || isNaN(monto)) return false

      if (!hasAnyChar(descripcion)) return false

      return true
    },
  )
  return filteredData
}

/**
 *
 * @param {Array<import('./dataShape').CambioCXC>} data
 * @returns {Array<import('./dataShape').CambioCXC>}
 */
export const filterInvalidCXC = (data) => {
  const filledData = []

  data.forEach((item) => {
    const obj = { ...item }
    if (!hasAnyChar(obj.descripcion) || obj.descripcion == undefined)
      obj.descripcion = "0"

    filledData.push(obj)
  })

  const filteredData = filledData.filter(
    ({
      fecha,
      cuentaOrigen,
      subCuentaOrigen,
      cuentaDestino,
      subCuentaDestino,
      monto,
      descripcion,
    }) => {
      if (!isValidDate(fecha)) return false

      if (!cxc.includes(cuentaOrigen)) return false

      const auxiliaresValues = Object.values(auxiliares[cuentaOrigen])

      if (!auxiliaresValues.includes(subCuentaOrigen)) return false

      if (mayores[cuentaDestino] == undefined) return false

      const subCuentaDestinoValues = Object.values(auxiliares[cuentaDestino])

      if (!subCuentaDestinoValues.includes(subCuentaDestino)) return false

      if (monto == 0 || isNaN(monto)) return false

      if (!hasAnyChar(descripcion)) return false

      return true
    },
  )
  return filteredData
}

/**
 *
 * @param {Array<import('./dataShape').Liquidacion>} data
 * @returns {Array<import('./dataShape').Liquidacion>}
 */
export const filterInvalidLiq = (data) => {
  const filledData = []

  data.forEach((item) => {
    const obj = { ...item }
    if (
      obj.comisiones == null ||
      obj.comisiones == undefined ||
      obj.comisiones == 0
    )
      obj.comisiones = 0
    if (
      obj.isvComisiones == null ||
      obj.isvComisiones == undefined ||
      obj.isvComisiones == 0
    )
      obj.isvComisiones = 0
    if (
      obj.retencionISR == null ||
      obj.retencionISR == undefined ||
      obj.retencionISR == 0
    )
      obj.retencionISR = 0
    if (
      obj.retencionISV == null ||
      obj.retencionISV == undefined ||
      obj.retencionISV == 0
    )
      obj.retencionISV = 0
    if (
      !hasAnyChar(obj.referencia) ||
      obj.referencia == undefined ||
      obj.referencia == 0
    )
      obj.referencia = 0

    filledData.push(obj)
  })

  const filteredData = filledData.filter(
    ({
      bancoDestino,
      fecha,
      montoBanco,
      comisiones,
      isvComisiones,
      retencionISR,
      retencionISV,
      referencia,
      bancoPertenece,
    }) => {
      if (!Object.values(bancos).includes(bancoDestino)) {
        return false
      }
      if (!isValidDate(fecha)) {
        return false
      }
      if (montoBanco == 0 || isNaN(montoBanco)) {
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
      if (referencia == undefined) {
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
  const filledData = []

  data.forEach((item) => {
    const obj = { ...item }
    if (obj.tipoSalida !== "Cheque" && obj.tipoSalida !== "Transferencia")
      obj.tipoSalida = "Transferencia"

    if (!hasAnyChar(obj.nCheque) || obj.nCheque == undefined) obj.nCheque = 0

    if (!hasAnyChar(obj.descripcion) || obj.descripcion == undefined)
      obj.descripcion = "0"

    filledData.push(obj)
  })

  const dataFiltered = filledData.filter(
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
  const filledData = []

  data.forEach((item) => {
    const obj = { ...item }
    if (obj.tipoSalida !== "Cheque" && obj.tipoSalida !== "Transferencia")
      obj.tipoSalida = "Transferencia"

    if (!hasAnyChar(obj.nReferencia) || obj.nReferencia == undefined)
      obj.nReferencia = 0

    if (!hasAnyChar(obj.descripcion) || obj.descripcion == undefined)
      obj.descripcion = "0"

    filledData.push(obj)
  })

  const filteredData = filledData.filter(
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
