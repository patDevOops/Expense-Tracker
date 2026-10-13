import { RecordType, Category } from "../../App.tsx";

type UseCategoryProp = {
  setRecords: () => void;
  records: RecordType[];
  matchRec: (id: string) => boolean;
};
export function useCategory({
  setRecords,
  records,
  matchRec
}: UseCategoryProp) {
  console.log(records);
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
