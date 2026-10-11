import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Date } from "./Date";
import { Items } from "./items/Items";
import { Info } from "./Info";
import { FormCard } from "./FormCard";
import { FloatingButtons } from "./FloatingButtons";
import { formatTime, formatMY } from "../utils/date.js";
import "./Contents";

type Items = {
  name: string;
  id: string;
  createdAt: string;
  quantity: number;
  price: number;
  category: string;
  totalPrice: string;
};

export function Contents({
  currentRecordId,
  records,
  category,
  customItems,
  isEditingItem,
  setIsEditingItem,
  addItems,
  removeItems,
  saveItem,
  clearForm,
  setForm,
  form
}) {
  const [isCategoryGlobal, setIsCategoryGlobal] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("098");

  const recordName = records.find((a) => currentRecordId === a.id)?.name;

  //find array of items in records
  let itemRecords: Items[] = [];
  records.forEach((record) => {
    if (record.id === currentRecordId) {
      itemRecords = record.items;
    }
  });

  //get Date List in itemRecords
  let listDates = [];
  itemRecords.sort((a, b) => {
    return dayjs().diff(a.createdAt) - dayjs().diff(b.createdAt);
  });

  let previousDate;
  let listDate = itemRecords.map((item) => {
    const convertedDate = dayjs(item.createdAt).format("YYYY-MM");

    if (previousDate !== convertedDate) {
      previousDate = convertedDate;
      return convertedDate;
    }
  });
  listDate = listDate.filter((a) => a);
  listDates = listDate.length ? listDate : [dayjs().format("YYYY-MM")];

  const [selectedDate, setSelectedDate] = useState(listDates[0]);
  const changeDate = (index) => {
    setSelectedDate(listDates[index]);
  };

  //get total price per month
  let totalPrice = 0;
  itemRecords.forEach((item) => {
    if (selectedDate === dayjs(item.createdAt).format("YYYY-MM"))
      totalPrice += item.totalPrice;
  });

  //filter items to match selectedCategory and selectedDate
  itemRecords = itemRecords.filter((item) => {
    if (isCategoryGlobal) {
      return selectedDate === dayjs(item.createdAt).format("YYYY-MM");
    }
    return (
      item.category === selectedCategory &&
      selectedDate === dayjs(item.createdAt).format("YYYY-MM")
    );
  });

  // sort by newest first
  itemRecords.sort((a, b) => {
    return dayjs().diff(a.createdAt) - dayjs().diff(b.createdAt);
  });
  //add items event handler

  //remove items event handler

  const changeCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const [isShowForm, setIsShowForm] = useState(false);
  const toggleForm = () => {
    setIsShowForm(isShowForm ? false : true);
  };

  useEffect(() => {
    if (!isShowForm && isEditingItem) {
      setIsEditingItem(false);
      clearForm();
    }
  }, [isShowForm]);

  const editItem = (item) => {
    setIsEditingItem(true);
    setIsShowForm(true);
    const { name, category, price, totalPrice, id, quantity } = item;
    const time = formatTime(item.createdAt);
    const date = formatMY(item.createdAt);
    setForm({
      name,
      category,
      date,
      time,
      price,
      quantity,
      id,
      totalPrice,
    });
  };

  return (
    <div className="main">
      <Date
        selectedDate={selectedDate}
        changeDate={changeDate}
        listDates={listDates}
      />
      <Info recordName={recordName} totalPrice={totalPrice} />
      <Items
        editItem={editItem}
        removeItems={removeItems}
        setIsCategoryGlobal={setIsCategoryGlobal}
        isCategoryGlobal={isCategoryGlobal}
        itemRecords={itemRecords}
        changeCategory={changeCategory}
        category={category}
        selectedCategory={selectedCategory}
      />
      <FormCard
        customItems={customItems}
        saveItem={saveItem}
        isEditingItem={isEditingItem}
        form={form}
        setForm={setForm}
        setIsShowForm={setIsShowForm}
        category={category}
        isShowForm={isShowForm}
        records={records}
        addItems={addItems}
      />
      <FloatingButtons toggleForm={toggleForm} />
    </div>
  );
}
