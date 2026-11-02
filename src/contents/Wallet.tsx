import "./Wallet.css";
import { FaWallet } from "react-icons/fa";
export function Wallet(){
  return(
    <div className="wallet">
      <div>
        <FaWallet className="wallet-icon"/>
      </div>

      <div>
        <p className="wallet-title">My Wallet</p>
      <div className="wallet-budget">₱65.00</div>
      <div className="wallet-link">manage wallet</div>
      </div>
    </div>
  )
}