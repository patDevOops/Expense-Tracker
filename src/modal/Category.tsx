import { useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { GoPencil } from "react-icons/go";
import { CiTrash } from "react-icons/ci";
import "./Category.css";
export function Category() {
  const [isFindMenu, setIsFindMenu] = useState(false);
  const toggleMenu = () => {
    setIsFindMenu(isFindMenu ? false : true);
  };
  return (
    <>
      <div className="modal-title">
        viewing category for{" "}
        <span className="record-name-highlighted">untitled</span>
      </div>
      <div className="record-input-cont">
        <input className="modal-input-rec" />
        <button>Add</button>
      </div>
      <div className="category-gen">
        <div>
          <span>Food</span>
          <span className="category-menu-container">
            <GoKebabHorizontal size="19" onClick={toggleMenu} />

            {isFindMenu && (
              <div className="select-menu">
                <p>
                  <GoPencil />
                  rename
                </p>
                <p>
                  <CiTrash />
                  delete
                </p>
              </div>
            )}
          </span>
        </div>
        
        <div>
          <span>Things</span>
          <span className="category-menu-container">
            <GoKebabHorizontal size="19" />
          </span>
        </div>
      </div>
    </>
  );
}
