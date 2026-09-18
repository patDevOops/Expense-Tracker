import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import './Category.css'
export function Category(){
  return(
    <div className="category">
      <FaArrowLeft className="arrow-btn"/>
       <div className="category-name">Food</div>
      <FaArrowRight className="arrow-btn"/>
    </div>
  )
}