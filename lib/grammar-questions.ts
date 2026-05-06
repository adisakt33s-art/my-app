// ── Types ─────────────────────────────────────────────────────

export type FillBlankQ = {
  id: string;
  type: "fill-blank";
  sentence: string;    // contains "___"
  options: string[];
  answer: string;
  topic: string;
  explanation: string;
};

export type MultipleChoiceQ = {
  id: string;
  type: "multiple-choice";
  question: string;
  options: string[];
  answer: number;      // correct index
  topic: string;
  explanation: string;
};

export type SentenceReorderQ = {
  id: string;
  type: "sentence-reorder";
  words: string[];     // shuffled
  answer: string[];    // correct order
  hint: string;
  topic: string;
  explanation: string;
};

export type GrammarQuestion = FillBlankQ | MultipleChoiceQ | SentenceReorderQ;

// ── Fill-in-blank (10) ────────────────────────────────────────

export const fillBlankQuestions: FillBlankQ[] = [
  {
    id: "fb01",
    type: "fill-blank",
    sentence: "She ___ in this company since 2019.",
    options: ["works", "is working", "has worked", "worked"],
    answer: "has worked",
    topic: "Present Perfect",
    explanation: "'Has worked' + 'since' = action starting in the past and continuing now.",
  },
  {
    id: "fb02",
    type: "fill-blank",
    sentence: "If I ___ more free time, I would travel every month.",
    options: ["have", "had", "will have", "would have"],
    answer: "had",
    topic: "Second Conditional",
    explanation: "Second conditional: 'If + past simple, would + base verb'",
  },
  {
    id: "fb03",
    type: "fill-blank",
    sentence: "By the time we arrived, the meeting ___ already.",
    options: ["finished", "has finished", "had finished", "will finish"],
    answer: "had finished",
    topic: "Past Perfect",
    explanation: "Past perfect 'had finished' = completed before another past event.",
  },
  {
    id: "fb04",
    type: "fill-blank",
    sentence: "He speaks English very ___.",
    options: ["good", "well", "nice", "fine"],
    answer: "well",
    topic: "Adverbs",
    explanation: "Adverb 'well' modifies the verb 'speaks', not a noun.",
  },
  {
    id: "fb05",
    type: "fill-blank",
    sentence: "She has been studying English ___ three years.",
    options: ["since", "for", "during", "while"],
    answer: "for",
    topic: "For vs Since",
    explanation: "'For' + duration (three years). 'Since' + specific point in time.",
  },
  {
    id: "fb06",
    type: "fill-blank",
    sentence: "The new branch ___ next January.",
    options: ["opens", "is opening", "will be opened", "is going to open"],
    answer: "is going to open",
    topic: "Future Plans",
    explanation: "'Going to' for planned future events with prior intention.",
  },
  {
    id: "fb07",
    type: "fill-blank",
    sentence: "This is the best film ___ I have ever seen.",
    options: ["which", "what", "that", "who"],
    answer: "that",
    topic: "Relative Clauses",
    explanation: "'That' is used as a relative pronoun after superlatives.",
  },
  {
    id: "fb08",
    type: "fill-blank",
    sentence: "Neither John ___ Mary attended the conference.",
    options: ["or", "nor", "and", "but"],
    answer: "nor",
    topic: "Correlative Conjunctions",
    explanation: "'Neither...nor' pairs negative alternatives.",
  },
  {
    id: "fb09",
    type: "fill-blank",
    sentence: "She wishes she ___ harder at university.",
    options: ["studies", "studied", "had studied", "has studied"],
    answer: "had studied",
    topic: "Wish + Past Perfect",
    explanation: "'Wish + past perfect' expresses regret about the past.",
  },
  {
    id: "fb10",
    type: "fill-blank",
    sentence: "You ___ finish the report — I already submitted it.",
    options: ["must", "should", "don't have to", "must not"],
    answer: "don't have to",
    topic: "Modal Verbs",
    explanation: "'Don't have to' = no obligation. 'Must not' = prohibition.",
  },
];

// ── Multiple Choice (10) ──────────────────────────────────────

export const multipleChoiceQuestions: MultipleChoiceQ[] = [
  {
    id: "mc01",
    type: "multiple-choice",
    question: "Which sentence is grammatically correct?",
    options: [
      "She don't like coffee.",
      "She doesn't likes coffee.",
      "She doesn't like coffee.",
      "She not like coffee.",
    ],
    answer: 2,
    topic: "Subject-Verb Agreement",
    explanation: "Third person singular: 'does' + base verb (no 's' on the verb).",
  },
  {
    id: "mc02",
    type: "multiple-choice",
    question: "I'm looking forward ___ the presentation tomorrow.",
    options: ["to give", "to giving", "giving", "give"],
    answer: 1,
    topic: "Gerunds",
    explanation: "'Look forward to' is always followed by a gerund (verb + -ing).",
  },
  {
    id: "mc03",
    type: "multiple-choice",
    question: "The annual report ___ before last Friday's deadline.",
    options: ["submitted", "was submitted", "has submitted", "is submitted"],
    answer: 1,
    topic: "Passive Voice",
    explanation: "Passive voice 'was submitted' — the subject receives the action.",
  },
  {
    id: "mc04",
    type: "multiple-choice",
    question: "___ being tired, she completed all her assignments.",
    options: ["Although", "However", "Despite", "Even"],
    answer: 2,
    topic: "Contrast",
    explanation: "'Despite' + noun/gerund. 'Although' + full clause.",
  },
  {
    id: "mc05",
    type: "multiple-choice",
    question: "He told me he ___ the proposal the following day.",
    options: ["will send", "would send", "sends", "is sending"],
    answer: 1,
    topic: "Reported Speech",
    explanation: "Reported speech shifts 'will' → 'would' in past reporting.",
  },
  {
    id: "mc06",
    type: "multiple-choice",
    question: "Which sentence uses the correct tense?",
    options: [
      "I have seen him yesterday.",
      "I saw him yesterday.",
      "I did see him yesterday.",
      "I seen him yesterday.",
    ],
    answer: 1,
    topic: "Past Simple vs Present Perfect",
    explanation: "Use Past Simple with specific past time expressions like 'yesterday'.",
  },
  {
    id: "mc07",
    type: "multiple-choice",
    question: "She is ___ talented designer that clients request her by name.",
    options: ["so", "such", "very", "too"],
    answer: 1,
    topic: "Intensifiers",
    explanation: "'Such a + adjective + noun'. 'So' is used before adjectives without a noun.",
  },
  {
    id: "mc08",
    type: "multiple-choice",
    question: "You ___ arrive early — the doors don't open until 9.",
    options: ["must", "should", "need to", "don't need to"],
    answer: 3,
    topic: "Modal Verbs — Necessity",
    explanation: "'Don't need to' = it's not necessary. 'Must' = strong obligation.",
  },
  {
    id: "mc09",
    type: "multiple-choice",
    question: "If I ___ you, I would accept that offer immediately.",
    options: ["am", "was", "were", "had been"],
    answer: 2,
    topic: "Second Conditional",
    explanation: "'If I were you' uses subjunctive 'were' (not 'was') for hypothetical advice.",
  },
  {
    id: "mc10",
    type: "multiple-choice",
    question: "They ___ for the bus for 40 minutes when it finally arrived.",
    options: [
      "waited",
      "have been waiting",
      "had been waiting",
      "were waiting",
    ],
    answer: 2,
    topic: "Past Perfect Continuous",
    explanation: "Past perfect continuous 'had been waiting' = duration before a past event.",
  },
];

// ── Sentence Reorder (10) ─────────────────────────────────────

export const sentenceReorderQuestions: SentenceReorderQ[] = [
  {
    id: "sr01",
    type: "sentence-reorder",
    answer: ["She", "has", "worked", "here", "since", "2020"],
    words: ["since", "here", "worked", "2020", "She", "has"],
    hint: "Present Perfect",
    topic: "Present Perfect",
    explanation: "Subject + has/have + past participle + since + year.",
  },
  {
    id: "sr02",
    type: "sentence-reorder",
    answer: ["The", "report", "must", "be", "submitted", "by", "Friday"],
    words: ["submitted", "must", "Friday", "be", "by", "The", "report"],
    hint: "Modal + Passive",
    topic: "Passive Voice",
    explanation: "Modal passive: subject + must + be + past participle.",
  },
  {
    id: "sr03",
    type: "sentence-reorder",
    answer: ["I", "have", "never", "been", "to", "Japan", "before"],
    words: ["Japan", "been", "before", "I", "never", "have", "to"],
    hint: "Present Perfect + Adverb",
    topic: "Present Perfect",
    explanation: "Present perfect with 'never': have + never + past participle.",
  },
  {
    id: "sr04",
    type: "sentence-reorder",
    answer: ["Despite", "being", "tired", "she", "finished", "all", "her", "tasks"],
    words: ["her", "being", "she", "tasks", "Despite", "all", "finished", "tired"],
    hint: "Despite + gerund",
    topic: "Contrast",
    explanation: "Despite + gerund (being + adjective) + main clause.",
  },
  {
    id: "sr05",
    type: "sentence-reorder",
    answer: ["Could", "you", "please", "explain", "the", "instructions", "again"],
    words: ["again", "instructions", "you", "explain", "the", "please", "Could"],
    hint: "Polite Request",
    topic: "Modal Verbs",
    explanation: "'Could you please + base verb' for polite requests.",
  },
  {
    id: "sr06",
    type: "sentence-reorder",
    answer: ["He", "suggested", "that", "she", "apply", "for", "the", "position"],
    words: ["position", "she", "for", "suggested", "that", "apply", "He", "the"],
    hint: "Subjunctive after 'suggest'",
    topic: "Subjunctive",
    explanation: "'Suggest that + subject + base verb' (subjunctive mood).",
  },
  {
    id: "sr07",
    type: "sentence-reorder",
    answer: ["By", "the", "time", "you", "arrive", "we", "will", "have", "left"],
    words: ["arrive", "time", "will", "have", "By", "we", "you", "the", "left"],
    hint: "Future Perfect",
    topic: "Future Perfect",
    explanation: "Future perfect 'will have + past participle' for completion before a future point.",
  },
  {
    id: "sr08",
    type: "sentence-reorder",
    answer: ["She", "is", "such", "a", "good", "teacher", "that", "everyone", "loves", "her"],
    words: ["teacher", "a", "her", "is", "that", "everyone", "good", "She", "such", "loves"],
    hint: "Such a + noun",
    topic: "Intensifiers",
    explanation: "'Such a + adjective + noun + that' to show result.",
  },
  {
    id: "sr09",
    type: "sentence-reorder",
    answer: ["I", "wish", "I", "had", "taken", "that", "opportunity"],
    words: ["I", "taken", "opportunity", "had", "that", "wish", "I"],
    hint: "Wish + Past Perfect",
    topic: "Regrets",
    explanation: "'Wish + past perfect' expresses regret about a past situation.",
  },
  {
    id: "sr10",
    type: "sentence-reorder",
    answer: ["Neither", "the", "manager", "nor", "the", "staff", "was", "informed"],
    words: ["informed", "the", "nor", "manager", "the", "Neither", "was", "staff"],
    hint: "Neither...nor",
    topic: "Correlative Conjunctions",
    explanation: "'Neither...nor' takes a singular verb when subjects are both singular.",
  },
];

// ── Helpers ───────────────────────────────────────────────────

export function getQuestions(type: "fill-blank" | "multiple-choice" | "sentence-reorder") {
  if (type === "fill-blank")       return fillBlankQuestions;
  if (type === "multiple-choice")  return multipleChoiceQuestions;
  return sentenceReorderQuestions;
}

export function levelFromScore(score: number) {
  if (score >= 81) return { label: "Advanced",           color: "#22d3a0" };
  if (score >= 61) return { label: "Upper-Intermediate", color: "#38bdf8" };
  if (score >= 41) return { label: "Intermediate",       color: "#818cf8" };
  if (score >= 21) return { label: "Elementary",         color: "#fb923c" };
  return              { label: "Beginner",               color: "#f87171" };
}

export function xpFromScore(score: number) {
  if (score >= 90) return 50;
  if (score >= 70) return 35;
  if (score >= 50) return 20;
  return 10;
}
