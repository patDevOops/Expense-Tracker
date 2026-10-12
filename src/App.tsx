// @ts-ignore
import { useState, useEffect } from "react";
// @ts-ignore
import { useRecords } from "./hooks/records/useRecords.ts";
// @ts-ignore
import { Header } from "./Header";
// @ts-ignore
import { Contents } from "./contents/Contents";
// @ts-ignore
import { SideBar } from "./SideBar.tsx";
// @ts-ignore
import { Modal } from "./modal/Modal";
import "./Main.css";
// @ts-ignore
import { Barrier } from "./components/barrier.tsx";
export type Item = {
  name: string;
  id: string;
  createdAt: string;
  quantity: number;
  price: number;
  category: string;
  totalPrice: number;
  time:string;
  date:string;
};

export type CustomItem = {
  name: string;
  price: number;
  categoryId: string;
  id: string;
};

export type Category = {
  categoryName: string;
  id: string;
};

export type RecordType = {
  name: string;
  id: string;
  createdAt: string;
  status: string;
  items: Item[];
  customItems: CustomItem[];
  category: Category[];
};

function App() {
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    date: "",
    time: "",
    price: "",
    quantity: 1,
    id: "",
    totalPrice: "",
  });
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
  } = useRecords({ matchRec, setIsEditingItem, clearForm, form });

  const [currentRecordId, setCurrentRecordId] = useState("123");
  const switchViewRec = (id: string) => {
    setCurrentRecordId(id);
  };
  //find saved custom items in records
  const customItems: CustomItem[] =
    records.find((a) => currentRecordId === a.id)?.customItems ?? [];
  
  //find record category
  let category:Category[] =
    records.find((a) => currentRecordId === a.id)?.category ||
    [];

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

  const renderTypeModal = (type: string) => {
    setTypeModal(type);
  };
  const toggleModal = (bool: boolean) => {
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

  const toggleSidebar = (bool: boolean) => {
    if (bool !== undefined) {
      setIsShowSidebar(bool);
      return;
    }
    if (isShowSidebar) {
      setIsShowSidebar(false);
    } else setIsShowSidebar(true);
  };
  useEffect(() => {
    // @ts-ignore
    eruda.init();
  });
  useEffect(() => {
    setForm({ ...form, category: category[category.length - 1]?.id || "" });
  }, []);
  //shortcut for finding current Record
  function matchRec(a: string): boolean {
    return a === currentRecordId;
  }

  return (
    // @ts-ignore
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
        customItems={customItems}
        category={category}
        records={records}
        currentRecordId={currentRecordId}
        setIsEditingItem={setIsEditingItem}
      />
    </>
  );
}

export default App;
