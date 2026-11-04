import {useState} from "react";
import { FaWallet } from "react-icons/fa";
import{WalletModal}from"./WalletModal";
import {Barrier} from "../../components/barrier.tsx";
import "./Wallet.css";
export function Wallet() {
  const [isShowWalletModal,setIsShowWalletModal]=useState(false)
  return (
    <div className="wallet">
      <Barrier a={isShowWalletModal} b="barrier-wallet-modal" c={setIsShowWalletModal}/>
      <div className="wallet-info">
        <div>
          <FaWallet className="wallet-icon" />
        </div>
        <div>
          <div className="wallet-budget">₱65.00</div>
          <div 
            onClick={()=>{setIsShowWalletModal(true)}}
            className="wallet-link">manage wallet</div>
        </div>
      </div>

      {isShowWalletModal&&<WalletModal/>}
    </div>
  );
}
