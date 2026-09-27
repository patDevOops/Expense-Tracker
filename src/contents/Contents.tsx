import {useState} from 'react';
import {Date} from './Date';
import {Items} from './items/Items'
import {Info} from './Info';
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
      <Date/>
      <Info/>
      <Items/>
      <FormCard isShowForm={isShowForm}/>
      <FloatingButtons toggleForm={toggleForm}/>
    </div>
  )
}