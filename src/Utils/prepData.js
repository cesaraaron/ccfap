import { auxiliares, bancos, mayores } from "../../datamodel"
import {
  filterInvalidCXC,
  filterInvalidCXP,
  filterInvalidDeposits,
  filterInvalidLiq,
  filterInvalidSalidas,
  filterInvalidTraslados,
} from "./filtrarMovimientos"
import { getKeyByValue } from "./utils"

/**
 *
 * @param {Array<import('./dataShape').Deposito>} data
 * @returns {Array<import('./dataShape').Deposito>}
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

/**
 *
 * @param {Array<import('./dataShape').CambioCXP>} data
 * @returns {Array<import('./dataShape').CambioCXP>}
 */
export const mappedCXP = (data) => {
  const cxpValidos = filterInvalidCXP(data)

  const result = []

  cxpValidos.forEach((v) => {
    const obj = { ...v }

    const mappedSubCuentaOrigen = new Map(
      Object.keys(auxiliares[v.cuentaOrigen]).map((k) => [
        auxiliares[v.cuentaOrigen][k],
        k,
      ]),
    )

    const mappedSubCuentaDestino = new Map(
      Object.keys(auxiliares[v.cuentaDestino]).map((k) => [
        auxiliares[v.cuentaDestino][k],
        k,
      ]),
    )

    obj.cuentaOrigen = parseInt(mayores[v.cuentaOrigen].id)
    obj.subCuentaOrigen = parseInt(mappedSubCuentaOrigen.get(v.subCuentaOrigen))
    obj.cuentaDestino = parseInt(mayores[v.cuentaDestino].id)
    obj.subCuentaDestino = parseInt(
      mappedSubCuentaDestino.get(v.subCuentaDestino),
    )

    result.push(obj)
  })

  return result
}

/**
 *
 * @param {Array<import('./dataShape').CambioCXC>} data
 * @returns {Array<import('./dataShape').CambioCXC>}
 */
export const mappedCXC = (data) => {
  const cxcValidos = filterInvalidCXC(data)

  const result = []

  cxcValidos.forEach((v) => {
    const obj = { ...v }

    const mappedSubCuentaOrigen = new Map(
      Object.keys(auxiliares[v.cuentaOrigen]).map((k) => [
        auxiliares[v.cuentaOrigen][k],
        k,
      ]),
    )

    const mappedSubCuentaDestino = new Map(
      Object.keys(auxiliares[v.cuentaDestino]).map((k) => [
        auxiliares[v.cuentaDestino][k],
        k,
      ]),
    )

    obj.cuentaOrigen = parseInt(mayores[v.cuentaOrigen].id)
    obj.subCuentaOrigen = parseInt(mappedSubCuentaOrigen.get(v.subCuentaOrigen))
    obj.cuentaDestino = parseInt(mayores[v.cuentaDestino].id)
    obj.subCuentaDestino = parseInt(
      mappedSubCuentaDestino.get(v.subCuentaDestino),
    )

    result.push(obj)
  })

  return result
}

/**
 *
 * @param {Array<import('./dataShape').Liquidacion>} data
 * @returns {Array<import('./dataShape').Liquidacion>}
 */
export const mappedLiquidaciones = (data) => {
  const liqValidas = filterInvalidLiq(data)

  const result = []

  liqValidas.forEach((v) => {
    const obj = { ...v }

    obj.bancoDestino = parseInt(getKeyByValue(bancos, v.bancoDestino))
    obj.bancoPertenece = parseInt(getKeyByValue(bancos, v.bancoPertenece))

    result.push(obj)
  })

  return result
}

/**
 *
 * @param {Array<import('./dataShape').Salida>} data
 * @returns {Array<import('./dataShape').Salida>}
 */
export const mappedSalidas = (data) => {
  const salidasValidas = filterInvalidSalidas(data)

  const result = []

  salidasValidas.forEach((d) => {
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

/**
 *
 * @param {Array<import('./dataShape').Traslado>} data
 * @returns {Array<import('./dataShape').Traslado>}
 */
export const mappedTraslados = (data) => {
  const trasladosValidos = filterInvalidTraslados(data)

  const result = []

  trasladosValidos.forEach((v) => {
    const obj = { ...v }

    obj.bancoOrigen = parseInt(getKeyByValue(bancos, v.bancoOrigen))
    obj.bancoDestino = parseInt(getKeyByValue(bancos, v.bancoDestino))

    result.push(obj)
  })

  return result
}
