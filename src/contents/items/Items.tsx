import { useState, useRef } from "react";
import { formatMY } from "../../utils/date.js";
import "./Items.css";
import { ItemsGen } from "./ItemsGen";
import { IoMdArrowDropup } from "react-icons/io";

export function Items({
  itemRecords,
  changeCategory,
  category,
  selectedCategory,
  setIsCategoryGlobal,
  isCategoryGlobal
}) {
  
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

  const renderCategoryName = category.find(
    (a) => selectedCategory === a.id,
  ).categoryName;

  
    let quantity = 0
    itemRecords.forEach((item)=>{
      if (item.category === selectedCategory) quantity += 1
    })

  let previousDate;

  return (
    <div className="items">
      <div>
        <span className="category-cont">
          <div 
            onClick={toggleDropdown}
            >{isCategoryGlobal ? 'All' :renderCategoryName}</div>
          
          <IoMdArrowDropup
            className="dropdown-arrow"
            onClick={toggleDropdown}
          />

          {isDropdown && (
            <div className="pick-category-collapse">
              {category.map((categoryVal) => {
                return (
                  <div
                    key={categoryVal.id}
                    onClick={() => {
                      changeCategory(categoryVal.id);
                      setIsCategoryGlobal(false)
                      toggleDropdown()
                    }}
                  >
                    {categoryVal.categoryName}
                  </div>
                );
              })}
              <div onClick={()=>{
              setIsCategoryGlobal(true)
              toggleDropdown()
                                }}>All</div>
            </div>
          )}
        </span>

        <span>{isCategoryGlobal ? itemRecords.length: quantity} items</span>
      </div>

      <div className="items-scrollable">
        {itemRecords.map((item) => {
          const isHide = isCollapse.includes(formatMY(item.createdAt));
          let showDate = true;
          if (previousDate === formatMY(item.createdAt)) {
            showDate = false;
          }
          previousDate = formatMY(item.createdAt);
          return (
            <ItemsGen
              category={category}
              isCategoryGlobal={isCategoryGlobal}
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
