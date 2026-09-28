import "./SideBar.css";
import { BiCategory } from "react-icons/bi";
import { CiViewList } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosPaper } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
export function SideBar({ isShowSidebar,toggleModal,toggleSidebar,renderTypeModal }) {
  return (
    <>
      {isShowSidebar && (
        <div className="sidebar">
          <div onClick={()=>{
          toggleModal(true);
          toggleSidebar(false)
          renderTypeModal('record')
          }}>
            <span><IoIosPaper /></span>
            <span>Record</span>
          </div>
          
          <div onClick={()=>{
          toggleModal(true);
          toggleSidebar(false)
          
          renderTypeModal('custom-items')
          }}>
            <span><CiViewList /></span>
            <span>Custom Items</span>
          </div>
          
          <div onClick={()=>{
          toggleModal(true);
          toggleSidebar(false)
          
          renderTypeModal('category')
          }}>
            <span><BiCategory color="white"/></span>
            <span>Add Category</span>
          </div>
        </div>
      )}
    </>
  );
}
