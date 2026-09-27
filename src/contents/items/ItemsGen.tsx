import dayjs from "dayjs";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoTrashBin } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";
export function ItemsGen({ item, showDate, toggleCollapse, isHide }) {
  return (
    <div>
      {showDate && (
        <div className="item-date">
          <div>{dayjs(item.createdAt).format("MMM D")}</div>
          <IoIosArrowDown
            size="15"
            onClick={() => {
              toggleCollapse(item.createdAt);
            }}
          />
        </div>
      )}

      {!isHide && (
        <div className="item-gen">
          <div className="item-name">
            <div>{item.name}</div>
            <span className="item-price-calc">
              {item.quantity} x ₱{item.price}
            </span>
            <span>{item.createdTime}</span>
          </div>
          <div className="item-total-price">₱{item.quantity * item.price}
          </div>
          
          <div className="item-arrow-cont">
            <IoIosArrowBack className="item-arrow"
              size="20"/>
          </div>
          
          <div className="expanded-btn-cont">
            <button className="expanded-btn">
              <LuPencil className="arrow-btn-expanded"/>
            </button>
            <button className="expanded-btn">
              <IoTrashBin className="arrow-btn-expanded" />
            </button>
          </div>
          
        </div>
      )}
    </div>
  );
}
