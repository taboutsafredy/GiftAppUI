// Path: src/components/Lottie.tsx
import Lottie from 'lottie-react';

import EffectGiftPurchased from "../assets/lotties/effect-gift-purchased.json";
import EmojiBalloons from "../assets/lotties/emoji-balloons.json";
import GiftBlueStar from "../assets/lotties/gift-blue-star.json";
import GiftDeliciousCake from "../assets/lotties/gift-delicious-cake.json";
import GiftGreenStar from "../assets/lotties/gift-green-star.json";
import GiftRedStar from "../assets/lotties/gift-red-star.json";
import TabStoreActive from "../assets/lotties/tab-store-active.json";
import TabStore from "../assets/lotties/tab-store.json";
import TabGiftsActive from "../assets/lotties/tab-gifts-active.json";
import TabGifts from "../assets/lotties/tab-gifts.json";
import TabLeaderboardActive from "../assets/lotties/tab-leaderboard-active.json";
import TabLeaderboard from "../assets/lotties/tab-leaderboard.json";
import TabProfileActive from "../assets/lotties/tab-profile-active.json";
import TabProfile from "../assets/lotties/tab-profile.json";


interface ILottie {
    name: string;
    autoplay?: boolean;
    loop?: boolean;
    style?: React.CSSProperties;
}

const lotties: { [key: string]: any } = {
    "effect-gift-purchased": EffectGiftPurchased,
    "emoji-balloons": EmojiBalloons,
    "gift-blue-star": GiftBlueStar,
    "gift-delicious-cake": GiftDeliciousCake,
    "gift-green-star": GiftGreenStar,
    "gift-red-star": GiftRedStar,
    "tab-store-active": TabStoreActive,
    "tab-store": TabStore,
    "tab-gifts-active": TabGiftsActive,
    "tab-gifts": TabGifts,
    "tab-leaderboard-active": TabLeaderboardActive,
    "tab-leaderboard": TabLeaderboard,
    "tab-profile-active": TabProfileActive,
    "tab-profile": TabProfile,
};

export const Lottia = ({ name, autoplay = true, loop = false, style }: ILottie) => {
    const animationData = lotties[name];

    if (!animationData) {
        console.error(`Lottie not found for name: "${name}"`);
        return null;
    }

    return (
        <Lottie
            animationData={animationData}
            autoplay={autoplay}
            loop={loop}
            style={style ? style : { width: '26px', height: '26px' }}
        />
    );
};
