import "./FormCard.css";
import { IoIosArrowDown } from "react-icons/io";
export function FormCard() {
  return (
    <div className="form-cont">
      <div className="form-name form">
        <label className="label">Name</label>
        <input placeholder="Item Name" />
      </div>

      <div className="form-price form">
        <label className="label">Price₱</label>
        <input placeholder="price" />
      </div>

      <div className="more-form">
        <div className="form">
          <label className="label">Category</label>
          <select></select>
        </div>

        <div className="form">
          <label className="label">Quantity</label>
          <div>
            <button>+</button>
          <input type="number" placeholder="each(optional)" />
          <button>-</button>
          </div>         
        </div>
        <button>
          <IoIosArrowDown/>
        </button>

        <div className="form">
          <label className="label">Date</label>
          <input />
        </div>
      </div>
      <div>
        <button>Add</button>
      </div>
    </div>
  );
}
