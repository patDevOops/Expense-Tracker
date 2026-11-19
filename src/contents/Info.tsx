import "./Info.css";
type InfoProps = {
  totalPrice: number;
  recordName: string | undefined;
};
export function Info({ totalPrice, recordName }: InfoProps) {
  return (
    <div className="info-container">
      <div className="current-record-cont">
        <div className="record-info-cont">
          <div className="edge-title">Viewing Record</div>
          <div className="record-name">
            {recordName || "No Record Selected"}
          </div>
        </div>
      </div>

      <div className="total-expense-cont">
        <div className="record-info-cont">
          <div className="edge-title">This Month Expenses</div>
          <div className="item-all-sum">₱{totalPrice.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
