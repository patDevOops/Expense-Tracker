import { useState } from "react";
import "./FormCard.css";
import { IoIosArrowDown } from "react-icons/io";

export function FormCard({ isShowForm ,records}) {
  const [isShowMoreForm, setIsShowMoreForm] = useState(false);
  const expandMoreForm = () => {
    setIsShowMoreForm(isShowMoreForm ? false : true);
  };
  const [isPickItem, setIspickItem] = useState(false);
  const pickItem = () => {
    setIspickItem(isPickItem ? false : true);
  };
  const [form,setForm] = useState({
    name:"",
    totalPrice:"",
    category:"",
    date:"",
    time:"",
    pricePerQty:"",
    quantity:""
  })

  const inputForm = (event)=>{
    const {name, value} = event.target;

    setForm((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  const inputNumForm = (event)=>{
    const {name, value} = event.target;

    setForm((prev)=>({
      ...prev,
      [name]:value === "" ? "" : Number(value)
    }))
  }

  return (
    <>
      {isShowForm && (
        <div className="form-cont">
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
                {isPickItem && <div className="pick-item-generated">
                  <div>
                    <span>candy</span>
                    <div className="pick-item-gen-description">
                      <span>food</span>
                      <span>₱1.00</span>
                    </div>
                  </div>
                  <div>
                    <span>milk</span>
                    <div className="pick-item-gen-description">
                      <span>food</span>
                    </div>
                  </div>
                </div>}
                
                <IoIosArrowDown 
                  size="23"
                  className="item-pick-arrow"
                  onClick={pickItem}/>
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
                value={form.totalPrice}
                onChange={inputNumForm}
                type="number"
              />
            </div>

            <div className="form form-row">
              <label className="label">Category</label>
              <select 
                
                className="form-input">
                <option>Milk</option>
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
                    onChange={inputForm}/>
                </div>
                <div className="form-time form">
                  <label className="label">Time</label>
                  <input 
                    name="time"
                    value={form.time}
                    type="time"
                    className="form-input more-form-input"
                    onChange={inputForm}/>
                </div>
              </div>
              <div className="row-container">
                <div className="form form-price-each">
                  <label className="label">Price(each)</label>
                  <input 
                    name="pricePerQty"
                    value={form.pricePerQty}
                    className="form-input"
                    onChange={inputNumForm}/>
                </div>

                <div className="form form-quantity">
                  <label className="label">Quantity</label>
                  <div className="form-quantity-input-cont">
                    <button className="form-quan-btn">-</button>

                    <input
                      name="quantity"
                      value={form.quantity}
                      type="number"
                      placeholder="1"
                      className="form-input more-form-input"
                      onChange={inputNumForm}
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
