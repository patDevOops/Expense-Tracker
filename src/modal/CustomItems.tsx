import { useState } from "react";
import { Barrier } from "../components/barrier.tsx";
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
  const [editingCustomItem, setEditingCustomItem] = useState(null);

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
  const editCustomItem = (toEditItem) => {
    setIsViewMenu(false);
    const { name, categoryId, price, id } = toEditItem;
    if (editingCustomItem == id) {
      setEditingCustomItem(false);
      clearInput();
      return;
    } else setEditingCustomItem(id);

    setCustomItemInput({
      name,
      categoryId,
      price,
      id,
    });
  };
  function clearInput() {
    setCustomItemInput({
      name: "",
      price: "",
      categoryId: category[0].id,
    });
  }
  const renderCategoryName = (id) => {
    return category.find((a) => a.id == id)?.categoryName;
  };
  return (
    <>
      <Barrier b="barrier-menu-custom-item" a={isViewMenu} c={setIsViewMenu} />
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
          value={customItemInput.categoryId}
          name="categoryId"
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
            const { name, categoryId, price } = customItemInput;
            if (!name) return;

            if (editingCustomItem) {
              saveEditCustomItem({
                ...customItemInput,
                categoryId: categoryId ? categoryId : category[0]?.id,
              });
              setEditingCustomItem(false);
              clearInput();
              return;
            }

            addCustomItem({
              ...customItemInput,
              categoryId: categoryId ? categoryId : category[0]?.id,
              id: crypto.randomUUID(),
            });
            clearInput();
          }}
        >
          {editingCustomItem ? "Save" : "Add"}
        </button>
      </div>

      <div className="custom-item-gen">
        {customItems.map((customItem) => {
          return (
            <div key={customItem.id}>
              <span>
                <p>{customItem.name}</p>
                <div className="custom-item-details">
                  {renderCategoryName(customItem.categoryId) &&
                  <p className="custom-item-category">
                    {renderCategoryName(customItem.categoryId)}
                  </p>
                  }
                  <p>
                    {customItem.price
                      ? `\u20B1${customItem.price.toFixed(2)}`
                      : ""}
                  </p>
                </div>
              </span>
              <span className="category-menu-container">
                <GoKebabHorizontal
                  size="19"
                  onClick={() => {
                    setIsViewMenu(customItem.id);
                  }}
                />

                {isViewMenu === customItem.id && (
                  <div className="select-menu">
                    <p
                      onClick={() => {
                        editCustomItem(customItem);
                      }}
                    >
                      <GoPencil />
                      {editingCustomItem == customItem.id
                        ? "cancel edit"
                        : "edit"}
                    </p>
                    <p
                      onClick={() => {
                        deleteCustomItem(customItem.id);
                        setIsViewMenu(false);
                      }}
                    >
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
