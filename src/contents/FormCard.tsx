import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "./FormCard.css";
import { IoIosArrowDown } from "react-icons/io";
import { Barrier } from "../components/barrier.tsx";
export function FormCard({
  isShowForm,
  records,
  addItems,
  category,
  setIsShowForm,
  form,
  setForm,
  isEditingItem,
  saveItem,
  customItems,
}) {
  const [isShowMoreForm, setIsShowMoreForm] = useState(false);
  const expandMoreForm = () => {
    setIsShowMoreForm(isShowMoreForm ? false : true);
  };
  const [isPickItem, setIspickItem] = useState(false);
  const pickItem = () => {
    setIspickItem(isPickItem ? false : true);
  };

  const inputForm = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const inputNumForm = (event) => {
    const name = event.target.name;
    const value = !event.target.value ? "" : Number(event.target.value);
    setForm((prev) => ({
      ...prev,
      [name]: value ? value : "",
    }));
  };

  const clickBtnQty = (event) => {
    const { name } = event.target;
    setForm((prev) => ({
      ...prev,
      quantity: name === "increase" ? prev.quantity + 1 : prev.quantity - 1,
    }));
  };

  const addItemsForm = () => {
    if (!form.name || !form.totalPrice) return;
    addItems({
      ...form,
      quantity: form.quantity <= 0 ? 1 : form.quantity,
      createdAt: `${form.date ? form.date : dayjs().format("YYYY-MM-D")} ${form.time ? form.time : dayjs().format("h:mm A")}`,
      id: crypto.randomUUID(),
      totalPrice: form.price ? form.price * form.quantity : form.totalPrice,
      price: form.price ? form.price : 0,
    });
    console.log("form", form);
  };

  const pickCustomItem = (item) => {
    const { price, categoryId, name } = item;

    setForm((prev) => ({
      ...prev,
      quantity: 1,
      price: price,
      totalPrice: price,
      category: categoryId,
      name,
    }));
    setIspickItem(false);
  };
  const renderCategoryName = (id) => {
    return category.find((a) => a.id == id)?.categoryName;
  };

  return (
    <>
      <Barrier a={isShowForm} b="barrier-form" c={setIsShowForm} />

      {isShowForm && (
        <div className="form-cont">
          <Barrier a={isPickItem} b="barrier-pick-item" c={setIspickItem} />
          <div className="form-name form">
            <label className="label">Item Name</label>
            <div className="form-input-name-cont">
              <input
                name="name"
                placeholder="Item Name"
                className="form-input form-input-name"
                value={form.name}
                onChange={inputForm}
              />

              <div className="pick-item-container">
                {isPickItem && (
                  <div className="pick-item-generated">
                    {customItems.map((customItem) => {
                      const { name, price, categoryId } = customItem;
                      return (
                        <div
                          onClick={() => {
                            pickCustomItem({
                              name,
                              price,
                              categoryId,
                            });
                          }}
                          key={customItem.id}
                        >
                          <span>{customItem.name}</span>
                          <div className="pick-item-gen-description">
                            
                            {renderCategoryName(customItem.categoryId) && <span>
                              {renderCategoryName(customItem.categoryId)}
                            </span>}
                            <span>
                              {customItem.price
                                ? `\u20B1${customItem.price.toFixed(2)}`
                                : ""}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <IoIosArrowDown
                  size="23"
                  className="item-pick-arrow"
                  onClick={pickItem}
                />
              </div>
            </div>
          </div>

          <div className="form-price">
            <div className="form form-row">
              <label className="label">Total Price</label>
              <input
                name="totalPrice"
                placeholder="price"
                className="form-input form-input-price"
                value={
                  form.price ? form.price * form.quantity : form.totalPrice
                }
                onChange={inputNumForm}
                type="number"
              />
            </div>

            <div className="form form-row">
              <label className="label">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={inputForm}
                className="form-input"
              >
                {category.map((a) => {
                  return (
                    <option key={a.id} value={a.id}>
                      {a.categoryName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {isShowMoreForm && (
            <div className="more-form">
              <div className="row-container">
                <div className="form form-date">
                  <label className="label">Date</label>
                  <input
                    name="date"
                    value={form.date}
                    className="form-input more-form-input"
                    type="date"
                    onChange={inputForm}
                  />
                </div>
                <div className="form-time form">
                  <label className="label">Time</label>
                  <input
                    name="time"
                    value={form.time}
                    type="time"
                    className="form-input more-form-input"
                    onChange={inputForm}
                  />
                </div>
              </div>
              <div className="row-container">
                <div className="form form-price-each">
                  <label className="label">Price(each)</label>
                  <input
                    name="price"
                    value={form.price}
                    className="form-input"
                    onChange={inputNumForm}
                    placeholder="optional"
                  />
                </div>

                <div className="form form-quantity">
                  <label className="label">Quantity</label>
                  <div className="form-quantity-input-cont">
                    <button
                      name="decrease"
                      onClick={clickBtnQty}
                      className="form-quan-btn"
                    >
                      -
                    </button>

                    <input
                      name="quantity"
                      value={form.quantity}
                      type="number"
                      placeholder="1"
                      className="form-input more-form-input"
                      onChange={inputNumForm}
                    />
                    <button
                      name="increase"
                      onClick={clickBtnQty}
                      className="form-quan-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="form-btns">
            <button onClick={expandMoreForm}>
              <IoIosArrowDown size="22" />
            </button>
            <button
              onClick={() => {
                if (isEditingItem) {
                  saveItem();
                  return;
                }
                addItemsForm();
              }}
            >
              {isEditingItem ? "Save" : "Add"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
