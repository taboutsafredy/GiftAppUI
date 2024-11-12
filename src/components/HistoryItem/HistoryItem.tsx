// src/components/HistoryItem/HistoryItem.tsx

import styles from "./HistoryItem.module.css";
import { BlueStar, GreenStar, RedStar, DeliciousCake,} from "../../assets/images/index";
import { Buy, Sent, Receive } from "../../assets/icons/Icons";
import  { IUserTransaction } from "../../type";
import { useTranslation } from "react-i18next";

function HistoryItem ({ gift } : {gift: IUserTransaction}) {
    const { t } = useTranslation();

    return (
        <div className={styles.historyItem}>
            <div className={styles.left}>
                { gift.giftId.name === "Blue Star" && <img src={BlueStar} alt={gift.giftId.name} className={styles.giftImage} /> }
                { gift.giftId.name === "Green Star" && <img src={GreenStar} alt={gift.giftId.name} className={styles.giftImage} /> }
                { gift.giftId.name === "Red Star" && <img src={RedStar} alt={gift.giftId.name} className={styles.giftImage} /> }
                { gift.giftId.name === "Delicious Cake" && <img src={DeliciousCake} alt={gift.giftId.name} className={styles.giftImage} /> }

                { gift.type === "purchase" && <Buy className={styles.statusType}/> }
                { gift.type === "send" && <Sent className={styles.statusType}/> }
                { gift.to?._id === "received" && <Receive className={styles.statusType}/> }
            </div>

            <div className={styles.right}>
                <div className={styles.leftTypeAndName}>
                    <p>{gift.type == "purchase"? t('Buy') : gift.type == "send"? t('Sent') : t('Received') }</p>
                    <h3>{gift.giftId.name}</h3>
                </div>
                { gift.type === "purchase" && <p className={styles.description}>-{gift.giftId.price} {gift.giftId.asset}</p> }
                { gift.type === "send" && <p className={styles.description}>{t('to')} <span className={styles.viewIt}>{gift.to?.firstName} {gift.to?.lastName}</span></p> }
                { gift.to?._id === "received" && 
                <p className={styles.description}>{t('from')} 
                    <span className={styles.viewIt}>
                        {gift.from?.firstName}
                        {gift.from?.lastName ? ` ${gift.from.lastName}` : ''}
                    </span>
                </p> }
            </div>
        </div>
    );
}

export default HistoryItem;