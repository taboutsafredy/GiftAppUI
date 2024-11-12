// Path: src/utils/groupTransactions.ts

import { IUserTransaction } from "../type";

export const groupTransactionsByDate = (transactions: IUserTransaction[]) => {
    return transactions.reduce((groups: Record<string, IUserTransaction[]>, transaction) => {
      const date = transaction.createdAt.toISOString().split("T")[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    }, {});
  };