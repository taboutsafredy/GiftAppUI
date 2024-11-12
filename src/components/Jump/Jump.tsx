// Path: src/components/Jump/Jump.tsx

import { useEffect, useState } from 'react';
import styles from './Jump.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Lottia } from '../Lottia';
import { useTranslation } from 'react-i18next';
import { initHapticFeedback } from '@telegram-apps/sdk';

interface IJumpItem {
    label: string;
    name: string;
    isActive: boolean;
    onClick?: () => void;
}

const JumpItem = ({ label, name, isActive, onClick }: IJumpItem) => {
    const lottieName = isActive
        ? `tab-${label.toLowerCase()}-active`
        : `tab-${label.toLowerCase()}`;

    return (
        <div className={styles.jumpItem} onClick={onClick}>
            <Lottia name={lottieName} autoplay={isActive} />
            <p
                className={styles.label}
                style={isActive ? { color: 'var(--primary)' } : { color: 'var(--label-tab-bar)' }}
            >
                {name}
            </p>
        </div>
    );
};

function Jump() {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [currentActiveTab, setCurrentActiveTab] = useState<string>("Store");
    const hapticFeedback = initHapticFeedback();


    useEffect(() => {
        const basePath = `/${location.pathname.split('/')[1]}`;

        switch (basePath) {
            case '/gifts':
                setCurrentActiveTab("Gifts");
                break;
            case '/leaderboard':
                setCurrentActiveTab("Leaderboard");
                break;
            case '/profile':
                setCurrentActiveTab("Profile");
                break;
            default:
                setCurrentActiveTab("Store");
        }
    }, [location.pathname]);

    const handleTabChange = async (tab: string) => {
        hapticFeedback.selectionChanged();

        setCurrentActiveTab(tab);
        
        switch (tab) {
            case "Gifts":
              navigate("/gifts");
              break;
            case "Leaderboard":
              navigate("/leaderboard")
              break;
            case "Profile":
              navigate("/profile");
              break;
            default:
              navigate("/");
              break;
          }
    };
   
    const jumpItems: IJumpItem[] = [
        { label: "Store", name: t('storetab'), isActive: currentActiveTab === "Store" },
        { label: "Gifts", name: t('giftstab'), isActive: currentActiveTab === "Gifts" },
        { label: "Leaderboard",name: t('leaderboard'), isActive: currentActiveTab === "Leaderboard" },
        { label: "Profile", name: t('profile'), isActive: currentActiveTab === "Profile" },
    ];

    return (
        <div className={styles.Jump}>
            {jumpItems.map((item, index) => (
                <div
                    key={index}
                    className={styles.jumpItemWrapper}
                >
                    <JumpItem
                        key={index+1}
                        label={item.label}
                        name={item.name}
                        isActive={item.isActive}
                        onClick={() => handleTabChange(item.label)}
                    />
                </div>
            ))}
        </div>
    );
    
}

export default Jump;
