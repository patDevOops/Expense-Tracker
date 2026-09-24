import "./Date.css";
import { IoIosArrowBack } from "react-icons/io";
export function Date() {
  return (
    <div className="date-container">
      <div className="current-record-cont">
        
        <div>
          <div className="edge-title">Current Record</div>
          <div className="record-name">untitled</div>
        </div>
        <div className="arrow-expand-cont">
          <IoIosArrowBack/>
        </div>
      </div>

      <div className="date">
        <div className="month">September</div>
        <div className="year">2026</div>
      </div>

      <div className="total-expense">
        <div className="arrow-expand-cont">
          <IoIosArrowBack/>
        </div>
        <div>
          <div className="edge-title">Total Expense</div>
        <div className="item-all-sum">₱75.00</div>
        </div>
        
      </div>
    </div>
  );
}
