import {Record} from './Record';
import {Category} from './Category';
import {CustomItems} from './CustomItems';
import './Modal.css';
import { IoMdClose } from "react-icons/io";
export function Modal({toggleModal,toggleSidebar,typeModal}) {
  return(
    <div className="modal-container">
      <button 
        className="close-btn-modal"
        onClick={()=>{
          toggleModal(false);
        }}><IoMdClose size="20"/></button>
      
      {typeModal === "record" && <Record/>}
      {typeModal === "category" && <Category/>}
      {typeModal === "custom-items" && <CustomItems/>}
    </div>
  )
}