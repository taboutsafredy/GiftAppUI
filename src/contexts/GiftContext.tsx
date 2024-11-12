// Path: src/contexts/GiftContext.tsx

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IGift, IGiftRecentTransaction, IUserTransaction } from "../type";
import { 
    getAllGifts, 
    getGiftsAvailableToBeSend, 
    getGiftRecentTransaction, 
    purchaseGift, 
    purchaseSuccess, 
    receiveGift 
} from "../api/api";

interface IGiftContext {
    gifts: IGift[];
    giftsAvailableToBeSend: IUserTransaction[];
    giftsRecentTransaction: IGiftRecentTransaction[];
    purchase: (userId: string, giftId: string) => Promise<{ invoiceUrl: string }>;
    successfullyPurchased: (successId: string) => Promise<IUserTransaction | null>;
    receive: (userId: string, purchaseReferenceId: string) => Promise<IUserTransaction | null>;
    loadAvailableToBeSendGifts: (userId: string) => Promise<void>;
    loadRecentTransactions: (giftId: string) => Promise<void>;
}

const initialContext: IGiftContext = {
    gifts: [],
    giftsAvailableToBeSend: [],
    giftsRecentTransaction: [],
    purchase: async () => ({ invoiceUrl: "" }),
    successfullyPurchased: async () => null,
    receive: async () => null,
    loadAvailableToBeSendGifts: async () => {},
    loadRecentTransactions: async () => {},
};

const GiftContext = createContext<IGiftContext>(initialContext);

export const GiftProvider = ({ children }: { children: ReactNode }) => {
    const [gifts, setGifts] = useState<IGift[]>([]);
    const [giftsAvailableToBeSend, setGiftsAvailableToBeSend] = useState<IUserTransaction[]>([]);
    const [giftsRecentTransaction, setRecentTransactions] = useState<IGiftRecentTransaction[]>([]);

    useEffect(() => {
        const getGifts = async () => {
            try {
                const allGifts = await getAllGifts();
                setGifts(allGifts);
            } catch (error) {
                console.error('error getting gift :|', error);
            }
        };

        getGifts();
    }, []);

    const loadAvailableToBeSendGifts = async (userId: string) => {
        try {
            const availableGifts = await getGiftsAvailableToBeSend(userId);
            setGiftsAvailableToBeSend(availableGifts);
        } catch (error) {
            console.error('👎 error getting available gifts :', error);
        }
    };

    const loadRecentTransactions = async (giftId: string) => {
        try {
            const transactions = await getGiftRecentTransaction(giftId);
            setRecentTransactions(transactions);
        } catch (error) {
            console.error('👎 error loading recent transaction :', error);
        }
    };

    const purchase = async (userId: string, giftId: string): Promise<{ invoiceUrl: string }> => {
        try {
            const invoice = await purchaseGift(userId, giftId);
            return invoice;
        } catch (error) {
            console.error('👎 error buying gift :', error);
            return { invoiceUrl: "" };
        }
    };

    const successfullyPurchased = async (successId: string): Promise<IUserTransaction | null> => {
        try {
            const transaction = await purchaseSuccess(successId);
            return transaction;
        } catch (error) {
            console.error('👎 error of veriy is gift has been successfull purchase :', error);
            return null;
        }
    };

    const receive = async (userId: string, purchaseReferenceId: string): Promise<IUserTransaction | null> => {
        try {
            const transaction = await receiveGift(userId, purchaseReferenceId);
            return transaction;
        } catch (error) {
            console.error("👎 error receiving gift : ", error);
            return null;
        }
    };

    return (
        <GiftContext.Provider value={{ 
            gifts, 
            giftsAvailableToBeSend,
            giftsRecentTransaction, 
            purchase,
            successfullyPurchased,
            receive,
            loadRecentTransactions,
            loadAvailableToBeSendGifts,
        }}>
            {children}
        </GiftContext.Provider>
    );
};

export const useGiftContext = () => useContext(GiftContext);