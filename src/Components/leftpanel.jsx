import { HotTable } from "@handsontable/react"

const LeftPanel = () => {
  return (
    <HotTable
      data={[[1, 2, 3]]}
      colHeaders={true}
      contextMenu={true}
      rowHeaders={true}
      manualColumnResize={true}
      licenseKey="non-commercial-and-evaluation"
    />
  )
}

export default LeftPanel
