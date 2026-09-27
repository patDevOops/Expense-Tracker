import { useState } from "react";
import "./FormCard.css";
import { IoIosArrowDown } from "react-icons/io";

export function FormCard({isShowForm}) {
  
  return (
    <>
      {isShowForm && <div className="form-cont">
        <div className="form-name form">
          <label className="label">Name</label>
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
            <label className="label">Price₱</label>
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

        <div className="more-form">
          <div className="form form-date">
            <label className="label">Date</label>
            <input className="form-input more-form-input" type="date" />
          </div>

          <div className="row-container">
            <div className="form form-time">
              <label className="label">Time</label>
              <input className="form-input" type="time" />
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

        <div className="form-btns">
          <button>
            <IoIosArrowDown size="22" />
          </button>
          <button>Add</button>
        </div>
      </div>}
    </>
  );
}
