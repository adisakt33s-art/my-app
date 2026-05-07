// ── Types ─────────────────────────────────────────────────────

export type FillBlankQ = {
  id: string; type: "fill-blank";
  sentence: string; options: string[]; answer: string;
  topic: string; explanation: string; explanationTh: string;
};
export type MultipleChoiceQ = {
  id: string; type: "multiple-choice";
  question: string; options: string[]; answer: number;
  topic: string; explanation: string; explanationTh: string;
};
export type SentenceReorderQ = {
  id: string; type: "sentence-reorder";
  words: string[]; answer: string[]; hint: string;
  topic: string; explanation: string; explanationTh: string;
};
export type GrammarQuestion = FillBlankQ | MultipleChoiceQ | SentenceReorderQ;

// ── Topic metadata ─────────────────────────────────────────────

export type GrammarTopicMeta = {
  id: string; name: string; nameTh: string;
  description: string; level: string; color: string; icon: string;
};

export const GRAMMAR_TOPICS: GrammarTopicMeta[] = [
  { id: "Present Perfect",      name: "Present Perfect",       nameTh: "Present Perfect",       description: "have/has + past participle · ประสบการณ์และการกระทำที่ยังต่อเนื่อง", level: "Elementary",         color: "#38bdf8", icon: "⏱" },
  { id: "Past Perfect",         name: "Past Perfect",          nameTh: "Past Perfect",          description: "had + past participle · เสร็จก่อนเหตุการณ์อื่นในอดีต",              level: "Intermediate",       color: "#818cf8", icon: "⏮" },
  { id: "Second Conditional",   name: "Second Conditional",    nameTh: "Second Conditional",    description: "If + past simple, would + verb · สมมติปัจจุบัน/อนาคต",              level: "Intermediate",       color: "#22d3a0", icon: "🔀" },
  { id: "Third Conditional",    name: "Third Conditional",     nameTh: "Third Conditional",     description: "If + past perfect, would have + pp · เสียใจเรื่องอดีต",             level: "Upper-Intermediate", color: "#fb923c", icon: "↩" },
  { id: "Passive Voice",        name: "Passive Voice",         nameTh: "Passive Voice",         description: "be + past participle · ประธานถูกกระทำ",                             level: "Elementary",         color: "#38bdf8", icon: "🔄" },
  { id: "Modal Verbs",          name: "Modal Verbs",           nameTh: "Modal Verbs",           description: "must / should / might / can / could · กริยาช่วยบอกความจำเป็น",      level: "Elementary",         color: "#22d3a0", icon: "🎯" },
  { id: "Reported Speech",      name: "Reported Speech",       nameTh: "Reported Speech",       description: "Tense ถอยหลัง 1 ขั้น · รายงานคำพูดทางอ้อม",                       level: "Intermediate",       color: "#818cf8", icon: "💬" },
  { id: "Relative Clauses",     name: "Relative Clauses",      nameTh: "Relative Clauses",      description: "who / which / that / where · อนุประโยคขยายนาม",                    level: "Intermediate",       color: "#38bdf8", icon: "🔗" },
  { id: "Gerunds & Infinitives",name: "Gerunds & Infinitives", nameTh: "Gerunds & Infinitives", description: "verb+ing vs to+verb · หลังกริยาต่างๆ",                             level: "Intermediate",       color: "#22d3a0", icon: "📝" },
  { id: "Future Tenses",        name: "Future Tenses",         nameTh: "Future Tenses",         description: "will / going to / Future Perfect · พูดถึงอนาคต",                    level: "Elementary",         color: "#fb923c", icon: "🚀" },
  { id: "Conjunctions",         name: "Conjunctions",          nameTh: "Conjunctions",          description: "although / despite / neither...nor · คำเชื่อม",                     level: "Intermediate",       color: "#f472b6", icon: "🔀" },
  { id: "12 Tenses",            name: "12 Tenses",             nameTh: "12 Tenses ครบทุก Tense", description: "Simple / Continuous / Perfect / Perfect Continuous · ทั้งอดีต ปัจจุบัน อนาคต", level: "All Levels", color: "#facc15", icon: "📅" },
];

// ── Fill-in-Blank ──────────────────────────────────────────────

export const fillBlankQuestions: FillBlankQ[] = [

  // Present Perfect ───────────────────────────────────────────
  {
    id: "fb01", type: "fill-blank",
    sentence: "She ___ in this company since 2019.",
    options: ["works", "is working", "has worked", "worked"],
    answer: "has worked", topic: "Present Perfect",
    explanation: "'Has worked' + 'since' = action starting in the past continuing now.",
    explanationTh: "ใช้ has worked + since เพราะเธอยังทำงานอยู่ถึงปัจจุบัน 'since' ตามด้วยจุดเวลาที่เริ่มต้น",
  },
  {
    id: "fb05", type: "fill-blank",
    sentence: "She has been studying English ___ three years.",
    options: ["since", "for", "during", "while"],
    answer: "for", topic: "Present Perfect",
    explanation: "'For' + duration (three years). 'Since' + specific point in time.",
    explanationTh: "'for' ใช้กับระยะเวลา (three years) แต่ 'since' ใช้กับจุดเวลาที่ระบุ เช่น since 2020",
  },
  {
    id: "fb-pp1", type: "fill-blank",
    sentence: "Have you ever ___ sushi before?",
    options: ["eat", "ate", "eaten", "eating"],
    answer: "eaten", topic: "Present Perfect",
    explanation: "Present perfect uses 'have + past participle'. The past participle of 'eat' is 'eaten'.",
    explanationTh: "Present Perfect ใช้ have/has + กริยาช่อง 3 (past participle) · eat → ate → eaten",
  },
  {
    id: "fb-pp2", type: "fill-blank",
    sentence: "I ___ already finished my homework, so I can go out.",
    options: ["did", "have", "was", "am"],
    answer: "have", topic: "Present Perfect",
    explanation: "'Have already + past participle' shows completion before expected time.",
    explanationTh: "have already + กริยาช่อง 3 แสดงว่าเสร็จแล้วก่อนเวลาที่คาดไว้ ไม่ใช้ did กับ already ในลักษณะนี้",
  },

  // Past Perfect ──────────────────────────────────────────────
  {
    id: "fb03", type: "fill-blank",
    sentence: "By the time we arrived, the meeting ___ already.",
    options: ["finished", "has finished", "had finished", "will finish"],
    answer: "had finished", topic: "Past Perfect",
    explanation: "Past perfect 'had finished' = completed before another past event.",
    explanationTh: "Past Perfect (had + กริยาช่อง 3) ใช้เมื่อการกระทำหนึ่งเสร็จก่อนอีกการกระทำในอดีต",
  },
  {
    id: "fb-pastperf1", type: "fill-blank",
    sentence: "She ___ never seen snow before she moved to Canada.",
    options: ["has", "had", "was", "did"],
    answer: "had", topic: "Past Perfect",
    explanation: "'Had never seen' — past perfect for experience before a past point.",
    explanationTh: "had never + กริยาช่อง 3 บอกว่าก่อนที่จะย้ายไปแคนาดา เธอยังไม่เคยเห็นหิมะเลย",
  },
  {
    id: "fb-pastperf2", type: "fill-blank",
    sentence: "After he ___ the contract, he realized his mistake.",
    options: ["signed", "has signed", "had signed", "signs"],
    answer: "had signed", topic: "Past Perfect",
    explanation: "'Had signed' emphasizes the signing was completed before he realized.",
    explanationTh: "ใช้ had signed เพราะการเซ็นสัญญาเกิดขึ้นก่อนที่จะรู้ตัวว่าผิด",
  },

  // Second Conditional ────────────────────────────────────────
  {
    id: "fb02", type: "fill-blank",
    sentence: "If I ___ more free time, I would travel every month.",
    options: ["have", "had", "will have", "would have"],
    answer: "had", topic: "Second Conditional",
    explanation: "Second conditional: 'If + past simple, would + base verb'",
    explanationTh: "Second Conditional: If + กริยาช่อง 2, would + กริยาช่อง 1 · สมมติสถานการณ์ที่ไม่จริงในปัจจุบัน",
  },
  {
    id: "fb-sc1", type: "fill-blank",
    sentence: "I would call her if I ___ her number.",
    options: ["know", "knew", "will know", "would know"],
    answer: "knew", topic: "Second Conditional",
    explanation: "'If + past simple (knew)' for second conditional hypothesis.",
    explanationTh: "If-clause ใน Second Conditional ใช้ past simple (knew) ไม่ใช่ present simple",
  },
  {
    id: "fb-sc2", type: "fill-blank",
    sentence: "If he worked harder, he ___ more money.",
    options: ["earns", "will earn", "would earn", "earned"],
    answer: "would earn", topic: "Second Conditional",
    explanation: "Main clause of second conditional: 'would + base verb'.",
    explanationTh: "ประโยคหลักของ Second Conditional ใช้ would + กริยาช่อง 1",
  },

  // Third Conditional ─────────────────────────────────────────
  {
    id: "fb09", type: "fill-blank",
    sentence: "She wishes she ___ harder at university.",
    options: ["studies", "studied", "had studied", "has studied"],
    answer: "had studied", topic: "Third Conditional",
    explanation: "'Wish + past perfect' expresses regret about the past.",
    explanationTh: "Wish + past perfect (had + pp) แสดงความเสียใจเกี่ยวกับเหตุการณ์ในอดีตที่เปลี่ยนแปลงไม่ได้แล้ว",
  },
  {
    id: "fb-tc1", type: "fill-blank",
    sentence: "If she had studied harder, she ___ the exam.",
    options: ["would pass", "would have passed", "will pass", "had passed"],
    answer: "would have passed", topic: "Third Conditional",
    explanation: "Third conditional: 'If + past perfect, would have + past participle'.",
    explanationTh: "Third Conditional: If + had + pp, would have + pp · พูดถึงสิ่งที่ไม่ได้เกิดขึ้นในอดีต",
  },
  {
    id: "fb-tc2", type: "fill-blank",
    sentence: "He would have called you if he ___ your number.",
    options: ["knew", "knows", "had known", "would know"],
    answer: "had known", topic: "Third Conditional",
    explanation: "'Had known' in the if-clause of third conditional.",
    explanationTh: "If-clause ของ Third Conditional ใช้ had + pp (had known)",
  },

  // Passive Voice ─────────────────────────────────────────────
  {
    id: "fb-pv1", type: "fill-blank",
    sentence: "The new road ___ last year.",
    options: ["builds", "was built", "has built", "built"],
    answer: "was built", topic: "Passive Voice",
    explanation: "Past passive: 'was/were + past participle'.",
    explanationTh: "Passive Voice ในอดีต: was/were + กริยาช่อง 3 · ประธานถูกกระทำ",
  },
  {
    id: "fb-pv2", type: "fill-blank",
    sentence: "English ___ all over the world.",
    options: ["speaks", "is speaking", "is spoken", "was spoken"],
    answer: "is spoken", topic: "Passive Voice",
    explanation: "Present passive 'is spoken' — English is the subject receiving the action.",
    explanationTh: "Present Passive: is/are + กริยาช่อง 3 · ภาษาอังกฤษเป็นประธานที่ 'ถูก' พูด",
  },
  {
    id: "fb-pv3", type: "fill-blank",
    sentence: "The results ___ announced tomorrow morning.",
    options: ["will announce", "will be announced", "are announcing", "are announced"],
    answer: "will be announced", topic: "Passive Voice",
    explanation: "Future passive: 'will be + past participle'.",
    explanationTh: "Future Passive: will be + กริยาช่อง 3 · ผลลัพธ์จะ 'ถูก' ประกาศ",
  },

  // Modal Verbs ───────────────────────────────────────────────
  {
    id: "fb10", type: "fill-blank",
    sentence: "You ___ finish the report — I already submitted it.",
    options: ["must", "should", "don't have to", "must not"],
    answer: "don't have to", topic: "Modal Verbs",
    explanation: "'Don't have to' = no obligation. 'Must not' = prohibition.",
    explanationTh: "'don't have to' = ไม่จำเป็นต้อง (แต่ทำก็ได้) · 'must not' = ห้าม (สองอย่างนี้ความหมายต่างกัน!)",
  },
  {
    id: "fb-mv1", type: "fill-blank",
    sentence: "She ___ be sick — she looked very pale this morning.",
    options: ["must", "will", "should", "can"],
    answer: "must", topic: "Modal Verbs",
    explanation: "'Must' expresses a logical deduction based on evidence.",
    explanationTh: "must ใช้แสดงการคาดเดาที่มั่นใจมาก (logical deduction) จากหลักฐานที่เห็น",
  },
  {
    id: "fb-mv2", type: "fill-blank",
    sentence: "Students ___ use mobile phones during the exam.",
    options: ["should not", "don't have to", "must not", "couldn't"],
    answer: "must not", topic: "Modal Verbs",
    explanation: "'Must not' = prohibition / strictly forbidden.",
    explanationTh: "must not = ห้ามเด็ดขาด · ต่างจาก don't have to ที่แปลว่าไม่จำเป็น",
  },

  // Reported Speech ───────────────────────────────────────────
  {
    id: "fb-rs1", type: "fill-blank",
    sentence: "He told me he ___ the proposal the following day.",
    options: ["will send", "would send", "sends", "is sending"],
    answer: "would send", topic: "Reported Speech",
    explanation: "Reported speech shifts 'will' → 'would'.",
    explanationTh: "Reported Speech: will กลายเป็น would · 'I will send' → he said he would send",
  },
  {
    id: "fb-rs2", type: "fill-blank",
    sentence: "She said she ___ feeling well.",
    options: ["isn't", "wasn't", "hasn't been", "wouldn't be"],
    answer: "wasn't", topic: "Reported Speech",
    explanation: "Reported speech: 'am/is/are' shifts to 'was/were'.",
    explanationTh: "เมื่อรายงานคำพูด is → was, am → was, are → were (ถอยไปเป็น past)",
  },
  {
    id: "fb-rs3", type: "fill-blank",
    sentence: "They announced that the project ___ cancelled.",
    options: ["is", "has been", "had been", "will be"],
    answer: "had been", topic: "Reported Speech",
    explanation: "Reported speech: present perfect 'has been' shifts to past perfect 'had been'.",
    explanationTh: "Reported Speech: has been → had been (past perfect) เมื่ออยู่ในประโยครายงานอดีต",
  },

  // Relative Clauses ──────────────────────────────────────────
  {
    id: "fb07", type: "fill-blank",
    sentence: "This is the best film ___ I have ever seen.",
    options: ["which", "what", "that", "who"],
    answer: "that", topic: "Relative Clauses",
    explanation: "'That' is used as a relative pronoun after superlatives.",
    explanationTh: "หลัง Superlative (best, worst, etc.) ใช้ 'that' เป็น relative pronoun",
  },
  {
    id: "fb-rc1", type: "fill-blank",
    sentence: "The woman ___ called yesterday is my aunt.",
    options: ["which", "who", "whose", "where"],
    answer: "who", topic: "Relative Clauses",
    explanation: "'Who' is used for people in relative clauses.",
    explanationTh: "'who' ใช้แทนคนในอนุประโยคขยายนาม · 'which' ใช้แทนสิ่งของ",
  },
  {
    id: "fb-rc2", type: "fill-blank",
    sentence: "I visited the city ___ Shakespeare was born.",
    options: ["which", "who", "that", "where"],
    answer: "where", topic: "Relative Clauses",
    explanation: "'Where' introduces a relative clause referring to a place.",
    explanationTh: "'where' ใช้ขยายสถานที่ · I visited the city where (ที่ซึ่ง) Shakespeare was born",
  },

  // Gerunds & Infinitives ─────────────────────────────────────
  {
    id: "fb-gi1", type: "fill-blank",
    sentence: "She decided ___ abroad for her studies.",
    options: ["studying", "to study", "study", "studied"],
    answer: "to study", topic: "Gerunds & Infinitives",
    explanation: "'Decide' is followed by an infinitive (to + verb).",
    explanationTh: "decide ตามด้วย to + กริยาช่อง 1 (infinitive) เสมอ · decide to study",
  },
  {
    id: "fb-gi2", type: "fill-blank",
    sentence: "He enjoys ___ in the mountains on weekends.",
    options: ["hike", "to hike", "hiked", "hiking"],
    answer: "hiking", topic: "Gerunds & Infinitives",
    explanation: "'Enjoy' is always followed by a gerund (verb + -ing).",
    explanationTh: "enjoy ตามด้วย verb+ing (gerund) เสมอ · enjoy hiking, enjoy swimming",
  },
  {
    id: "fb-gi3", type: "fill-blank",
    sentence: "Please avoid ___ during rush hour if possible.",
    options: ["to drive", "driving", "drive", "driven"],
    answer: "driving", topic: "Gerunds & Infinitives",
    explanation: "'Avoid' is followed by a gerund (verb + -ing).",
    explanationTh: "avoid ตามด้วย verb+ing · กริยาที่ตามด้วย gerund เช่น avoid, enjoy, consider, suggest",
  },

  // Future Tenses ─────────────────────────────────────────────
  {
    id: "fb06", type: "fill-blank",
    sentence: "The new branch ___ next January.",
    options: ["opens", "is opening", "will be opened", "is going to open"],
    answer: "is going to open", topic: "Future Tenses",
    explanation: "'Going to' for planned future events with prior intention.",
    explanationTh: "'going to' ใช้กับแผนที่วางไว้แล้ว (planned intention) · 'will' ใช้ตัดสินใจตอนพูด",
  },
  {
    id: "fb-ft1", type: "fill-blank",
    sentence: "By the time you arrive, we ___ dinner already.",
    options: ["finish", "will finish", "will have finished", "have finished"],
    answer: "will have finished", topic: "Future Tenses",
    explanation: "Future perfect 'will have + pp' for completion before a future point.",
    explanationTh: "Future Perfect: will have + pp · ทานข้าวเสร็จแล้ว (ก่อน) ที่คุณจะมาถึง",
  },

  // Conjunctions ──────────────────────────────────────────────
  {
    id: "fb04", type: "fill-blank",
    sentence: "He speaks English very ___.",
    options: ["good", "well", "nice", "fine"],
    answer: "well", topic: "Conjunctions",
    explanation: "Adverb 'well' modifies the verb 'speaks'. 'Good' is an adjective.",
    explanationTh: "'well' เป็น adverb ขยายกริยา speaks · 'good' เป็น adjective ขยายนาม (เช่น good speaker)",
  },
  {
    id: "fb08", type: "fill-blank",
    sentence: "Neither John ___ Mary attended the conference.",
    options: ["or", "nor", "and", "but"],
    answer: "nor", topic: "Conjunctions",
    explanation: "'Neither...nor' pairs negative alternatives.",
    explanationTh: "Neither...nor ใช้คู่กัน แปลว่า ทั้ง...และ...ต่างก็ไม่... · Neither A nor B = ทั้ง A และ B ต่างไม่ทำ",
  },

  // ── 12 Tenses ──────────────────────────────────────────────
  { id: "t-fb01", type: "fill-blank",
    sentence: "She ___ to work every day by bus.",
    options: ["go", "goes", "is going", "went"],
    answer: "goes", topic: "12 Tenses",
    explanation: "Simple Present: subject (she) + verb+s for third person singular.",
    explanationTh: "Simple Present: ประธานบุรุษที่ 3 เอกพจน์ (she/he/it) ต้องเติม s ที่กริยา → goes",
  },
  { id: "t-fb02", type: "fill-blank",
    sentence: "They ___ football right now. Don't disturb them.",
    options: ["play", "plays", "are playing", "played"],
    answer: "are playing", topic: "12 Tenses",
    explanation: "Present Continuous: am/is/are + verb+ing for actions happening now.",
    explanationTh: "Present Continuous: am/is/are + verb+ing · 'right now' บอกว่ากำลังทำอยู่ตอนนี้",
  },
  { id: "t-fb03", type: "fill-blank",
    sentence: "I ___ in Bangkok for three years now.",
    options: ["live", "am living", "have lived", "lived"],
    answer: "have lived", topic: "12 Tenses",
    explanation: "Present Perfect: have/has + pp for actions from past to now.",
    explanationTh: "Present Perfect: have + pp · 'for three years now' = ตั้งแต่อดีตถึงปัจจุบัน",
  },
  { id: "t-fb04", type: "fill-blank",
    sentence: "She ___ all morning. That's why she's tired.",
    options: ["has been running", "ran", "is running", "runs"],
    answer: "has been running", topic: "12 Tenses",
    explanation: "Present Perfect Continuous: has/have been + verb+ing — focus on duration.",
    explanationTh: "Present Perfect Continuous: have/has been + verb+ing · เน้นว่าทำมานาน จึงเหนื่อย",
  },
  { id: "t-fb05", type: "fill-blank",
    sentence: "He ___ the report last night before going to bed.",
    options: ["finishes", "has finished", "finished", "was finishing"],
    answer: "finished", topic: "12 Tenses",
    explanation: "Simple Past: used for completed actions at a specific time in the past.",
    explanationTh: "Simple Past: กริยาช่อง 2 · 'last night' บอกเวลาในอดีตที่ชัดเจน",
  },
  { id: "t-fb06", type: "fill-blank",
    sentence: "When I called, she ___ a shower.",
    options: ["takes", "took", "was taking", "has taken"],
    answer: "was taking", topic: "12 Tenses",
    explanation: "Past Continuous: was/were + verb+ing for actions in progress when another happened.",
    explanationTh: "Past Continuous: was/were + verb+ing · เธอกำลังอาบน้ำอยู่ (ในขณะที่ฉันโทร)",
  },
  { id: "t-fb07", type: "fill-blank",
    sentence: "By the time they arrived, we ___ all the food.",
    options: ["ate", "have eaten", "had eaten", "were eating"],
    answer: "had eaten", topic: "12 Tenses",
    explanation: "Past Perfect: had + pp for action completed before another past action.",
    explanationTh: "Past Perfect: had + pp · กินหมดแล้ว (ก่อนที่พวกเขามาถึง)",
  },
  { id: "t-fb08", type: "fill-blank",
    sentence: "He ___ for two hours before the electricity went out.",
    options: ["studied", "was studying", "had been studying", "has been studying"],
    answer: "had been studying", topic: "12 Tenses",
    explanation: "Past Perfect Continuous: had been + verb+ing — duration before a past event.",
    explanationTh: "Past Perfect Continuous: had been + verb+ing · เน้นระยะเวลาก่อนเหตุการณ์ในอดีต",
  },
  { id: "t-fb09", type: "fill-blank",
    sentence: "I think it ___ rain tomorrow. Look at those clouds!",
    options: ["is going to", "will", "would", "rains"],
    answer: "is going to", topic: "12 Tenses",
    explanation: "'Going to' for predictions based on visible evidence (clouds = evidence).",
    explanationTh: "going to ใช้เมื่อมีหลักฐานชัดเจน (เมฆดำ) · will ใช้เมื่อพูดโดยไม่มีหลักฐาน",
  },
  { id: "t-fb10", type: "fill-blank",
    sentence: "This time next week, they ___ on the beach in Phuket.",
    options: ["will relax", "relax", "will be relaxing", "are relaxing"],
    answer: "will be relaxing", topic: "12 Tenses",
    explanation: "Future Continuous: will be + verb+ing for an ongoing action at a future time.",
    explanationTh: "Future Continuous: will be + verb+ing · 'this time next week' = อนาคตที่กำลังทำ",
  },
  { id: "t-fb11", type: "fill-blank",
    sentence: "By the time you arrive, I ___ the presentation already.",
    options: ["will finish", "finish", "will have finished", "am finishing"],
    answer: "will have finished", topic: "12 Tenses",
    explanation: "Future Perfect: will have + pp for completion before a future deadline.",
    explanationTh: "Future Perfect: will have + pp · จะเสร็จแล้ว (ก่อน) ที่คุณมาถึง",
  },
  { id: "t-fb12", type: "fill-blank",
    sentence: "By 2030, scientists ___ on this project for 20 years.",
    options: ["will work", "will have worked", "will be working", "will have been working"],
    answer: "will have been working", topic: "12 Tenses",
    explanation: "Future Perfect Continuous: will have been + verb+ing — duration up to a future point.",
    explanationTh: "Future Perfect Continuous: will have been + verb+ing · เน้นระยะเวลาที่ต่อเนื่องถึงอนาคต",
  },
];

// ── Multiple Choice ────────────────────────────────────────────

export const multipleChoiceQuestions: MultipleChoiceQ[] = [

  // Present Perfect ───────────────────────────────────────────
  {
    id: "mc06", type: "multiple-choice",
    question: "Which sentence is correct?",
    options: ["I have seen him yesterday.", "I saw him yesterday.", "I did see him yesterday.", "I seen him yesterday."],
    answer: 1, topic: "Present Perfect",
    explanation: "Use Past Simple with specific past time 'yesterday'. Present Perfect cannot be used with 'yesterday'.",
    explanationTh: "yesterday เป็น time expression อดีตที่ระบุชัด → ต้องใช้ Past Simple (saw) ไม่ใช่ Present Perfect",
  },
  {
    id: "mc-pp1", type: "multiple-choice",
    question: "___ you ever tried skydiving?",
    options: ["Did", "Do", "Have", "Are"],
    answer: 2, topic: "Present Perfect",
    explanation: "'Have you ever + past participle' — Present Perfect for life experience.",
    explanationTh: "Have you ever + pp ถามประสบการณ์ในชีวิต · ใช้ Have ไม่ใช่ Did",
  },
  {
    id: "mc-pp2", type: "multiple-choice",
    question: "She has known him ___ they were classmates.",
    options: ["for", "since", "during", "while"],
    answer: 1, topic: "Present Perfect",
    explanation: "'Since' + clause (point of time). 'For' + duration.",
    explanationTh: "'since' ตามด้วย clause หรือจุดเวลา · 'for' ตามด้วยระยะเวลา (for 5 years)",
  },

  // Past Perfect ──────────────────────────────────────────────
  {
    id: "mc-pastperf1", type: "multiple-choice",
    question: "Which sentence uses Past Perfect correctly?",
    options: ["He has left when I called.", "He was leaving when I called.", "He had left before I called.", "He left before I was calling."],
    answer: 2, topic: "Past Perfect",
    explanation: "'Had left' shows the departure was completed before the calling.",
    explanationTh: "had left เสร็จก่อน (ก่อนที่ฉันจะโทร) · Past Perfect แสดงว่าเหตุการณ์หนึ่งเกิดก่อนอีกเหตุการณ์ในอดีต",
  },
  {
    id: "mc-pastperf2", type: "multiple-choice",
    question: "We couldn't enter because they ___ the doors.",
    options: ["lock", "have locked", "had locked", "were locking"],
    answer: 2, topic: "Past Perfect",
    explanation: "'Had locked' — completed before we tried to enter.",
    explanationTh: "ล็อคประตู (had locked) เกิดขึ้นก่อน เราจึงเข้าไม่ได้ ใช้ Past Perfect",
  },
  {
    id: "mc10", type: "multiple-choice",
    question: "They ___ for the bus for 40 minutes when it finally arrived.",
    options: ["waited", "have been waiting", "had been waiting", "were waiting"],
    answer: 2, topic: "Past Perfect",
    explanation: "Past perfect continuous 'had been waiting' = duration before a past event.",
    explanationTh: "Past Perfect Continuous: had been + ing · รอนาน 40 นาที (ต่อเนื่อง) ก่อนรถบัสมาถึง",
  },

  // Second Conditional ────────────────────────────────────────
  {
    id: "mc09", type: "multiple-choice",
    question: "If I ___ you, I would accept that offer immediately.",
    options: ["am", "was", "were", "had been"],
    answer: 2, topic: "Second Conditional",
    explanation: "'If I were you' uses subjunctive 'were' (not 'was') for hypothetical advice.",
    explanationTh: "'If I were you' ใช้ were ไม่ใช่ was เพราะเป็น subjunctive mood แสดงสมมติ",
  },
  {
    id: "mc-sc1", type: "multiple-choice",
    question: "Which sentence is a correct Second Conditional?",
    options: [
      "If it will rain, I would stay home.",
      "If it rained, I would stay home.",
      "If it rains, I would stay home.",
      "If it had rained, I would stay home.",
    ],
    answer: 1, topic: "Second Conditional",
    explanation: "Second conditional: If + past simple + would + base verb.",
    explanationTh: "Second Conditional ถูกต้อง: If + past simple (rained) + would + base verb",
  },
  {
    id: "mc-sc2", type: "multiple-choice",
    question: "She would be happier if she ___ a break.",
    options: ["takes", "took", "will take", "has taken"],
    answer: 1, topic: "Second Conditional",
    explanation: "'Took' — past simple in the if-clause of second conditional.",
    explanationTh: "If-clause ของ Second Conditional ใช้ past simple (took) ไม่ใช่ present หรือ future",
  },

  // Third Conditional ─────────────────────────────────────────
  {
    id: "mc-tc1", type: "multiple-choice",
    question: "If it ___ rained, we would have gone to the beach.",
    options: ["didn't", "hadn't", "hasn't", "won't have"],
    answer: 1, topic: "Third Conditional",
    explanation: "Third conditional if-clause: 'hadn't + past participle'.",
    explanationTh: "If-clause ของ Third Conditional ใช้ hadn't + pp · hadn't rained = ฝนไม่ตก (ในอดีต)",
  },
  {
    id: "mc-tc2", type: "multiple-choice",
    question: "She ___ the meeting if her boss had informed her.",
    options: ["would attend", "will have attended", "would have attended", "had attended"],
    answer: 2, topic: "Third Conditional",
    explanation: "Main clause of third conditional: 'would have + past participle'.",
    explanationTh: "ประโยคหลัก Third Conditional ใช้ would have + pp · เธอจะได้เข้าประชุม (ถ้าถูกแจ้ง)",
  },
  {
    id: "mc-tc3", type: "multiple-choice",
    question: "I wish I ___ to the party last night.",
    options: ["go", "went", "have gone", "had gone"],
    answer: 3, topic: "Third Conditional",
    explanation: "'Wish + past perfect' expresses regret about a past event.",
    explanationTh: "Wish + had + pp แสดงความเสียใจเรื่องอดีต · wish I had gone = เสียดายที่ไม่ได้ไป",
  },

  // Passive Voice ─────────────────────────────────────────────
  {
    id: "mc03", type: "multiple-choice",
    question: "The annual report ___ before last Friday's deadline.",
    options: ["submitted", "was submitted", "has submitted", "is submitted"],
    answer: 1, topic: "Passive Voice",
    explanation: "Past passive 'was submitted' — the subject receives the action.",
    explanationTh: "Past Passive: was + pp · รายงาน (subject) ถูกส่ง (ถูกกระทำ) → was submitted",
  },
  {
    id: "mc-pv1", type: "multiple-choice",
    question: "Which sentence is in the passive voice?",
    options: ["They built the bridge in 1990.", "The bridge was built in 1990.", "They were building the bridge.", "The bridge had buildings."],
    answer: 1, topic: "Passive Voice",
    explanation: "'Was built' — passive voice with 'be + past participle'.",
    explanationTh: "Passive = be + pp · 'was built' คือ passive ส่วนอีกตัวเลือกเป็น active voice",
  },
  {
    id: "mc-pv2", type: "multiple-choice",
    question: "The meeting ___ postponed due to bad weather.",
    options: ["is", "was", "has", "had"],
    answer: 1, topic: "Passive Voice",
    explanation: "Past passive: 'was postponed'. The meeting (subject) was affected.",
    explanationTh: "was + postponed (pp) · การประชุมถูกเลื่อน → ใช้ was เพราะเหตุการณ์ผ่านไปแล้ว",
  },

  // Modal Verbs ───────────────────────────────────────────────
  {
    id: "mc08", type: "multiple-choice",
    question: "You ___ arrive early — the doors don't open until 9.",
    options: ["must", "should", "need to", "don't need to"],
    answer: 3, topic: "Modal Verbs",
    explanation: "'Don't need to' = it's not necessary.",
    explanationTh: "ไม่จำเป็นต้องมาเร็ว เพราะประตูเปิด 9 โมง → don't need to (ไม่จำเป็น)",
  },
  {
    id: "mc-mv1", type: "multiple-choice",
    question: "He ___ drive yet — he's only 15 years old.",
    options: ["mustn't", "shouldn't", "can't", "won't"],
    answer: 2, topic: "Modal Verbs",
    explanation: "'Can't' expresses inability / not allowed due to age.",
    explanationTh: "can't = ไม่สามารถ / ไม่ได้รับอนุญาต · อายุ 15 ยังขับรถไม่ได้",
  },
  {
    id: "mc-mv2", type: "multiple-choice",
    question: "You look exhausted. You ___ take a day off.",
    options: ["must", "should", "can", "might"],
    answer: 1, topic: "Modal Verbs",
    explanation: "'Should' expresses advice or recommendation.",
    explanationTh: "should = ควร · ใช้แนะนำ (advice) · must แรงกว่า (obligation) · might แสดงความไม่แน่ใจ",
  },

  // Reported Speech ───────────────────────────────────────────
  {
    id: "mc05", type: "multiple-choice",
    question: "He told me he ___ the proposal the following day.",
    options: ["will send", "would send", "sends", "is sending"],
    answer: 1, topic: "Reported Speech",
    explanation: "Reported speech shifts 'will' → 'would' in past reporting.",
    explanationTh: "Reported Speech: will → would · 'I will send' กลายเป็น he said he would send",
  },
  {
    id: "mc-rs1", type: "multiple-choice",
    question: "She told me, 'I am busy.' In reported speech: She told me she ___ busy.",
    options: ["is", "was", "has been", "had been"],
    answer: 1, topic: "Reported Speech",
    explanation: "Present simple 'am' shifts to past simple 'was' in reported speech.",
    explanationTh: "am/is → was ใน Reported Speech · 'I am busy' → she said she was busy",
  },
  {
    id: "mc-rs2", type: "multiple-choice",
    question: "He said, 'I have finished the work.' Reported: He said he ___ the work.",
    options: ["has finished", "finished", "had finished", "would finish"],
    answer: 2, topic: "Reported Speech",
    explanation: "Present perfect 'have finished' shifts to past perfect 'had finished'.",
    explanationTh: "Present Perfect → Past Perfect ใน Reported Speech · have finished → had finished",
  },

  // Relative Clauses ──────────────────────────────────────────
  {
    id: "mc-rc1", type: "multiple-choice",
    question: "The book ___ I borrowed last week was very interesting.",
    options: ["who", "whose", "which", "where"],
    answer: 2, topic: "Relative Clauses",
    explanation: "'Which' refers to things (book). 'Who' refers to people.",
    explanationTh: "which ใช้ขยายสิ่งของ (book) · who ใช้ขยายคน",
  },
  {
    id: "mc-rc2", type: "multiple-choice",
    question: "She is the person ___ helped me the most during my first year.",
    options: ["which", "whose", "whom", "who"],
    answer: 3, topic: "Relative Clauses",
    explanation: "'Who' as subject relative pronoun for people.",
    explanationTh: "who เป็น subject ของ relative clause · who helped me = เธอที่ช่วยฉัน",
  },
  {
    id: "mc-rc3", type: "multiple-choice",
    question: "That is the hotel ___ we stayed during our honeymoon.",
    options: ["who", "which", "where", "when"],
    answer: 2, topic: "Relative Clauses",
    explanation: "'Where' for places in relative clauses.",
    explanationTh: "where ใช้ขยายสถานที่ · the hotel where (ที่ซึ่ง) we stayed",
  },

  // Gerunds & Infinitives ─────────────────────────────────────
  {
    id: "mc02", type: "multiple-choice",
    question: "I'm looking forward ___ the presentation tomorrow.",
    options: ["to give", "to giving", "giving", "give"],
    answer: 1, topic: "Gerunds & Infinitives",
    explanation: "'Look forward to' is always followed by a gerund (verb + -ing).",
    explanationTh: "'look forward to' ตามด้วย gerund (verb+ing) เสมอ · to ที่นี่เป็น preposition ไม่ใช่ infinitive marker",
  },
  {
    id: "mc-gi1", type: "multiple-choice",
    question: "She avoided ___ the difficult question.",
    options: ["to answer", "answering", "answer", "answered"],
    answer: 1, topic: "Gerunds & Infinitives",
    explanation: "'Avoid' is followed by a gerund.",
    explanationTh: "avoid + verb+ing · กริยาที่ตามด้วย gerund: avoid, enjoy, consider, suggest, miss",
  },
  {
    id: "mc-gi2", type: "multiple-choice",
    question: "Would you like ___ something to eat?",
    options: ["having", "have", "to have", "had"],
    answer: 2, topic: "Gerunds & Infinitives",
    explanation: "'Would like' is followed by an infinitive.",
    explanationTh: "would like + to + verb · 'like' ในความหมาย 'ต้องการ' ตามด้วย infinitive",
  },

  // Future Tenses ─────────────────────────────────────────────
  {
    id: "mc-ft1", type: "multiple-choice",
    question: "They ___ the project by the end of this month.",
    options: ["will complete", "complete", "will have completed", "are completing"],
    answer: 2, topic: "Future Tenses",
    explanation: "Future perfect 'will have completed' = completion before a future deadline.",
    explanationTh: "Future Perfect: will have + pp · โปรเจกต์จะเสร็จ (ก่อน) สิ้นเดือน",
  },
  {
    id: "mc-ft2", type: "multiple-choice",
    question: "I think it ___ rain later today.",
    options: ["is going to", "will", "would", "might"],
    answer: 1, topic: "Future Tenses",
    explanation: "'Will' for spontaneous prediction/belief. 'Going to' for evidence-based. Both acceptable but 'will' is more natural after 'I think'.",
    explanationTh: "I think + will ใช้บอกความเชื่อ/คาดการณ์ที่ไม่มีหลักฐาน · will เป็นคำตอบที่เป็นธรรมชาติมากกว่า",
  },

  // Conjunctions ──────────────────────────────────────────────
  {
    id: "mc04", type: "multiple-choice",
    question: "___ being tired, she completed all her assignments.",
    options: ["Although", "However", "Despite", "Even"],
    answer: 2, topic: "Conjunctions",
    explanation: "'Despite' + noun/gerund. 'Although' + full clause.",
    explanationTh: "Despite + noun/gerund · Although + ประโยคเต็ม (S+V) · 'Despite being tired' ถูกต้อง",
  },
  {
    id: "mc07", type: "multiple-choice",
    question: "She is ___ talented designer that clients request her by name.",
    options: ["so", "such a", "very", "too"],
    answer: 1, topic: "Conjunctions",
    explanation: "'Such a + adjective + noun + that'. 'So' is used before adjectives without a noun.",
    explanationTh: "'such a + adj + noun' vs 'so + adj' · such a talented designer (มีคำนาม) / so talented (ไม่มีคำนาม)",
  },
  {
    id: "mc01", type: "multiple-choice",
    question: "Which sentence is grammatically correct?",
    options: ["She don't like coffee.", "She doesn't likes coffee.", "She doesn't like coffee.", "She not like coffee."],
    answer: 2, topic: "Conjunctions",
    explanation: "Third person singular: 'does' + base verb (no 's' on the verb).",
    explanationTh: "ประธานเอกพจน์บุรุษที่ 3 (she/he/it) ใช้ does ไม่ใช่ do · หลัง does ใช้กริยาช่อง 1 ไม่เติม s",
  },

  // ── 12 Tenses ──────────────────────────────────────────────────
  {
    id: "t-mc01", type: "multiple-choice",
    question: "Which sentence uses Simple Present correctly?",
    options: ["She go to school every day.", "She goes to school every day.", "She is go to school every day.", "She goed to school every day."],
    answer: 1, topic: "12 Tenses",
    explanation: "Simple Present, 3rd person singular: subject + verb+s.",
    explanationTh: "Simple Present บุรุษที่ 3 เอกพจน์ (she): ต้องเติม s ที่กริยา → goes",
  },
  {
    id: "t-mc02", type: "multiple-choice",
    question: "I ___ TV when my phone rang.",
    options: ["watched", "watch", "was watching", "have watched"],
    answer: 2, topic: "12 Tenses",
    explanation: "Past Continuous: was/were + verb+ing for an ongoing action interrupted by another.",
    explanationTh: "Past Continuous: was + verb+ing · กำลังดูทีวีอยู่ แล้วโทรศัพท์ก็ดัง (ขัดจังหวะ)",
  },
  {
    id: "t-mc03", type: "multiple-choice",
    question: "I can't find my keys. I think I ___ them.",
    options: ["lose", "lost", "am losing", "have lost"],
    answer: 3, topic: "12 Tenses",
    explanation: "Present Perfect: have/has + pp for past action with present result (keys are still lost now).",
    explanationTh: "Present Perfect: have + pp · ผลยังส่งถึงปัจจุบัน (กุญแจยังหาไม่เจออยู่ตอนนี้)",
  },
  {
    id: "t-mc04", type: "multiple-choice",
    question: "He looks exhausted. He ___ since 6 a.m.",
    options: ["works", "worked", "is working", "has been working"],
    answer: 3, topic: "12 Tenses",
    explanation: "Present Perfect Continuous: has/have been + verb+ing — activity started in past, still ongoing.",
    explanationTh: "Present Perfect Continuous: has been + verb+ing · ทำงานมาตั้งแต่ 6 โมง ยังไม่หยุด",
  },
  {
    id: "t-mc05", type: "multiple-choice",
    question: "Which time expression goes with Simple Past?",
    options: ["already", "since last year", "yesterday", "just"],
    answer: 2, topic: "12 Tenses",
    explanation: "'Yesterday' signals a completed past action at a specific time — Simple Past.",
    explanationTh: "'yesterday' ระบุเวลาในอดีตชัดเจน → Simple Past · 'already/just/since' ใช้กับ Present Perfect",
  },
  {
    id: "t-mc06", type: "multiple-choice",
    question: "The children ___ dinner when the power went out.",
    options: ["have", "were having", "had", "will have"],
    answer: 1, topic: "12 Tenses",
    explanation: "Past Continuous: were having — an activity in progress when a past event interrupted it.",
    explanationTh: "Past Continuous: were having · กำลังทานข้าวอยู่ (แล้วไฟดับ) = ถูกขัดจังหวะ",
  },
  {
    id: "t-mc07", type: "multiple-choice",
    question: "She was nervous because she ___ never spoken in public before.",
    options: ["has", "had", "have", "would have"],
    answer: 1, topic: "12 Tenses",
    explanation: "Past Perfect: had + pp — she had never spoken before the past moment she was nervous.",
    explanationTh: "Past Perfect: had + pp · ไม่เคยพูดในที่สาธารณะ (ก่อนเหตุการณ์นั้น) → had never spoken",
  },
  {
    id: "t-mc08", type: "multiple-choice",
    question: "They ___ for the train for over an hour before it finally came.",
    options: ["waited", "were waiting", "have been waiting", "had been waiting"],
    answer: 3, topic: "12 Tenses",
    explanation: "Past Perfect Continuous: had been + verb+ing — duration before a past event.",
    explanationTh: "Past Perfect Continuous: had been + verb+ing · รอมานานกว่า 1 ชั่วโมง ก่อนรถไฟมา",
  },
  {
    id: "t-mc09", type: "multiple-choice",
    question: "I will call you when I ___ home tonight.",
    options: ["will get", "get", "got", "am getting"],
    answer: 1, topic: "12 Tenses",
    explanation: "After time conjunctions (when/after/before/as soon as), use Simple Present for future.",
    explanationTh: "หลัง when/after/before/as soon as ที่หมายถึงอนาคต → ใช้ Simple Present ไม่ใช่ will",
  },
  {
    id: "t-mc10", type: "multiple-choice",
    question: "This time tomorrow, we ___ on a plane to Tokyo.",
    options: ["sit", "will sit", "will be sitting", "sat"],
    answer: 2, topic: "12 Tenses",
    explanation: "Future Continuous: will be + verb+ing for an action in progress at a specific future time.",
    explanationTh: "Future Continuous: will be + verb+ing · 'this time tomorrow' = ตอนเวลานี้พรุ่งนี้กำลังทำ",
  },
  {
    id: "t-mc11", type: "multiple-choice",
    question: "By the time she retires, she ___ for the company for 30 years.",
    options: ["works", "will work", "will have worked", "has worked"],
    answer: 2, topic: "12 Tenses",
    explanation: "Future Perfect: will have + pp — completion before a future deadline.",
    explanationTh: "Future Perfect: will have + pp · จะทำงานครบ 30 ปี (ก่อนที่เธอจะเกษียณ)",
  },
  {
    id: "t-mc12", type: "multiple-choice",
    question: "Next month, he ___ here for exactly five years.",
    options: ["lives", "will live", "will be living", "will have been living"],
    answer: 3, topic: "12 Tenses",
    explanation: "Future Perfect Continuous: will have been + verb+ing — continuous duration up to a future point.",
    explanationTh: "Future Perfect Continuous: will have been + verb+ing · เน้นระยะเวลาต่อเนื่องถึงจุดในอนาคต",
  },
];

// ── Sentence Reorder ──────────────────────────────────────────

export const sentenceReorderQuestions: SentenceReorderQ[] = [

  // Present Perfect ───────────────────────────────────────────
  {
    id: "sr01", type: "sentence-reorder",
    answer: ["She", "has", "worked", "here", "since", "2020"],
    words: ["since", "here", "worked", "2020", "She", "has"],
    hint: "Present Perfect + since", topic: "Present Perfect",
    explanation: "Subject + has/have + past participle + since + year.",
    explanationTh: "โครงสร้าง: S + has/have + pp + since + ปี · She has worked = เธอทำงาน (ถึงปัจจุบัน)",
  },
  {
    id: "sr03", type: "sentence-reorder",
    answer: ["I", "have", "never", "been", "to", "Japan", "before"],
    words: ["Japan", "been", "before", "I", "never", "have", "to"],
    hint: "Present Perfect + never", topic: "Present Perfect",
    explanation: "Present perfect with 'never': have + never + past participle.",
    explanationTh: "have never + pp · never วางหลัง have เสมอ · I have never been = ฉันไม่เคยไป",
  },
  {
    id: "sr-pp1", type: "sentence-reorder",
    answer: ["Have", "you", "ever", "tried", "Thai", "food", "before"],
    words: ["Thai", "ever", "before", "you", "tried", "Have", "food"],
    hint: "Present Perfect Question + ever", topic: "Present Perfect",
    explanation: "Question form: Have + subject + ever + past participle",
    explanationTh: "คำถาม Present Perfect: Have + S + ever + pp · ever วางหลัง subject เสมอ",
  },

  // Past Perfect ──────────────────────────────────────────────
  {
    id: "sr-pastperf1", type: "sentence-reorder",
    answer: ["He", "had", "already", "eaten", "when", "we", "arrived"],
    words: ["when", "eaten", "already", "He", "arrived", "had", "we"],
    hint: "Past Perfect + when", topic: "Past Perfect",
    explanation: "'Had already eaten' before we arrived. Past perfect + simple past.",
    explanationTh: "had already + pp เสร็จก่อน (when) we arrived · already วางหลัง had",
  },
  {
    id: "sr-pastperf2", type: "sentence-reorder",
    answer: ["She", "had", "never", "visited", "Paris", "before", "that", "trip"],
    words: ["visited", "Paris", "that", "She", "never", "before", "had", "trip"],
    hint: "Past Perfect + never", topic: "Past Perfect",
    explanation: "Past perfect: 'had never + past participle' for experience before a past point.",
    explanationTh: "had never + pp · ก่อนทริปนั้น เธอไม่เคยไปปารีส → ใช้ Past Perfect",
  },

  // Second Conditional ────────────────────────────────────────
  {
    id: "sr-sc1", type: "sentence-reorder",
    answer: ["If", "I", "had", "more", "money", "I", "would", "buy", "a", "house"],
    words: ["buy", "I", "If", "more", "would", "house", "a", "had", "money", "I"],
    hint: "If + past simple, would + verb", topic: "Second Conditional",
    explanation: "Second conditional: If + past simple, would + base verb.",
    explanationTh: "If + กริยาช่อง 2 + would + กริยาช่อง 1 · สมมติสถานการณ์ที่ไม่จริง",
  },
  {
    id: "sr06", type: "sentence-reorder",
    answer: ["He", "suggested", "that", "she", "apply", "for", "the", "position"],
    words: ["position", "she", "for", "suggested", "that", "apply", "He", "the"],
    hint: "Subjunctive after 'suggest'", topic: "Second Conditional",
    explanation: "'Suggest that + subject + base verb' (subjunctive mood).",
    explanationTh: "suggest that + S + base verb (กริยาช่อง 1 ไม่เติม s) · เป็น subjunctive mood",
  },

  // Third Conditional ─────────────────────────────────────────
  {
    id: "sr09", type: "sentence-reorder",
    answer: ["I", "wish", "I", "had", "taken", "that", "opportunity"],
    words: ["I", "taken", "opportunity", "had", "that", "wish", "I"],
    hint: "Wish + Past Perfect", topic: "Third Conditional",
    explanation: "'Wish + past perfect' expresses regret about a past situation.",
    explanationTh: "wish + had + pp · แสดงความเสียใจเรื่องอดีต · wish I had taken = เสียดายที่ไม่ได้คว้าโอกาส",
  },
  {
    id: "sr-tc1", type: "sentence-reorder",
    answer: ["If", "she", "had", "known", "she", "would", "have", "come"],
    words: ["known", "she", "come", "have", "If", "would", "had", "she"],
    hint: "If + past perfect, would have + pp", topic: "Third Conditional",
    explanation: "Third conditional: If + had + pp, would have + pp.",
    explanationTh: "Third Conditional: If + had + pp → would have + pp · ถ้าเธอรู้ (อดีต) เธอก็คงมา",
  },

  // Passive Voice ─────────────────────────────────────────────
  {
    id: "sr02", type: "sentence-reorder",
    answer: ["The", "report", "must", "be", "submitted", "by", "Friday"],
    words: ["submitted", "must", "Friday", "be", "by", "The", "report"],
    hint: "Modal + Passive", topic: "Passive Voice",
    explanation: "Modal passive: subject + must + be + past participle.",
    explanationTh: "Modal Passive: modal + be + pp · must be submitted = ต้องถูกส่ง",
  },
  {
    id: "sr-pv1", type: "sentence-reorder",
    answer: ["The", "new", "policy", "was", "announced", "yesterday"],
    words: ["announced", "new", "yesterday", "The", "was", "policy"],
    hint: "Past Passive", topic: "Passive Voice",
    explanation: "Past passive: was + past participle. 'Announced' is past participle of 'announce'.",
    explanationTh: "Past Passive: was + pp · นโยบายใหม่ถูกประกาศ (yesterday = ใช้ past passive)",
  },

  // Modal Verbs ───────────────────────────────────────────────
  {
    id: "sr05", type: "sentence-reorder",
    answer: ["Could", "you", "please", "explain", "the", "instructions", "again"],
    words: ["again", "instructions", "you", "explain", "the", "please", "Could"],
    hint: "Polite Request with 'Could'", topic: "Modal Verbs",
    explanation: "'Could you please + base verb' for polite requests.",
    explanationTh: "Could you please + กริยาช่อง 1 · สุภาพกว่า Can you · ใช้ขอร้องอย่างสุภาพ",
  },
  {
    id: "sr-mv1", type: "sentence-reorder",
    answer: ["You", "should", "not", "eat", "too", "much", "sugar"],
    words: ["much", "eat", "not", "You", "should", "sugar", "too"],
    hint: "Negative modal: should not", topic: "Modal Verbs",
    explanation: "'Should not + base verb' for negative advice.",
    explanationTh: "should not + กริยาช่อง 1 · ให้คำแนะนำในเชิงลบ (ไม่ควรทำ)",
  },

  // Reported Speech ───────────────────────────────────────────
  {
    id: "sr-rs1", type: "sentence-reorder",
    answer: ["She", "said", "that", "she", "would", "be", "late"],
    words: ["that", "She", "be", "late", "would", "said", "she"],
    hint: "Reported Speech: will → would", topic: "Reported Speech",
    explanation: "Direct: 'I will be late.' → Reported: she said that she would be late.",
    explanationTh: "Direct: I will be late → Reported: she said she would be late · will → would",
  },
  {
    id: "sr-rs2", type: "sentence-reorder",
    answer: ["He", "told", "me", "he", "had", "already", "finished"],
    words: ["already", "He", "he", "had", "told", "me", "finished"],
    hint: "Reported Speech: have → had", topic: "Reported Speech",
    explanation: "Present perfect 'has finished' → past perfect 'had finished' in reported speech.",
    explanationTh: "has finished → had finished ใน Reported Speech · He told me he had finished",
  },

  // Relative Clauses ──────────────────────────────────────────
  {
    id: "sr-rc1", type: "sentence-reorder",
    answer: ["The", "man", "who", "called", "you", "is", "my", "brother"],
    words: ["you", "The", "brother", "called", "man", "my", "who", "is"],
    hint: "Relative Clause with 'who'", topic: "Relative Clauses",
    explanation: "Defining relative clause: noun + who + verb.",
    explanationTh: "noun + who + verb · who ขยาย the man · who called you = ที่โทรหาคุณ",
  },
  {
    id: "sr-rc2", type: "sentence-reorder",
    answer: ["This", "is", "the", "city", "where", "I", "was", "born"],
    words: ["was", "city", "I", "This", "born", "where", "the", "is"],
    hint: "Relative Clause with 'where'", topic: "Relative Clauses",
    explanation: "'Where' introduces a relative clause for places.",
    explanationTh: "where ขยายสถานที่ (city) · the city where I was born = เมืองที่ฉันเกิด",
  },

  // Gerunds & Infinitives ─────────────────────────────────────
  {
    id: "sr-gi1", type: "sentence-reorder",
    answer: ["She", "decided", "to", "apply", "for", "the", "scholarship"],
    words: ["scholarship", "the", "She", "apply", "for", "to", "decided"],
    hint: "decide + to + verb", topic: "Gerunds & Infinitives",
    explanation: "'Decide' + infinitive (to + base verb).",
    explanationTh: "decide + to + กริยาช่อง 1 (infinitive) · She decided to apply = เธอตัดสินใจสมัคร",
  },
  {
    id: "sr-gi2", type: "sentence-reorder",
    answer: ["I", "enjoy", "hiking", "in", "the", "mountains", "on", "weekends"],
    words: ["mountains", "enjoy", "weekends", "in", "on", "I", "the", "hiking"],
    hint: "enjoy + verb+ing", topic: "Gerunds & Infinitives",
    explanation: "'Enjoy' + gerund (verb + -ing).",
    explanationTh: "enjoy + verb+ing (gerund) · hiking = verb+ing ของ hike",
  },

  // Future Tenses ─────────────────────────────────────────────
  {
    id: "sr07", type: "sentence-reorder",
    answer: ["By", "the", "time", "you", "arrive", "we", "will", "have", "left"],
    words: ["arrive", "time", "will", "have", "By", "we", "you", "the", "left"],
    hint: "Future Perfect", topic: "Future Tenses",
    explanation: "Future perfect 'will have + pp' for completion before a future point.",
    explanationTh: "Future Perfect: will have + pp · เราจะออกไปแล้ว (ก่อน) ที่คุณมาถึง",
  },
  {
    id: "sr-ft1", type: "sentence-reorder",
    answer: ["She", "is", "going", "to", "start", "a", "new", "job", "next", "month"],
    words: ["new", "She", "start", "a", "going", "next", "is", "job", "month", "to"],
    hint: "Going to (planned future)", topic: "Future Tenses",
    explanation: "'Going to + base verb' for planned future actions.",
    explanationTh: "is/am/are going to + กริยาช่อง 1 · ใช้กับแผนที่ตั้งใจไว้แล้ว",
  },

  // Conjunctions ──────────────────────────────────────────────
  {
    id: "sr04", type: "sentence-reorder",
    answer: ["Despite", "being", "tired", "she", "finished", "all", "her", "tasks"],
    words: ["her", "being", "she", "tasks", "Despite", "all", "finished", "tired"],
    hint: "Despite + gerund", topic: "Conjunctions",
    explanation: "Despite + gerund (being + adjective) + main clause.",
    explanationTh: "Despite + noun/gerund + main clause · Despite being tired = แม้ว่าจะเหนื่อย",
  },
  {
    id: "sr10", type: "sentence-reorder",
    answer: ["Neither", "the", "manager", "nor", "the", "staff", "was", "informed"],
    words: ["informed", "the", "nor", "manager", "the", "Neither", "was", "staff"],
    hint: "Neither...nor", topic: "Conjunctions",
    explanation: "'Neither...nor' takes a singular verb when both subjects are singular.",
    explanationTh: "Neither...nor + singular verb · ทั้งผู้จัดการและพนักงานต่างก็ไม่ถูกแจ้ง",
  },
  {
    id: "sr08", type: "sentence-reorder",
    answer: ["She", "is", "such", "a", "good", "teacher", "that", "everyone", "loves", "her"],
    words: ["teacher", "a", "her", "is", "that", "everyone", "good", "She", "such", "loves"],
    hint: "Such a + noun + that", topic: "Conjunctions",
    explanation: "'Such a + adjective + noun + that' to show result.",
    explanationTh: "such a + adj + noun + that แสดงผลลัพธ์ · such a good teacher that everyone loves her",
  },

  // ── 12 Tenses ──────────────────────────────────────────────
  {
    id: "t-sr01", type: "sentence-reorder",
    answer: ["She", "drinks", "coffee", "every", "morning"],
    words: ["morning", "coffee", "She", "every", "drinks"],
    hint: "Simple Present – daily routine", topic: "12 Tenses",
    explanation: "Simple Present: subject + verb(+s) for habits and routines.",
    explanationTh: "Simple Present: S + V(+s) · กิจวัตรประจำวัน → She drinks coffee every morning",
  },
  {
    id: "t-sr02", type: "sentence-reorder",
    answer: ["They", "are", "watching", "a", "movie", "right", "now"],
    words: ["now", "a", "watching", "right", "movie", "are", "They"],
    hint: "Present Continuous – happening now", topic: "12 Tenses",
    explanation: "Present Continuous: am/is/are + verb+ing for actions happening at this moment.",
    explanationTh: "Present Continuous: are + verb+ing · 'right now' = กำลังทำอยู่ตอนนี้",
  },
  {
    id: "t-sr03", type: "sentence-reorder",
    answer: ["I", "have", "already", "eaten", "breakfast"],
    words: ["eaten", "already", "breakfast", "have", "I"],
    hint: "Present Perfect – already", topic: "12 Tenses",
    explanation: "Present Perfect: have + already + past participle.",
    explanationTh: "Present Perfect: have + already + pp · already วางหลัง have เสมอ",
  },
  {
    id: "t-sr04", type: "sentence-reorder",
    answer: ["He", "had", "left", "before", "she", "arrived"],
    words: ["arrived", "left", "she", "before", "had", "He"],
    hint: "Past Perfect – before another past action", topic: "12 Tenses",
    explanation: "Past Perfect: had + pp — action completed before another past action.",
    explanationTh: "Past Perfect: had + pp · เขาออกไปแล้ว (ก่อนที่เธอจะมาถึง)",
  },
  {
    id: "t-sr05", type: "sentence-reorder",
    answer: ["She", "was", "cooking", "when", "I", "called"],
    words: ["called", "cooking", "I", "was", "when", "She"],
    hint: "Past Continuous – interrupted action", topic: "12 Tenses",
    explanation: "Past Continuous: was/were + verb+ing interrupted by simple past.",
    explanationTh: "Past Continuous: was + verb+ing · เธอกำลังทำอาหารอยู่ แล้วฉันก็โทรมา",
  },
  {
    id: "t-sr06", type: "sentence-reorder",
    answer: ["We", "will", "have", "finished", "by", "Friday"],
    words: ["Friday", "finished", "will", "have", "We", "by"],
    hint: "Future Perfect – completed by a deadline", topic: "12 Tenses",
    explanation: "Future Perfect: will have + pp — action completed before a future time.",
    explanationTh: "Future Perfect: will have + pp · จะเสร็จแล้วก่อน (ภายใน) วันศุกร์",
  },
  {
    id: "t-sr07", type: "sentence-reorder",
    answer: ["I", "will", "be", "sleeping", "when", "you", "arrive"],
    words: ["arrive", "sleeping", "be", "you", "I", "will", "when"],
    hint: "Future Continuous – ongoing at a future moment", topic: "12 Tenses",
    explanation: "Future Continuous: will be + verb+ing for an action in progress when something happens.",
    explanationTh: "Future Continuous: will be + verb+ing · ฉันจะกำลังนอนหลับอยู่ (ตอนที่คุณมาถึง)",
  },
  {
    id: "t-sr08", type: "sentence-reorder",
    answer: ["He", "has", "been", "studying", "English", "for", "two", "years"],
    words: ["years", "studying", "English", "two", "been", "has", "He", "for"],
    hint: "Present Perfect Continuous – duration", topic: "12 Tenses",
    explanation: "Present Perfect Continuous: has/have been + verb+ing + for + duration.",
    explanationTh: "Present Perfect Continuous: has been + verb+ing · เรียนมาแล้ว 2 ปี (ยังเรียนอยู่)",
  },
  {
    id: "t-sr09", type: "sentence-reorder",
    answer: ["They", "had", "been", "waiting", "for", "an", "hour"],
    words: ["hour", "waiting", "an", "had", "been", "for", "They"],
    hint: "Past Perfect Continuous – duration before past event", topic: "12 Tenses",
    explanation: "Past Perfect Continuous: had been + verb+ing — duration before a past point.",
    explanationTh: "Past Perfect Continuous: had been + verb+ing · รอมา 1 ชั่วโมงแล้ว (ก่อนเหตุการณ์นั้น)",
  },
  {
    id: "t-sr10", type: "sentence-reorder",
    answer: ["By", "2030", "she", "will", "have", "been", "teaching", "for", "20", "years"],
    words: ["years", "teaching", "will", "been", "she", "2030", "have", "for", "By", "20"],
    hint: "Future Perfect Continuous – duration up to future", topic: "12 Tenses",
    explanation: "Future Perfect Continuous: will have been + verb+ing — continuous until a future point.",
    explanationTh: "Future Perfect Continuous: will have been + verb+ing · สอนมาครบ 20 ปี (ถึงปี 2030)",
  },
];

// ── Helpers ───────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getQuestions(
  type: "fill-blank" | "multiple-choice" | "sentence-reorder",
  topic?: string | null,
  limit = 10,
): GrammarQuestion[] {
  let pool: GrammarQuestion[];
  if (type === "fill-blank")       pool = fillBlankQuestions;
  else if (type === "multiple-choice") pool = multipleChoiceQuestions;
  else                             pool = sentenceReorderQuestions;
  if (topic) pool = pool.filter((q) => q.topic === topic);
  return shuffle(pool).slice(0, limit);
}

export function getTopicQuestionCount(topic: string): { fb: number; mc: number; sr: number; total: number } {
  const fb = fillBlankQuestions.filter((q) => q.topic === topic).length;
  const mc = multipleChoiceQuestions.filter((q) => q.topic === topic).length;
  const sr = sentenceReorderQuestions.filter((q) => q.topic === topic).length;
  return { fb, mc, sr, total: fb + mc + sr };
}

export function levelFromScore(score: number) {
  if (score >= 81) return { label: "Advanced",           color: "#22d3a0" };
  if (score >= 61) return { label: "Upper-Intermediate", color: "#38bdf8" };
  if (score >= 41) return { label: "Intermediate",       color: "#818cf8" };
  if (score >= 21) return { label: "Elementary",         color: "#fb923c" };
  return               { label: "Beginner",              color: "#f87171" };
}

export function xpFromScore(score: number) {
  if (score >= 90) return 50;
  if (score >= 70) return 35;
  if (score >= 50) return 20;
  return 10;
}
