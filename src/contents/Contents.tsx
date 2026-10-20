import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Date } from "./Date.js";
import { Items } from "./items/Items.js";
import { Info } from "./Info.js";
import { FormCard } from "./FormCard.js";
import { FloatingButtons } from "./FloatingButtons.js";
import { formatTime, formatMY } from "../utils/date.js";
import "./Contents.js";
import type { Dispatch, SetStateAction } from "react";
import type {
  RecordType,
  Category,
  CustomItem,
  Item,
  FormType,
} from "../App.js";
/*
type Items = {
  name: string;
  id: string;
  createdAt: string;
  quantity: number;
  price: number;
  category: string;
  totalPrice: string;
};
*/
type ContentsProp = {
  currentRecordId: string;
  records: RecordType[];
  category: Category[];
  // This value is mapped in FormCard, so it is an array of custom items.
  customItems: CustomItem[];
  isEditingItem: boolean;
  setIsEditingItem: (bool: boolean) => void;
  addItems: (newItems: Item) => void;
  removeItems: (id: string) => void;
  saveItem: () => void;
  clearForm: () => void;
  // Match the React setter returned by useState; it accepts values and updater callbacks.
  setForm: Dispatch<SetStateAction<FormType>>;
  form: FormType;
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
  form,
}:ContentsProp) {
  const [isCategoryGlobal, setIsCategoryGlobal] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("098");

  // find() can return undefined when no record matches the current ID.
  const recordName: string | undefined = records.find((a) => currentRecordId === a.id)?.name;

  //find array of items in records
  let itemRecords: Item[] = [];
  records.forEach((record) => {
    if (record.id === currentRecordId) {
      itemRecords = [...record.items];
    }
  });

  //get Date List in itemRecords
  // This collection contains formatted year-month strings.
  let listDates: string[] = [];
  itemRecords.sort((a, b) => {
    return dayjs().diff(a.createdAt) - dayjs().diff(b.createdAt);
  });

  let previousDate:undefined | string;
  const listDate = itemRecords.map((item) => {
    const convertedDate = dayjs(item.createdAt).format("YYYY-MM");

    if (previousDate !== convertedDate) {
      previousDate = convertedDate;
      return convertedDate;
    }
  }).filter((a): a is string => Boolean(a));
  // The type predicate tells TypeScript that undefined entries are removed.
  listDates = listDate.length ? listDate : [dayjs().format("YYYY-MM")];

  const [selectedDate, setSelectedDate] = useState<string>(listDates[0]);
  const changeDate = (index:number) => {
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

  const changeCategory = (categoryId:string) => {
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

  const editItem = (item:Item) => {
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
