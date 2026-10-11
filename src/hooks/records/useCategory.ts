export function useCategory(setRecords, matchRec) {
    const addCategory = newCategory => {
        setRecords(
            records.map(record => {
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
    const renameCategory = newName => {
        setRecords(
            records.map(record => {
                if (matchRec(record.id)) {
                    return {
                        ...record,
                        category: record.category.map(a =>
                            a.id == newName.id ? newName : a
                        )
                    };
                }
                return record;
            })
        );
    };
    const deleteCategory = id => {
        setRecords(
            records.map(record => {
                if (matchRec(record.id)) {
                    return {
                        ...record,
                        category: record.category.filter(a => a.id !== id)
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
