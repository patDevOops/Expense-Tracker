import { useState } from "react";
import dayjs from "dayjs";
import { useCustomItems } from "./useCustomItems.js";
import { useCategory } from "./useCategory.js";
import { useItems } from "./useItems.js";
import type { Dispatch, SetStateAction } from "react";
import type { FormType, RecordType } from "../../App.js";
export type UseRecordParam = {
  matchRec: (id:string) => boolean;
  clearForm: () => void;
  setIsEditingItem: (value: boolean) => void;
  form: FormType;
};

// useItems additionally receives the current records array and its React setter.
export type UseItemsParam = UseRecordParam & {
  setRecords: Dispatch<SetStateAction<RecordType[]>>;
  records: RecordType[];
};
export function useRecords({
  matchRec,
  clearForm,
  setIsEditingItem,
  form
}: UseRecordParam) {
  const [records, setRecords] = useState<RecordType[]>([
    {
      name: "untitled",
      id: "123",
      createdAt: "2026-09-20",
      status: "local",
      customItems: [
        {
          name: "candy",
          price: 1,
          categoryId: "098",
          id: "455"
        }
      ],
      category: [
        {
          categoryName: "Others",
          id: "652"
        },
        {
          categoryName: "Food",
          id: "098"
        },
        {
          categoryName: "Things",
          id: "765"
        }
      ],
      items: [
        {
          name: "Chooe",
          id: "88",
          createdAt: "2026-07-22 11:22 AM",
          quantity: 2,
          price: 15,
          category: "098",
          totalPrice: 30
        },
        {
          name: "Milk",
          id: "111",
          createdAt: "2026-09-22 11:22 AM",
          quantity: 2,
          price: 15,
          category: "098",
          totalPrice: 30
        },
        {
          name: "Candy",
          id: "112",
          createdAt: "2026-09-23 11:30 AM",
          quantity: 5,
          price: 1,
          category: "765",
          totalPrice: 5
        },
        {
          name: "ulam",
          id: "113",
          createdAt: "2026-09-22 1:30 PM",
          quantity: 1,
          price: 40,
          category: "098",
          totalPrice: 40
        }
      ]
    }
  ]);

  const deleteRecord = (id: string) => {
    setRecords(records.filter((a: { id: string }) => id !== a.id));
  };

  const addRecord = (name: string) => {
    setRecords([
      ...records,
      {
        name,
        id: crypto.randomUUID(),
        createdAt: dayjs().format("YYYY-MM-D"),
        status: "local",
        category: [
          {
            categoryName: "Product",
            id: crypto.randomUUID()
          }
        ],
        items: []
      } as unknown as RecordType // Type assertion only; preserves the original record object.
    ]);
  };

  const { addCustomItem, deleteCustomItem, saveEditCustomItem } =
    useCustomItems({ setRecords, matchRec, records });
  const { addCategory, renameCategory, deleteCategory } = useCategory({
    setRecords,
    records,
    matchRec
  });

  const { addItems, removeItems, saveItem } = useItems({
    setRecords,
    matchRec,
    clearForm,
    setIsEditingItem,
    records,
    form
  });

  return {
    addRecord,
    deleteRecord,
    records,
    addCustomItem,
    deleteCustomItem,
    saveEditCustomItem,
    addCategory,
    deleteCategory,
    renameCategory,
    addItems,
    removeItems,
    saveItem
  };
}
