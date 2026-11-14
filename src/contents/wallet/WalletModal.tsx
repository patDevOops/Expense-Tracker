import { useState, useRef, useEffect } from "react";
import { IoMdCheckmark } from "react-icons/io";
import dayjs from "dayjs";
import { useClickOutside } from "../../utils/useClickOutside.tsx";
import { WalletsGen } from "./WalletsGen";
import { IoMdArrowDropup } from "react-icons/io";
import { GoMultiSelect } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
export function WalletModal({
  wallets,
  totalWalletMoney,
  addWalletRecord,
  deleteWalletRecord,
  removeWalletId,
  onClose,
}) {
  const [isOpenDateDropdown, setIsOpenDateDropdown] = useState(false);
  const [selectedWalletDate, setSelectedWalletDate] = useState("2026-10");
  const [toDeleteWalletRecordId, setToDeleteWalletRecordId] = useState(null);
  const [walletForm, setWalletForm] = useState({
    amount: "",
    details: "",
    date: "",
    "wallet-money-action": "add",
  });

  const [isToggleBtn, setIsToggleBtn] = useState({
    addMoney: false,
    editMoney: false,
  });
  const toggleBtn = (type: string) => {
    if (type === "a") {
      setIsToggleBtn(
        isToggleBtn.addMoney
          ? { editMoney: false, addMoney: false }
          : { editMoney: false, addMoney: true },
      );
    } else {
      setIsToggleBtn(
        isToggleBtn.editMoney
          ? { addMoney: false, editMoney: false }
          : { addMoney: false, editMoney: true },
      );
    }
  };
  const inputForm = (event) => {
    let { value, name } = event.target;
    if (name === "amount") {
      value = Number(value);
    }
    if (name === "amount" && !Number(value)) {
      value = "";
    }
    setWalletForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const confirmModalRef = useRef<HTMLDialogElement>(null);
  const filterDateRef = useRef<HTMLDivElement>(null);

  useClickOutside(filterDateRef, () => setIsOpenDateDropdown(false));

  wallets.sort((a, b) => {
    return dayjs().diff(a.date) - dayjs().diff(b.date);
  });

  const walletDates: string[] = [];
  wallets.forEach((wallet) => {
    const formatedDate = dayjs(wallet.date).format("YYYY-MM");
    if (!walletDates.includes(formatedDate)) {
      walletDates.push(formatedDate);
    }
  });

  if(selectedWalletDate!=="all"){
    wallets = wallets.filter(a => dayjs(a.date).format('YYYY-MM')===selectedWalletDate)
  }
  return (
    <div className="wallet-modal">
      {(isToggleBtn.addMoney || isToggleBtn.editMoney) && (
        <div
          className="barrier-wallet-form"
          onClick={() => {
            setIsToggleBtn({ addMoney: false, editMoney: false });
          }}
        ></div>
      )}

      <dialog
        className="wallet-confirm-modal"
        ref={confirmModalRef}
        onClose={onClose}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            confirmModalRef.current?.close(); // click sa backdrop
          }
        }}
      >
        <div>
          <p>Delete This Records?</p>
          <div className="wallet-confirm-modal-btn-cont">
            <button
              onClick={() => {
                deleteWalletRecord(toDeleteWalletRecordId);
                removeWalletId(toDeleteWalletRecordId);
                confirmModalRef.current?.close();
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                confirmModalRef.current?.close();
              }}
            >
              No
            </button>
          </div>
        </div>
      </dialog>

      <div className="wallet-modal-head">
        <div className="wallet-modal-summary">
          <p>₱{totalWalletMoney.toFixed(2)}</p>
          <div className="wallet-btn-cont">
            {/*<div
              onClick={() => {
                toggleBtn("b");
              }}
              className="wallet-btn-edit-money"
            >
              <LuPencil />
            </div>*/}
            <div
              onClick={() => {
                toggleBtn("a");
              }}
              className="wallet-btn-add-money"
            >
              <FaPlus />
            </div>
          </div>
        </div>

        {isToggleBtn.addMoney && (
          <div className="wallet-form-add-money">
            <div className="wallet-form-toggle-method">
              <FaPlus />
              <span>Add money</span>
            </div>
            <div
              className="wallet-form-money-action"
              role="group"
              aria-label="Wallet money action"
            >
              <label className="wallet-form-money-action-option">
                <input
                  onChange={inputForm}
                  type="radio"
                  name="wallet-money-action"
                  value="add"
                  defaultChecked
                />
                <span className="wallet-form-money-action-choice wallet-form-money-action-add">
                  <FaPlus />
                  <span>Add to wallet</span>
                </span>
              </label>

              <label className="wallet-form-money-action-option">
                <input
                  onChange={inputForm}
                  type="radio"
                  name="wallet-money-action"
                  value="subtract"
                />
                <span className="wallet-form-money-action-choice wallet-form-money-action-subtract">
                  <FaMinus />
                  <span>Subtract from wallet</span>
                </span>
              </label>
            </div>
            <div className="wallet-form-input-amount">
              <label className="wallet-form-input-label">Amount</label>
              <input
                type="number"
                name="amount"
                onChange={inputForm}
                value={walletForm.amount}
                className="wallet-form-input"
              />
            </div>
            <div className="wallet-form-input-details">
              <label className="wallet-form-input-label">Details</label>
              <input
                name="details"
                value={walletForm.details}
                onChange={inputForm}
                className="wallet-form-input"
              />
            </div>
            <div className="wallet-form-input-date">
              <label className="wallet-form-input-label">Date</label>
              <input
                name="date"
                type="date"
                onChange={inputForm}
                value={walletForm.date}
                className="wallet-form-input"
              />
            </div>
            <div className="wallet-form-add-money-btn-cont">
              <button
                onClick={() => {
                  if (!walletForm.amount) return;
                  addWalletRecord({
                    id: crypto.randomUUID(),
                    details: walletForm.details ? walletForm.details : "---",
                    date: walletForm.date
                      ? walletForm.date
                      : dayjs().format("YYYY-MM-D"),
                    amount:
                      walletForm["wallet-money-action"] === "add"
                        ? walletForm.amount
                        : walletForm.amount * -1,
                  });
                  setIsToggleBtn({
                    addMoney: false,
                    editMoney: false,
                  });
                  setWalletForm({
                    amount: "",
                    details: "",
                    date: "",
                    "wallet-money-action": "add",
                  });
                }}
                className="wallet-form-add-money-btn"
              >
                Proceed
              </button>
            </div>
          </div>
        )}

        {/*isToggleBtn.editMoney && (
          <div className="wallet-form-edit-money">
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
          </div>
        )*/}
      </div>

      <div>
        <div className="wallet-row-details">
          <div ref={filterDateRef} className="wallet-dropdown-date">
            <div
              className="wallet-dropdown-date-toggle"
              onClick={() => {
                setIsOpenDateDropdown(!isOpenDateDropdown);
              }}
            >
              <span className="wallet-dropdown-date-toggle-text">{selectedWalletDate!=='all'?dayjs(selectedWalletDate).format('YYYY-MMMM'):'All'}</span>
              <span className="wallet-icon-dropdown">
                <IoMdArrowDropup 
                  className={`${isOpenDateDropdown&&'arrow-rotate-180deg'}`}
                  size="17" />
              </span>
            </div>
            
            {isOpenDateDropdown && (
              <div className="wallet-dropdown-date-filter">
                {walletDates.map((walletDate) => {
                  return (
                    <p
                      onClick={()=>{
                        setSelectedWalletDate(walletDate)
                        setIsOpenDateDropdown(false)
                      }}
                      className={`${selectedWalletDate === walletDate && "selected"}`}
                    >
                      {dayjs(walletDate).format('YYYY-MMMM')} {selectedWalletDate === walletDate &&<IoMdCheckmark size={16} />}
                    </p>
                  );
                })}
                <p 
                  onClick={()=>{
                    setSelectedWalletDate('all')
                    setIsOpenDateDropdown(false)
                  }}
                  className={`${selectedWalletDate === "all" && "selected"}`}>All {selectedWalletDate === "all" &&<IoMdCheckmark size={16} />}</p>
              </div>
            )}
          </div>

          <span>Amount</span>
          <span>Details</span>
          <span>Date</span>
          <span>
            <GoMultiSelect size="15" />
          </span>
        </div>

        <div className="wallet-records-gen">
          {wallets.map((wallet) => {
            return (
              <>
                <WalletsGen
                  key={wallet.id}
                  wallet={wallet}
                  setToDeleteWalletRecordId={setToDeleteWalletRecordId}
                  confirmModalRef={confirmModalRef}
                />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
