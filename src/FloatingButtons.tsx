import './FloatingButtons.css'
import { BiCategory } from "react-icons/bi";
export function FloatingButtons(){
  return(
    <div className="floating-btn">
      <button><BiCategory /></button>
      <button>+</button>
    </div>
  )
}