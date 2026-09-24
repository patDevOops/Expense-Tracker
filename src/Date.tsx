import "./Date.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
export function Date() {
  return (
    <div className="date-container">
      <div className="current-record-cont">
        <div className="record-info-cont">
          <div className="edge-title">Current Record</div>
          <div className="record-name">untitled</div>
        </div>
        <div className="arrow-expand-cont arrow-expand-cont-left">
          <IoIosArrowForward size="21" color="orange" />
        </div>
      </div>

      <div className="date">
        <div className="month">September</div>
        <div className="year">2026</div>
      </div>

      <div className="total-expense-cont">
        <div className="arrow-expand-cont">
          <IoIosArrowBack color="orange" size="21" />
        </div>
        <div className="record-info-cont">
          <div className="edge-title">Total Expense</div>
          <div className="item-all-sum">₱75.00</div>
        </div>
      </div>
    </div>
  );
}
