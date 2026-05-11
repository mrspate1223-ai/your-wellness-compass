import { createFileRoute } from "@tanstack/react-router";
import type { ResultProfile } from "@/lib/quiz-data";

function SecondaryPattern({ sec }: { sec: ResultProfile }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-secondary/40">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 p-4 text-left text-sm text-secondary-foreground transition-colors hover:bg-secondary/60"
        aria-expanded={open}
      >
        <span>
          <span className="font-semibold">Your secondary pattern appears to be: </span>
          {sec.title}
        </span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>
      {open && (
        <div className="space-y-4 border-t border-border p-5 text-sm">
          <p className="italic text-foreground/80">{sec.tagline}</p>
          <p className="leading-relaxed text-muted-foreground">{sec.description}</p>
          <div>
            <p className="mb-2 font-semibold text-foreground">What this pattern is telling us:</p>
            <p className="leading-relaxed text-foreground/90">
              {sec.helps.replace(/\s*The Rooted and Restored Gateway Intake[^]*$/, "").trim()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
import { useMemo, useState } from "react";
import {
  questions,
  results,
  emptyScores,
  addScores,
  topTwo,
  type Category,
  type Option,
} from "@/lib/quiz-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Why Don’t I Feel Like Myself Anymore? — Rooted & Restored" },
      {
        name: "description",
        content:
          "A Rooted & Restored Wellness Assessment to identify patterns of chronic stress, hormonal imbalance, burnout, and nervous system overload.",
      },
      { property: "og:title", content: "Rooted & Restored Wellness Assessment" },
      {
        property: "og:description",
        content: "Discover what may be keeping you from feeling like yourself.",
      },
    ],
  }),
  component: Index,
});

type Stage = "intro" | "quiz" | "results";

function Index() {
  const [stage, setStage] = useState<Stage>("intro");
  // answers[qIndex] = number[] (indices of selected options)
  const [answers, setAnswers] = useState<number[][]>(() => questions.map(() => []));
  const [current, setCurrent] = useState(0);

  const scores = useMemo(() => {
    const sc = emptyScores();
    answers.forEach((selected, qi) => {
      selected.forEach((oi) => {
        addScores(sc, questions[qi].options[oi].scores);
      });
    });
    return sc;
  }, [answers]);

  const { primary, secondary } = useMemo(() => topTwo(scores), [scores]);

  const reset = () => {
    setAnswers(questions.map(() => []));
    setCurrent(0);
    setStage("intro");
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-warm)" }}>
      <div className="mx-auto max-w-3xl px-5 py-10 md:py-16">
        <Header />
        {stage === "intro" && <Intro onStart={() => setStage("quiz")} />}
        {stage === "quiz" && (
          <QuizView
            current={current}
            setCurrent={setCurrent}
            answers={answers}
            setAnswers={setAnswers}
            onFinish={() => setStage("results")}
          />
        )}
        {stage === "results" && (
          <ResultView primary={primary} secondary={secondary} onRestart={reset} />
        )}
        <Footer />
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="mb-8 flex flex-col items-center text-center">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium tracking-widest text-muted-foreground uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        Restored Radiance · Integrative Psychiatry
      </div>
      <h1 className="font-serif text-3xl leading-tight text-foreground md:text-5xl">
        Why Don’t I Feel Like Myself Anymore?
      </h1>
      <p className="mt-2 text-sm text-muted-foreground md:text-base">
        A Root Cause Pattern Assessment
      </p>
    </header>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <section className="rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] md:p-12">
      <div className="space-y-4 text-foreground/90 leading-relaxed">
        <p className="text-lg md:text-xl">You’re functioning.</p>
        <p className="text-lg md:text-xl">You’re showing up.</p>
        <p className="text-lg md:text-xl">You’re handling responsibilities.</p>
        <p className="pt-2 text-base md:text-lg text-muted-foreground">
          But underneath it all, you may feel exhausted, overwhelmed, disconnected, anxious,
          emotionally flat, or unlike yourself.
        </p>
        <p className="text-base md:text-lg text-muted-foreground">
          If you have been told your labs are normal but you know something is off, this assessment
          was designed to help identify what pattern may be driving what you feel, so you finally
          have language for it.
        </p>
        <div className="mt-6 rounded-2xl border border-border bg-secondary/50 p-4 text-sm text-secondary-foreground">
          This is not a diagnostic tool. It is a starting point for deeper self-awareness and
          personalized care.
        </div>
      </div>
      <button
        onClick={onStart}
        style={{ backgroundColor: "#6B4020" }}
        className="mt-8 w-full rounded-full px-8 py-4 text-base font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-[var(--transition-smooth)] hover:scale-[1.02] active:scale-[0.99] md:w-auto"
      >
        Begin the Assessment →
      </button>
      <p className="mt-3 text-xs text-muted-foreground">12 questions · about 3 minutes</p>
    </section>
  );
}

interface QuizViewProps {
  current: number;
  setCurrent: (n: number) => void;
  answers: number[][];
  setAnswers: (a: number[][]) => void;
  onFinish: () => void;
}

function QuizView({ current, setCurrent, answers, setAnswers, onFinish }: QuizViewProps) {
  const q = questions[current];
  const selected = answers[current];
  const progress = ((current + 1) / questions.length) * 100;

  const toggle = (oi: number) => {
    const next = answers.map((a) => [...a]);
    if (q.multi) {
      const idx = next[current].indexOf(oi);
      if (idx >= 0) next[current].splice(idx, 1);
      else next[current].push(oi);
    } else {
      next[current] = [oi];
    }
    setAnswers(next);
    if (!q.multi) {
      // auto-advance
      setTimeout(() => {
        if (current < questions.length - 1) setCurrent(current + 1);
        else onFinish();
      }, 280);
    }
  };

  const canAdvance = selected.length > 0;

  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] md:p-10">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>
            Question {current + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-[image:var(--gradient-primary)] transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="font-serif text-2xl leading-snug text-foreground md:text-3xl">{q.prompt}</h2>
      {q.multi && (
        <p className="mt-1 text-sm text-muted-foreground">Select all that apply</p>
      )}

      <div className="mt-6 space-y-2.5">
        {q.options.map((opt: Option, oi: number) => {
          const isSelected = selected.includes(oi);
          return (
            <button
              key={oi}
              onClick={() => toggle(oi)}
              className={`group flex w-full items-center gap-3 rounded-2xl border px-5 py-4 text-left transition-[var(--transition-smooth)] ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-[var(--shadow-soft)]"
                  : "border-border bg-card hover:border-primary/40 hover:bg-secondary/40"
              }`}
            >
              <span
                className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  isSelected ? "border-primary bg-primary" : "border-border"
                }`}
              >
                {isSelected && (
                  <span className="h-2 w-2 rounded-full bg-primary-foreground" />
                )}
              </span>
              <span className="text-base text-foreground">{opt.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={() => current > 0 && setCurrent(current - 1)}
          disabled={current === 0}
          className="rounded-full px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
        >
          ← Back
        </button>
        {q.multi && (
          <button
            onClick={() => {
              if (current < questions.length - 1) setCurrent(current + 1);
              else onFinish();
            }}
            disabled={!canAdvance}
            className="rounded-full bg-[image:var(--gradient-primary)] px-7 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition-[var(--transition-smooth)] hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
          >
            {current === questions.length - 1 ? "See My Results" : "Continue →"}
          </button>
        )}
      </div>
    </section>
  );
}

function ResultView({
  primary,
  secondary,
  onRestart,
}: {
  primary: Category;
  secondary: Category | null;
  onRestart: () => void;
}) {
  const r = results[primary];
  const sec = secondary ? results[secondary] : null;

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] md:p-12">
        <div className="mb-3 inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-medium tracking-wider text-accent uppercase">
          Your Pattern
        </div>
        <h2 className="font-serif text-3xl leading-tight text-foreground md:text-5xl">
          {r.title}
        </h2>
        <div className="mt-2 flex justify-end">
          <button
            onClick={onRestart}
            className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            ↺ Retake the assessment
          </button>
        </div>
        <p className="mt-4 text-lg italic text-foreground/80 md:text-xl">{r.tagline}</p>
        <p className="mt-5 leading-relaxed text-muted-foreground md:text-lg">{r.description}</p>

        {sec && <SecondaryPattern sec={sec} />}
      </div>

      <div className="rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] md:p-10">
        <h3 className="font-serif text-xl text-foreground md:text-2xl">What this pattern is telling us</h3>
        <p className="mt-4 leading-relaxed text-foreground/90 md:text-lg">{r.helps}</p>
      </div>

      <div
        className="rounded-3xl border border-primary/20 p-7 text-primary-foreground shadow-[var(--shadow-glow)] md:p-10"
        style={{ backgroundColor: "#6B4020" }}
      >
        <h3 className="font-serif text-xl md:text-2xl">Your next step</h3>
        <p className="mt-3 leading-relaxed opacity-95">{r.nextStep}</p>
        <a
          href="https://restoredradiancepsych.com/rooted-restored-gateway"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-card px-7 py-3.5 text-sm font-medium text-foreground transition-[var(--transition-smooth)] hover:scale-[1.03]"
        >
          Book Your Rooted and Restored Gateway Intake →
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-12 text-center text-xs text-muted-foreground">
      This assessment is for self-awareness and is not intended to diagnose, treat, or replace
      medical advice.
    </footer>
  );
}
