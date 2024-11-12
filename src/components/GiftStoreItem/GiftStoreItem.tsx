// Path: src/components/GiftStoreItem/GiftStoreItem.tsx

import { useNavigate } from "react-router-dom";
import styles from "./GiftStoreItem.module.css";
import { formatQuantity } from "../../utils/formatQuantity";
import { Eth, Ton, Usdt } from "../../assets/icons/Icons";
import { Lottia } from "../Lottia";
import { IGift } from "../../type";
import { useTranslation } from "react-i18next";
import { initHapticFeedback } from "@telegram-apps/sdk";

function GiftStoreItem ({ gift }: {gift: IGift}) {
    
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { _id, name, price, asset, totalInStock, quantityPurchased } = gift;
    const hapticFeedback = initHapticFeedback();

    const handleBuyGiftClick = (giftId: string) => {
            hapticFeedback.impactOccurred('light');
            navigate(`/store/${giftId}`);
    };

    return (
        <div className={`${styles.giftStoreItem} ${styles[name.toLowerCase().replace(/\s+/g, "")+"Gradient"]}`}>
            <div className={styles.remainingQuantity}>
                {quantityPurchased} {t('of')} {formatQuantity(totalInStock)}
            </div>
            <Lottia 
                name={`gift-${name.toLocaleLowerCase().replace(/\s/g, "-")}`} 
                autoplay={true} 
                style={{
                    width: "128px", 
                    height: "128px",
                    ...(name !== "Delicious Cake" && { paddingBottom: "12px" })
                }}
            />
            <h2 className={styles.giftName}>{name}</h2>
            <div className={styles.priceBtnToOpenGift} onClick={() => handleBuyGiftClick(_id)}>
                { asset === "ETH" && <><Eth/> <span>{price} {asset}</span></> }
                { asset === "USDT" && <><Usdt/> <span>{price} {asset}</span></> }
                { asset === "TON" && <><Ton/> <span>{price} {asset}</span></> }
            </div>
        </div>
    );
}

export default GiftStoreItem;