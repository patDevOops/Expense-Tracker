import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import './Category.css'
export function Category(){
  return(
    <div className="category">
      <button className="arrow-btn-cont">
        <FaArrowLeft 
        className="arrow-btn"
        size="20"
        color="white"/>
      </button>
      
       <div className="category-name">
         <div>Food</div>
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