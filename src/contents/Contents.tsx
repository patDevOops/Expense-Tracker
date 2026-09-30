import {useState} from 'react';
import dayjs from "dayjs";
import {Date} from './Date';
import {Items} from './items/Items'
import {Info} from './Info';
import {FormCard} from './FormCard';
import {FloatingButtons} from './FloatingButtons';
import './Contents';

const today = dayjs();
export function Contents(){
  const [currentRecordId, setCurrentRecordId] = useState("123");
  const [selectedCategory, setSelectedCategory] = useState("food");
  const [selectedDate, setSelectedDate] = useState("2026-09");
  const [records, setRecords] = useState([
    {
      name: "untitled",
      id: "123",
      createdAt: "2026-09-20",
      status: "local",
      items: [
        {
          name: "Milk",
          id: "111",
          createdAt: "2026-09-22",
          createdTime: "11:22 AM",
          quantity: 2,
          price: 15,
          category: "food",
        },
        {
          name: "Candy",
          id: "112",
          createdAt: "2026-09-21",
          createdTime: "11:30 AM",
          quantity: 5,
          price: 1,
          category: "food",
        },
        {
          name: "ulam",
          id: "113",
          createdAt: "2026-09-22",
          createdTime: "11:30 AM",
          quantity: 1,
          price: 40,
          category: "food",
        },
      ],
    },
  ]);
  //find array of items in records
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

  const addItems = ()=>{
    
  }
  
  const [isShowForm,setIsShowForm] = useState(false)
  const toggleForm = ()=>{
    setIsShowForm(isShowForm?false:true)
  }
  
  return(
    <div className="main">
      <Date/>
      <Info/>
      <Items 
        itemRecords={itemRecords}/>
      <FormCard 
        isShowForm={isShowForm}
        records={records}/>
      <FloatingButtons toggleForm={toggleForm}/>
    </div>
  )
}