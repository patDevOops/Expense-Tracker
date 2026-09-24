import "./Items.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
export function Items() {
  return (
    <div className="items">
      <div className="item-date">
        <div>Sept 20</div>
        <IoIosArrowDown size="15"/>
      </div>
      <div className="item-gen">
        <div className="item-name">
          <div>Milk</div>
          <span className="item-price-calc">2 x ₱15.00</span>
          <span>11:22AM</span>
        </div>
        
        <div className="item-total-price">₱30.00</div>
        
        <IoIosArrowBack className="item-arrow"/>
      </div>
      
      <div className="item-gen">
        <div className="item-name">
          <div>Candy</div>
          <span className="item-price-calc">5 x ₱1.00</span>
          <span>11:30AM</span>
        </div>
        <div className="item-total-price">₱5.00</div>
        <IoIosArrowBack className="item-arrow"/>
      </div>
      
      <div className="item-date">
        <div>Sept 21</div>
        <IoIosArrowDown size="15"/>
      </div>
      <div className="item-gen">
        <div className="item-name">
          <div>ulam</div>
          <span className="item-price-calc">1 x ₱40.00</span>
          <span>11:30AM</span>
        </div>
        <div className="item-total-price">₱40.00</div>
        <IoIosArrowBack className="item-arrow"/>
      </div>
    </div>
  );
}
