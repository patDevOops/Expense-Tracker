import './Category.css';
export function Category() {
  return(
    <>
      <div className="modal-title">viewing category for <span className="record-name-highlighted">untitled</span></div>
      <div className="record-input-cont">
        <input className="modal-input-rec" />
        <button>Add</button>
      </div>
      <div className="category-gen">
        <div>Food</div>
        <div>Things</div>
      </div>
    </>
  )
}