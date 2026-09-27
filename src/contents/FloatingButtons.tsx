import './FloatingButtons.css'
import { BiCategory } from "react-icons/bi";
export function FloatingButtons({toggleForm}){
  return(
    <div className="floating-btn">
      <button><BiCategory color="white"/></button>
      <button onClick={toggleForm}>+</button>
    </div>
  )
}