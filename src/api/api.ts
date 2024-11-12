// Path: src/api/api.ts

import { IUser, IGift, ITopUserByGiftsReceived, IUserTransaction, IGiftReceived, IGiftRecentTransaction } from "../type";
import axiosInstance from "./axiosConfig";

const handleRequest = async <T>(request: Promise<{ data: T }>): Promise<T> => {
    try {
      const response = await request;
      return response.data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
};

const get = <T>(url: string, data?: any) => handleRequest<T>(axiosInstance.get(url, data));
const patch = <T>(url: string, data?: any) => handleRequest<T>(axiosInstance.patch(url, data));
const post = <T>(url: string, data: any) => handleRequest<T>(axiosInstance.post(url, data));

// 1. api call related to user

// 1.1 create a new user
export const createUser = (user: IUser) => post<IUser>("/users/create", user);

// 1.2 get user 
export const getUser = (userId: string) => get<IUser>(`/users/${userId}`);

// 1.3 get user's rank
export const getUserRank = (userId: string) => get<{ rank: number }>(`/users/${userId}/rank`);

// 1.4 get user's transaction history
export const getUserTransactionHistory = (userId: string) => get<IUserTransaction[]>(`/users/${userId}/transaction`);


// 2. api call related to gift

// 2.1 get all gifts
export const getAllGifts = () => get<IGift[]>("/gifts");

// 2.2 get gifts available to be sent
export const getGiftsAvailableToBeSend = (userId: string) => get<IUserTransaction[]>(`/gifts/availableToBeSend/${userId}`);

// 2.3 get gifts received by user
export const getGiftsReceivedByUser = (userId: string) => get<IGiftReceived[]>(`/gifts/receivedByUser/${userId}`);

// 2.4 gift's recent transaction
export const getGiftRecentTransaction = (giftId: string) => get<IGiftRecentTransaction[]>(`/gifts/recentTransaction/`, { giftId });

// 2.5 purchase a gift
export const purchaseGift = (userId: string, giftId: string) => post<{ invoiceUrl: string }>("/gifts/purchase", { userId, giftId });

// 2.6 puchase success
export const purchaseSuccess = (successId: string) => patch<IUserTransaction>(`/gifts/purchase/success/${successId}`);

// 2.7 receive a gift
export const receiveGift = (userId: string, purchaseReferenceId: string) => patch<IUserTransaction>("/gifts/receive/", { userId, purchaseReferenceId });


// 3. qpi cqll related to leaderboard

// 3.1 get top 100
export const getTopUsersByGiftsReceived = () => get<ITopUserByGiftsReceived[]>(`/leaderboard/top`);
