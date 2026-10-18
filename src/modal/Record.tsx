import { useState } from "react";
import type { ChangeEvent } from "react";
import "./Record.css";
import type { RecordType } from "../App.js";
type RecordModalProps = {
  // Passed by Modal in the original code but not used in this component.
  switchViewRec?: (id: string) => void;
  // Passed by Modal in the original code but not used in this component.
  currectRecordId?: string;
  addRecord: (name: string) => void;
  records: RecordType[];
  setCurrentRecordId: (id:string)=>void;
  setDeleteRecordId: (a: string) => void;
  toggleModal: (bool: boolean) => void;
  selectedRec: null | RecordType;
  setSelectedRec: (a: null | RecordType) => void;
};
export function Record({
  addRecord,
  records,
  setCurrentRecordId,
  setDeleteRecordId,
  toggleModal,
  selectedRec,
  setSelectedRec,
}: RecordModalProps) {
  const [recordNameInput, setRecordNameInput] = useState<string>("");

  const inputNameRecord = (event: ChangeEvent<HTMLInputElement>) => {
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
            if (!recordNameInput) return;
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
              /* Type-only cast preserves the original comparison and runtime behavior. */
              id={(selectedRec?.id as unknown as string) === record.id ? "border-highlight" : ""}
              onClick={() => {
                setSelectedRec(record);
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
              setDeleteRecordId(selectedRec.id);
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
                setCurrentRecordId(selectedRec.id);
                toggleModal(false);
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
