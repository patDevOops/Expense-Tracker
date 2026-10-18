import dayjs from "dayjs";
import { useState } from "react";
import { formatMY } from "../../utils/date.js";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoTrashBin } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";
import type {Item,Category} from "../../App.js";
type ItemsGenProps= {
  item:Item;
  showDate:boolean;
  toggleCollapse:(id:string)=>void;
  isHide:boolean;
  isCategoryGlobal:boolean;
  category:Category[];
  removeItems:(id:string)=>void;
  showTotal:boolean;
  totalPricePerDay:number;
  editItem:(item:Item)=>void;
  selectedItem:string | null;
  setSelectedItem:(item:string)=>void;
  expanding:string|null;
  setExpanding:(a:string|null)=>void;
};
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
  expanding,
  setExpanding,
}:ItemsGenProps) {
  const [isConfirmModal, setIsConfirmModal] = useState<boolean>(false);
  const isShowQtyCalc = item.price && item.quantity !== 1 ? true : false;

  // find() can return undefined when the item has no matching category.
  const categoryName:string|undefined = category.find(
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
              onClick={() => {
                setSelectedItem(item.id);
              }}
              className="item-gen"
              id={selectedItem === item.id ? "border-highlight-item" : ""}
            >
              <div className="item-name">
                <div>{item.name}</div>
                <div className="item-gen-details">
                  {isCategoryGlobal && categoryName && (
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
                onClick={() => {
                  if (expanding === item.id) {
                    setExpanding(null);
                    return;
                  }
                  setExpanding(item.id);
                }}
                className="item-arrow-cont"
              >
                <IoIosArrowBack className={`item-arrow ${expanding === item.id ? "arrow-rotate":"arrow-unrotate"}`} size="25" />
              </div>

              {expanding === item.id && (
                <div className="expanded-btn-cont">
                  <button
                    onClick={() => {
                      editItem(item);
                    }}
                    className="expanded-btn"
                  >
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
