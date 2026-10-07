import { useState } from "react";
import { Record } from "./Record";
import { Category } from "./Category";
import { CustomItems } from "./CustomItems";
import "./Modal.css";
import { IoMdClose } from "react-icons/io";
export function Modal({
  toggleModal,
  toggleSidebar,
  typeModal,
  switchViewRec,
  addRecord,
  records,
  currectRecordId,
  setCurrentRecordId,
  deleteRecord,
}) {
  const [deleteRecordId, setDeleteRecordId] = useState(null);

  return (
    <div className="modal-container">
      {deleteRecordId && (
        <div className="confirmation-modal">
          <span>Are You Sure?</span>
          {/*<span>Note:Be Sure To Make Backup First</span>*/}
          <span className="to-delete-name">Deleting "untitled"</span>
          <div>
            <button
              onClick={() => {
                deleteRecord(deleteRecordId);
                setDeleteRecordId(null);
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                setDeleteRecordId(null);
              }}
            >
              No
            </button>
          </div>
        </div>
      )}

      <button
        className="close-btn-modal"
        onClick={() => {
          toggleModal(false);
        }}
      >
        <IoMdClose size="20" />
      </button>

      {typeModal === "record" && (
        <Record
          setDeleteRecordId={setDeleteRecordId}
          setCurrentRecordId={setCurrentRecordId}
          currectRecordId={currectRecordId}
          records={records}
          switchViewRec={switchViewRec}
          addRecord={addRecord}
        />
      )}
      {typeModal === "category" && <Category />}
      {typeModal === "custom-items" && <CustomItems />}
    </div>
  );
}
