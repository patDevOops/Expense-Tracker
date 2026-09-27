import { useState, useRef } from "react";
import dayjs from "dayjs";
import { records } from "../../data/records.js";
import "./Items.css";
import { ItemsGen } from "./ItemsGen";

const today = dayjs();
export function Items() {
  const [currentRecordId, setCurrentRecordId] = useState("123");
  const [selectedCategory, setSelectedCategory] = useState("food");
  const [selectedDate, setSelectedDate] = useState("2026-09");
  const [isCollapse, setIsCollapse] = useState([]);
  //get items in records array
  let itemRecords;
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
    const date1 = `${a.createdAt} ${a.createdTime}`;
    const date2 = `${b.createdAt} ${b.createdTime}`;
    return today.diff(date1) - today.diff(date2);
  });

  let previousDate;

  const toggleCollapse = (date) => {
    if (isCollapse.includes(date)) {
      setIsCollapse(
        isCollapse.filter((a) => {
          return a !== date;
        }),
      );
    } else {
      setIsCollapse([...isCollapse, date]);
    }
  };

  return (
    <div className="items">
      <div>
        <span>September 2026</span>
        <span>3 items</span>
      </div>
      <div className="items-scrollable">
        {itemRecords.map((item) => {
          const isHide = isCollapse.includes(item.createdAt);
          let showDate = true;
          if (previousDate === item.createdAt) {
            showDate = false;
          }
          previousDate = item.createdAt;
          return (
            <ItemsGen
              item={item}
              key={item.id}
              showDate={showDate}
              toggleCollapse={toggleCollapse}
              isHide={isHide}
            />
          );
        })}
      </div>
    </div>
  );
}
