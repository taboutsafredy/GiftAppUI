// Path: src/type.ts

export interface IUser {
    _id: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
}

export interface ICurrentProfile {
    rank: number,
    user: IUser;
}

export interface IGift {
    _id: string;
    name: string;
    price: number;
    asset: string;
    totalInStock: number;
    quantityPurchased: number;
}

export interface IBaseTransaction {
    _id: string;
    type: string;
    purchaseReferenceId?: string;
    status?: string;
    temporaryLinkId?: string;
    invoiceId?: number;
    successId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ITopUserByGiftsReceived extends IUser {
    receivedCount: number;
    rank: number;
}

export interface IUserTransaction extends IBaseTransaction {
    from: IUser;
    to?: IUser;
    giftId: IGift;
}

export interface IGiftRecentTransaction extends IBaseTransaction {
    from: IUser;
    to?: IUser;
    giftId: string;
}

export interface ITransaction extends IBaseTransaction {
    from: string;
    to?: string;
    giftId: string;
}


export type IGiftReceived = IUserTransaction;