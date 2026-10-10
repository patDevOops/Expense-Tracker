import { useState } from "react";
import {Barrier} from '../components/barrier.tsx';
import { GoKebabHorizontal } from "react-icons/go";
import { GoPencil } from "react-icons/go";
import { CiTrash } from "react-icons/ci";
import "./Category.css";
export function Category({ category }) {
  const [isFindMenu, setIsFindMenu] = useState(false);
  
  return (
    <>
      <Barrier a={isFindMenu} b="barrier-category" c={setIsFindMenu}/>
      <div className="modal-title">
        viewing category for{" "}
        <span className="record-name-highlighted">untitled</span>
      </div>
      <div className="record-input-cont">
        <input className="modal-input-rec" />
        <button>Add</button>
      </div>
      <div className="category-gen">
        {category.map((categoryVal) => {
          return (
            <div key={categoryVal.id}>
              <span>{categoryVal.categoryName}</span>
              <span className="category-menu-container">
                <GoKebabHorizontal size="19" onClick={()=>{setIsFindMenu(categoryVal.id)}} />

                {isFindMenu == categoryVal.id && (
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
          );
        })}
      </div>
    </>
  );
}
