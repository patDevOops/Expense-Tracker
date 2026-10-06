import './FloatingButtons.css'
import { FaPlus } from "react-icons/fa6";

export function FloatingButtons({toggleForm}){
  return(
    <div className="floating-btn">
      <button onClick={toggleForm}>
        <FaPlus />
      </button>
    </div>
  )
}