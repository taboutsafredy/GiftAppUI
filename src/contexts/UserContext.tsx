// Path: src/context/UserContext.tsx

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { 
    createUser, 
    getUser, 
    getUserRank, 
    getUserTransactionHistory, 
    getGiftsReceivedByUser, 
    getTopUsersByGiftsReceived 
} from "../api/api";
import { IUser, IUserTransaction, ITopUserByGiftsReceived, IGiftReceived } from "../type";
import { initInitData } from "@telegram-apps/sdk";

interface IUserContext {
    user: IUser | null;
    rank: number | null;
    transactionHistory: IUserTransaction[];
    setUser: (user: IUser | null) => void;
    fetchUserTransactions: () => Promise<void>;
    fetchTopUsersByGiftsReceived: () => Promise<ITopUserByGiftsReceived[]>;
    fetchGiftsReceivedByUser: (userId: string) => Promise<IGiftReceived[]>;
}

const initialUserContext: IUserContext = {
    user: null,
    rank: null,
    transactionHistory: [],
    setUser: () => {},
    fetchUserTransactions: async () => {},
    fetchTopUsersByGiftsReceived: async () => [],
    fetchGiftsReceivedByUser: async () => [],
};

const UserContext = createContext<IUserContext>(initialUserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [rank, setRank] = useState<number | null>(null);
    const [transactionHistory, setTransactionHistory] = useState<IUserTransaction[]>([]);
    const initData = initInitData();

    useEffect(() => {
        const initUser = async () => {
            const currentUserId = initData?.user?.id.toString();
            if (currentUserId) {
                try {
                    const getCurrentUser = await getUser(currentUserId.toString());
                    if (getCurrentUser) {
                        setUser(getCurrentUser);
                    } else {
                        const createNewUser = await createUser({ 
                            _id: currentUserId.toString(),
                            username: initData?.user?.username,
                            firstName: initData?.user?.firstName,
                            lastName: initData?.user?.lastName,
                        });

                        if (createNewUser) {
                            setUser(createNewUser);
                        }
                    }
                } catch (error) {
                    console.error("Erreur lors de l'initialisation de l'utilisateur :", error);
                }
            }
        };
        initUser();
    }, []);

    useEffect(() => {
        if (user) {
            const fetchRank = async () => {
                try {
                    const { rank } = await getUserRank(user._id);
                    setRank(rank);
                } catch (error) {
                    console.error("error getting rank ! :", error);
                }
            };

            fetchUserTransactions();
            fetchRank();
        }
    }, [user]);

    // user's transaction history
    async function fetchUserTransactions () {
        if (user) {
            try {
                const transactions = await getUserTransactionHistory(user._id);
                setTransactionHistory(transactions);
            } catch (error) {
                console.error("error getting transaction :", error);
            }
        }
    };

    // gifts received by user
    async function fetchGiftsReceivedByUser(userId: string): Promise<IGiftReceived[]> {
        try {
            const giftsReceived = await getGiftsReceivedByUser(userId);
            return giftsReceived;
        } catch (error) {
            console.error("error getting gift received by user  :", error);
            return [];
        }
    };

    // top users by gifts received
    async function fetchTopUsersByGiftsReceived (): Promise<ITopUserByGiftsReceived[]> {
        try {
            const topUsers = await getTopUsersByGiftsReceived();
            return topUsers;
        } catch (error) {
            console.error("error while getting top users. :", error);
            return [];
        }
    };

    return (
        <UserContext.Provider value={{ 
            user, 
            rank, 
            transactionHistory, 
            setUser, 
            fetchUserTransactions,
            fetchTopUsersByGiftsReceived,
            fetchGiftsReceivedByUser,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);