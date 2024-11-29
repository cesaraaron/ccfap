import React from "react"
import { HotTable } from "@handsontable/react"

const data = [
  ["Honda", "Toyota", "Nissan", "Ford"],
  ["2019", 10, 11, 13],
  ["2020", 20, 11, 14],
]

function App() {
  return (
    <div>
      <HotTable
        data={data}
        colHeaders={true}
        contextMenu={true}
        rowHeaders={true}
        manualColumnResize={true}
        licenseKey="non-commercial-and-evaluation"
      />
    </div>
  )
}

export default App
