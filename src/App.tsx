import {Header} from './Header'
import {Contents} from './Contents';
import {SideBar} from './SideBar.tsx';
import './Main.css'


function App() {
  eruda.init()
  return (
    <>
      <SideBar/>
      <Header />
      <Contents/>
    </>
  )
}

export default App
