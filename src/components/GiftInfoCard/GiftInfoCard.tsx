// Path: src/components/GiftInfoCard/GiftInfoCard.tsx

import { Ethbg, Tonbg, Usdtbg } from "../../assets/icons/Icons";
import styles from "./GiftInfoCard.module.css";
import GiftInfoRow from "./GiftInfoRow";
import { IUserTransaction } from "../../type";
import { formatDate } from "../../utils/formatDate";
import { useTranslation } from "react-i18next";

function GiftInfoCard ({gift, type}: { gift: IUserTransaction, type: string }) {
    const { t } = useTranslation();

    return (
        <div className={styles.giftInfoCard}>
          <GiftInfoRow label={type == "send" ? t("Gift") : t("From")} >
            { type === "send" ? (
              <span>{gift.giftId.name}</span>
            ) : (
              <>
                <img 
                  src={gift.from.profilePicture}
                  alt="User avatar" 
                  className={styles.avatar}
                />
                <span className={styles.username}>{ `${gift.from.firstName} ${gift.from.lastName}`}</span>
              </>
            )}
          </GiftInfoRow>
          
          <GiftInfoRow label={t("Date")}>
            <span>{formatDate(gift.createdAt.toISOString())}</span>
          </GiftInfoRow>
          
          <GiftInfoRow label={t("Price")}>
            { gift.giftId.asset === "ETH" && <Ethbg style={{marginRight: "8px"}}/> }
            { gift.giftId.asset === "USDT" && <Usdtbg style={{marginRight: "8px"}}/> }
            { gift.giftId.asset === "TON" && <Tonbg style={{marginRight: "8px"}}/> }
            <span>{`${gift.giftId.price} ${gift.giftId.asset}`}</span>
          </GiftInfoRow>
          
          <GiftInfoRow label={t("Availability")}>
            <span>{`${gift.giftId.quantityPurchased} ${t('of')} ${gift.giftId.totalInStock}`}</span>
          </GiftInfoRow>
        </div>
    );
}

export default GiftInfoCard;
