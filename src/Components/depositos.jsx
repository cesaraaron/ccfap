import { HotTable } from "@handsontable/react"
import { auxiliares, depositos } from "../../datamodel"
import { useState } from "react"

export default function Depositos() {
  const [state, setState] = useState([[]])
  const depositosHeaders = [
    "Fecha",
    "Cuenta Origen",
    "Subcuenta Origen",
    "Banco",
    "Monto",
    "Descripcion",
    "Referencia",
  ]

  const statusOptions = depositos.reduce((acc, key) => {
    acc[key] = auxiliares[key]
    return acc
  }, {})

  const getDropdownOptions = (row) => {
    const status = state[row][1] // Get the value from column B (index 1)
    return status ? statusOptions[status] : [] // Return options based on selected status
  }

  return (
    <div className="">
      <HotTable
        data={state}
        colHeaders={depositosHeaders}
        columns={[
          {
            data: 0,
            type: "date",
            dateFormat: "DD-MM-YYYY",
            correctFormat: true,
          },
          { data: 1, type: "dropdown", source: depositos },
          {
            data: 3,
            type: "dropdown",
            source: (row) => getDropdownOptions(row),
          },
        ]}
        contextMenu={true}
        height={"25vh"}
        width={"100vw"}
        manualColumnResize={true}
        licenseKey="non-commercial-and-evaluation"
        afterChange={(changes) => {
          if (changes) {
            changes.forEach(([row, prop]) => {
              if (prop === "1") {
                // When status is changed
                // Keep the "Options" column (index 2) in sync with the Status dropdown
                setState((prevData) => {
                  const newData = [...prevData]
                  newData[row][2] = "" // Reset dependent dropdown value
                  return newData
                })
              }
            })
          }
        }}
        onAfterChange={(changes) => {
          if (changes) {
            setState((prevData) => {
              const newData = [...prevData]
              changes.forEach(([row, prop, , newValue]) => {
                newData[row][prop] = newValue // Update data based on user input
              })
              return newData
            })
          }
        }}
      />
    </div>
  )
}
