import {useState} from 'react';
import dayjs from 'dayjs';
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import './Date.css'
export function Date({changeDate,selectedDate,listDates}){
  const [defaultDate,setDefaultDate] = useState(0)
  return(
    <div className="date-year-month-cont">
      <button 
        className="arrow-btn-cont"
        onClick={()=>{
          const nextDate = defaultDate - 1;

          // 2. I-check kung lagpas na
          const finalDate = nextDate < 0 ? listDates.length - 1 : nextDate;

          // 3. I-set ang state (para sa susunod na render)
          setDefaultDate(finalDate);

          // 4. Gamitin ang bagong value ngayon (para sa current action)
          changeDate(finalDate);
        }}>
        <FaArrowLeft 
        className="arrow-btn"
        size="20"
        color="white"/>
      </button>
      
       <div className="date-year-name">
         <div>{dayjs(selectedDate).format('MMMM YYYY')}</div>
       </div>
      <button 
        onClick={()=>{
          const nextDate = defaultDate + 1;

          // 2. I-check kung lagpas na
          const finalDate = nextDate >= listDates.length ? 0 : nextDate;

          // 3. I-set ang state (para sa susunod na render)
          setDefaultDate(finalDate);

          // 4. Gamitin ang bagong value ngayon (para sa current action)
          changeDate(finalDate);
        }}
        className="arrow-btn-cont">
        <FaArrowRight 
        className="arrow-btn"
        size="20"
        color="white"/>
      </button>
    </div>
  )
}