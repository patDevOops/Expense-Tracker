import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import './Date.css'
export function Date(){
  return(
    <div className="date-year-month-cont">
      <button className="arrow-btn-cont">
        <FaArrowLeft 
        className="arrow-btn"
        size="20"
        color="white"/>
      </button>
      
       <div className="date-year-name">
         <div>September 2026</div>
       </div>
      <button className="arrow-btn-cont">
        <FaArrowRight 
        className="arrow-btn"
        size="20"
        color="white"/>
      </button>
    </div>
  )
}