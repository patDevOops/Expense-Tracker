import dayjs from "dayjs";
import type { UseItemsParam } from "./useRecords.js";
import type { Item } from "../../App.js";
export function useItems({
  setRecords,
  matchRec,
  clearForm,
  setIsEditingItem,
  records,
  form
}: UseItemsParam) {
  const addItems = (newItems: Item) => {
    setRecords((prevRecords) =>
      prevRecords.map((record) => {
        if (matchRec(record.id)) {
          return {
            ...record,
            items: [...record.items, newItems]
          };
        }

        return record;
      })
    );
    clearForm();
  };

  const removeItems = (id: string) => {
    setRecords(
      records.map((record) => {
        if (matchRec(record.id)) {
          return {
            ...record,
            items: record.items.filter((a) => a.id !== id)
          };
        }
        return record;
      })
    );
  };
  const saveItem = () => {
    if (!form.name || !form.totalPrice) return;
    setRecords((prevRecords) =>
      prevRecords.map((record) => {
        if (matchRec(record.id)) {
          return {
            ...record,
            items: record.items.map((item) => {
              if (form.id === item.id) {
                return {
                  ...form,
                  quantity: form.quantity <= 0 ? 1 : form.quantity,
                  createdAt: `${form.date ? form.date : dayjs().format("YYYY-MM-D")} ${form.time ? form.time : dayjs().format("h:mm A")}`,
                  totalPrice: form.price
                    ? (form.price as number) * form.quantity
                    : (form.totalPrice as number),
                  price: form.price ? (form.price as number) : 0
                };
              }
              return item;
            })
          };
        }
        return record;
      })
    );
    clearForm();
    setIsEditingItem(false);
  };
  const removeWalletId = (walletId:string) => {
    setRecords((prevRecords) =>
      prevRecords.map((record) => {
        if (matchRec(record.id)) {
          return {
            ...record,
            items:record.items.map((item) => {
                if (item.walletId === walletId) {
                  // Return a new object instead of mutating the old item.
                  return { ...item, walletId: undefined };
                }
                return item;
              })
          };
        }

        return record;
      })
    );
  };
  return {
    removeWalletId,
    addItems,
    saveItem,
    removeItems
  };
}
