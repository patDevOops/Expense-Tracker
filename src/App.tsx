import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Contents } from "./contents/Contents";
import { SideBar } from "./SideBar.tsx";
import { Modal } from "./modal/Modal";
import "./Main.css";
import { Barrier } from "./components/barrier.tsx";
function App() {
  const [typeModal, setTypeModal] = useState(null);
  //Modal
  const [isShowModal, setIsShowModal] = useState(false);

  const renderTypeModal = (type) => {
    setTypeModal(type);
  };
  const toggleModal = (bool) => {
    if (bool !== undefined) {
      setIsShowModal(bool);
      return;
    }
    if (isShowModal) {
      setIsShowModal(false);
    } else setIsShowModal(true);
  };

  //for sidebar hamburger menu toggle
  const [isShowSidebar, setIsShowSidebar] = useState(false);

  const toggleSidebar = (bool) => {
    if (bool !== undefined) {
      setIsShowSidebar(bool);
      return;
    }
    if (isShowSidebar) {
      setIsSidebar(false);
    } else setIsShowSidebar(true);
  };
  useEffect(() => {
    eruda.init();
  });

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />

      <Barrier a={isShowModal} b="barrier" c={setIsShowModal} />
      <Barrier a={isShowSidebar} b="barrier" c={setIsShowSidebar} />

      <SideBar
        isShowSidebar={isShowSidebar}
        toggleModal={toggleModal}
        toggleSidebar={toggleSidebar}
        renderTypeModal={renderTypeModal}
      />

      {isShowModal && <Modal toggleModal={toggleModal} typeModal={typeModal} />}

      <Contents />
    </>
  );
}

export default App;
