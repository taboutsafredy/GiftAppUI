// Path: src/pages/Leaderboard/Leaderboard.tsx

import { useEffect, useMemo, useState } from "react";
import { Search } from "../../assets/icons/Icons";
import styles from "./Leaderboard.module.css";
import LeaderboardItem from "../../components/LeaderboardItem/LeaderboardItem";
import { ITopUserByGiftsReceived } from "../../type";
import { useUserContext } from "../../contexts/UserContext";
import { useTranslation } from "react-i18next";

function Leaderboard() {
  const { t } = useTranslation();
  const { fetchTopUsersByGiftsReceived } = useUserContext();
  const [topUsers, setTopUsers] = useState<ITopUserByGiftsReceived[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
      const fetchTopUser = async () => {
        try {
          const getTop = await fetchTopUsersByGiftsReceived();
          setTopUsers(getTop);
        } catch (error) {
          console.error("Error while getting top users", error);
        }
      }

      fetchTopUser();
  }, [fetchTopUsersByGiftsReceived]);

  const filteredTopUsers = useMemo(() => {
    if (!searchTerm) return topUsers;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return topUsers.filter((user) =>
      user.firstName?.toLowerCase().includes(lowerSearchTerm) ||
      user.lastName?.toLowerCase().includes(lowerSearchTerm)
    );

  }, [searchTerm, topUsers]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.leaderboard}>
      <div className={styles.leaderboardSearchContainer}>
        <label
          htmlFor="search"
          className={`${styles.searchLabel} ${isFocused ? styles.focused : ""}`}
        >
          <Search className={styles.searchIcon} />
          <input
            type="text"
            id="search"
            placeholder= { isFocused ? t('searchPlaceholder') : "" }
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <span className={styles.placeholder}>{t('searchPlaceholder')}</span>
        </label>
      </div>
      <div className={styles.leaderboardList}> 
        {filteredTopUsers.map((user) => (
          <LeaderboardItem key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;