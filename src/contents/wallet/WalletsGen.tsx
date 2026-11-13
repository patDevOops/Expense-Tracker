import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { CiTrash } from "react-icons/ci";
export function WalletsGen({setToDeleteWalletRecordId,confirmModalRef,wallet}) {
  
  return (
    <div
      className={`wallet-record ${wallet.amount >= 0 ? "background-green" : "background-red"}`}
    >
      <span
        className={`wallet-record-amount ${wallet.amount >= 0 ? "text-green" : "text-red"}`}
      >
        <p>{wallet.amount >= 0 ? <FaPlus /> : <FaMinus />}</p>
        <p>₱{wallet.amount > 0 ? wallet.amount.toFixed(2) : wallet.amount.toFixed(2)* -1}</p>
      </span>
      <span className="wallet-record-detail">{wallet.details}</span>
      <span className="wallet-record-date">{wallet.date}</span>
      <span
        onClick={() => {
          setToDeleteWalletRecordId(wallet.id);
          confirmModalRef.current?.showModal();
        }}
        className="wallet-record-delete"
      >
        <CiTrash />
      </span>
    </div>
  );
}
