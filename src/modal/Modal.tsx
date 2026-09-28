import {Record} from './Record';
import './Modal.css';
import { IoMdClose } from "react-icons/io";
export function Modal({toggleModal,toggleSidebar}) {
  return(
    <div className="modal-container">
      <button 
        className="close-btn-modal"
        onClick={()=>{
          toggleModal(false);
        }}><IoMdClose size="20"/></button>
      <Record/>
    </div>
  )
}