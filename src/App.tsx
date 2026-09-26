import {Header} from './Header'
import {Contents} from './contents/Contents';
import {SideBar} from './SideBar.tsx';
import './Main.css'


function App() {
  eruda.init()
  return (
    <>
      <Header />
      <SideBar/>
      <Contents/>
    </>
  )
}

export default App
