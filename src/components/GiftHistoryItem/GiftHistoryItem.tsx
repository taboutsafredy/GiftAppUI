// src/components/GiftHistoryItem/GiftHistoryItem.tsx

import { Buy, Sent } from "../../assets/icons/Icons";
import styles from "./GiftHistoryItem.module.css";
import { IGiftRecentTransaction } from "../../type";
import { useTranslation } from "react-i18next";

function GiftHistoryItem ({ transaction }: {transaction : IGiftRecentTransaction}) {
    const { t } = useTranslation();
    return (
        <div className={styles.giftHistoryItem}>
            <div className={styles.left} style={{ backgroundImage: `url(${transaction.from.profilePicture})` }}>
                {transaction.to ? <Sent className={styles.sent} /> : <Buy className={styles.purchase} />}
            </div>
            <div className={styles.right}>
                <h3>{transaction.to ? t('transationSendGift') : t('transactionBuyGift')}</h3>
                <p>
                    {transaction.to ? (
                        <>
                            <span className={styles.viewIt}>{`${transaction.from.firstName} ${transaction.from.lastName ? transaction.from.lastName : ""}`}</span> {t('sendGiftTo')} <span className={styles.viewIt}>{`${transaction.to.firstName} ${transaction.to.lastName}`}</span>
                        </>
                    ) : (
                        <>
                            <span className={styles.viewIt}>{`${transaction.from.firstName} ${transaction.from.lastName ? transaction.from.lastName : ""}`}</span> {t('boughtGift')}
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}

export default GiftHistoryItem;
