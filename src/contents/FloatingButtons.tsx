import './FloatingButtons.css'

export function FloatingButtons({toggleForm}){
  return(
    <div className="floating-btn">
      <button onClick={toggleForm}>+</button>
    </div>
  )
}