import { useState } from "react";
import { FaWallet } from "react-icons/fa";
import { WalletModal } from "./WalletModal";
import { Barrier } from "../../components/barrier.tsx";
import "./Wallet.css";
import type { WalletType } from "../../App.tsx";
type WalletProps = {
  wallet: WalletType[];
};
export function Wallet({ wallets }: WalletProps) {
  const [isShowWalletModal, setIsShowWalletModal] = useState(false);
  const totalWalletMoney: number = wallets
    .reduce((acc, current) => {
      return (acc += current.amount);
    }, 0)
    .toFixed(2);
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
          <div className="wallet-budget">₱{totalWalletMoney}</div>
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
        <WalletModal wallets={wallets} totalWalletMoney={totalWalletMoney} />
      )}
    </div>
  );
}
