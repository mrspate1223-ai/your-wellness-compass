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
    helps:
      "You have built your life around showing up. For everyone, in every room, at every level. And you have done it so well that most people have no idea what it costs you. What you are experiencing is not a discipline problem or a mindset problem. It is a nervous system and cortisol problem. Your body has been in overdrive for so long that depletion has become your baseline. The Rooted and Restored Gateway Intake is where we start looking at what is actually driving that, with labs and a clinical framework that standard psychiatry does not use.",
    nextStep:
      "You have spent long enough functioning on empty. The Rooted and Restored Gateway Intake gives us 90 minutes to look at the full picture, your hormones, your stress response, your nervous system, and build a roadmap that actually fits what is happening in your body. Not a prescription. A starting point that goes deeper.",
    cta: "Begin Your Root Cause Assessment",
  },
  HORMONE: {
    code: "HORMONE",
    title: "The Hormone-Hijacked High Performer",
    tagline: "Your symptoms may be connected to deeper hormonal and stress-related imbalances.",
    description:
      "Many high-functioning women normalize fatigue, anxiety, irritability, PMS, sleep disruption, weight changes, and brain fog for far too long. Hormonal shifts and chronic stress patterns can significantly impact both emotional and physical wellness.",
    helps:
      "The symptoms you have been pushing through, the mood shifts, the fatigue that does not lift, the brain that does not cooperate, the body that feels like it is working against you, are not random. They are connected. Hormonal dysregulation rarely shows up cleanly in standard labs, which is exactly why you have probably been told everything looks fine. The Rooted and Restored Gateway Intake is where we start running the panels that actually reflect what your hormones are doing and build a clinical picture that makes sense of what you have been experiencing.",
    nextStep:
      "Your hormones are not separate from your mental health. They are central to it. The Rooted and Restored Gateway Intake is 90 minutes of clinical depth, the kind that looks at what your current providers have not tested, and starts building a roadmap toward the version of you that is not white-knuckling through every cycle.",
    cta: "Schedule Your Gateway Assessment",
  },
  CAREGIVER: {
    code: "CAREGIVER",
    title: "The Emotionally Exhausted Caregiver",
    tagline:
      "You may spend so much time supporting others that you’ve stopped noticing how depleted you’ve become.",
    description:
      "Many women in this pattern continue functioning externally while internally feeling emotionally drained, disconnected, anxious, or overwhelmed. This can be associated with chronic nervous system activation, burnout, emotional overload, and long-term stress exposure.",
    helps:
      "You are the person everyone leans on. You have probably been that person for so long that you cannot remember what it felt like to not be carrying something. The exhaustion you feel is not weakness and it is not something a vacation fixes. It is the result of a nervous system that has been in give mode for years, without the input it needs to regulate and restore. The Rooted and Restored Gateway Intake is where we look at what chronic emotional load is doing to your biology, and what it actually takes to rebuild from the inside out.",
    nextStep:
      "You give so much to everyone around you. The Rooted and Restored Gateway Intake is 90 minutes that belong entirely to you. No agenda except getting to the root of what is happening in your body and building a clear, guided path back to yourself.",
    cta: "Start Your Restoration Journey",
  },
  DEPLETED: {
    code: "DEPLETED",
    title: "The Foggy & Depleted Woman",
    tagline: "Your body may be trying to signal that something deeper needs attention.",
    description:
      "Brain fog, low motivation, emotional flatness, fatigue, digestive symptoms, and difficulty concentrating are often associated with chronic inflammation, nutrient depletion, gut-brain imbalance, stress overload, and nervous system dysregulation.",
    helps:
      "Brain fog is one of the most dismissed symptoms in women's healthcare, and one of the most telling. When your mind feels slow, your body feels flat, and your motivation has gone quiet, your system is not failing you out of nowhere. There is almost always something biological underneath it, inflammation, nutrient depletion, gut-brain dysregulation, or a combination that has been building for a long time. The Rooted and Restored Gateway Intake is where we start identifying what that is, with a clinical lens that actually looks for it.",
    nextStep:
      "The fog is not permanent. It is a signal. The Rooted and Restored Gateway Intake gives us 90 minutes to start reading that signal clearly, look at what your body is actually depleted in, and build a roadmap that addresses what is driving it at the root, not just the surface.",
    cta: "Discover Your Root Causes",
  },
  SURVIVAL: {
    code: "SURVIVAL",
    title: "The Stuck-in-Survival-Mode Woman",
    tagline:
      "Your nervous system may have adapted to stress for so long that survival mode has become your normal.",
    description:
      "You may constantly feel “on,” overwhelmed, emotionally reactive, anxious, exhausted, or unable to fully relax — even when life appears manageable from the outside. This pattern is common in individuals experiencing chronic stress exposure, nervous system dysregulation, burnout, and emotional overload.",
    helps:
      "When your nervous system has been in survival mode long enough, it stops feeling like a crisis and starts feeling like just how you are. The constant vigilance, the inability to fully rest, the emotional reactivity that surprises even you, these are not personality traits. They are physiological adaptations to prolonged stress. And they can be changed. The Rooted and Restored Gateway Intake is where we start looking at what your nervous system and your biology need to actually shift out of survival and into something that feels like your life again.",
    nextStep:
      "You were not built to live like this. The Rooted and Restored Gateway Intake is 90 minutes to look at what has kept your system stuck in overdrive and build a clear, clinical path toward a nervous system that can finally rest. This is where the pattern starts to change.",
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
