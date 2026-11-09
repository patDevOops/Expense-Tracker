import type { Dispatch, SetStateAction } from "react";
import type { RecordType, CustomItem } from "../../App.js";
type UseCustomItemsProps = {
  // Records are an array, and setRecords is React's state setter for that array.
  setRecords: Dispatch<SetStateAction<RecordType[]>>;
  matchRec: (id: string) => boolean;
  records: RecordType[];
};
export function useCustomItems({
  setRecords,
  matchRec,
  records
}: UseCustomItemsProps) {
  const addCustomItem = (newItem: CustomItem) => {
    setRecords(
      records.map((record) => {
        if (matchRec(record.id)) {
          return {
            ...record,
            customItems: [...record.customItems, newItem]
          };
        }
        return record;
      })
    );
  };

  const deleteCustomItem = (id: string) => {
    setRecords(
      records.map((record) =>
        matchRec(record.id)
          ? {
              ...record,
              customItems: record.customItems.filter((a) => a.id !== id)
            }
          : record
      )
    );
  };

  const saveEditCustomItem = (editedItem: CustomItem) => {
    console.log("rdited", editedItem);
    setRecords(
      records.map((record) =>
        matchRec(record.id)
          ? {
              ...record,
              customItems: record.customItems.map((a) =>
                editedItem.id == a.id ? editedItem : a
              )
            }
          : record
      )
    );
  };

  return {
    saveEditCustomItem,
    addCustomItem,
    deleteCustomItem
  };
}
