import "./Items.css";
import { IoIosArrowBack } from "react-icons/io";

export function Items() {
  return (
    <div className="items">
      
      <div className="item-gen">
        <div className="item-name">
          <div>Milk</div>
          <span>2 x ₱15</span>
          <span>11:22AM</span>
        </div>
        <div>₱30</div>
        <IoIosArrowBack />
      </div>
      
      <div className="item-gen">
        <div className="item-name">
          <div>Candy</div>
          <span>5 x ₱1</span>
          <span>11:30AM</span>
        </div>
        <div>₱5</div>
        <IoIosArrowBack />
      </div>
      
      <div className="item-gen">
        <div className="item-name">
          <div>ulam</div>
          <span></span>
          <span>11:30AM</span>
        </div>
        <div>₱40</div>
        <IoIosArrowBack />
      </div>
    </div>
  );
}
