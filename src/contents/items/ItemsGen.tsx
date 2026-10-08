import dayjs from "dayjs";
import { useState } from "react";
import { formatMY } from "../../utils/date.js";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoTrashBin } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";
export function ItemsGen({
  item,
  showDate,
  toggleCollapse,
  isHide,
  isCategoryGlobal,
  category,
  removeItems,
  showTotal,
  totalPricePerDay,
  editItem,
  selectedItem,
  setSelectedItem,
}) {
  const [isExpanding, setIsExpanding] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const toggleExpand = () => {
    setIsExpanding(isExpanding ? false : true);
  };
  const isShowQtyCalc = item.price && item.quantity !== 1 ? true : false;

  const categoryName = category.find(
    (a) => a.id === item.category,
  )?.categoryName;
  const removeBarrier = () => {
    setIsConfirmModal(false);
  };
  return (
    <>
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
            <div 
              onClick={()=>{setSelectedItem(item.id)}}
              className="item-gen"
              id={selectedItem === item.id?'border-highlight':''}>
              <div className="item-name">
                <div>{item.name}</div>
                <div className="item-gen-details">
                  {isCategoryGlobal && (
                    <span id="category-global-name">{categoryName}</span>
                  )}
                  
                  <span>{dayjs(item.createdAt).format("h:mm A")}</span>
                  
                  {isShowQtyCalc && (
                    <span className="item-price-calc">
                      {item.quantity} x ₱
                      {(item.totalPrice / item.quantity).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              <div className="item-total-price">
                ₱
                {(item.price
                  ? item.quantity * item.price
                  : item.totalPrice
                ).toFixed(2)}
              </div>

              <div 
                onClick={toggleExpand}
                className="item-arrow-cont">
                <IoIosArrowBack
                  className="item-arrow"
                  size="25"
                />
              </div>

              {isExpanding && (
                <div 
                  className="expanded-btn-cont">
                  <button 
                    onClick={()=>{editItem(item)}}
                    className="expanded-btn">
                    <LuPencil className="arrow-btn-expanded" />
                  </button>
                  <button
                    onClick={() => {
                      setIsConfirmModal(true);
                    }}
                    className="expanded-btn"
                  >
                    <IoTrashBin className="arrow-btn-expanded" />
                  </button>
                </div>
              )}
              {isConfirmModal && (
                <div className="confirm-del-modal">
                  <button onClick={removeBarrier}>No</button>
                  <button
                    onClick={() => {
                      removeItems(item.id);
                    }}
                  >
                    Yes
                  </button>
                </div>
              )}
            </div>
            {showTotal && (
              <div className="total-price-per-day">
                Total: ₱{totalPricePerDay.toFixed(2)}
              </div>
            )}
          </>
        )}
      </div>

      {isConfirmModal && (
        <div
          onClick={() => {
            setIsConfirmModal(false);
          }}
          className="barrier-expand-btn"
        ></div>
      )}
    </>
  );
}
