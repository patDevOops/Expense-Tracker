import "./Record.css";
export function Record() {
  return (
    <div>
      <div className="modal-title">Create Record</div>

      <div className="record-input-cont">
        <input className="modal-input-rec" />
        <button>Create</button>
      </div>
      
      <div className="record-gen">
        <div>
          <span className="record-gen-name">untitled</span>
          <div className="record-gen-description">
            <span>2026-09-19</span>
            <span>local</span>
          </div>
        </div>

        <div>
          <span className="record-gen-name">jayce</span>
          <div className="record-gen-description">
            <span>2026-09-15</span>
            <span>online</span>
          </div>
        </div>
      </div>

      <div className="record-btn-container">
        <button className="delete">delete</button>
        <div>
          <button className="close">close</button>
          <button className="view">view</button>
        </div>
      </div>
    </div>
  );
}
