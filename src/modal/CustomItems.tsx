import { useState } from "react";
import type { ChangeEvent } from "react";
import { Barrier } from "../components/barrier.js";
import "./CustomItems.css";
import { GoKebabHorizontal } from "react-icons/go";
import { GoPencil } from "react-icons/go";
import { CiTrash } from "react-icons/ci";
import type { Category, CustomItem } from "../App.js";
type CustomItemsProps = {
  category: Category[];
  addCustomItem: (newItem: CustomItem) => void;
  saveEditCustomItem: (editedItem: CustomItem) => void;
  deleteCustomItem: (id: string) => void;
  customItems: CustomItem[];
};
type customItemInputType = {
  name: string;
  price: "" | number;
  categoryId: string;
  // This field exists when editing an item; new items receive an ID on submit.
  id?: string;
};
export function CustomItems({
  category,
  addCustomItem,
  saveEditCustomItem,
  deleteCustomItem,
  customItems,
}: CustomItemsProps) {
  // The menu stores the selected custom-item ID or false when closed.
  const [isViewMenu, setIsViewMenu] = useState<string | false>(false);
  const [customItemInput, setCustomItemInput] = useState<customItemInputType>({
    name: "",
    price: "",
    categoryId: "",
  });
  const [editingCustomItem, setEditingCustomItem] = useState<
    null | boolean | string
  >(null);

  const inputItem = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = event.target;
    let value: string | number = event.target.value;
    //name is price
    if (name === "price") {
      value = Number(value);
      if (!value) {
        setCustomItemInput((prev) => ({
          ...prev,
          [name]: "",
        } as customItemInputType));
        return;
      }
      setCustomItemInput((prev) => ({
        ...prev,
        [name]: value,
      } as customItemInputType));
      return;
    }

    setCustomItemInput((prev) => ({
      ...prev,
      [name]: value,
    } as customItemInputType));
  };
  const editCustomItem = (toEditItem: CustomItem) => {
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
      categoryId: category[0]!.id, // Non-null assertion changes only TypeScript checking.
    });
  }
  const renderCategoryName = (id: string) => {
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
            const { name, categoryId } = customItemInput;
            if (!name) return;

            if (editingCustomItem) {
              // This assertion is only for TypeScript: edit mode already has the item ID.
              saveEditCustomItem({
                ...customItemInput,
                categoryId: categoryId ? categoryId : (category[0]?.id as string),
              } as CustomItem);
              setEditingCustomItem(false);
              clearInput();
              return;
            }

            addCustomItem({
              ...customItemInput,
              categoryId: categoryId ? categoryId : (category[0]?.id as string),
              id: crypto.randomUUID(),
            } as CustomItem);
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
                  {renderCategoryName(customItem.categoryId) && (
                    <p className="custom-item-category">
                      {renderCategoryName(customItem.categoryId)}
                    </p>
                  )}
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
