import {useState} from 'react';
import {Category} from './Category';
import {Items} from './items/Items'
import {Date} from './Date';
import {FormCard} from './FormCard';
import {FloatingButtons} from './FloatingButtons';
import './Contents';

export function Contents(){
  const [isShowForm,setIsShowForm] = useState(false)
  const toggleForm = ()=>{
    if (isShowForm){setIsShowForm(false)}else setIsShowForm(true)
  }
  return(
    <div className="main">
      <Category/>
      <Date/>
      <Items/>
      <FormCard isShowForm={isShowForm}/>
      <FloatingButtons toggleForm={toggleForm}/>
    </div>
  )
}