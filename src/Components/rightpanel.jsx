const RightPanel = () => {
  return (
    <div>
      <div role="tablist" className="tabs tabs-lifted">
        <input
          type="radio"
          name="rightpanel"
          role="tab"
          className="tab"
          aria-label="Llenado"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          Tab content 1
        </div>

        <input
          type="radio"
          name="rightpanel"
          role="tab"
          className="tab"
          aria-label="Visualizador"
          defaultChecked
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

export default RightPanel
