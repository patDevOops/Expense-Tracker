import { useState } from "react";
import dayjs from "dayjs";
import { Date } from "./Date";
import { Items } from "./items/Items";
import { Info } from "./Info";
import { FormCard } from "./FormCard";
import { FloatingButtons } from "./FloatingButtons";
import "./Contents";
type Record = {
  name: string;
  id: string;
  createdAt: string;
  status: string;
  items: [];
};
type Items = {
  name: string;
  id: string;
  createdAt: string;
  quantity: number;
  price: number;
  category: string;
};

const today = dayjs();
export function Contents() {
  const [currentRecordId, setCurrentRecordId] = useState("123");
  const [selectedCategory, setSelectedCategory] = useState("food");
  const [selectedDate, setSelectedDate] = useState("2026-09");
  const [records, setRecords] = useState<Record[]>([
    {
      name: "untitled",
      id: "123",
      createdAt: "2026-09-20",
      status: "local",
      items: [
        {
          name: "Milk",
          id: "111",
          createdAt: "2026-09-22 11:22 AM",
          quantity: 2,
          price: 15,
          category: "food",
        },
        {
          name: "Candy",
          id: "112",
          createdAt: "2026-09-21 11:30 AM",
          quantity: 5,
          price: 1,
          category: "food",
        },
        {
          name: "ulam",
          id: "113",
          createdAt: "2026-09-22 1:30 PM",
          quantity: 1,
          price: 40,
          category: "food",
        },
      ],
    },
  ]);

  //find array of items in records
  let itemRecords: Items[] = [];
  records.forEach((record) => {
    if (record.id === currentRecordId) {
      itemRecords = record.items;
    }
  });
  //filter items to match selectedCategory and selectedDate
  itemRecords = itemRecords.filter(
    (item) =>
      item.category === selectedCategory &&
      selectedDate === dayjs(item.createdAt).format("YYYY-MM"),
  );

  // sort by newest first
  itemRecords.sort((a, b) => {
    console.log(records);
    return today.diff(a.createdAt) - today.diff(b.createdAt);
  });
  //add items event handler
  const addItems = (newItems) => {
    setRecords(
      records.map((record) => {
        if (record.id === currentRecordId) {
          return {
            ...record,
            items: [...record.items, newItems],
          };
        }
        return record;
      }),
    );
  };
  //remove items event handler
  const removeItems = (id) => {
    setRecords(
      records.map((record) => {
        if (record.id === currentRecordId) {
          return {
            ...record,
            items: record.items.filter((a) => a.id !== id),
          };
        }
        return record;
      }),
    );
  };

  const [isShowForm, setIsShowForm] = useState(false);
  const toggleForm = () => {
    setIsShowForm(isShowForm ? false : true);
  };

  return (
    <div className="main">
      <Date />
      <Info />
      <Items itemRecords={itemRecords} />
      <FormCard 
        isShowForm={isShowForm}
        records={records}
        addItems={addItems} />
      <FloatingButtons toggleForm={toggleForm} />
    </div>
  );
}
