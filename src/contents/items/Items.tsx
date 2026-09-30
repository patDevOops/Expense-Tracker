import { useState, useRef } from "react";
import dayjs from 'dayjs';
import "./Items.css";
import { ItemsGen } from "./ItemsGen";
import { IoMdArrowDropup } from "react-icons/io";

export function Items({records,itemRecords}) {
  const [isCollapse, setIsCollapse] = useState([]);
  const [isDropdown, setIsDropdown] = useState(false);

  const toggleDropdown = () => {
    setIsDropdown(isDropdown ? false : true);
  };
  
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

  let previousDate;

  return (
    <div className="items">
      <div>
        <span className="category-cont">
          <div>Food</div>
          <IoMdArrowDropup
            className="dropdown-arrow"
            onClick={toggleDropdown}
          />

          {isDropdown && (
            <div className="pick-category-collapse">
              <div>Things</div>
              <div>All</div>
            </div>
          )}
        </span>
        <span>3 items</span>
      </div>

      <div className="items-scrollable">
        {itemRecords.map((item) => {
          const isHide = isCollapse.includes(dayjs(item.createdAt).format('YYYY-MM-D'));
          let showDate = true;
          if (previousDate === dayjs(item.createdAt).format('YYYY-MM-D')) {
            showDate = false;
          }
          previousDate = dayjs(item.createdAt).format('YYYY-MM-D');
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
