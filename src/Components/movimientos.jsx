import Depositos from "./depositos"

const LeftPanel = (props) => {
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
            <Depositos {...props} />
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
