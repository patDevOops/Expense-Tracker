import { useState } from "react";
import dayjs from "dayjs";
import { useCustomItems } from "./useCustomItems";
import { useCategory } from "./useCategory";
import { useItems } from "./useItems";
type Record = {
  name: string;
  id: string;
  createdAt: string;
  status: string;
  items: {
    name: string;
    id: string;
    createdAt: string;
    quantity: number;
    price: number;
    category: string;
    totalPrice: number;
  }[];
  customItems: {
    name: string;
    price: number;
    categoryId: string;
    id: string;
  }[];
  category: {
    categoryName: string;
    id: string;
  }[];
};
type UseRecordParam = {
  matchRec: () => boolean;
  clearForm: () => void;
  setIsEditingItem: () => void;
};
export function useRecords({
  matchRec,
  clearForm,
  setIsEditingItem
}: UseRecordParam) {
  const [records, setRecords] = useState<Record[]>([
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
            id: "098765"
          }
        ],
        items: []
      }
    ]);
  };

  const { addCustomItem, deleteCustomItem, saveEditCustomItem } =
    useCustomItems({ setRecords, matchRec, records });
  console.log(records);
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
    records
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
