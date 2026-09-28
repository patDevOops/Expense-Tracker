import {Record} from './Record';
import './Modal.css';
import { IoMdClose } from "react-icons/io";
export function Modal() {
  return(
    <div className="modal-container">
      <button className="close-btn-modal"><IoMdClose size="20"/></button>
      <Record/>
    </div>
  )
}