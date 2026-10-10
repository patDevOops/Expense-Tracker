import { useState } from "react";
import { Record } from "./Record";
import { Category } from "./Category";
import { CustomItems } from "./CustomItems";
import "./Modal.css";
import { IoMdClose } from "react-icons/io";
import { Barrier } from "../components/barrier.tsx";
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
  category,
  deleteCustomItem,
  saveEditCustomItem,
  addCustomItem,
  customItems,
  addCategory,
  deleteCategory,
  renameCategory,
}) {
  const [selectedRec, setSelectedRec] = useState(null);
  const [deleteRecordId, setDeleteRecordId] = useState(null);

  return (
    <div className="modal-container">
      <Barrier
        a={deleteRecordId}
        b="barrier-confirm-modal"
        c={setDeleteRecordId}
      />
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
                setSelectedRec(null);
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
          setSelectedRec={setSelectedRec}
          selectedRec={selectedRec}
          toggleModal={toggleModal}
          setDeleteRecordId={setDeleteRecordId}
          setCurrentRecordId={setCurrentRecordId}
          currectRecordId={currectRecordId}
          records={records}
          switchViewRec={switchViewRec}
          addRecord={addRecord}
        />
      )}
      {typeModal === "category" && (
        <Category
          addCategory={addCategory}
          renameCategory={renameCategory}
          deleteCategory={deleteCategory}
          category={category}
        />
      )}
      {typeModal === "custom-items" && (
        <CustomItems
          customItems={customItems}
          saveEditCustomItem={saveEditCustomItem}
          deleteCustomItem={deleteCustomItem}
          addCustomItem={addCustomItem}
          category={category}
        />
      )}
    </div>
  );
}
