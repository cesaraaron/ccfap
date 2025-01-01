import { auxiliares } from "../../datamodel"

export function getFaNumbers(str) {
  const regex = /\bfa(\d{2,3})/i // Match "fa" or "FA" followed by 2-3 digits and capture the digits
  const match = str.match(regex)
  return match ? match[1] : null
}

export const createDateFromString = (str = "") => {
  const [day, month, year] = str.split("/").map(Number)
  return new Date(year, month - 1, day)
}

export const isValidDate = (value) => {
  try {
    const [day, month, year] = value.split("/").map(Number)
    const date = new Date(year, month - 1, day)

    // Check if the components match after parsing
    return (
      date.getDate() === day &&
      date.getMonth() === month - 1 &&
      date.getFullYear() === year
    )
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return false
  }
}

export const getCxpFaWithName = (name) => {
  const faValues = Object.values(auxiliares["CXP Farmacias"])
  const resultArr = faValues.filter(
    (v) => v.includes("Farmacias del Ahorro") && v.includes(name),
  )
  console.log("resultarr: ", name)
  return resultArr.length > 0 ? resultArr[0] : ""
}

export const areObjectsEqual = (obj1, obj2) => {
  // If one is null or undefined, and the other is not, they are not equal
  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    return false
  }

  // Get all keys from both objects
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) {
    return false
  }

  // Check if each key has the same value in both objects
  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false
    }

    // Recursively compare nested objects
    if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
      if (!areObjectsEqual(obj1[key], obj2[key])) {
        return false
      }
    }
  }

  return true
}

export const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

export const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value)
}

export const generateId = () => {
  return String(Math.round(Math.random() * 1000000))
}

export const hasAnyChar = (str = "") => {
  return /./.test(str)
}

export const hasFAInIt = (str) => {
  const regex = /\bfa\d{2,3}/i // Match "fa" or "FA" followed by 2-3 digits

  return regex.test(str)
}

export const getFAString = (str = "") => {
  const regex = /\bfa\d{2,3}/i // Match "fa" or "FA" followed by 2-3 digits

  const match = str.match(regex)

  return match.length > 0 ? match[0] : null
}

export const getFANameWithString = (str) => {
  const faNumbers = getFaNumbers(str)

  if (faNumbers === null) return null

  return "Farmacias Del Ahorro " + faNumbers
}

export const processDataFromClipboard = (params, updateState) => {
  const data = [...params.data]

  const emptyLastRow =
    data[data.length - 1][0] === "" && data[data.length - 1].length === 1

  if (emptyLastRow) {
    data.splice(data.length - 1, 1)
  }

  const lastIndex = params.api.getDisplayedRowCount() - 1
  const focusedCell = params.api.getFocusedCell()
  const focusedIndex = focusedCell.rowIndex

  if (focusedIndex + data.length - 1 > lastIndex) {
    const resultLastIndex = focusedIndex + (data.length - 1)
    const numRowsToAdd = resultLastIndex - lastIndex
    const rowsToAdd = []
    for (let i = 0; i < numRowsToAdd; i++) {
      const index = data.length - 1
      const row = data.slice(index, index + 1)[0]
      // Create row object
      const rowObject = {}
      let currentColumn = focusedCell.column
      row.forEach((item) => {
        if (!currentColumn) {
          return
        }
        rowObject[currentColumn.colDef.field] = item
        rowObject["id"] = generateId()
        currentColumn = params.api.getDisplayedColAfter(currentColumn)
      })
      rowsToAdd.push(rowObject)
    }
    updateState(rowsToAdd)
    params.api.applyTransaction({ add: rowsToAdd })
  }
  return data
}
