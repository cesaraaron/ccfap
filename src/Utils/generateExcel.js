import {
  mappedCXC,
  mappedCXP,
  mappedDepositos,
  mappedLiquidaciones,
  mappedSalidas,
  mappedTraslados,
} from "./prepData"
import exceljs from "exceljs"
import { createDateFromString } from "./utils"

/**
 *
 * @param {Array<import('./dataShape').Deposito>} depositos - An array of objects containing credit information.
 * @returns {Promise<undefined|Blob>}
 */
export const generateDepositosExcel = async (depositos) => {
  const depositosValidos = mappedDepositos(depositos)

  if (depositosValidos.length === 0) {
    return
  }
  const headers = [
    "Fecha",
    "Cuenta origen",
    "Subcuenta origen",
    "Banco",
    "Monto",
    "Descripcion",
    "Referencia",
  ]

  const result = []

  depositosValidos.forEach((d) => {
    result.push([
      createDateFromString(d.fecha),
      d.cuentaOrigen,
      d.subCuentaOrigen,
      d.banco,
      d.monto,
      d.descripcion,
      d.referencia,
    ])
  })

  const workBook = new exceljs.Workbook()
  const worksheet = workBook.addWorksheet("Depositos")

  worksheet.addRow(headers)
  result.forEach((row) => {
    worksheet.addRow(row)
  })

  const buffer = await workBook.xlsx.writeBuffer()

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  })

  return blob
}

/**
 *
 * @param {Array<import('./dataShape').CambioCXP>} data
 * @returns {Promise<undefined|Blob>}
 */
export const generateCXPExcel = async (data) => {
  const validCXP = mappedCXP(data)

  if (validCXP.length === 0) {
    return
  }
  const headers = [
    "Fecha",
    "Cuenta origen",
    "Subcuenta origen",
    "Cuenta destino",
    "Sub cuenta destino",
    "Monto",
    "Descripcion",
  ]

  const result = []

  validCXP.forEach((d) => {
    result.push([
      createDateFromString(d.fecha),
      d.cuentaOrigen,
      d.subCuentaOrigen,
      d.cuentaDestino,
      d.subCuentaDestino,
      d.monto,
      d.descripcion,
    ])
  })

  const workBook = new exceljs.Workbook()
  const worksheet = workBook.addWorksheet("CXP")

  worksheet.addRow(headers)
  result.forEach((row) => {
    worksheet.addRow(row)
  })

  const buffer = await workBook.xlsx.writeBuffer()

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  })

  return blob
}

/**
 *
 * @param {Array<import('./dataShape').CambioCXC>} data
 * @returns {Promise<undefined|Blob>}
 */
export const generateCXCExcel = async (data) => {
  const validCXC = mappedCXC(data)

  if (validCXC.length === 0) {
    return
  }
  const headers = [
    "Fecha",
    "Cuenta origen",
    "Subcuenta origen",
    "Cuenta destino",
    "Sub cuenta destino",
    "Monto",
    "Descripcion",
  ]

  const result = []

  validCXC.forEach((d) => {
    result.push([
      createDateFromString(d.fecha),
      d.cuentaOrigen,
      d.subCuentaOrigen,
      d.cuentaDestino,
      d.subCuentaDestino,
      d.monto,
      d.descripcion,
    ])
  })

  const workBook = new exceljs.Workbook()
  const worksheet = workBook.addWorksheet("CXC")

  worksheet.addRow(headers)
  result.forEach((row) => {
    worksheet.addRow(row)
  })

  const buffer = await workBook.xlsx.writeBuffer()

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  })

  return blob
}

/**
 *
 * @param {Array<import('./dataShape').Liquidacion>} data
 * @returns {Promise<undefined|Blob>}
 */
export const generateLiqExcel = async (data) => {
  const validLiq = mappedLiquidaciones(data)

  if (validLiq.length === 0) {
    return
  }
  const headers = [
    "Banco destino",
    "Fecha",
    "Monto banco",
    "Comisiones",
    "ISV Comisiones",
    "Retencion ISR",
    "Retencion ISV",
    "Referencia",
    "Banco pertenece",
  ]

  const result = []

  validLiq.forEach((d) => {
    result.push([
      d.bancoDestino,
      createDateFromString(d.fecha),
      d.montoBanco,
      d.comisiones,
      d.isvComisiones,
      d.retencionISR,
      d.retencionISV,
      d.referencia,
      d.bancoPertenece,
    ])
  })

  const workBook = new exceljs.Workbook()
  const worksheet = workBook.addWorksheet("Liquidaciones")

  worksheet.addRow(headers)
  result.forEach((row) => {
    worksheet.addRow(row)
  })

  const buffer = await workBook.xlsx.writeBuffer()

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  })

  return blob
}

/**
 *
 * @param {Array<import('./dataShape').Salida>} salidas - An array of objects containing credit information.
 * @returns {Promise<undefined|Blob>}
 */
export const generateSalidasExcel = async (salidas) => {
  const salidasValidas = mappedSalidas(salidas)

  if (salidasValidas.length === 0) {
    return
  }
  const headers = [
    "Fecha",
    "Cuenta origen",
    "Subcuenta origen",
    "Banco",
    "Monto",
    "Tipo salida",
    "N de cheque",
    "Descripcion",
  ]

  const result = []

  salidasValidas.forEach((d) => {
    result.push([
      createDateFromString(d.fecha),
      d.cuentaOrigen,
      d.subCuentaOrigen,
      d.banco,
      d.monto,
      d.tipoSalida,
      d.nCheque,
      d.descripcion,
    ])
  })

  const workBook = new exceljs.Workbook()
  const worksheet = workBook.addWorksheet("Depositos")

  worksheet.addRow(headers)
  result.forEach((row) => {
    worksheet.addRow(row)
  })

  const buffer = await workBook.xlsx.writeBuffer()

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  })

  return blob
}

/**
 *
 * @param {Array<import('./dataShape').Traslado>} data
 * @returns {Promise<undefined|Blob>}
 */
export const generateTrasladoExcel = async (data) => {
  const validLiq = mappedTraslados(data)

  if (validLiq.length === 0) {
    return
  }
  const headers = [
    "Fecha",
    "Banco origen",
    "Banco destino",
    "Monto",
    "Tipo de salida",
    "N referencia",
    "Descripcion",
  ]

  const result = []

  validLiq.forEach((d) => {
    result.push([
      createDateFromString(d.fecha),
      d.bancoOrigen,
      d.bancoDestino,
      d.monto,
      d.tipoSalida,
      d.nReferencia,
      d.descripcion,
    ])
  })

  const workBook = new exceljs.Workbook()
  const worksheet = workBook.addWorksheet("Traslados")

  worksheet.addRow(headers)
  result.forEach((row) => {
    worksheet.addRow(row)
  })

  const buffer = await workBook.xlsx.writeBuffer()

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  })

  return blob
}
