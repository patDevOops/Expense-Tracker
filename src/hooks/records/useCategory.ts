import type { Dispatch, SetStateAction } from "react";
import type { RecordType, Category } from "../../App.js";

type UseCategoryProp = {
  // setRecords is the React state setter for the complete records array.
  setRecords: Dispatch<SetStateAction<RecordType[]>>;
  records: RecordType[];
  matchRec: (id: string) => boolean;
};
export function useCategory({
  setRecords,
  records,
  matchRec
}: UseCategoryProp) {
  const addCategory = (newCategory: Category) => {
    setRecords(
      records.map((record) => {
        if (matchRec(record.id)) {
          return {
            ...record,
            category: [...record.category, newCategory]
          };
        }
        return record;
      })
    );
  };
  const renameCategory = (newName: Category) => {
    setRecords(
      records.map((record) => {
        if (matchRec(record.id)) {
          return {
            ...record,
            category: record.category.map((a) =>
              a.id == newName.id ? newName : a
            )
          };
        }
        return record;
      })
    );
  };
  const deleteCategory = (id: string) => {
    setRecords(
      records.map((record) => {
        if (matchRec(record.id)) {
          return {
            ...record,
            category: record.category.filter((a) => a.id !== id)
          };
        }
        return record;
      })
    );
  };
  return {
    deleteCategory,
    addCategory,
    renameCategory
  };
}
