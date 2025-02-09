import {
  filterInvalidDeposits,
  filterInvalidSalidas,
} from "./filtrarMovimientos"
import {
  hasFAInIt,
  getCXCFAWithFANumbers,
  getCxpFaWithName as getCxpFaWithNumbers,
  getFaNumbers,
  hasDROGInIt,
  hasTCPromericaInIt,
} from "./utils"

/**
 * Generates CXC for the FA deposits.
 *
 * @param {Array<import('./dataShape').Deposito>} data - An array of objects containing credit information.
 * @returns {Array<import('./dataShape').CambioCXC>} An array of objects after processing the input data.
 */

export const generateCreditosFA = (data) => {
  const filteredData = filterInvalidDeposits(data)

  const mappedValues = []

  filteredData.forEach((d) => {
    if (!hasFAInIt(d.descripcion)) return

    const faName = getCXCFAWithFANumbers(getFaNumbers(d.descripcion))

    mappedValues.push({
      id: d.id,
      fecha: d.fecha,
      cuentaOrigen: "CXC Farmacias",
      subCuentaOrigen: faName,
      cuentaDestino: d.cuentaOrigen,
      subCuentaDestino: d.subCuentaOrigen,
      monto: d.monto,
      descripcion: d.descripcion,
    })
  })

  return mappedValues
}

/**
 * Generates CXC for the FA deposits.
 *
 * @param {Array<import('./dataShape').Salida>} data - An array of objects containing credit information.
 * @returns {Array<import('./dataShape').CambioCXC>} An array of objects after processing the input data.
 */

export const generateAbonosFA = (data) => {
  const filteredData = filterInvalidSalidas(data)

  const mappedValues = []

  filteredData.forEach((s) => {
    if (!hasFAInIt(s.descripcion)) return

    const faNumbers = getFaNumbers(s.descripcion)

    mappedValues.push({
      id: s.id,
      fecha: s.fecha,
      cuentaOrigen: s.cuentaOrigen,
      subCuentaOrigen: s.subCuentaOrigen,
      cuentaDestino: "CXP Farmacias",
      subCuentaDestino: getCxpFaWithNumbers(faNumbers),
      monto: s.monto,
      descripcion: s.descripcion,
    })
  })

  return mappedValues
}

/**
 * Generates CXC for the FA deposits.
 *
 * @param {Array<import('./dataShape').Salida>} data - An array of objects containing credit information.
 * @returns {Array<import('./dataShape').CambioCXC>} An array of objects after processing the input data.
 */
export const generateCXCComprasBodegas = (data) => {
  const filteredData = filterInvalidSalidas(data)
  const mappedValues = []

  filteredData.forEach((s) => {
    if (!hasDROGInIt(s.descripcion)) return

    mappedValues.push({
      id: s.id,
      fecha: s.fecha,
      cuentaOrigen: s.cuentaOrigen,
      subCuentaOrigen: s.subCuentaOrigen,
      cuentaDestino: "CXP Bodega",
      subCuentaDestino: "FA Drogueria",
      monto: s.monto,
      descripcion: s.descripcion,
    })
  })

  return mappedValues
}

/**
 * Generates CXC for the FA deposits.
 *
 * @param {Array<import('./dataShape').Salida>} data - An array of objects containing credit information.
 * @returns {Array<import('./dataShape').CambioCXC>} An array of objects after processing the input data.
 */
export const generateCXCTCPromerica = (data) => {
  const filteredData = filterInvalidSalidas(data)
  const mappedValues = []

  filteredData.forEach((s) => {
    if (!hasTCPromericaInIt(s.descripcion)) return

    mappedValues.push({
      id: s.id,
      fecha: s.fecha,
      cuentaOrigen: s.cuentaOrigen,
      subCuentaOrigen: s.subCuentaOrigen,
      cuentaDestino: "Prestamo Bodega",
      subCuentaDestino: "Prestamo Bodega",
      monto: s.monto,
      descripcion: s.descripcion,
    })
  })

  return mappedValues
}

/**
 * Generates CXC for the FA deposits.
 *
 * @param {Array<import('./dataShape').CambioCXC>}  oldcxc of objects after processing the input data.
 * @param {Array<import('./dataShape').CambioCXC>}  newcxc of objects after processing the input data.
 * @returns {Array<import('./dataShape').CambioCXC>} An array of objects after processing the input data.
 *
 */
export const synCreditosFA = (oldcxc, newcxc, depositos) => {
  // Create a map for quick access to objects in arrayA by id
  const mappedOldcxc = new Map(oldcxc.map((obj) => [obj.id, obj]))
  const mappedNewcxc = new Map(newcxc.map((obj) => [obj.id, obj]))
  const mappedDepositos = new Map(depositos.map((obj) => [obj.id, obj]))

  const intersectedcxc = newcxc.filter(
    (obj) => mappedOldcxc.has(obj.id) && mappedDepositos.has(obj.id),
  )

  const offsetcxc = oldcxc.filter(
    (obj) => !mappedNewcxc.has(obj.id) && !mappedDepositos.has(obj.id),
  )

  const result = [...intersectedcxc, ...offsetcxc]

  newcxc.forEach((obj) => {
    if (!mappedOldcxc.has(obj.id)) {
      result.push(obj)
    }
  })

  return result.filter((v) => Object.values(v).length > 1)
}
