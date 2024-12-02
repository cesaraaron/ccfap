import { HotTable } from "@handsontable/react"

const LeftPanel = () => {
  return (
    <div>
      <div role="tablist" className="tabs tabs-lifted">
        <input
          type="radio"
          name="leftpanel"
          role="tab"
          className="tab"
          aria-label="Depositos"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <div className="flex">
            <div className="">
              <HotTable
                data={[[1, 2, 3]]}
                colHeaders={["Column 1", "Column 2", "Column 3"]}
                contextMenu={true}
                height={"25vh"}
                width={"40vw"}
                manualColumnResize={true}
                licenseKey="non-commercial-and-evaluation"
              />
            </div>
          </div>
        </div>

        <input
          type="radio"
          name="leftpanel"
          role="tab"
          className="tab"
          aria-label="Liquidaciones"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          Tab content 2
        </div>
      </div>
    </div>
  )
}

export default LeftPanel
