export function useWallet({ setRecords, matchRec,records}) {
  const addWalletRecord = (newWalletRecord) => {
    setRecords((prevRecords) =>
      prevRecords.map((record) => {
        if (matchRec(record.id)) {
          return {
            ...record,
            wallets: [...(record.wallets ?? []), newWalletRecord]
          };
        }

        return record;
      })
    );
  };
  const saveWalletEdited = (form) => {
    setRecords((prevRecords)=>
      prevRecords.map((record) => {
        if (matchRec(record.id)) {
          return {
            ...record,
            wallets: record.wallets.map((wallet) => {
              if (form.id === wallet.id) {
                console.log("newedited",{
                  ...wallet,
                  details: form.details,
                  amount: form.amount,
                  date: form.date
                })
                return {
                  ...wallet,
                  details: form.details,
                  amount: form.amount,
                  date: form.date
                };
              }
              return wallet;
            })
          };
        }
        return record;
      })
    );
  };
  return { addWalletRecord,saveWalletEdited };
}
