import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Eraser, Headphones, PenSquare, SkipForward, Timer } from "lucide-react";
import { useAppState } from "../context/AppStateContext";
import { speakText } from "../lib/speech";
import { cn } from "../lib/utils";
import { Exercise, ExerciseOption } from "../types";
import { Panel } from "../components/Panel";

interface AnswerState {
  selectedId?: string;
  matchedPairs: string[];
  canvasSubmitted: boolean;
}

function OptionButtons({
  options,
  disabled,
  onPick,
  selectedId
}: {
  options: ExerciseOption[];
  disabled: boolean;
  onPick: (option: ExerciseOption) => void;
  selectedId?: string;
}) {
  return (
    <div className="grid gap-3">
      {options.map((option) => (
        <button
          key={option.id}
          disabled={disabled}
          onClick={() => onPick(option)}
          className={cn(
            "rounded-2xl border px-4 py-4 text-left text-lg transition",
            selectedId === option.id
              ? option.isCorrect
                ? "border-lime-300/50 bg-lime-400/10 text-lime-100"
                : "border-red-300/50 bg-red-500/10 text-red-100"
              : "border-white/10 bg-white/5 text-white hover:border-cyan-300/40"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function MemoryExercise({
  exercise,
  onComplete
}: {
  exercise: Exercise;
  onComplete: (success: boolean) => void;
}) {
  const cards = useMemo(() => exercise.pairs ?? [], [exercise.pairs]);
  const [selected, setSelected] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);

  const handlePick = (id: string, pairId: string) => {
    if (selected.includes(id) || matched.includes(id)) return;

    const next = [...selected, id];
    setSelected(next);

    if (next.length === 2) {
      const first = cards.find((card) => card.id === next[0]);
      const second = cards.find((card) => card.id === next[1]);
      const success = !!first && !!second && first.pairId === second.id && second.pairId === first.id;

      if (success) {
        const updated = [...matched, next[0], next[1]];
        setMatched(updated);
        setSelected([]);
        if (updated.length === cards.length) {
          setTimeout(() => onComplete(true), 250);
        }
      } else {
        setTimeout(() => {
          setSelected([]);
          onComplete(false);
        }, 500);
      }
    }
  };

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {cards.map((card) => {
        const opened = selected.includes(card.id) || matched.includes(card.id);
        return (
          <button
            key={card.id}
            onClick={() => handlePick(card.id, card.pairId)}
            className={cn(
              "min-h-24 rounded-2xl border p-4 text-2xl transition",
              opened ? "border-cyan-300/50 bg-cyan-400/10 text-white" : "border-white/10 bg-white/5 text-slate-400"
            )}
          >
            {opened ? card.label : "?"}
          </button>
        );
      })}
    </div>
  );
}

function DrawExercise({
  exercise,
  onComplete
}: {
  exercise: Exercise;
  onComplete: (success: boolean) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    context.lineWidth = 6;
    context.lineCap = "round";
    context.strokeStyle = "#59f3ff";

    const getCoords = (event: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if ("touches" in event) {
        return {
          x: event.touches[0].clientX - rect.left,
          y: event.touches[0].clientY - rect.top
        };
      }

      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    };

    const start = (event: MouseEvent | TouchEvent) => {
      drawing.current = true;
      const { x, y } = getCoords(event);
      context.beginPath();
      context.moveTo(x, y);
    };

    const move = (event: MouseEvent | TouchEvent) => {
      if (!drawing.current) return;
      const { x, y } = getCoords(event);
      context.lineTo(x, y);
      context.stroke();
    };

    const end = () => {
      drawing.current = false;
    };

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    canvas.addEventListener("touchstart", start);
    canvas.addEventListener("touchmove", move);
    window.addEventListener("touchend", end);

    return () => {
      canvas.removeEventListener("mousedown", start);
      canvas.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", end);
      canvas.removeEventListener("touchstart", start);
      canvas.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", end);
    };
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-[0.82fr_1.18fr]">
        <div className="rounded-[24px] border border-fuchsia-300/20 bg-fuchsia-500/10 p-5">
          <p className="text-sm uppercase tracking-[0.24em] text-fuchsia-200">Referência</p>
          <div className="mt-3 font-display text-8xl text-white">{exercise.content}</div>
          <p className="mt-4 text-lg text-slate-300">{exercise.clue}</p>
        </div>
        <div className="rounded-[24px] border border-cyan-300/20 bg-black/20 p-4">
          <canvas ref={canvasRef} width={700} height={300} className="h-[300px] w-full rounded-2xl bg-slate-950/70" />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={clearCanvas}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-lg text-white"
        >
          <span className="inline-flex items-center gap-2">
            <Eraser className="h-4 w-4" />
            Limpar
          </span>
        </button>
        <button
          onClick={() => onComplete(true)}
          className="rounded-2xl border border-lime-300/40 bg-lime-400/10 px-4 py-3 text-lg text-lime-100"
        >
          <span className="inline-flex items-center gap-2">
            <PenSquare className="h-4 w-4" />
            Concluir desenho
          </span>
        </button>
      </div>
    </div>
  );
}

export function LessonScreen() {
  const { selectedLesson, selectedLanguage, submitLessonResult, setActiveScreen } = useAppState();
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>({ matchedPairs: [], canvasSubmitted: false });
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const statsRef = useRef({ hits: 0, misses: 0, xpEarned: 0 });

  const exercise = selectedLesson?.exercises[exerciseIndex];

  useEffect(() => {
    setExerciseIndex(0);
    setHits(0);
    setMisses(0);
    setXpEarned(0);
    statsRef.current = { hits: 0, misses: 0, xpEarned: 0 };
  }, [selectedLesson?.id]);

  useEffect(() => {
    if (exercise?.type === "speed") {
      setRemainingTime(exercise.seconds ?? 10);
      return;
    }

    setRemainingTime(null);
  }, [exercise]);

  useEffect(() => {
    if (remainingTime === null) return;
    if (remainingTime <= 0) {
      statsRef.current = { ...statsRef.current, misses: statsRef.current.misses + 1 };
      setMisses((value) => value + 1);
      moveNext();
      return;
    }

    const timer = window.setTimeout(() => setRemainingTime((value) => (value ?? 1) - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [remainingTime]);

  if (!selectedLesson || !exercise) {
    return (
      <Panel className="rounded-[32px] p-8">
        <p className="text-xl text-slate-300">Nenhuma lição selecionada.</p>
        <button
          onClick={() => setActiveScreen("dashboard")}
          className="mt-4 rounded-2xl border border-cyan-300/40 bg-cyan-400/10 px-4 py-3 text-lg text-cyan-100"
        >
          Voltar ao dashboard
        </button>
      </Panel>
    );
  }

  const activeLesson = selectedLesson;
  const activeExercise = exercise;
  const totalExercises = activeLesson.exercises.length;

  function moveNext() {
    setAnswerState({ matchedPairs: [], canvasSubmitted: false });
    setRemainingTime(null);

    if (exerciseIndex + 1 >= totalExercises) {
      submitLessonResult({
        lessonId: activeLesson.id,
        hits: statsRef.current.hits,
        misses: statsRef.current.misses,
        xpEarned: statsRef.current.xpEarned
      });
      return;
    }

    setExerciseIndex((value) => value + 1);
  }

  function registerAnswer(success: boolean, xp: number) {
    if (success) {
      statsRef.current = {
        ...statsRef.current,
        hits: statsRef.current.hits + 1,
        xpEarned: statsRef.current.xpEarned + xp
      };
      setHits((value) => value + 1);
      setXpEarned((value) => value + xp);
    } else {
      statsRef.current = { ...statsRef.current, misses: statsRef.current.misses + 1 };
      setMisses((value) => value + 1);
    }

    window.setTimeout(moveNext, 500);
  }

  function handleOptionPick(option: ExerciseOption) {
    setAnswerState((current) => ({ ...current, selectedId: option.id }));
    registerAnswer(option.isCorrect, activeExercise.xp);
  }

  return (
    <div className="space-y-6">
      <Panel className="rounded-[32px] p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-fuchsia-300">Lesson Session</p>
            <h2 className="font-display text-4xl text-white">{activeLesson.title}</h2>
            <p className="mt-2 text-lg text-slate-300">{activeLesson.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-lg text-white">
              {exerciseIndex + 1} / {totalExercises}
            </div>
            <div className="rounded-2xl border border-lime-300/20 bg-lime-400/10 px-4 py-3 text-lg text-lime-100">
              XP: {xpEarned}
            </div>
            {remainingTime !== null ? (
              <div className="rounded-2xl border border-gold/30 bg-gold/10 px-4 py-3 text-lg text-gold">
                <span className="inline-flex items-center gap-2">
                  <Timer className="h-4 w-4" />
                  {remainingTime}s
                </span>
              </div>
            ) : null}
          </div>
        </div>
        <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-fuchsia-400 via-cyan to-lime"
            style={{ width: `${((exerciseIndex + 1) / totalExercises) * 100}%` }}
          />
        </div>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Panel className="rounded-[32px] p-6">
          <p className="text-sm uppercase tracking-[0.26em] text-cyan-200/70">{exercise.type}</p>
          <h3 className="mt-3 font-display text-3xl text-white">{exercise.prompt}</h3>
          {exercise.clue ? <p className="mt-4 text-lg text-slate-300">{exercise.clue}</p> : null}

          <div className="mt-6 space-y-3">
            {activeLesson.theory.map((entry) => (
              <div key={entry} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-lg text-slate-300">
                {entry}
              </div>
            ))}
          </div>

          {(exercise.type === "listening" || exercise.audioText) ? (
            <button
              onClick={() => speakText(selectedLanguage.code, exercise.audioText ?? exercise.prompt)}
              className="mt-6 rounded-2xl border border-cyan-300/40 bg-cyan-400/10 px-4 py-3 text-lg text-cyan-100"
            >
              <span className="inline-flex items-center gap-2">
                <Headphones className="h-5 w-5" />
                Ouvir áudio
              </span>
            </button>
          ) : null}
        </Panel>

        <Panel className="rounded-[32px] p-6">
          {exercise.options ? (
            <OptionButtons
              options={exercise.options}
              disabled={!!answerState.selectedId}
              onPick={handleOptionPick}
              selectedId={answerState.selectedId}
            />
          ) : null}

          {exercise.type === "memory" ? (
            <MemoryExercise exercise={exercise} onComplete={(success) => registerAnswer(success, success ? exercise.xp : 0)} />
          ) : null}

          {exercise.type === "draw" ? (
            <DrawExercise exercise={exercise} onComplete={(success) => registerAnswer(success, success ? exercise.xp : 0)} />
          ) : null}

          {!exercise.options && exercise.type !== "memory" && exercise.type !== "draw" ? (
            <button
              onClick={() => registerAnswer(true, exercise.xp)}
              className="rounded-2xl border border-lime-300/40 bg-lime-400/10 px-4 py-3 text-lg text-lime-100"
            >
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4" />
                Confirmar exercício
              </span>
            </button>
          ) : null}

          <button
            onClick={moveNext}
            className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-lg text-slate-200"
          >
            <span className="inline-flex items-center gap-2">
              <SkipForward className="h-4 w-4" />
              Pular etapa
            </span>
          </button>
        </Panel>
      </div>
    </div>
  );
}
