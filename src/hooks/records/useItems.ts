
import dayjs from 'dayjs';
import type {UseRecordParam} from './useRecords.ts';
import type {Item} from '../../App.tsx';
export function useItems({
  setRecords,
  matchRec,
  clearForm,
  setIsEditingItem,
  records,
  form
}:UseRecordParam) {
  const addItems = (newItems:Item) => {
    console.log(newItems)
    setRecords(
      records.map((record) => {
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

  const removeItems = (id:string) => {
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
    setRecords(
      records.map((record) => {
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
                    ? form.price * form.quantity
                    : form.totalPrice,
                  price: form.price ? form.price : 0
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

  return {
    addItems,
    saveItem,
    removeItems
  };
}
