import "./Items.css";
import { IoIosArrowBack } from "react-icons/io";

export function Items() {
  return (
    <div className="items">
      
      <div className="item-gen">
        <div className="item-name">
          <div>Milk</div>
          <div>2 x ₱15</div>
        </div>
        <div>₱30</div>
        <IoIosArrowBack />
      </div>
      
      <div className="item-gen">
        <div className="item-name">
          <div>Candy</div>
          <div>1 x ₱5</div>
        </div>
        <div>₱5</div>
        <IoIosArrowBack />
      </div>
      
      <div className="item-gen">
        <div className="item-name">
          <div>ulam</div>
          <div></div>
        </div>
        <div>₱40</div>
        <IoIosArrowBack />
      </div>
    </div>
  );
}
