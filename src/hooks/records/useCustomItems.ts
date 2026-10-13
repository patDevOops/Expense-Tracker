export function useCustomItems({ setRecords, matchRec, records }) {
  const addCustomItem = (newItem) => {
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

  const deleteCustomItem = (id) => {
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

  const saveEditCustomItem = (editedItem) => {
    console.log("rdited",editedItem)
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
