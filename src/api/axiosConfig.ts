// Path: src/api/axiosConfig.ts

import axios from "axios";
import { retrieveLaunchParams } from "@telegram-apps/sdk";

const { initDataRaw } = retrieveLaunchParams();

const axiosInstance = axios.create({
    baseURL: "https://api.giftcontestbot.tech",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `giftAppTma ${initDataRaw}`
    }  
});

export default axiosInstance;