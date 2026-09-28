import "./SideBar.css";
import { BiCategory } from "react-icons/bi";
import { CiViewList } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosPaper } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
export function SideBar({ isShowSidebar,toggleModal,toggleSidebar }) {
  return (
    <>
      {isShowSidebar && (
        <div className="sidebar">
          <div onClick={()=>{
          toggleModal(true);
          toggleSidebar(false)
          }}>
            <span><IoIosPaper /></span>
            <span>Record</span>
          </div>
          
          <div>
            <span><CiViewList /></span>
            <span>Custom Items</span>
            
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
