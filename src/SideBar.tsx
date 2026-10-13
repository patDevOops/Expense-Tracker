import "./SideBar.css";
import { BiCategory } from "react-icons/bi";
import { CiViewList } from "react-icons/ci";
import { IoIosPaper } from "react-icons/io";

type SidebarProp = {
  isShowSidebar:boolean;
  toggleModal:(bool:boolean)=>void;
  toggleSidebar:(bool:boolean)=>void;
  renderTypeModal:(type:string)=>void;
}
export function SideBar({ isShowSidebar,toggleModal,toggleSidebar,renderTypeModal }:SidebarProp) {
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
            <span>Category</span>
          </div>
        </div>
      )}
    </>
  );
}
