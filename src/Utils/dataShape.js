import { generateObjets } from "./utils"

/**
 * Represents a deposit transaction.
 * @typedef {Object} Deposito
 * @property {string} id - The unique identifier for the deposit.
 * @property {string} fecha - The date of the deposit.
 * @property {string} cuentaOrigen - The source account of the deposit.
 * @property {string} subCuentaOrigen - The sub-account of the source account.
 * @property {string} banco - The bank involved in the deposit.
 * @property {number} monto - The amount of the deposit.
 * @property {string} descripcion - A description of the deposit.
 * @property {string} referencia - A reference for the deposit.
 */

/**
 * Represents a salida transaction.
 * @typedef {Object} Salida
 * @property {string} id - The unique identifier.
 * @property {string} fecha - The date of the salida.
 * @property {string} cuentaOrigen - The source account of the salida.
 * @property {string} subCuentaOrigen - The sub-account of the source account.
 * @property {string} banco - The bank involved in the salida.
 * @property {number} monto - The amount of the salida.
 * @property {string} tipoSalida - The type of salida.
 * @property {string} nCheque - The check number for the salida.
 * @property {string} descripcion - A description of the salida.
 */

/**
 * Represents a traslado transaction.
 * @typedef {Object} Traslado
 * @property {string} id - The unique identifier.
 * @property {string} fecha - The date of the traslado.
 * @property {string} bancoOrigen - The origin bank for the traslado.
 * @property {string} bancoDestino - The destination bank for the traslado.
 * @property {number} monto - The amount of the traslado.
 * @property {string} tipoSalida - The type of the traslado.
 * @property {string} nReferencia - The reference number for the traslado.
 * @property {string} descripcion - A description of the traslado.
 */

/**
 * Represents a liquidacion transaction.
 * @typedef {Object} Liquidacion
 * @property {string} id - The unique identifier.
 * @property {string} bancoDestino - The destination bank for the liquidacion.
 * @property {string} fecha - The date of the liquidacion.
 * @property {number} montoBanco - The amount in the bank for the liquidacion.
 * @property {number} comisiones - The commissions for the liquidacion.
 * @property {number} isvComisiones - The ISV on commissions.
 * @property {number} retencionISR - The ISR withholding.
 * @property {number} retencionISV - The ISV withholding.
 * @property {string} referencia - The reference for the liquidacion.
 * @property {string} bancoPertenece - The bank it belongs to.
 */

/**
 * Represents a cambio CXC transaction.
 * @typedef {Object} CambioCXC
 * @property {string} id - The unique identifier for the cambio CXC.
 * @property {string} fecha - The date of the cambio CXC.
 * @property {string} cuentaOrigen - The source account of the cambio CXC.
 * @property {string} subCuentaOrigen - The sub-account of the source account.
 * @property {string} cuentaDestino - The destination account for the cambio CXC.
 * @property {string} subCuentaDestino - The sub-account of the destination account.
 * @property {number} monto - The amount of the cambio CXC.
 * @property {string} descripcion - A description of the cambio CXC.
 */

/**
 * Represents a cambio CXP transaction.
 * @typedef {Object} CambioCXP
 * @property {string} id - The unique identifier.
 * @property {string} fecha - The date of the cambio CXP.
 * @property {string} cuentaOrigen - The source account of the cambio CXP.
 * @property {string} subCuentaOrigen - The sub-account of the source account.
 * @property {string} cuentaDestino - The destination account for the cambio CXP.
 * @property {string} subCuentaDestino - The sub-account of the destination account.
 * @property {number} monto - The amount of the cambio CXP.
 * @property {string} descripcion - A description of the cambio CXP.
 */

export const data = {
  depositos: generateObjets(20),
  salidas: generateObjets(20),
  traslados: generateObjets(20),
  liquidaciones: generateObjets(20),
  cambioscxc: generateObjets(20),
  cambioscxp: generateObjets(20),
}
