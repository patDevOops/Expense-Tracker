import dayjs from 'dayjs';
import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Contents } from "./contents/Contents";
import { SideBar } from "./SideBar.tsx";
import { Modal } from "./modal/Modal";
import "./Main.css";
import { Barrier } from "./components/barrier.tsx";
type Record = {
  name: string;
  id: string;
  createdAt: string;
  status: string;
  items: [];
};
function App() {
  const [records, setRecords] = useState<Record[]>([
    {
      name: "untitled",
      id: "123",
      createdAt: "2026-09-20",
      status: "local",
      items: [
        {
          name: "Chooe",
          id: "88",
          createdAt: "2026-07-22 11:22 AM",
          quantity: 2,
          price: 15,
          category: "098",
          totalPrice: 30,
        },
        {
          name: "Milk",
          id: "111",
          createdAt: "2026-09-22 11:22 AM",
          quantity: 2,
          price: 15,
          category: "098",
          totalPrice: 30,
        },
        {
          name: "Candy",
          id: "112",
          createdAt: "2026-09-23 11:30 AM",
          quantity: 5,
          price: 1,
          category: "765",
          totalPrice: 5,
        },
        {
          name: "ulam",
          id: "113",
          createdAt: "2026-09-22 1:30 PM",
          quantity: 1,
          price: 40,
          category: "098",
          totalPrice: 40,
        },
      ],
    },
  ]);
  const addRecord = (name)=>{
    setRecords([...records,{
      name,
      id:crypto.randomUUID(),
      createdAt:dayjs().format('YYYY-MM-D'),
      status:'local',
      items:[]
    }])
  }
  const [typeModal, setTypeModal] = useState(null);
  //Modal
  const [isShowModal, setIsShowModal] = useState(false);

  const [currentRecordId, setCurrentRecordId] = useState("123");
  const switchViewRec = (id) => {
    setCurrentRecordId(id);
  };

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

      {isShowModal && (
        <Modal
          records={records}
          addRecord={addRecord}
          switchViewRec={switchViewRec}
          toggleModal={toggleModal}
          typeModal={typeModal}
        />
      )}

      <Contents 
        records={records}
        setRecords={setRecords}
        currentRecordId={currentRecordId} />
    </>
  );
}

export default App;
