import { useState, useRef } from "react";
import dayjs from "dayjs";
import { records } from "../data/records.js";
import "./Items.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
const today = dayjs();
export function Items() {
  const [currentRecordId, setCurrentRecordId] = useState("123");
  const [selectedCategory, setSelectedCategory] = useState("food");
  const [selectedDate, setSelectedDate] = useState("2026-09");
  
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
  return (
    <div className="items">
      <div>3 items</div>
      {itemRecords.map((item) => {
      let showDate = true
      if (previousDate === item.createdAt){
        showDate = false;
      }
      previousDate = item.createdAt;
        return (
          <div key={item.id}>
            {showDate && <div className="item-date">
              <div>{dayjs(item.createdAt).format('MMM D')}</div>
              <IoIosArrowDown size="15" />
            </div>}
            
            <div className="item-gen">
              <div className="item-name">
                <div>{item.name}</div>
                <span className="item-price-calc">{item.quantity} x ₱{item.price}</span>
                <span>{item.createdTime}</span>
              </div>
              <div className="item-total-price">₱{item.quantity*item.price}</div>
              <IoIosArrowBack className="item-arrow" size="20" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
