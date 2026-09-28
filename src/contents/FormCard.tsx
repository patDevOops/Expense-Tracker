import { useState } from "react";
import "./FormCard.css";
import { IoIosArrowDown } from "react-icons/io";

export function FormCard({ isShowForm }) {
  const [isShowMoreForm, setIsShowMoreForm] = useState(false);
  const expandMoreForm = () => {
    if (isShowMoreForm) {
      setIsShowMoreForm(false);
    } else setIsShowMoreForm(true);
  };
  return (
    <>
      {isShowForm && (
        <div className="form-cont">
          <div className="form-name form">
            <label className="label">Item Name</label>
            <div className="form-input-name-cont">
              <input
                placeholder="Item Name"
                className="form-input form-input-name"
              />
              <IoIosArrowDown size="23" className="item-pick-arrow" />
            </div>
          </div>

          <div className="form-price">
            <div className="form form-row">
              <label className="label">Total Price</label>
              <input
                placeholder="price"
                className="form-input form-input-price"
              />
            </div>

            <div className="form form-row">
              <label className="label">Category</label>
              <select className="form-input">
                <option>Milk</option>
              </select>
            </div>
          </div>

          {isShowMoreForm && (
            <div className="more-form">
              <div className="row-container">
                <div className="form form-date">
                  <label className="label">Date</label>
                  <input className="form-input more-form-input" type="date" />
                </div>
                <div className="form-time form">
                  <label className="label">Time</label>
                  <input type="time" className="form-input more-form-input" />
                </div>
              </div>
              <div className="row-container">
                <div className="form form-price-each">
                  <label className="label">Price(each)</label>
                  <input className="form-input" />
                </div>

                <div className="form form-quantity">
                  <label className="label">Quantity</label>
                  <div className="form-quantity-input-cont">
                    <button className="form-quan-btn">-</button>

                    <input
                      type="number"
                      placeholder="1"
                      className="form-input more-form-input"
                    />
                    <button className="form-quan-btn">+</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="form-btns">
            <button onClick={expandMoreForm}>
              <IoIosArrowDown size="22" />
            </button>
            <button>Add</button>
          </div>
        </div>
      )}
    </>
  );
}
