import { CiMenuBurger } from "react-icons/ci";
import "./Header.css";

export function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <header>
      <div className="hamburger-icon-con" onClick={toggleSidebar}>
        <CiMenuBurger className="hamburger-icon" />
      </div>
      <div className="title">Expense Tracker</div>
    </header>
  );
}
