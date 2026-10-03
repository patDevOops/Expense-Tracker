import dayjs from "dayjs";
import { useState } from "react";
import { formatMY } from "../../utils/date.js";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoTrashBin } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";
export function ItemsGen({ item, showDate, toggleCollapse, isHide,isCategoryGlobal,category, removeItems,showTotal,totalPricePerDay}) {
  const [isExpanding, setIsExpanding] = useState(false);
  const toggleExpand = () => {
    setIsExpanding(isExpanding ? false : true);
  };
  const isShowQtyCalc = item.price && item.quantity !== 1 ?true : false;

  const categoryName = category.find((a)=> a.id === item.category)?.categoryName
  return (
    <div>
      {showDate && (
        <div className="item-date">
          <div>{dayjs(item.createdAt).format("MMM D")}</div>
          <IoIosArrowDown
            size="15"
            onClick={() => {
              toggleCollapse(formatMY(item.createdAt));
            }}
          />
        </div>
      )}

      {!isHide && (
      <>
        <div className="item-gen">
          <div className="item-name">
            <div>{item.name}</div>
            {isCategoryGlobal && <span id="category-global-name">{categoryName}</span>}
            {isShowQtyCalc && <span className="item-price-calc">
              {item.quantity} x ₱{(item.totalPrice / item.quantity).toFixed(2)}
            </span>}
            
            <span>{dayjs(item.createdAt).format("h:mm A")}</span>
            
          </div>
          <div className="item-total-price">
            ₱{(item.price ? item.quantity * item.price : item.totalPrice).toFixed(2)}
          </div>

          <div className="item-arrow-cont">
            <IoIosArrowBack
              className="item-arrow"
              size="20"
              onClick={toggleExpand}
            />
          </div>

          {isExpanding && (
            <div className="expanded-btn-cont">
              <button 
                
                className="expanded-btn">
                <LuPencil className="arrow-btn-expanded" />
              </button>
              <button 
                onClick={()=>{removeItems(item.id)}}
                className="expanded-btn">
                <IoTrashBin className="arrow-btn-expanded" />
              </button>
            </div>
          )}
        </div>
        {showTotal && <div className="total-price-per-day">Total: {totalPricePerDay}</div>}
      </>
      )}
      
    </div>
  );
}
