// Path: src/components/GiftInProfile/GiftInProfile.tsx

import { formatQuantity } from '../../utils/formatQuantity';
import { Drawer } from 'vaul';
import { Lottia } from '../Lottia';
import styles from './GiftInProfile.module.css';
import Button from '../Button/Button';
import GiftInfoCard from '../GiftInfoCard/GiftInfoCard';
import { Close } from '../../assets/icons/Icons';
import { IGiftReceived } from '../../type';
import { useTranslation } from 'react-i18next';
import { initHapticFeedback } from '@telegram-apps/sdk';

function GiftInProfile ({ gift }: {gift: IGiftReceived}) {
    const { t } = useTranslation();
    const hapticFeedback = initHapticFeedback();
    const handleClose = () => {
        hapticFeedback.impactOccurred('light');
    }

    return (
        <Drawer.Root 
            closeThreshold={0.5}
            modal={true}
            handleOnly={true}
            disablePreventScroll={true}>

        <Drawer.Trigger asChild={true} className={styles.sendBtnContainer}>
            <div className={styles.giftInProfile}>
                <div className={styles.pfpAndRemainingQuantity}>
                    <img src={gift.from.profilePicture} alt="Profile Picture" />
                    <p>{gift.giftId.quantityPurchased} {t('of')} {formatQuantity(gift.giftId.totalInStock)}</p>
                </div>
                <Lottia
                    name={`gift-${gift.giftId.name.toLocaleLowerCase().replace(/\s/g, "-")}`} 
                    autoplay={true}
                    style={{ width: "80px", height: "80px" }}
                />
                <p className={styles.giftName}>{gift.giftId.name}</p>
            </div>
        </Drawer.Trigger>
        <Drawer.Portal>
            <Drawer.Overlay className={styles.customOverlay} />
            <Drawer.Content 
                className={styles.aboutGiftContent} 
                onOpenAutoFocus={e => e.preventDefault()}
            >
                <div data-vaul-no-drag className={styles.aboutThisGift}>
                    <Drawer.Close asChild={true} className={styles.closeBtnContainer}>
                        <div onClick={() => handleClose()} >
                            <div className={styles.closeIt}>
                                <Close/>
                            </div>
                        </div>
                    </Drawer.Close>
                    <div className={styles.giftAnimationContainer}>
                        <Lottia 
                            name={`gift-${gift.giftId.name.toLocaleLowerCase().replace(/\s/g, "-")}`} 
                            autoplay={true}
                            style={{
                                width: "150px", 
                                height: "150px",   
                                ...(gift.giftId.name !== "Delicious Cake" && { paddingBottom: "12px" })
                            }}
                        />
                    </div>
                    <Drawer.Title className={styles.giftTitle}>{gift.giftId.name}</Drawer.Title>
                    <GiftInfoCard type="received" gift={gift} />
                    <Drawer.Close asChild={true} className={styles.closeSheetContainer}>
                        <div onClick={() => handleClose()}>
                            <Button labelOne={t('closeLabel')} />
                        </div>
                    </Drawer.Close>
                </div>
            </Drawer.Content>
        </Drawer.Portal>
        </Drawer.Root>
    );
}

export default GiftInProfile;