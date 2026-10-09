import { useState } from "react";
import "./CustomItems.css";
import { GoKebabHorizontal } from "react-icons/go";
import { GoPencil } from "react-icons/go";
import { CiTrash } from "react-icons/ci";
export function CustomItems({
  category,
  addCustomItem,
  saveEditCustomItem,
  deleteCustomItem,
  customItems,
}) {
  const [isViewMenu, setIsViewMenu] = useState(false);
  const toggleMenu = () => {
    setIsViewMenu(isViewMenu ? false : true);
  };
  const [customItemInput, setCustomItemInput] = useState({
    name: "",
    price: "",
    categoryId: "",
  });

  const inputItem = (event) => {
    let { name, value } = event.target;
    //name is price
    if (name === "price") {
      value = Number(value);
      if (!value) {
        setCustomItemInput((prev) => ({
          ...prev,
          [name]: "",
        }));
        return;
      }
      setCustomItemInput((prev) => ({
        ...prev,
        [name]: value,
      }));
      return;
    }

    setCustomItemInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <div className="modal-title">Create Custom Items</div>

      <div className="record-input-cont custom-item-input-cont">
        <div className="name-custom">
          <label>Item Name</label>
          <input
            onChange={inputItem}
            value={customItemInput.name}
            name="name"
            placeholder=".eg"
            className="modal-input-rec"
          />
        </div>
        <div className="price-custom">
          <label>Price</label>
          <input
            onChange={inputItem}
            value={customItemInput.price}
            name="price"
            placeholder="(optional)"
            className="modal-input-rec"
          />
        </div>
        <select
          onChange={inputItem}
          value={customItemInput.category}
          name="category"
          className="modal-input-rec"
        >
          {category.map((categoryVal) => {
            return (
              <option key={categoryVal.id} value={categoryVal.id}>
                {categoryVal.categoryName}
              </option>
            );
          })}
        </select>
        <button
          onClick={() => {
            const {name,categoryId,price} = customItemInput;
            if(!name || !price) return;
            addCustomItem({
              ...customItemInput,
              category: categoryId ? categoryId: category[0],
              id:crypto.randomUUID(),
            });
          }}
        >
          Add
        </button>
      </div>

      <div className="custom-item-gen">
        
        <div>
          <span>
            <p>Milk</p>
            <p className="custom-item-category">Food</p>
          </span>
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
          <span>
            <p>shoes</p>
            <p className="custom-item-category">Things</p>
          </span>
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
  );
}
