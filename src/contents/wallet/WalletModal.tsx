import{useState} from "react";
import{Barrier}from"../../components/barrier.tsx"
import { IoMdArrowDropup } from "react-icons/io";
import { GoMultiSelect } from "react-icons/go";
import { CiTrash } from "react-icons/ci";
import { LuPencil } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
export function WalletModal(){
  const [isToggleBtn,setIsToggleBtn] = useState({
    addMoney:false,
    editMoney:false
  });
  const toggleBtn=(type:string)=>{
    if(type==="a"){
      setIsToggleBtn(isToggleBtn.addMoney?{...isToggleBtn,addMoney:false}:{...isToggleBtn,addMoney:true})
    }else{
      setIsToggleBtn(isToggleBtn.editMoney?{...isToggleBtn,editMoney:false}:{...isToggleBtn,editMoney:true})
    }
  }
  return(
    <div className="wallet-modal">
      {(isToggleBtn.addMoney||isToggleBtn.editMoney) && (
        <div
          className="barrier-wallet-form"
          onClick={() => {
            setIsToggleBtn({addMoney:false,editMoney:false})
          }}
        ></div>
      )}

      <div className="wallet-modal-head">
        <div className="wallet-modal-summary">
          <p>₱65.00</p>
          <div className="wallet-btn-cont">
            {!isToggleBtn.addMoney&&<div
              onClick={()=>{
                toggleBtn("b")
              }}
              className="wallet-btn-edit-money">
              <LuPencil />
            </div>}
            <div
              onClick={()=>{
                toggleBtn("a")
              }}
              className="wallet-btn-add-money">
              <FaPlus />
            </div>
          </div>
        </div>

        {isToggleBtn.addMoney&&<div className="wallet-form-add-money">
          <div className="wallet-form-toggle-method">
            <FaPlus />
            <span>Add money</span>
          </div>
          <div className="wallet-form-input-amount">
            <label className="wallet-form-input-label">Amount</label>
            <input className="wallet-form-input" />
          </div>
          <div className="wallet-form-input-details">
            <label className="wallet-form-input-label">Details</label>
            <input className="wallet-form-input" />
          </div>
          <div className="wallet-form-input-date">
            <label className="wallet-form-input-label">Date</label>
            <input className="wallet-form-input" />
          </div>
          <div className="wallet-form-add-money-btn-cont">
            <button className="wallet-form-add-money-btn">Add</button>
          </div>
        </div>}

        {isToggleBtn.editMoney&&<div className="wallet-form-edit-money">
          <div className="wallet-form-edit-heading">
            <LuPencil />
            <span>Edit money</span>
          </div>
          <div className="wallet-input-money-amount-cont">
            <label className="wallet-form-input-label">Money Amount</label>
            <input className="wallet-form-input" />
          </div>
          <div className="wallet-input-details-cont">
            <label className="wallet-form-input-label">Details</label>
            <input className="wallet-form-input" />
          </div>
          <div className="wallet-edit-btn-save-cont">
            <button>Save</button>
          </div>
        </div>}
      </div>

      <div>
        <div className="wallet-row-details">
          <span className="wallet-dropdown-date">
            <span>All</span>
            <span className="wallet-icon-dropdown">
              <IoMdArrowDropup size="17" />
            </span>
          </span>
          <span>Amount</span>
          <span>Details</span>
          <span>Date</span>
          <span>
            <GoMultiSelect size="15" />
          </span>
        </div>

        <div className="wallet-records-gen">
          <div className="wallet-record">
            <span className="wallet-record-amount">+₱900.00</span>
            <span className="wallet-record-detail">salary on my bank</span>
            <span className="wallet-record-date">2026-10-08</span>
            <span className="wallet-record-delete">
              <CiTrash />
            </span>
          </div>
          <div className="wallet-record">
            <span className="wallet-record-amount">-₱10.00</span>
            <span className="wallet-record-detail">expense on ulam</span>
            <span className="wallet-record-date">2026-10-08</span>
            <span className="wallet-record-delete">
              <CiTrash />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
