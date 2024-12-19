function getFaNumbers(str) {
  const regex = /\bfa(\d{2,3})/i // Match "fa" or "FA" followed by 2-3 digits and capture the digits
  const match = str.match(regex)
  return match ? match[1] : null
}

export const isValidDate = (value) => {
  const date = new Date(value)
  return !isNaN(date.getTime()) // Check if the date is invalid (NaN)
}

export const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

export const generateId = () => {
  return String(Math.round(Math.random() * 1000000))
}

export const hasAnyChar = (str) => {
  return typeof str === "string" && /./.test(str)
}

export const hasFAInIt = (str) => {
  const regex = /\bfa\d{2,3}/i // Match "fa" or "FA" followed by 2-3 digits
  return regex.test(str)
}

export const getFANameWithString = (str) => {
  const faNumbers = getFaNumbers(str)

  if (faNumbers === null) return null

  return "Farmacias Del Ahorro " + faNumbers
}
