import './FloatingButtons.css'
import { BiCategory } from "react-icons/bi";
export function FloatingButtons(){
  return(
    <div className="floating-btn">
      <button>+</button>
      <button><BiCategory /></button>
    </div>
  )
}