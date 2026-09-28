import {useState} from 'react';
import {Header} from './Header'
import {Contents} from './contents/Contents';
import {SideBar} from './SideBar.tsx';
import {Modal} from './modal/Modal';
import './Main.css'


function App() {
  const [isShowSidebar,setIsShowSidebar] = useState(false)
  const toggleSidebar = ()=>{
    if (isShowSidebar){setIsSidebar(false)}else setIsShowSidebar(true)
  }
  eruda.init()
  return (
    <>
      <Header toggleSidebar={toggleSidebar}/>
      <SideBar isShowSidebar={isShowSidebar}/>
      <Modal/>
      <Contents/>
    </>
  )
}

export default App
