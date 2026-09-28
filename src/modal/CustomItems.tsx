import {useState} from 'react';
import './CustomItems.css';
import { GoKebabHorizontal } from "react-icons/go";
import { GoPencil } from "react-icons/go";
import { CiTrash } from "react-icons/ci";
export function CustomItems() {
  const [isViewMenu,setIsViewMenu] = useState(false)
  const toggleMenu = () => {
    setIsViewMenu(isViewMenu ? false : true);
  };
  return(
    <>
      <div className="modal-title">Create Custom Items</div>
      <div className="record-input-cont custom-item-input-cont">
        <input className="modal-input-rec" />
        <select className="modal-input-rec">
          <option>Food</option>
        </select>
        <button>Add</button>
      </div>
      <div className="custom-item-gen">
        
        <div>
          <span>Milk</span>
          <span className="category-menu-container">
            <GoKebabHorizontal size="19" onClick={toggleMenu} />

            {isViewMenu && (
              <div className="select-menu">
                <p>
                  <GoPencil />
                  edit
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
          <span>Candy</span>
          <span className="category-menu-container">
            <GoKebabHorizontal size="19" onClick={toggleMenu} />

            {isViewMenu && (
              <div className="select-menu">
                <p>
                  <GoPencil />
                  edit
                </p>
                <p>
                  <CiTrash />
                  delete
                </p>
              </div>
            )}
          </span>
        </div>
        
      </div>
    </>
  )
}