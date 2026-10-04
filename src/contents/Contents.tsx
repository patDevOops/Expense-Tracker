import { useState, useEffect } from "react";
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

export function Contents() {
  const [category, setCategory] = useState([
    {
      categoryName: "Others",
      id: "652",
    },
    {
      categoryName: "Food",
      id: "098",
    },
    {
      categoryName: "Things",
      id: "765",
    },
  ]);
  const [currentRecordId, setCurrentRecordId] = useState("123");
  const [isCategoryGlobal, setIsCategoryGlobal] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("098");
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

  const recordName = records.find((a)=> currentRecordId === a.id).name

  

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
    const convertDate = dayjs(item.createdAt).format("YYYY-MM");

    if (previousDate !== convertDate) {
      previousDate = convertDate;
      return convertDate;
    }
  });
  listDate = listDate.filter((a) => a);
  console.log(listDate);
  listDates = listDate;

  
  const [selectedDate, setSelectedDate] = useState(listDates[0]);
  const changeDate = (index) => {
    setSelectedDate(listDates[index]);
    console.log("change");
  };

  //get total price per month
  let totalPrice = 0;
  itemRecords.forEach((item)=>{
    if (selectedDate === dayjs(item.createdAt).format("YYYY-MM")) totalPrice += item.totalPrice;
  })

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
    console.log('addItems',newItems)
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

  const changeCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const [isShowForm, setIsShowForm] = useState(false);
  const toggleForm = () => {
    setIsShowForm(isShowForm ? false : true);
  };

  return (
    <div className="main">
      <Date
        selectedDate={selectedDate}
        changeDate={changeDate}
        listDates={listDates}
      />
      <Info 
        recordName={recordName}
        totalPrice={totalPrice}
        />
      <Items
        removeItems={removeItems}
        setIsCategoryGlobal={setIsCategoryGlobal}
        isCategoryGlobal={isCategoryGlobal}
        itemRecords={itemRecords}
        changeCategory={changeCategory}
        category={category}
        selectedCategory={selectedCategory}
      />
      <FormCard
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
