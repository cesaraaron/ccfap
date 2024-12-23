import { mappedDepositos } from "./movimientosValidos"
import { saveAs } from "file-saver"
import exceljs from "exceljs"
import { createDateFromString } from "./utils"

/**
 * Generates CXC for the FA deposits.
 *
 * @param {Array<import('./dataShape').Deposito>} depositos - An array of objects containing credit information.
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

  console.log(result)

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

  saveAs(blob, "Depositos.xlsx")
}
