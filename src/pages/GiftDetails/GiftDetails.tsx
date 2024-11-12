// Path: src/pages/GiftDetails/GiftDetails.tsx

import { useNavigate, useParams } from "react-router-dom";
import styles from "./GiftDetails.module.css";
import { useEffect, useState } from "react";
import { Ethbg, Tonbg, Usdtbg } from "../../assets/icons/Icons";
import Button from "../../components/Button/Button";
import GiftHistoryItem from "../../components/GiftHistoryItem/GiftHistoryItem";
import { Lottia } from "../../components/Lottia";
import { useGiftContext } from '../../contexts/GiftContext';
import { IGift } from "../../type";
import { formatQuantity } from "../../utils/formatQuantity";
import { initInitData, initUtils } from "@telegram-apps/sdk";
import { useTranslation, Trans } from "react-i18next";
import { initBackButton } from '@telegram-apps/sdk';

function GiftDetails () {
    const { t } = useTranslation();
    const { gifts, loadRecentTransactions, giftsRecentTransaction, purchase } = useGiftContext();
    const { giftId } = useParams<{ giftId: string }>();
    const [ gift, setGift ] = useState<IGift | undefined>(undefined);
    const initData = initInitData();
    const utils = initUtils();
    const navigate = useNavigate();
    const [backButton] = initBackButton();

    backButton.show();
    backButton.on('click', () => {
        navigate("/");
    });

    useEffect(() => {
        const selectedGift = gifts.find(gift => gift._id === giftId);
        setGift(selectedGift);
    }, [gifts, giftId]);

    useEffect( () => {
        if (gift) {
            loadRecentTransactions(gift?._id);
        }
    }, [])

    const handlePurchaseGift = async () => {
        const getUserId = initData?.user?.id.toString()!;
        const { invoiceUrl } = await purchase(getUserId, gift?._id!);
        if (invoiceUrl) {
            utils.openTelegramLink(invoiceUrl);
        }
    }

    return (
        <div className={styles.giftDetails}>
            <div className={styles.giftCard}>
                <div className={styles.giftViewer}>
                    <Lottia 
                        name={`gift-${gift?.name.toLocaleLowerCase().replace(/\s/g, "-")}`}
                        autoplay={true}
                        loop={true}
                        style={{
                            width: "267.87px", 
                            height: "267.87px",
                        }}
                    />
                </div>
                <div className={styles.giftDescription}>
                     <div className={styles.giftNameAndRemainingQuantity}>
                        <h1>{gift?.name}</h1>
                        <p>{gift?.quantityPurchased} {t('of')} { formatQuantity(gift?.totalInStock || 0)}</p>
                     </div>

                     <p className={styles.descriptionText}>
                        {t('giftDetailsDeascription')}
                     </p>

                     <div className={styles.giftPrice}>
                        { gift?.asset === "ETH" && <><Ethbg/> {gift.price} {gift?.asset} </> }
                        { gift?.asset === "USDT" && <><Usdtbg/> {gift.price} {gift?.asset}</> }
                        { gift?.asset === "TON" && <><Tonbg/> {gift.price} {gift?.asset}</> }
                     </div>
                </div>
            </div>
            <hr />
            <div className={styles.recentlyActions}>
                <h2>{t('recentlyActionTitle')}</h2>
                {giftsRecentTransaction.length > 0 ? (
                    giftsRecentTransaction.map((transaction) => (
                        <GiftHistoryItem key={transaction._id} transaction={transaction}/>
                    ))
                ) : (
                    <div className={styles.emptyCase}>
                         <Lottia 
                                name={`emoji-balloons`} 
                                autoplay={true}
                                style={{width: "70px", height: "70px"}}
                        />
                        <h2>{t('emptyHistoryTitle')}</h2>
                        <p><Trans i18nKey="emptyHistoryDescription" components={{ br: <br /> }} /></p>

                    </div>
                )}
            </div>
            <Button labelOne={t('buyAGift')} onClickOne={() => handlePurchaseGift()}/>
        </div>
    );
}

export default GiftDetails;