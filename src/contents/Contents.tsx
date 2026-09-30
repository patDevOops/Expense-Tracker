import {useState} from 'react';
import {Date} from './Date';
import {Items} from './items/Items'
import {Info} from './Info';
import {FormCard} from './FormCard';
import {FloatingButtons} from './FloatingButtons';
import './Contents';

export function Contents(){
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
  const [isShowForm,setIsShowForm] = useState(false)
  const toggleForm = ()=>{
    if (isShowForm){setIsShowForm(false)}else setIsShowForm(true)
  }
  
  return(
    <div className="main">
      <Date/>
      <Info/>
      <Items records={records}/>
      <FormCard 
        isShowForm={isShowForm}
        records={records}/>
      <FloatingButtons toggleForm={toggleForm}/>
    </div>
  )
}