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
}) {
  return (
    <div className="modal-container">
      <div className="confirmation-modal">
        <span>Are You Sure?</span>
        <span>Delete "untitled"</span>
        <div>
          <button>Yes</button>
          <button>No</button>
        </div>
      </div>
      
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
