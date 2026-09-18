import {Category} from './Category';
import {Items} from './Items'
import './Contents';
export function Contents(){
  return(
    <div className="main">
      <Category/>
      <Items/>
    </div>
  )
}