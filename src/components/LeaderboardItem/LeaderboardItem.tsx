// Path: src/components/LeaderboardItem/LeaderboardItem.tsx

import { Gift } from "../../assets/icons/Icons";
import styles from "./LeaderboardItem.module.css";
import { ITopUserByGiftsReceived } from "../../type";
import { useNavigate } from "react-router-dom";
import { initInitData } from "@telegram-apps/sdk";
import { useTranslation } from "react-i18next";

function LeaderboardItem ({ user } : {user: ITopUserByGiftsReceived}) {
    const { t } = useTranslation();
    const initData = initInitData();
    const getUserId = initData?.user?.id.toString()!;
    const {_id, firstName, lastName, profilePicture, receivedCount, rank } = user;
    const itsCurrentUser = getUserId === _id;

    const navigate = useNavigate();
    const handleOpenProfile = () => {
        if (itsCurrentUser) return;
        navigate(`/leaderboard/${_id}`)
    }

    return (
        <div className={styles.leaderboardItem} onClick={() => handleOpenProfile()} style={itsCurrentUser ? { paddingBottom: "8px", borderTop: ".33px solid var(--separator)", position: "fixed", bottom: "92px", left: 0, right: 0 }: {}}>
            <div className={styles.left} style={{backgroundImage: `url(${profilePicture})`}}></div>
            <div className={styles.right} style={itsCurrentUser ? {borderBottom: "none", paddingBottom: "0px"}: {}}>
                <div className={styles.rightNameAndGifts}>
                    <h3 className={styles.username}>
                      {firstName}
                      {lastName && ` ${lastName}`}
                      {itsCurrentUser && <span className={styles.tagCurrentUser}>{t('you')}</span>}
                    </h3>                    
                    <p>
                        <Gift style={{ width: "11px", height: "12px" }}/>
                        {receivedCount} { receivedCount >= 2 ? t('gifts') : t('gift')}
                    </p>
                </div>
                <p className={styles.rank}>
                    { rank == 1 ? "🥇" : rank == 2 ? "🥈" : rank == 3 ? "🥉" : `#${rank}` }
                </p>
            </div>
        </div>
    );
}

export default LeaderboardItem;