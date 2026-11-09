export function useWallet({ setRecords, matchRec }) {
  const addWalletRecord = (newWalletRecord) => {
    setRecords(prevRecords =>
      prevRecords.map(record => {
        if (matchRec(record.id)) {
          return {
            ...record,
            wallets: [
              ...(record.wallets ?? []),
              newWalletRecord
            ]
          };
        }

        return record;
      })
    );
  };

  return { addWalletRecord };
}