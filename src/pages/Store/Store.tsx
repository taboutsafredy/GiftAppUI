// Path: src/pages/Store/Store.tsx

import { Gift } from "../../assets/icons/Icons";
import GiftStoreItem from "../../components/GiftStoreItem/GiftStoreItem";
import styles from "./Store.module.css";
import { useGiftContext } from '../../contexts/GiftContext';
import { useTranslation } from "react-i18next";
import { initBackButton } from "@telegram-apps/sdk";


function Store() {
    const { gifts } = useGiftContext();
    const { t } = useTranslation();
    const [backButton] = initBackButton();

    backButton.hide();

    return (
        <div className={styles.store}>
            <div className={styles.header}>
                <div className={styles.giftIconAndTitle}>
                    <Gift />
                    <h1>{t('storeTitle')}</h1>
                </div>
                <p>{t('storeDescription')}</p>
            </div>

            <div className={styles.storeContainer}>

                {gifts.map((gift, index) => (
                    <GiftStoreItem key={index} gift={gift} />
                ))}
                
            </div>
        </div>
    );
}

export default Store;