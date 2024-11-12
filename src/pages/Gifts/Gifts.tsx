// Path: src/pages/Gifts/Gifts.tsx

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Lottia } from "../../components/Lottia";
import GiftPurchasedItem from "../../components/GiftPurchasedItem/GiftPurchasedItem";
import styles from "./Gifts.module.css";
import { useGiftContext } from '../../contexts/GiftContext';
import { initInitData } from "@telegram-apps/sdk";
import { useTranslation } from "react-i18next";


function Gifts () {
    const { t } = useTranslation();
    const initData = initInitData();
    const getUserId = initData?.user?.id.toString()!;
    const { loadAvailableToBeSendGifts, giftsAvailableToBeSend } = useGiftContext();
    const navigate = useNavigate();

    useEffect( () => {
        if (getUserId) {
            loadAvailableToBeSendGifts(getUserId);
        }
    }, [])

    const handleOpenStore = () => {
        navigate("/");
    };
    
    return (
        <div className={styles.gifts}> 
            <div className={styles.giftsHeader}>
                <h1>{t('giftsTitle')}</h1>
                <p>{t('giftsDescription')}</p>
            </div>
            
            <div className={styles.giftsAvailableToBeSendAndEmptyCase}>
                {giftsAvailableToBeSend.length > 0 ? (
                    <div className={styles.giftsAvailableToBeSend}>
                        {giftsAvailableToBeSend.map((gift) => (
                            <GiftPurchasedItem key={gift._id} gift={gift} />
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyCase}>
                        <Lottia 
                            name={`emoji-balloons`} 
                            autoplay={true}
                            style={{width: "100px", height: "100px"}}
                        />
                        <p className={styles.nothingYet}>{t('emptyNothingYet')}</p>
                        <p className={styles.openStore} onClick={() => handleOpenStore()}>{t('openStore')}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Gifts;
