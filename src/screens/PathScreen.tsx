import { useAppState } from "../context/AppStateContext";
import { LearningPath } from "../components/LearningPath";

export function PathScreen() {
  const { selectedLanguage, user, startLesson } = useAppState();
  const lessons = selectedLanguage.units.flatMap((unit) => unit.lessons);
  const progress = user.languageProgress[selectedLanguage.code];

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-300">Progression Route</p>
        <h2 className="font-display text-4xl text-white">{selectedLanguage.name} Learning Path</h2>
      </div>

      <LearningPath
        lessons={lessons}
        completedLessonIds={progress.completedLessonIds}
        unlockedLessonIds={progress.unlockedLessonIds}
        onStartLesson={startLesson}
      />
    </div>
  );
}
