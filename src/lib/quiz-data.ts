export type Category = "BURNOUT" | "HORMONE" | "CAREGIVER" | "DEPLETED" | "SURVIVAL";

export type Scores = Record<Category, number>;

export interface Option {
  label: string;
  scores: Partial<Scores>;
}

export interface Question {
  id: number;
  prompt: string;
  multi?: boolean;
  options: Option[];
}

const s = (cat: Category, pts: number): Partial<Scores> => ({ [cat]: pts });

export const questions: Question[] = [
  {
    id: 1,
    prompt: "How have you been feeling lately?",
    options: [
      { label: "Exhausted no matter how much I rest", scores: s("BURNOUT", 3) },
      { label: "Overwhelmed but still pushing through", scores: s("BURNOUT", 2) },
      { label: "Emotionally numb or disconnected", scores: s("CAREGIVER", 3) },
      { label: "Anxious or constantly on edge", scores: s("SURVIVAL", 3) },
      { label: "Irritable and overstimulated", scores: s("HORMONE", 2) },
      { label: "Foggy and mentally drained", scores: s("DEPLETED", 3) },
    ],
  },
  {
    id: 2,
    prompt: "What feels hardest for you right now?",
    options: [
      { label: "Slowing my mind down", scores: s("SURVIVAL", 3) },
      { label: "Finding energy for myself", scores: s("BURNOUT", 2) },
      { label: "Feeling emotionally stable", scores: s("HORMONE", 2) },
      { label: "Staying focused and productive", scores: s("DEPLETED", 3) },
      { label: "Feeling motivated or excited", scores: s("CAREGIVER", 2) },
      { label: "Feeling present in my life", scores: s("CAREGIVER", 3) },
    ],
  },
  {
    id: 3,
    prompt: "How does stress usually show up in your body?",
    options: [
      { label: "Tension or tight shoulders", scores: s("SURVIVAL", 2) },
      { label: "Digestive issues or bloating", scores: s("DEPLETED", 3) },
      { label: "Difficulty sleeping", scores: s("HORMONE", 2) },
      { label: "Racing thoughts", scores: s("SURVIVAL", 3) },
      { label: "Fatigue or crashes", scores: s("BURNOUT", 3) },
      { label: "Headaches or body aches", scores: s("HORMONE", 2) },
    ],
  },
  {
    id: 4,
    prompt: "How often do you feel like you’re constantly “on”?",
    options: [
      { label: "Almost always", scores: s("SURVIVAL", 3) },
      { label: "Frequently", scores: s("SURVIVAL", 2) },
      { label: "Sometimes", scores: s("BURNOUT", 1) },
      { label: "Rarely", scores: {} },
    ],
  },
  {
    id: 5,
    prompt: "Which symptoms sound most familiar? (select all that apply)",
    multi: true,
    options: [
      { label: "Brain fog", scores: s("DEPLETED", 2) },
      { label: "Weight changes", scores: s("HORMONE", 2) },
      { label: "Low libido", scores: s("HORMONE", 2) },
      { label: "Poor sleep", scores: s("SURVIVAL", 2) },
      { label: "PMS or mood swings", scores: s("HORMONE", 2) },
      { label: "Afternoon energy crashes", scores: s("BURNOUT", 2) },
      { label: "Anxiety spikes", scores: s("SURVIVAL", 2) },
      { label: "Digestive symptoms", scores: s("DEPLETED", 2) },
      { label: "Feeling emotionally detached", scores: s("CAREGIVER", 2) },
    ],
  },
  {
    id: 6,
    prompt: "How often do you wake up feeling rested?",
    options: [
      { label: "Never", scores: s("BURNOUT", 2) },
      { label: "Rarely", scores: s("SURVIVAL", 2) },
      { label: "Sometimes", scores: s("DEPLETED", 1) },
      { label: "Often", scores: {} },
    ],
  },
  {
    id: 7,
    prompt: "Which statement sounds most like you?",
    options: [
      { label: "I’m the strong one for everyone else", scores: s("CAREGIVER", 3) },
      { label: "I push through even when I’m exhausted", scores: s("BURNOUT", 3) },
      { label: "I look fine on the outside, but I’m struggling internally", scores: s("SURVIVAL", 2) },
      { label: "I’ve tried to “fix” this on my own already", scores: s("DEPLETED", 2) },
      { label: "I feel like my body is working against me", scores: s("HORMONE", 3) },
      { label: "I don’t recognize myself anymore", scores: s("CAREGIVER", 2) },
    ],
  },
  {
    id: 8,
    prompt: "What do you tend to hide from others?",
    options: [
      { label: "My exhaustion", scores: s("BURNOUT", 3) },
      { label: "My anxiety", scores: s("SURVIVAL", 3) },
      { label: "My overwhelm", scores: s("CAREGIVER", 2) },
      { label: "My sadness", scores: s("CAREGIVER", 3) },
      { label: "How disconnected I feel", scores: s("DEPLETED", 2) },
      { label: "How hard everything feels", scores: s("SURVIVAL", 2) },
    ],
  },
  {
    id: 9,
    prompt: "What best describes your current stress level?",
    options: [
      { label: "Constantly overwhelmed", scores: s("SURVIVAL", 3) },
      { label: "High but manageable", scores: s("BURNOUT", 2) },
      { label: "Moderate", scores: {} },
      { label: "Low", scores: {} },
    ],
  },
  {
    id: 10,
    prompt: "Have you ever felt dismissed or unheard when seeking help for your symptoms?",
    options: [
      { label: "Yes, multiple times", scores: s("CAREGIVER", 2) },
      { label: "Occasionally", scores: s("DEPLETED", 1) },
      { label: "Rarely", scores: {} },
      { label: "Never", scores: {} },
    ],
  },
  {
    id: 11,
    prompt: "How would you describe your relationship with rest?",
    options: [
      { label: "I don’t know how to slow down", scores: s("SURVIVAL", 3) },
      { label: "I rest physically but my mind never stops", scores: s("SURVIVAL", 2) },
      { label: "I feel guilty resting", scores: s("CAREGIVER", 2) },
      { label: "I rest, but still feel depleted", scores: s("BURNOUT", 2) },
      { label: "I struggle to make time for myself", scores: s("CAREGIVER", 3) },
    ],
  },
  {
    id: 12,
    prompt: "Which of these resonates with you most?",
    options: [
      { label: "“I’m surviving, not thriving.”", scores: s("SURVIVAL", 3) },
      { label: "“I’m tired of feeling off.”", scores: s("DEPLETED", 2) },
      { label: "“Something deeper feels wrong.”", scores: s("HORMONE", 3) },
      { label: "“I just want to feel like myself again.”", scores: s("CAREGIVER", 2) },
      { label: "“I want clarity about what’s happening to me.”", scores: s("DEPLETED", 2) },
      { label: "“I’m functioning, but barely.”", scores: s("BURNOUT", 3) },
    ],
  },
];

export interface ResultProfile {
  code: Category;
  title: string;
  tagline: string;
  description: string;
  helps: string;
  nextStep: string;
  cta: string;
}

export const results: Record<Category, ResultProfile> = {
  BURNOUT: {
    code: "BURNOUT",
    title: "The Burned-Out Achiever",
    tagline: "You’ve become incredibly skilled at functioning while depleted.",
    description:
      "You likely carry a high level of responsibility and continue showing up even when your body and nervous system are asking for rest. Over time, chronic stress can impact cortisol balance, sleep quality, emotional regulation, inflammation, and overall resilience. Your symptoms may not be caused by a lack of motivation — your system may simply be overloaded.",
    helps: [
      "Nervous system regulation",
      "Burnout recovery support",
      "Hormonal and cortisol assessment",
      "Sleep and stress optimization",
      "Functional medicine evaluation",
    ],
    nextStep:
      "The Rooted & Restored Gateway can help uncover potential contributors to your exhaustion and provide a personalized roadmap forward.",
    cta: "Begin Your Root Cause Assessment",
  },
  HORMONE: {
    code: "HORMONE",
    title: "The Hormone-Hijacked High Performer",
    tagline: "Your symptoms may be connected to deeper hormonal and stress-related imbalances.",
    description:
      "Many high-functioning women normalize fatigue, anxiety, irritability, PMS, sleep disruption, weight changes, and brain fog for far too long. Hormonal shifts and chronic stress patterns can significantly impact both emotional and physical wellness.",
    helps: [
      "Comprehensive hormone evaluation",
      "Cortisol and HPA-axis assessment",
      "Functional medicine lab testing",
      "Personalized lifestyle and nutraceutical support",
      "Stress recovery strategies",
    ],
    nextStep:
      "The Rooted & Restored Gateway provides a deeper look into the hormonal, nervous system, and functional contributors affecting your wellness.",
    cta: "Schedule Your Gateway Assessment",
  },
  CAREGIVER: {
    code: "CAREGIVER",
    title: "The Emotionally Exhausted Caregiver",
    tagline:
      "You may spend so much time supporting others that you’ve stopped noticing how depleted you’ve become.",
    description:
      "Many women in this pattern continue functioning externally while internally feeling emotionally drained, disconnected, anxious, or overwhelmed. This can be associated with chronic nervous system activation, burnout, emotional overload, and long-term stress exposure.",
    helps: [
      "Nervous system support",
      "Emotional regulation strategies",
      "Sleep and stress restoration",
      "Personalized wellness planning",
      "Root-cause focused evaluation",
    ],
    nextStep:
      "The Rooted & Restored Gateway was designed to help uncover what your mind and body may have been compensating for.",
    cta: "Start Your Restoration Journey",
  },
  DEPLETED: {
    code: "DEPLETED",
    title: "The Foggy & Depleted Woman",
    tagline: "Your body may be trying to signal that something deeper needs attention.",
    description:
      "Brain fog, low motivation, emotional flatness, fatigue, digestive symptoms, and difficulty concentrating are often associated with chronic inflammation, nutrient depletion, gut-brain imbalance, stress overload, and nervous system dysregulation.",
    helps: [
      "Functional lab assessment",
      "Gut-brain evaluation",
      "Nutrient and inflammation support",
      "Personalized supplement recommendations",
      "Comprehensive integrative care",
    ],
    nextStep:
      "The Rooted & Restored Gateway can help identify potential root contributors to your symptoms and create a personalized plan for recovery.",
    cta: "Discover Your Root Causes",
  },
  SURVIVAL: {
    code: "SURVIVAL",
    title: "The Stuck-in-Survival-Mode Woman",
    tagline:
      "Your nervous system may have adapted to stress for so long that survival mode has become your normal.",
    description:
      "You may constantly feel “on,” overwhelmed, emotionally reactive, anxious, exhausted, or unable to fully relax — even when life appears manageable from the outside. This pattern is common in individuals experiencing chronic stress exposure, nervous system dysregulation, burnout, and emotional overload.",
    helps: [
      "Nervous system regulation",
      "Stress recovery support",
      "Cortisol and hormone assessment",
      "Personalized wellness planning",
      "Integrative psychiatric support",
    ],
    nextStep:
      "The Rooted & Restored Gateway offers a comprehensive starting point for understanding what may be keeping your system stuck in survival mode.",
    cta: "Take the Next Step Toward Restoration",
  },
};

export function emptyScores(): Scores {
  return { BURNOUT: 0, HORMONE: 0, CAREGIVER: 0, DEPLETED: 0, SURVIVAL: 0 };
}

export function addScores(into: Scores, add: Partial<Scores>) {
  for (const k in add) {
    const key = k as Category;
    into[key] += add[key] ?? 0;
  }
}

export function topTwo(scores: Scores): { primary: Category; secondary: Category | null } {
  const entries = (Object.entries(scores) as [Category, number][]).sort((a, b) => b[1] - a[1]);
  const primary = entries[0][0];
  const secondary = entries[1][1] > 0 && entries[1][1] >= entries[0][1] * 0.6 ? entries[1][0] : null;
  return { primary, secondary };
}
