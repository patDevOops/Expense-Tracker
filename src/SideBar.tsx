import './SideBar.css';
export function SideBar(){
  return(
    <div className="sidebar">
      <div className="sidebar-title">Record</div>
      <div>New Record</div>
      <div>My Record</div>
      
      <div className="sidebar-title">Saved Items</div>
      <div>Add Items</div>
      <div>View Items</div>

      
    </div>
  )
}