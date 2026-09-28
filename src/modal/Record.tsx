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
        <div>untitled</div>
        <div>jayce</div>
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
