import "./App.css";
import { UserProvider } from "./contexts/UserContext";
import { GiftProvider } from "./contexts/GiftContext";
import { Routes, Route, BrowserRouter, useLocation, matchPath } from "react-router-dom";
import Store from "./pages/Store/Store";
import Gifts from "./pages/Gifts/Gifts";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Profile from "./pages/Profile/Profile";
import GiftDetails from "./pages/GiftDetails/GiftDetails";
import RecentActions from "./pages/RecentActions/RecentActions";
import Success from "./pages/Success/Success";
import Jump from "./components/Jump/Jump";
import { initMiniApp, initViewport } from "@telegram-apps/sdk";
import { useEffect } from "react";

function AppConfig() {
  const location = useLocation();
  
  const excludeJumpPaths = [
    "/gifts/success",
    "/:giftId",
    "/profile/recentactions",
  ];

  const isExcludedPath = excludeJumpPaths.some((path) => matchPath({ path, end: true }, location.pathname));

  return (
    <>
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/:giftId" element={<GiftDetails />} />
        <Route path="/gifts" element={<Gifts />} />
        <Route path="/gifts/success/:successId" element={<Success />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/leaderboard/:userId" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/recentactions" element={<RecentActions />} />
      </Routes>
      {!isExcludedPath && <Jump />}
    </>
  );
}


function App() {
  const [ miniApp] = initMiniApp();
  const [ viewport ] = initViewport();

  miniApp.ready();

  useEffect(() => {
    const updateViewport = async () => {
      const vp = await viewport;
      if (!vp.isExpanded) {
          vp.expand();
      }
    };

    // const setHeaderColor = () => {
    //   if (!miniApp.isDark || document.body.classList.contains('light')) {
    //     miniApp.setHeaderColor('#FFFFFF');
    //   } else if (miniApp.isDark || document.body.classList.contains('dark')) {
    //     miniApp.setHeaderColor('#1C1C1E');
    //   }
    // };

    // setHeaderColor();
    updateViewport();

    // const observer = new MutationObserver(setHeaderColor);
    // observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // return () => {
    //   observer.disconnect();
    // };
  },[]);

  return (
    <BrowserRouter>
      <UserProvider>
        <GiftProvider>
          <AppConfig />
        </GiftProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
