import { useState } from "react";
import { FaWallet } from "react-icons/fa";
import { WalletModal } from "./WalletModal";
import { Barrier } from "../../components/barrier.tsx";
import "./Wallet.css";
import type { WalletType } from "../../App.tsx";
type WalletProps = {
  wallets: WalletType[];
  addWalletRecord: (newWalletRecord: WalletType) => void;
  deleteWalletRecord: (id: string) => void;
  removeWalletId: (walletId: string) => void;
};
export function Wallet({
  wallets,
  addWalletRecord,
  deleteWalletRecord,
  removeWalletId,
}: WalletProps) {
  const [isShowWalletModal, setIsShowWalletModal] = useState(false);
  const totalWalletMoney: number = wallets.reduce((acc, current) => {
    return (acc += current.amount);
  }, 0);
  return (
    <div className="wallet">
      <Barrier
        a={isShowWalletModal}
        b="barrier-wallet-modal"
        c={setIsShowWalletModal}
      />
      <div className="wallet-info">
        <div>
          <FaWallet className="wallet-icon" />
        </div>
        <div>
          <div className="wallet-budget">₱{totalWalletMoney.toFixed(2)}</div>
          <div
            onClick={() => {
              setIsShowWalletModal(true);
            }}
            className="wallet-link"
          >
            manage wallet
          </div>
        </div>
      </div>

      {isShowWalletModal && (
        <WalletModal
          removeWalletId={removeWalletId}
          deleteWalletRecord={deleteWalletRecord}
          wallets={wallets}
          totalWalletMoney={totalWalletMoney}
          addWalletRecord={addWalletRecord}
        />
      )}
    </div>
  );
}
