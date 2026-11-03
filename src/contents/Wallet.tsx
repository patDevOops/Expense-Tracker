import "./Wallet.css";
import { FaWallet } from "react-icons/fa";
import { GoMultiSelect } from "react-icons/go";
import { IoMdArrowDropup } from "react-icons/io";
import { CiTrash } from "react-icons/ci";
import { LuPencil } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
export function Wallet() {
  return (
    <div className="wallet">
      <div className="wallet-info">
        <div>
          <FaWallet className="wallet-icon" />
        </div>
        <div>
          <div className="wallet-budget">₱65.00</div>
          <div className="wallet-link">manage wallet</div>
        </div>
      </div>
      
      <div className="wallet-modal">
        <div className="wallet-modal-head">
          <p>₱65.00</p>
          <div className="wallet-btn-cont">
            <button className="wallet-btn-edit-money"><LuPencil/>
            </button>
            <button className="wallet-btn-add-money"><FaPlus/></button>
          </div>
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
              <GoMultiSelect size="15"/>
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
          </div>
        </div>
      </div>
    </div>
  );
}
