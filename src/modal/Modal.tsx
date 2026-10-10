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
  const [selectedCategoryDel, setSelectedCategoryDel] = useState(null);

  return (
    <>
      <Barrier
        a={deleteRecordId}
        b="barrier-confirm-modal"
        c={setDeleteRecordId}
      />
      <div className="modal-container">
        <Barrier
          a={selectedCategoryDel}
          b="barrier-confirm-modal"
          c={setSelectedCategoryDel}
        />
        {deleteRecordId && (
          <div className="confirmation-modal">
            <span>Are You Sure?</span>
            {/*<span>Note:Be Sure To Make Backup First</span>*/}
            <span className="to-delete-name">
              Deleting "{selectedRec.name}"
            </span>
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
        {selectedCategoryDel && (
          <div className="confirmation-modal">
            <span>Are You Sure?</span>
            {/*<span>Note:Be Sure To Make Backup First</span>*/}
            {console.log(selectedCategoryDel)}
            <span className="to-delete-name">
              Deleting "{selectedCategoryDel.categoryName}" Category
            </span>
            <div>
              <button
                onClick={() => {
                  deleteCategory(selectedCategoryDel.id);
                  setSelectedCategoryDel(null);
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setSelectedCategoryDel(null);
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
            setSelectedCategoryDel={setSelectedCategoryDel}
            addCategory={addCategory}
            renameCategory={renameCategory}
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
    </>
  );
}
