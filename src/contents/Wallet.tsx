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
          {/*<div className="wallet-form-add-money">
            <div className="wallet-form-toggle-method">
              <FaPlus />
            </div>
            <div className="wallet-form-input-amount">
              <label className="wallet-form-input-label">Amount</label>
              <input className="wallet-form-input"/>
            </div>
            <div className="wallet-form-input-details">
              <label className="wallet-form-input-label">Details</label>
              <input className="wallet-form-input"/>
            </div>
            <div className="wallet-form-input-date">
              <label className="wallet-form-input-label">Date</label>
              <input className="wallet-form-input"/>
            </div>
            <div className="wallet-form-add-money-btn-cont">
              <button className="wallet-form-add-money-btn">add</button>
            </div>
          </div>*/}
          <div className="wallet-form-edit-money">
              <div className="wallet-input-money-amount-cont">
                <label className="wallet-form-input-label">Money Amount</label>
                <input className="wallet-form-input"/>
              </div>
              <div className="wallet-input-details-cont">
                <label className="wallet-form-input-label">Details</label>
                <input className="wallet-form-input"/>
              </div>
              <div className="wallet-edit-btn-save-cont">
                <button>Save</button>
              </div>
            </div>
          <p>₱65.00</p>
          <div className="wallet-btn-cont">
            <div className="wallet-btn-edit-money">
              <LuPencil />
            </div>
            <div className="wallet-btn-add-money">
              <FaPlus />
            </div>
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
    </div>
  );
}
