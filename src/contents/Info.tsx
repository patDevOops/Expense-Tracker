import { useState } from "react";
import "./Info.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
type InfoProps = {
  totalPrice: number;
  recordName: string | undefined;
};
export function Info({ totalPrice, recordName }: InfoProps) {
  // The only values stored here are the two string keys used by includes().
  const [listToggle, setListToggle] = useState<string[]>([]);
  const toggle = (val: string) => {
    if (listToggle.includes(val)) {
      setListToggle(listToggle.filter((a) => val !== a));
    } else {
      setListToggle([...listToggle, val]);
    }
  };
  return (
    <div className="info-container">
      <div className="current-record-cont">
        {listToggle.includes("current-record") && (
          <div className="record-info-cont">
            <div className="edge-title">Viewing Record</div>
            <div className="record-name">
              {recordName || "No Record Selected"}
            </div>
          </div>
        )}
        <div
          className="arrow-expand-cont arrow-expand-cont-left"
          onClick={() => {
            toggle("current-record");
          }}
        >
          <IoIosArrowForward 
            color="orange"
            className={`${listToggle.includes("current-record") ? "arrow-rotate":"arrow-unrotate"}`}
            size="21" />
        </div>
        
      </div>

      <div className="total-expense-cont">
        <div
          className="arrow-expand-cont"
          onClick={() => {
            toggle("total-expense");
          }}
        >
          <IoIosArrowBack 
            className={`${listToggle.includes("total-expense") ? "arrow-rotate":"arrow-unrotate"}`}
            color="orange" size="21" />
        </div>
        {listToggle.includes("total-expense") && (
          <div className="record-info-cont">
            <div className="edge-title">This Month Expenses</div>
            <div className="item-all-sum">₱{totalPrice.toFixed(2)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
