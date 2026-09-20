import {Category} from './Category';
import {Items} from './Items'
import {Date} from './Date'
import './Contents';
export function Contents(){
  return(
    <div className="main">
      <Category/>
      <Date/>
      <Items/>
    </div>
  )
}