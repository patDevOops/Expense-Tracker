import {useState} from 'react';
import "./Info.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
export function Info({totalPrice,recordName}) {
  const [listToggle,setListToggle] = useState([])
  const toggle = (val)=>{
    if (listToggle.includes(val)){
      setListToggle(listToggle.filter((a)=> val !== a))
    } else{
      setListToggle([...listToggle,val])
    }
  }
  return (
    <div className="info-container">
      <div className="current-record-cont">
        {listToggle.includes("current-record") && <div className="record-info-cont">
          <div className="edge-title">Current Record</div>
          <div className="record-name">{recordName || 'No Record Selected'}</div>
        </div>}
        <div 
          className="arrow-expand-cont arrow-expand-cont-left"
          onClick={()=>{toggle('current-record')}}>
          <IoIosArrowForward size="21" color="orange" />
        </div>
      </div>

      <div className="total-expense-cont">
        <div 
          className="arrow-expand-cont"
          onClick={()=>{toggle('total-expense')}}>
          <IoIosArrowBack color="orange" size="21" />
        </div>
        {listToggle.includes("total-expense") &&<div className="record-info-cont">
          <div className="edge-title">This Month Expenses</div>
          <div className="item-all-sum">₱{totalPrice.toFixed(2)}</div>
        </div>}
      </div>
      
    </div>
  );
}
