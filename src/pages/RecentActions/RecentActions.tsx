// Path: src/pages/RecentActions/RecentActions.tsx

import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { Lottia } from "../../components/Lottia";
import styles from "./RecentActions.module.css";
import HistoryItem from "../../components/HistoryItem/HistoryItem";
import { useUserContext } from "../../contexts/UserContext";
import { IUserTransaction } from "../../type";
import { Trans, useTranslation } from "react-i18next";


const groupTransactionsByDate = (transactions: IUserTransaction[]) => {
  return transactions.reduce((groups: Record<string, IUserTransaction[]>, transaction) => {
    const date = transaction.createdAt.toISOString().split("T")[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {});
};

function RecentActions () {
  const { t } = useTranslation();
  const { transactionHistory } = useUserContext();

    const navigate = useNavigate();
    const handleOpenStore = () => {
        navigate("/");
    };
    
    const groupedTransactions = groupTransactionsByDate(transactionHistory);
    const hasActions = transactionHistory.length > 0

    return (
        <>
         { hasActions ? (
                <div className={styles.recentActions}>
                    <div className={styles.header}>
                        <h1>Recent Actions</h1>
                        <p>Here is your action history.</p>
                    </div>

                    <div className={styles.theseActionsGroups}>
                        {Object.keys(groupedTransactions).map((date) => (
                            <TransactionGroup key={date} date={date} actions={groupedTransactions[date]} />
                        ))}
                    </div>
                </div>
            ): (
                <div className={styles.emptyCase}>
                        <Lottia 
                                name={`emoji-balloons`} 
                                autoplay={true}
                                style={{width: "100px", height: "100px"}}
                        />
                        <h1>{t('emptyHistoryTitle')}</h1>
                        <p>
                          <Trans i18nKey="emptyHistoryDescription "comcomponents={{ br: <br /> }} />
                        </p>

                    <Button labelOne={t('openStore')} onClickOne={() => handleOpenStore()}/>
                </div>
            )}
        </>
    );
}

function TransactionGroup({ date, actions }: { date: string; actions: IUserTransaction[] }) {

    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
    }).toUpperCase();
  
    return (
      <>
        <h2 className={styles.transactionDate}>{formattedDate}</h2>
        <div className={styles.transactionItems}>
          {actions.map((action) => (
            <HistoryItem key={action._id} gift={action}  />
          ))}
        </div>
      </>
    );
  }
  

export default RecentActions;