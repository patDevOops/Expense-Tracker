import { useState } from "react";
import { Barrier } from "../components/barrier.tsx";
import { GoKebabHorizontal } from "react-icons/go";
import { GoPencil } from "react-icons/go";
import { CiTrash } from "react-icons/ci";
import "./Category.css";
export function Category({
  category,
  deleteCategory,
  renameCategory,
  addCategory,
  setSelectedCategoryDel,
}) {
  const [isFindMenu, setIsFindMenu] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [categoryNameInput, setCategoryNameInput] = useState("");
  const inputCategoryName = (event) => {
    console.log(event.target.value);
    setCategoryNameInput(event.target.value);
  };
  return (
    <>
      <Barrier a={isFindMenu} b="barrier-category" c={setIsFindMenu} />
      <div className="modal-title">
        viewing category for{" "}
        <span className="record-name-highlighted">untitled</span>
      </div>
      <div className="record-input-cont">
        <input
          placeholder="category name"
          value={categoryNameInput}
          onChange={inputCategoryName}
          className="modal-input-rec"
        />
        <button
          onClick={() => {
            if (!categoryNameInput) return;
            if (isEditingCategory) {
              renameCategory({
                categoryName: categoryNameInput,
                id: isEditingCategory,
              });
              setIsEditingCategory(false);
            } else {
              addCategory({
                categoryName: categoryNameInput,
                id: crypto.randomUUID(),
              });
            }
            setCategoryNameInput("");
          }}
        >
          {isEditingCategory ? "Save" : "Add"}
        </button>
      </div>
      <div className="category-gen">
        {category.map((categoryVal) => {
          return (
            <div key={categoryVal.id}>
              <span>{categoryVal.categoryName}</span>
              <span className="category-menu-container">
                <GoKebabHorizontal
                  size="19"
                  onClick={() => {
                    setIsFindMenu(categoryVal.id);
                  }}
                />

                {isFindMenu == categoryVal.id && (
                  <div className="select-menu">
                    <p
                      onClick={() => {
                        if (isEditingCategory) {
                          setIsEditingCategory(false);
                          setCategoryNameInput("");
                        } else {
                          setIsEditingCategory(categoryVal.id);

                          setCategoryNameInput(categoryVal.categoryName);
                        }
                        setIsFindMenu(false);
                      }}
                    >
                      <GoPencil />
                      {isEditingCategory ? "cancel" : "rename"}
                    </p>
                    <p onClick={() => {
                          setSelectedCategoryDel(categoryVal);
                        }}>
                      <CiTrash
                      />
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
