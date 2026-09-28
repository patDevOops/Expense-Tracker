import "./SideBar.css";
import { BiCategory } from "react-icons/bi";
import { CiViewList } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosPaper } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
export function SideBar({ isShowSidebar }) {
  return (
    <>
      {isShowSidebar && (
        <div className="sidebar">
          <div>
            <span><IoMdAdd /></span>
            <span>New Record</span>
          </div>
          <div>
            <span><IoIosPaper /></span>
            <span>My Record</span>
          </div>
          <div>
            <span><IoIosAddCircleOutline /></span>
            <span>Add Items</span>
          </div>
          <div>
            <span><CiViewList /></span>
            <span>View Items</span>
            
          </div>
          <div>
            <span><BiCategory color="white"/></span>
            <span>Add Category</span>
          </div>
        </div>
      )}
    </>
  );
}
