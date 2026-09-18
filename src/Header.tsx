import { CiMenuBurger } from "react-icons/ci";
import './Header.css';

export function Header(){
  return(
    <header>
      <div className="hamburger-icon-con">
        <CiMenuBurger className="hamburger-icon"/>
      </div>
      <div className="title">Expense Tracker</div>
    </header>
  )
}