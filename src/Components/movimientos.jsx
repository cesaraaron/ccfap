import Depositos from "./depositos"

const LeftPanel = (props) => {
  return (
    <div className="flex ">
      <div role="tablist" className="tabs tabs-bordered w-full">
        <input
          type="radio"
          name="movimientos_tabs"
          role="tab"
          className="tab"
          aria-label="Depositos"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content p-2">
          <Depositos {...props} />
        </div>

        <input
          type="radio"
          name="movimientos_tabs"
          role="tab"
          className="tab"
          aria-label="Liquidaciones"
        />
        <div role="tabpanel" className="tab-content p-10">
          Tab content 2
        </div>
      </div>
    </div>
  )
}

export default LeftPanel
