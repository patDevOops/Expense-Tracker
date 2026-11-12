import { useState } from "react";
import dayjs from "dayjs";
import { useCustomItems } from "./useCustomItems.js";
import { useCategory } from "./useCategory.js";
import { useItems } from "./useItems.js";
import { useWallet } from "./useWallet.ts";
import type { Dispatch, SetStateAction } from "react";
import type { FormType, RecordType } from "../../App.js";

export type UseRecordParam = {
  matchRec: (id: string) => boolean;
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
  const [records, setRecords] = useState<RecordType[]>(
    JSON.parse(localStorage.getItem("records")) || [
      {
        name: "untitled",
        id: "123",
        createdAt: "2026-09-20",
        status: "local",
        wallets: [
          {
            id: "1",
            amount: 10000,
            details: "salary on my bank",
            date: "2026-10-08"
          },
          {
            id: "2",
            amount: -10,
            details: "expense on ulam",
            date: "2026-10-08"
          },
          {
            id: "3",
            amount: -5,
            details: "expense on Candy",
            date: "2026-09-23"
          }
        ],
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
            totalPrice: 5,
            walletId: "3"
          },
          {
            name: "ulam",
            id: "113",
            createdAt: "2026-09-22 1:30 PM",
            quantity: 1,
            price: 40,
            category: "098",
            totalPrice: 40,
            walletId: "2"
          }
        ]
      }
    ]
  );

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
        items: [],
        customItems: [],
        wallets:[]
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
  const { addWalletRecord,saveWalletEdited ,deleteWalletRecord} = useWallet({ matchRec, setRecords, records });
  return {
    deleteWalletRecord,
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
    saveItem,
    addWalletRecord,
    saveWalletEdited
  };
}
