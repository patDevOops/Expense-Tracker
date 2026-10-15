import { useState } from "react";
import type { ReactNode } from "react";
import { Record } from "./Record.js";
import { CategoryCom } from "./Category.js";
import { CustomItems } from "./CustomItems.js";
import "./Modal.css";
import { IoMdClose } from "react-icons/io";
import { Barrier } from "../components/barrier.js";
import type { RecordType, Category, CustomItem } from "../App.js";
type ModalProps = {
  toggleModal: (bool: boolean) => void;
  typeModal: null | string;
  switchViewRec: (id: string) => void;
  addRecord: (name: string) => void;
  records: RecordType[];
  // The caller currently sends currentRecordId; keep the old misspelled prop optional for compatibility.
  currentRecordId: string;
  currectRecordId?: string;
  setCurrentRecordId: (a: string) => void;
  deleteRecord: (id: string) => void;
  category: Category[];
  deleteCustomItem: (id: string) => void;
  saveEditCustomItem: (editedItem: CustomItem) => void;
  addCustomItem: (newItem: CustomItem) => void;
  customItems: CustomItem[];
  addCategory: (newCategory: Category) => void;
  deleteCategory: (id: string) => void;
  renameCategory: (newName: Category) => void;
};
export function Modal({
  toggleModal,
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
}:ModalProps) {
  // A selected record is either a RecordType object or no selection.
  const [selectedRec, setSelectedRec] = useState<null | RecordType>(null);
  // false closes the confirmation layer; a string stores the selected record ID.
  const [deleteRecordId, setDeleteRecordId] = useState<null | string | false>(null);
  // Store the selected category object, or false/null when no confirmation is active.
  const [selectedCategoryDel, setSelectedCategoryDel] = useState<null | Category | false>(null);

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
              Deleting "{selectedRec!.name}"
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
            {console.log(selectedCategoryDel) as unknown as ReactNode}
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
          <CategoryCom
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
