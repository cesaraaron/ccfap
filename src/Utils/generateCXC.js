import {
  hasAnyChar,
  isValidDate,
  hasFAInIt,
  getFANameWithString,
} from "./utils"

/**
 * Generates CXC for the FA deposits.
 *
 * @param {Array<import('./dataShape').Deposito>} data - An array of objects containing credit information.
 * @returns {Array<import('./dataShape').CambioCXC>} An array of objects after processing the input data.
 */

export const generateCreditosFA = (data) => {
  const mappedValues = data.map(
    ({
      id,
      fecha,
      monto,
      banco,
      cuentaOrigen,
      descripcion,
      subCuentaOrigen,
    }) => {
      // console.log("Inside generateCreditosFA, data: ", fecha)

      if (
        isValidDate(fecha) &&
        !isNaN(monto) &&
        monto > 0 &&
        hasAnyChar(cuentaOrigen) &&
        hasAnyChar(subCuentaOrigen) &&
        hasAnyChar(banco) &&
        hasFAInIt(descripcion)
      ) {
        const faName = getFANameWithString(descripcion)
        return {
          id: id,
          fecha: fecha,
          cuentaOrigen: "CXC Farmacias",
          subCuentaOrigen: faName,
          cuentaDestino: cuentaOrigen,
          subCuentaDestino: subCuentaOrigen,
          monto: monto,
          descripcion: descripcion,
        }
      }

      return false
    },
  )

  return [...mappedValues.filter((item) => item !== false)]
}

/**
 * Generates CXC for the FA deposits.
 *
 * @param {Array<import('./dataShape').CambioCXC>}  oldcxc of objects after processing the input data.
 * @param {Array<import('./dataShape').CambioCXC>}  newcxc of objects after processing the input data.
 * @returns {Array<import('./dataShape').CambioCXC>} An array of objects after processing the input data.
 *
 */
export const syncArrays = (oldcxc, newcxc) => {
  // Create a map for quick access to objects in arrayA by id
  const mappedOldcxc = new Map(oldcxc.map((obj) => [obj.id, obj]))
  const mappedNewcxc = new Map(newcxc.map((obj) => [obj.id, obj]))

  const intersectedcxc = newcxc.filter((obj) => mappedOldcxc.has(obj.id))
  const validIntersectedcxc = generateCreditosFA(intersectedcxc)

  const offsetcxc = oldcxc.filter((obj) => !mappedNewcxc.has(obj.id))
  // const result = [...oldcxc.filter((o) => !mappedNewcxc.has(o.id))]
  const result = [...offsetcxc, ...validIntersectedcxc]

  // Update objects in arrayB based on matching ids from arrayA
  newcxc.forEach((objB) => {
    if (mappedOldcxc.has(objB.id)) {
      result.push({ ...objB })
    }
  })

  newcxc.forEach((obj) => {
    if (!mappedOldcxc.has(obj.id)) {
      result.push(obj)
    }
  })

  return result
}
