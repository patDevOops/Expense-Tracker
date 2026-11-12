import type { WalletType, RecordType } from "../../App.tsx";
import type { Dispatch, SetStateAction } from "react";

type UseWalletParam = {
  setRecords: Dispatch<SetStateAction<RecordType[]>>;
  matchRec: (id: string) => boolean;
};
export function useWallet({ setRecords, matchRec }: UseWalletParam) {
  
  const addWalletRecord = (newWalletRecord: WalletType) => {
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
  const saveWalletEdited = (form: WalletType) => {
    setRecords((prevRecords) =>
      prevRecords.map((record) => {
        if (matchRec(record.id)) {
          return {
            ...record,
            wallets: record.wallets.map((wallet) => {
              if (form.id === wallet.id) {
                console.log("newedited", {
                  ...wallet,
                  details: form.details,
                  amount: form.amount,
                  date: form.date
                });
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
  const deleteWalletRecord = (id: string) => {
    setRecords((prevRecords) =>
      prevRecords.map((record) => {
        if (matchRec(record.id)) {
          console.log("seeee")
          return {
            ...record,
            wallets: record.wallets.filter((a) => a.id !== id)
          };
        }
        return record;
      })
    );
  };
  return { addWalletRecord, saveWalletEdited,deleteWalletRecord };
}
