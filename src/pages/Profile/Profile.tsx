// Path: src/pages/Profile/Profile.tsx

import { useState, useEffect } from 'react';
import styles from "./Profile.module.css";
import { Timer } from "../../assets/icons/Icons";
import { useNavigate } from "react-router-dom";
import { Lottia } from "../../components/Lottia";
import GiftInProfile from "../../components/GiftInProfile/GiftInProfile";
import { Trans, useTranslation } from 'react-i18next';
import { useUserContext } from "../../contexts/UserContext";
import { IGiftReceived, ICurrentProfile } from '../../type';
import { useParams } from 'react-router-dom';
import { getUser, getUserRank } from '../../api/api';
import { initInitData } from '@telegram-apps/sdk';

function Profile() {
    const { userId } = useParams<{ userId: string }>();
    const initData = initInitData();
    const itsCurrentUser = userId === initData?.user?.id;
    const { user, fetchGiftsReceivedByUser } = useUserContext();
    const [ gifts, setGifts ] = useState<IGiftReceived[]>([]);
    const [ currentProfile, sentCurrentProfile ] = useState<ICurrentProfile | null>(null);
    const [isLightTheme, setIsLightTheme] = useState(false);
    const { t, i18n } = useTranslation();


    useEffect(() => {
        if (isLightTheme) {
          document.body.classList.add('light');
          document.body.classList.remove('dark');
        } else {
          document.body.classList.add('dark');
          document.body.classList.remove('light');
        }
    }, [isLightTheme]);

    useEffect(() => {
        const loadProfile = async () => {
            if (userId) {
                try {
                    const giftsReceived = await fetchGiftsReceivedByUser(userId);
                    setGifts(giftsReceived);
                    const { rank } = await getUserRank(userId);
                    const user = await getUser(userId);
                    sentCurrentProfile({ rank, user });

                } catch (error) {
                    console.error("error while getting this profile! :", error);
                }
            } else if (user) {
               try {
                    const giftsReceived = await fetchGiftsReceivedByUser(user._id);
                    setGifts(giftsReceived);
                    const { rank } = await getUserRank(user._id);
                    sentCurrentProfile({ rank, user });
               } catch (error) {
                    console.error("error while getting this profile! :", error);
               }
            }
        }
        
        loadProfile();
    }, [userId, user, fetchGiftsReceivedByUser]);


    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const navigate = useNavigate();

    const handleOpenStore = () => {
        navigate("/");
    };

    const showRecentActions = () => {
        navigate("/profile/recentactions")
    };

    return (
        <div className={styles.profile}> 
            <div className={styles.profileInformations}>
                <div className={styles.profilePictureAndUsername}>
                    <div className={styles.profilePictureAndRank} style={{ backgroundImage: `url(${currentProfile?.user.profilePicture})`}}>
                        { currentProfile?.rank! > 3 && <span className={styles.rank}>#{currentProfile?.rank}</span>}
                    </div>

                    <div className={styles.usernameAndReceivedGift}>
                        <h1 className={styles.username}>
                          {currentProfile?.user.firstName}
                          {currentProfile?.user.lastName && ` ${currentProfile.user.lastName}`}
                        </h1>                        
                        <p className={styles.totalGiftReceived}>{gifts.length} {gifts.length >= 2 ? t('giftsReceived'):t('giftReceived')}</p>
                    </div>
                </div>

                {!itsCurrentUser && <div className={styles.recentActions} onClick={() => showRecentActions()}>
                    <Timer/><p>{t('recentActionTitle')} ›</p>
                </div>}
            </div>

            {gifts.length > 0 ? (
                <div className={styles.allGiftReceived}>
                    {gifts.map((gift, index) => (
                        <GiftInProfile key={index} gift={gift} />
                    ))}
                </div>
            ) : (
                <div className={styles.emptyCase}>
                    <Lottia 
                            name={`emoji-balloons`} 
                            autoplay={true}
                            style={{width: "100px", height: "100px"}}
                    />
                    <p className={styles.nothingYet}>
                        <Trans i18nKey="buyGift" components={{ br: <br /> }} />
                    </p>
                    <p className={styles.openStore} onClick={() => handleOpenStore()}>{t('openStore')}</p>
                </div>
            )}

            { !itsCurrentUser && <div className={styles.toggleThemeAndToggleLanguage}>
                <input 
                    type="checkbox" 
                    id="theme" 
                    checked={isLightTheme}
                    onChange={() => setIsLightTheme(!isLightTheme)}
                />
                <label htmlFor="theme">
                    <svg width="16" height="16" viewBox="0 0 16 16" id="light" xmlns="http://www.w3.org/2000/svg" className={styles.light}>
                        <path d="M8.76562 0.996094V2.34961C8.76562 2.55924 8.68815 2.73926 8.5332 2.88965C8.38281 3.04004 8.2028 3.11523 7.99316 3.11523C7.78809 3.11523 7.60807 3.04004 7.45312 2.88965C7.30273 2.73926 7.22754 2.55924 7.22754 2.34961V0.996094C7.22754 0.786458 7.30273 0.606445 7.45312 0.456055C7.60807 0.305664 7.78809 0.230469 7.99316 0.230469C8.2028 0.230469 8.38281 0.305664 8.5332 0.456055C8.68815 0.606445 8.76562 0.786458 8.76562 0.996094ZM8.76562 13.7246V15.0781C8.76562 15.2878 8.68815 15.4678 8.5332 15.6182C8.38281 15.7731 8.2028 15.8506 7.99316 15.8506C7.78809 15.8506 7.60807 15.7731 7.45312 15.6182C7.30273 15.4678 7.22754 15.2878 7.22754 15.0781V13.7246C7.22754 13.515 7.30273 13.335 7.45312 13.1846C7.60807 13.0342 7.78809 12.959 7.99316 12.959C8.2028 12.959 8.38281 13.0342 8.5332 13.1846C8.68815 13.335 8.76562 13.515 8.76562 13.7246ZM15.0273 8.80273H13.6807C13.4756 8.80273 13.2956 8.72754 13.1406 8.57715C12.9902 8.42676 12.915 8.24674 12.915 8.03711C12.915 7.83203 12.9902 7.6543 13.1406 7.50391C13.2956 7.34896 13.4756 7.27148 13.6807 7.27148H15.0273C15.2415 7.27148 15.4238 7.34896 15.5742 7.50391C15.7292 7.6543 15.8066 7.83203 15.8066 8.03711C15.8066 8.24674 15.7292 8.42676 15.5742 8.57715C15.4238 8.72754 15.2415 8.80273 15.0273 8.80273ZM0.958984 7.27148H2.30566C2.5153 7.27148 2.69531 7.34896 2.8457 7.50391C3.00065 7.6543 3.07812 7.83203 3.07812 8.03711C3.07812 8.24674 3.00065 8.42676 2.8457 8.57715C2.69531 8.72754 2.5153 8.80273 2.30566 8.80273H0.958984C0.753906 8.80273 0.573893 8.72754 0.418945 8.57715C0.268555 8.42676 0.193359 8.24674 0.193359 8.03711C0.193359 7.83203 0.268555 7.6543 0.418945 7.50391C0.573893 7.34896 0.753906 7.27148 0.958984 7.27148ZM3.42676 4.57129L2.46973 3.60742C2.32845 3.46615 2.25781 3.28613 2.25781 3.06738C2.26237 2.84863 2.33757 2.66634 2.4834 2.52051C2.63379 2.37467 2.81608 2.30404 3.03027 2.30859C3.24447 2.31315 3.4222 2.38607 3.56348 2.52734L4.52734 3.49121C4.66862 3.63704 4.73698 3.81934 4.73242 4.03809C4.73242 4.25228 4.65951 4.43229 4.51367 4.57812C4.36784 4.72396 4.18555 4.79688 3.9668 4.79688C3.7526 4.79232 3.57259 4.71712 3.42676 4.57129ZM11.4658 3.49121L12.4297 2.52734C12.5801 2.38151 12.7601 2.30859 12.9697 2.30859C13.1839 2.30404 13.3639 2.37467 13.5098 2.52051C13.6556 2.66634 13.7285 2.84863 13.7285 3.06738C13.7331 3.28613 13.6624 3.46615 13.5166 3.60742L12.5596 4.57129C12.4137 4.72168 12.2314 4.79688 12.0127 4.79688C11.7985 4.79688 11.6185 4.72396 11.4727 4.57812C11.3268 4.43229 11.2516 4.25228 11.2471 4.03809C11.2471 3.81934 11.32 3.63704 11.4658 3.49121ZM12.5527 11.5029L13.5166 12.46C13.6624 12.6058 13.7354 12.7858 13.7354 13C13.7399 13.2188 13.6693 13.401 13.5234 13.5469C13.3776 13.6927 13.1976 13.7656 12.9834 13.7656C12.7692 13.7702 12.5892 13.7018 12.4434 13.5605L11.4727 12.5967C11.3268 12.4463 11.2516 12.264 11.2471 12.0498C11.2471 11.8356 11.32 11.6556 11.4658 11.5098C11.6117 11.3639 11.7917 11.291 12.0059 11.291C12.2246 11.2865 12.4069 11.3571 12.5527 11.5029ZM2.47656 12.4531L3.43359 11.5029C3.57943 11.3571 3.75944 11.2865 3.97363 11.291C4.19238 11.291 4.37695 11.3639 4.52734 11.5098C4.66862 11.6556 4.73698 11.8356 4.73242 12.0498C4.73242 12.264 4.65951 12.4463 4.51367 12.5967L3.5498 13.5537C3.40853 13.6995 3.22852 13.7702 3.00977 13.7656C2.79102 13.7611 2.60872 13.6859 2.46289 13.54C2.32161 13.3942 2.25098 13.2142 2.25098 13C2.25098 12.7858 2.32617 12.6035 2.47656 12.4531ZM7.99316 4.3457C8.49902 4.3457 8.97298 4.44368 9.41504 4.63965C9.86165 4.83105 10.2536 5.09538 10.5908 5.43262C10.9326 5.76986 11.1992 6.16178 11.3906 6.6084C11.5866 7.05501 11.6846 7.53125 11.6846 8.03711C11.6846 8.54297 11.5866 9.01921 11.3906 9.46582C11.1992 9.91243 10.9326 10.3066 10.5908 10.6484C10.2536 10.9857 9.86165 11.25 9.41504 11.4414C8.97298 11.6328 8.49902 11.7285 7.99316 11.7285C7.4873 11.7285 7.01107 11.6328 6.56445 11.4414C6.1224 11.25 5.73047 10.9857 5.38867 10.6484C5.05143 10.3066 4.78483 9.91243 4.58887 9.46582C4.39746 9.01921 4.30176 8.54297 4.30176 8.03711C4.30176 7.53125 4.39746 7.05501 4.58887 6.6084C4.78483 6.16178 5.05143 5.76986 5.38867 5.43262C5.73047 5.09538 6.1224 4.83105 6.56445 4.63965C7.01107 4.44368 7.4873 4.3457 7.99316 4.3457ZM7.99316 5.82227C7.59212 5.82227 7.22298 5.92253 6.88574 6.12305C6.55306 6.32357 6.28418 6.59245 6.0791 6.92969C5.87858 7.26237 5.77832 7.63151 5.77832 8.03711C5.77832 8.44271 5.87858 8.81413 6.0791 9.15137C6.28418 9.48405 6.55306 9.75065 6.88574 9.95117C7.22298 10.1517 7.59212 10.252 7.99316 10.252C8.39876 10.252 8.7679 10.1517 9.10059 9.95117C9.43783 9.75065 9.70671 9.48405 9.90723 9.15137C10.1077 8.81413 10.208 8.44271 10.208 8.03711C10.208 7.63151 10.1077 7.26237 9.90723 6.92969C9.70671 6.59245 9.43783 6.32357 9.10059 6.12305C8.7679 5.92253 8.39876 5.82227 7.99316 5.82227Z" />
                    </svg>
                    <svg width="14" height="15" viewBox="0 0 14 15" id="dark" xmlns="http://www.w3.org/2000/svg" className={styles.dark}>
                        <path d="M1.58594 6.77051C1.58594 7.59993 1.72721 8.36328 2.00977 9.06055C2.29232 9.75326 2.6888 10.3548 3.19922 10.8652C3.71419 11.3757 4.31803 11.7721 5.01074 12.0547C5.70801 12.3372 6.46452 12.4785 7.28027 12.4785C7.88639 12.4785 8.46973 12.3919 9.03027 12.2188C9.59082 12.0501 10.1035 11.804 10.5684 11.4805C11.0378 11.1523 11.432 10.7604 11.751 10.3047C11.5505 10.373 11.3431 10.4232 11.1289 10.4551C10.9147 10.4824 10.6868 10.4961 10.4453 10.4961C9.03255 10.4961 7.81576 10.2295 6.79492 9.69629C5.77409 9.15853 4.99023 8.39062 4.44336 7.39258C3.90104 6.39453 3.62988 5.20508 3.62988 3.82422C3.62988 3.53255 3.65039 3.25456 3.69141 2.99023C3.73242 2.72135 3.78939 2.46615 3.8623 2.22461C3.3929 2.56641 2.9873 2.97884 2.64551 3.46191C2.30827 3.94499 2.04622 4.47135 1.85938 5.04102C1.67708 5.60612 1.58594 6.18262 1.58594 6.77051ZM10.7256 9.10156C10.9808 9.10156 11.2337 9.08789 11.4844 9.06055C11.735 9.02865 11.9697 8.98763 12.1885 8.9375C12.4118 8.88737 12.6055 8.82585 12.7695 8.75293C12.888 8.7028 12.9906 8.66634 13.0771 8.64355C13.1683 8.62077 13.2549 8.60938 13.3369 8.60938C13.5055 8.60938 13.6491 8.66862 13.7676 8.78711C13.8906 8.90104 13.9521 9.05599 13.9521 9.25195C13.9521 9.32031 13.943 9.40462 13.9248 9.50488C13.9066 9.60059 13.8701 9.70768 13.8154 9.82617C13.4417 10.6875 12.929 11.4303 12.2773 12.0547C11.6257 12.6836 10.8714 13.1689 10.0146 13.5107C9.15788 13.8525 8.23958 14.0234 7.25977 14.0234C6.21159 14.0234 5.24772 13.8434 4.36816 13.4834C3.49316 13.1279 2.7321 12.6266 2.08496 11.9795C1.43783 11.3278 0.936523 10.5645 0.581055 9.68945C0.225586 8.8099 0.0478516 7.84831 0.0478516 6.80469C0.0478516 5.83854 0.232422 4.91569 0.601562 4.03613C0.97526 3.15658 1.49023 2.37956 2.14648 1.70508C2.80729 1.0306 3.57064 0.520182 4.43652 0.173828C4.55046 0.123698 4.65072 0.0895182 4.7373 0.0712891C4.82389 0.0530599 4.89681 0.0439453 4.95605 0.0439453C5.16113 0.0439453 5.3252 0.112305 5.44824 0.249023C5.57129 0.381185 5.63281 0.536133 5.63281 0.713867C5.63281 0.805013 5.61914 0.896159 5.5918 0.987305C5.56445 1.07845 5.51888 1.18555 5.45508 1.30859C5.32747 1.55013 5.22721 1.87598 5.1543 2.28613C5.08594 2.69173 5.05176 3.13379 5.05176 3.6123C5.05176 4.74251 5.2819 5.72005 5.74219 6.54492C6.20247 7.36523 6.85645 7.99642 7.7041 8.43848C8.55632 8.88053 9.56348 9.10156 10.7256 9.10156Z"/>
                    </svg>
                </label>
            
                <input 
                    type="checkbox" 
                    id="language" 
                    onChange={() => changeLanguage(i18n.language === 'en' ? 'ru' : 'en')}
                    checked={i18n.language === 'ru'}
                />
                <label htmlFor="language">
                    <p className={styles.en}>{t('languageEN')}</p>
                    <p className={styles.ru}>{t('languageRU')}</p>
                </label>
            </div>}
        </div>
    );
}

export default Profile;