import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useRecords } from "./hooks/records/useRecords.ts";
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
  const [isEditingItem, setIsEditingItem] = useState(false);
  const {
    records,
    addRecord,
    deleteRecord,
    addCustomItem,
    deleteCustomItem,
    saveEditCustomItem,
    renameCategory,
    addCategory,
    deleteCategory,
    addItems,
    removeItems,
    saveItem,
  } = useRecords(matchRec, setIsEditingItem, clearForm);

  const [currentRecordId, setCurrentRecordId] = useState("123");
  const switchViewRec = (id) => {
    setCurrentRecordId(id);
  };
  //find saved custom items in records
  const customItems =
    records.find((a) => currentRecordId == a.id)?.customItems || [];

  //shortcut for finding current Record
  function matchRec(a) {
    return a === currentRecordId;
  }

  //find record category
  let category = records.find((a) => currentRecordId === a.id)?.category || [];

  const [form, setForm] = useState({
    name: "",
    category: category[category.length - 1]?.id || "",
    date: "",
    time: "",
    price: "",
    quantity: 1,
    id: "",
    totalPrice: "",
  });

  function clearForm() {
    setForm({
      name: "",
      category: category[category.length - 1]?.id || "",
      date: "",
      time: "",
      price: "",
      quantity: 1,
      id: "",
      totalPrice: "",
    });
  }

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
      setIsShowSidebar(false);
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
          deleteCategory={deleteCategory}
          renameCategory={renameCategory}
          addCategory={addCategory}
          addCustomItem={addCustomItem}
          saveEditCustomItem={saveEditCustomItem}
          deleteCustomItem={deleteCustomItem}
          category={category}
          customItems={customItems}
          deleteRecord={deleteRecord}
          setCurrentRecordId={setCurrentRecordId}
          currentRecordId={currentRecordId}
          records={records}
          addRecord={addRecord}
          switchViewRec={switchViewRec}
          toggleModal={toggleModal}
          typeModal={typeModal}
        />
      )}

      <Contents
        form={form}
        setForm={setForm}
        saveItem={saveItem}
        removeItems={removeItems}
        addItems={addItems}
        clearForm={clearForm}
        isEditingItem={isEditingItem}
        isEditingItem={isEditingItem}
        customItems={customItems}
        category={category}
        records={records}
        currentRecordId={currentRecordId}
      />
    </>
  );
}

export default App;
