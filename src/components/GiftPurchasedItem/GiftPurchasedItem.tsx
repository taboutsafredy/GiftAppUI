// Path: src/components/GiftPurchaseItem/GiftPurchasedItem.tsx

import styles from "./GiftPurchasedItem.module.css";
import { Lottia } from "../Lottia";
import { Drawer } from "vaul";
import { Close } from "../../assets/icons/Icons";
import Button from "../Button/Button";
import GiftInfoCard from "../GiftInfoCard/GiftInfoCard";
import { IUserTransaction } from "../../type";
import { initHapticFeedback, initMiniApp } from "@telegram-apps/sdk";
import { useTranslation } from "react-i18next";

function GiftPurchasedItem( { gift }: {gift: IUserTransaction}) {
    const { t } = useTranslation();
    const hapticFeedback = initHapticFeedback();
    const [miniApp] = initMiniApp();
    
    const handleSendGift = () => {
        hapticFeedback.impactOccurred('light');
        miniApp.switchInlineQuery(`${gift._id}`, ['users']);
    }

    const handleClose = () => {
        hapticFeedback.impactOccurred('light');
    }

    return (
        <div className={styles.giftPurchasedItem}>
            <h3 className={styles.title}>{gift.giftId.name}</h3>
            <Lottia 
                name={`gift-${gift.giftId.name}.toLocaleLowerCase().replace(/\s/g, "-")}`} 
                autoplay={true}
                style={{width: "80px", height: "80px", ...(gift.giftId.name !== "Delicious Cake" ? { paddingBottom: "12px" } : { paddingBottom: "5px" }) }}
            />

            <Drawer.Root 
                closeThreshold={0.5}
                modal={true}
                handleOnly={true}
                disablePreventScroll={true}>

                <Drawer.Trigger asChild={true} className={styles.sendBtnContainer}>
                    <button className={styles.send}>
                        {t('send')}
                    </button>
                </Drawer.Trigger>
                <Drawer.Portal>
                    <Drawer.Overlay className={styles.customOverlay} />
                    <Drawer.Content 
                        className={styles.aboutGiftContent} 
                        onOpenAutoFocus={e => e.preventDefault()}
                    >
                        <div data-vaul-no-drag className={styles.aboutThisGift}>
                            <Drawer.Close asChild={true} className={styles.closeBtnContainer}>
                                <div onClick={() => handleClose()}>
                                    <div className={styles.closeIt}>
                                        <Close/>
                                    </div>
                                </div>
                            </Drawer.Close>
                            <div className={styles.giftAnimationContainer}>
                                <Lottia 
                                    name={`gift-${gift.giftId.name.toLocaleLowerCase().replace(/\s/g, "-")}`} 
                                    autoplay={true}
                                    loop={true}
                                    style={{
                                        width: "150px", 
                                        height: "150px",   
                                        ...(gift.giftId.name !== "Delicious Cake" && { paddingBottom: "12px" })
                                    }}
                                />
                            </div>
                            <Drawer.Title className={styles.giftTitle}>{t('transationSendGift')}</Drawer.Title>
                            <GiftInfoCard gift={gift}  type="send"/>
                            <Button labelOne={t('buttonLabelOne')} onClickOne={() => handleSendGift()} />
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </div>
    );
}

export default GiftPurchasedItem;