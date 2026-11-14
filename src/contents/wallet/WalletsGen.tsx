import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { CiTrash } from "react-icons/ci";
import { IoIosRadioButtonOff } from "react-icons/io";
import { IoIosRadioButtonOn } from "react-icons/io";
import type { WalletType } from "../../App";
type WalletsGenProps = {
  setToDeleteWalletRecordId: (value: string) => void;
  confirmModalRef: HTMLDialogElement;
  wallet: WalletType;
  isMultiSelected: boolean;
  toDeleteSelecteds: string[];
  setToDeleteSelecteds: (value: string) => void;
};
export function WalletsGen({
  setToDeleteWalletRecordId,
  confirmModalRef,
  wallet,
  isMultiSelected,
  toDeleteSelecteds,
  setToDeleteSelecteds,
}: WalletsGenProps) {
  return (
    <div
      className={`wallet-record ${wallet.amount >= 0 ? "background-green" : "background-red"}`}
    >
      <span
        className={`wallet-record-amount ${wallet.amount >= 0 ? "text-green" : "text-red"}`}
      >
        <p>{wallet.amount >= 0 ? <FaPlus /> : <FaMinus />}</p>
        <p>
          ₱
          {wallet.amount > 0
            ? wallet.amount.toFixed(2)
            : wallet.amount.toFixed(2) * -1}
        </p>
      </span>
      <span className="wallet-record-detail">{wallet.details}</span>
      <span className="wallet-record-date">{wallet.date}</span>
      <div>
        {isMultiSelected ? (
          <span
            onClick={() => {
              if (toDeleteSelecteds.includes(wallet.id)) {
                setToDeleteSelecteds((prevToDelete) =>
                  prevToDelete.filter((a) => a !== wallet.id),
                );
              } else {
                setToDeleteSelecteds((prevToDelete) => [
                  ...prevToDelete,
                  wallet.id,
                ]);
              }
            }}
          >
            {!toDeleteSelecteds.includes(wallet.id) ? (
              <span className="wallet-multi-selected-icons">
                <IoIosRadioButtonOff />
              </span>
            ) : (
              <span className="wallet-multi-selected-icons">
                <IoIosRadioButtonOn />
              </span>
            )}
          </span>
        ) : (
          <span
            onClick={() => {
              setToDeleteWalletRecordId(wallet.id);
              confirmModalRef.current?.showModal();
            }}
            className="wallet-record-delete"
          >
            <CiTrash />
          </span>
        )}
      </div>
    </div>
  );
}
