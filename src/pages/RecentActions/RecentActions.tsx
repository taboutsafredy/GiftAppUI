// Path: src/pages/RecentActions/RecentActions.tsx

import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { Lottia } from "../../components/Lottia";
import styles from "./RecentActions.module.css";
import HistoryItem from "../../components/HistoryItem/HistoryItem";
import { useUserContext } from "../../contexts/UserContext";
import { IUserTransaction } from "../../type";
import { Trans, useTranslation } from "react-i18next";
import { initBackButton, initHapticFeedback } from "@telegram-apps/sdk";
import { groupTransactionsByDate } from "../../utils/groupTransactions";

function RecentActions () {

    const [backButton] = initBackButton();
    const { t } = useTranslation();
    const { transactionHistory } = useUserContext();
    const navigate = useNavigate();
    const hapticFeedback = initHapticFeedback();

    backButton.show();
    backButton.on('click', () => {
        navigate("/profile");
    });

    const handleOpenStore = () => {
        hapticFeedback.impactOccurred("light");
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
                          <Trans i18nKey="emptyHistoryDescription" components={{ br: <br />}} />
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