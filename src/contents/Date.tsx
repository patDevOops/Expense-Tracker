import { useState } from "react";
import dayjs from "dayjs";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import "./Date.css";
type DateProps = {
  changeDate:(index:number)=>void;
  selectedDate:string;
  // The parent passes a list of formatted year-month strings.
  listDates: string[];
};
export function Date({ changeDate, selectedDate, listDates }:DateProps) {
  const [defaultDate, setDefaultDate] = useState<number>(0);
  return (
    <div className="date-year-month-cont">
      <button
        className="arrow-btn-cont"
        onClick={() => {
          const nextDate = defaultDate - 1;
          const finalDate = nextDate < 0 ? listDates.length - 1 : nextDate;
          setDefaultDate(finalDate);
          changeDate(finalDate);
        }}
      >
        <FaArrowLeft className="arrow-btn" size="20" color="white" />
      </button>

      <div className="date-year-name">
        <div>{dayjs(selectedDate).format("MMMM YYYY")}</div>
      </div>
      <button
        onClick={() => {
          const nextDate = defaultDate + 1;
          const finalDate = nextDate >= listDates.length ? 0 : nextDate;
          setDefaultDate(finalDate);
          changeDate(finalDate);
        }}
        className="arrow-btn-cont"
      >
        <FaArrowRight className="arrow-btn" size="20" color="white" />
      </button>
    </div>
  );
}
