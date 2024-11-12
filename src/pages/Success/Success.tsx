// Path: src/pages/Success/Success.tsx

import styles from "./Success.module.css";
import Button from "../../components/Button/Button";
import { Lottia } from "../../components/Lottia";
import { Toaster, toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGiftContext } from "../../contexts/GiftContext";
import { useUserContext } from "../../contexts/UserContext";
import { IUserTransaction } from "../../type";
import { useTranslation } from "react-i18next";


function Success ( ) {
    const { t } = useTranslation();
    const [ gift, setGift] = useState<IUserTransaction | null>(null);
    const { successfullyPurchased, receive } = useGiftContext();
    const { user } = useUserContext();
    const { successId } = useParams<{ successId: string }>();
    const successType = successId?.split("__")[0];
    const originalSuccessId = successId?.split("__")[1]!;
    const type :"purchased" | "received" = successType == "purch" ? "purchased" : "received";

    useEffect(() => {
        const fetchDetailsInTheTwoCases = async () => {
            if (type == "purchased") {
                const giftPruchased = await successfullyPurchased(originalSuccessId);
                setGift(giftPruchased);
            } else {
                const giftReceived = await receive(user?._id!, originalSuccessId);
                setGift(giftReceived);
            }
        }
        fetchDetailsInTheTwoCases();
    }, []);


    const toastShown = useRef(false);
    const navigate = useNavigate();
    const handleOpenProfile = () => {
        navigate("/profile");
    }

    const handleOpenStore = () => {
        navigate("/");
    }

    const handleSendGift = () => {
        navigate("/gifts")
    }


    useEffect(() => {
        if(!toastShown.current) {
            toastShown.current = true;

            setTimeout(() => {
                toast.custom(() => (
                    <div className={styles.notification} style={ type === "purchased" ? {marginBottom: "145px"} : {marginBottom: "90px"} }>
                      <div className={styles.left}>
                        <Lottia 
                            name={`gift-${gift?.giftId.name.toLocaleLowerCase().replace(/\s/g, "-")}`} 
                            autoplay={true}
                            loop={true}
                            style={{
                                width: "28px", 
                                height: "28px",   
                            }}
                        />
                        <div className={styles.notifDescription}>
                            <h2>{type === "purchased" ? t('youBoughtAGift') : t('giftReceive')}</h2>
                            <p className={styles.description}>
                                {type === "purchased" ? 
                                    t('sendIt') : 
                                    `${gift?.giftId.name} ${t('from')} ${gift?.from.firstName}${gift?.from.lastName ? ` ${gift.from.lastName}` : ''}.`}
                            </p>
                        </div>
                      </div>
                      <div className={styles.right}>
                            { type === "purchased" ? <span onClick={() => handleSendGift()}>{t('send')}</span> : <span onClick={() => handleOpenProfile()}>{t('view')}</span> }
                      </div>
                    </div>
                ), { duration: 3000, position: "bottom-center"});
            });
        }
    }, []);

    return (
        <div className={styles.success}>
            <div className={styles.gift}>
                <div className={styles.lotties}>
                    {type === "purchased" &&
                        <Lottia
                            name="effect-gift-purchased" 
                            autoplay={true}
                            style={{
                                width: "250px", 
                                height: "250px",   
                                ...(gift?.giftId.name !== "Delicious Cake" && { paddingBottom: "12px" }),
                                position: "absolute",
                            }}
                        />
                    }
                    <Lottia 
                        name={`gift-${gift?.giftId.name.toLocaleLowerCase().replace(/\s/g, "-")}`} 
                        autoplay={true}
                        loop={true}
                        style={{
                            width: "150px", 
                            height: "150px",   
                            ...(gift?.giftId.name !== "Delicious Cake" && { paddingBottom: "12px" })
                        }}
                    />
                </div>
                <div className={styles.giftDescription}>
                    <h1>{type === "purchased" ? t('successPurchaseTitle') : t('successReceiveTitle')}</h1>
                    <p className={styles.description}>
                        {type === "purchased" ? (
                            <>
                                {t('the')} <strong>{gift?.giftId.name}</strong> {t('giftWasPurchased')} <strong>{gift?.giftId.price}</strong> <strong>{gift?.giftId.asset}</strong>.
                            </>
                        ) : (
                            <>
                                {t('giftWasReceived')} <strong>{gift?.giftId.name}</strong>.
                            </>
                        )}
                    </p>
                </div>
                <Toaster/>
                { type === "purchased" ? 
                    <Button labelOne={t('buttonPurchasedLabelOne')} labelTwo={t('buttonPurchasedLabelTwo')} onClickOne={() => handleSendGift()} onClickTwo={() => handleOpenStore()}/> : 
                    <Button labelOne={t('buttonReceivedLabelOne')}  onClickOne={() => handleOpenProfile()}/> }
            </div>
        </div>
    );
}

export default Success;