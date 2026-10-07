import { useState } from "react";
import "./Record.css";
export function Record({
  switchViewRec,
  addRecord,
  records,
  currentRecordId,
  setCurrentRecordId,
  setDeleteRecordId,
}) {
  const [recordNameInput, setRecordNameInput] = useState("");
  const [selectedRec, setSelectedRec] = useState(null);
  const inputNameRecord = (event) => {
    const { value } = event.target;
    if (value.length >= 9) return;
    setRecordNameInput(value);
  };
  return (
    <>
      <div className="modal-title">Create Record</div>

      <div className="record-input-cont">
        <input
          onChange={inputNameRecord}
          value={recordNameInput}
          placeholder="Record Name"
          className="modal-input-rec"
        />
        <button
          onClick={() => {
            addRecord(recordNameInput);
            setRecordNameInput("");
          }}
        >
          Create
        </button>
      </div>

      <div className="record-gen">
        {records.map((record) => {
          return (
            <div
              onClick={() => {
                setSelectedRec(record.id);
              }}
              key={record.id}
            >
              <span className="record-gen-name">{record.name}</span>
              <div className="record-gen-description">
                <span>{record.createdAt}</span>
                <span>{record.status}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="record-btn-container">
        {selectedRec && (
          <button
            onClick={() => {
              setDeleteRecordId(selectedRec);
            }}
            className="delete"
          >
            delete
          </button>
        )}
        <div>
          {selectedRec && (
            <button
              onClick={() => {
                setCurrentRecordId(selectedRec);
              }}
              className="view"
            >
              view
            </button>
          )}
        </div>
      </div>
    </>
  );
}
