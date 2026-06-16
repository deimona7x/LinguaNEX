import { AppStateProvider, useAppState } from "./context/AppStateContext";
import { BottomNav } from "./components/BottomNav";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { DashboardScreen } from "./screens/DashboardScreen";
import { LanguageSelectScreen } from "./screens/LanguageSelectScreen";
import { LessonScreen } from "./screens/LessonScreen";
import { MiniGamesScreen } from "./screens/MiniGamesScreen";
import { PathScreen } from "./screens/PathScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { ResultScreen } from "./screens/ResultScreen";
import { RewardsScreen } from "./screens/RewardsScreen";

function AppLayout() {
  const { user } = useAppState();

  const screenMap = {
    dashboard: <DashboardScreen />,
    languages: <LanguageSelectScreen />,
    path: <PathScreen />,
    lesson: <LessonScreen />,
    games: <MiniGamesScreen />,
    result: <ResultScreen />,
    profile: <ProfileScreen />,
    rewards: <RewardsScreen />
  } as const;

  return (
    <div className="min-h-screen pb-24 lg:pb-8">
      <div className="mx-auto flex w-full max-w-[1700px] gap-6 px-3 py-4 md:px-6 lg:px-8">
        <Sidebar />

        <main className="min-w-0 flex-1 space-y-6">
          <TopBar />
          {screenMap[user.activeScreen]}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <AppLayout />
    </AppStateProvider>
  );
}
