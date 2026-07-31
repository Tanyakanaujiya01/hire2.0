export const APTITUDE_CATEGORIES = [
  { id: "quant", name: "Quantitative Aptitude", icon: "Calculator" },
  { id: "logical", name: "Logical Reasoning", icon: "Brain" },
  { id: "verbal", name: "Verbal Ability", icon: "BookOpen" },
  { id: "core-cs", name: "Core CS Fundamentals (DBMS, OS, CN)", icon: "Cpu" }
];

export const APTITUDE_QUESTIONS = [
  {
    id: "apt-1",
    category: "quant",
    topic: "Percentages & Profit Loss",
    question: "A merchant buys an item for ₹800 and marks it up by 40%. He then offers a discount of 15% on the marked price. What is his net profit percentage?",
    options: ["19%", "20%", "17%", "22%"],
    correctIndex: 0,
    explanation: "Cost Price (CP) = ₹800.\nMarked Price (MP) = 800 + (40% of 800) = 800 + 320 = ₹1120.\nDiscount = 15% of MP = 0.15 * 1120 = ₹168.\nSelling Price (SP) = 1120 - 168 = ₹952.\nProfit = SP - CP = 952 - 800 = ₹152.\nProfit % = (152 / 800) * 100 = 19%."
  },
  {
    id: "apt-2",
    category: "quant",
    topic: "Time, Speed & Distance",
    question: "A train 240 meters long passes a pole in 12 seconds. How long will it take to cross a platform 360 meters long at the same speed?",
    options: ["18 seconds", "30 seconds", "25 seconds", "20 seconds"],
    correctIndex: 1,
    explanation: "Speed of train = Distance / Time = 240m / 12s = 20 m/s.\nTotal distance to cross platform = Length of train + Length of platform = 240m + 360m = 600m.\nTime taken = 600m / 20 m/s = 30 seconds."
  },
  {
    id: "apt-3",
    category: "logical",
    topic: "Blood Relations",
    question: "Pointing to a photograph of a boy, Suresh said, 'He is the son of the only son of my mother.' How is Suresh related to that boy?",
    options: ["Brother", "Uncle", "Father", "Grandfather"],
    correctIndex: 2,
    explanation: "'Only son of my mother' = Suresh himself (since Suresh is speaking).\nSo the boy in the photograph is Suresh's son.\nTherefore, Suresh is the Father of the boy."
  },
  {
    id: "apt-4",
    category: "logical",
    topic: "Syllogism",
    question: "Statements: All laptops are devices. Some devices are gadgets.\nConclusions:\nI. Some laptops are gadgets.\nII. No laptop is a gadget.",
    options: [
      "Only conclusion I follows",
      "Only conclusion II follows",
      "Either I or II follows",
      "Neither I nor II follows"
    ],
    correctIndex: 2,
    explanation: "From the given statements, the relationship between 'laptops' and 'gadgets' is uncertain. Since Conclusion I (Some laptops are gadgets) and Conclusion II (No laptop is a gadget) form a complementary pair, either I or II must hold true."
  },
  {
    id: "apt-5",
    category: "verbal",
    topic: "Antonyms & Sentence Correction",
    question: "Select the word that is opposite in meaning (Antonym) to: 'EPHEMERAL'",
    options: ["Transient", "Permanent", "Fleeting", "Evanescent"],
    correctIndex: 1,
    explanation: "'Ephemeral' means lasting for a very short time (transient/fleeting). Its direct antonym is 'Permanent' or 'Enduring'."
  },
  {
    id: "apt-6",
    category: "core-cs",
    topic: "DBMS & SQL",
    question: "Which isolation level in ANSI SQL prevents Phantom Reads, Non-Repeatable Reads, and Dirty Reads?",
    options: ["Read Committed", "Repeatable Read", "Serializable", "Read Uncommitted"],
    correctIndex: 2,
    explanation: "'Serializable' is the highest isolation level. It completely locks data ranges and transactions, eliminating Dirty Reads, Non-Repeatable Reads, and Phantom Reads."
  },
  {
    id: "apt-7",
    category: "core-cs",
    topic: "Operating Systems",
    question: "Which CPU scheduling algorithm can potentially cause starvation for long processes?",
    options: ["Round Robin (RR)", "First-Come, First-Served (FCFS)", "Shortest Job First (SJF)", "Priority Scheduling without Aging"],
    correctIndex: 3,
    explanation: "Priority Scheduling without Aging causes low-priority (or longer) processes to wait indefinitely if higher-priority processes keep arriving continuously. Aging fixes this by gradually increasing waiting process priorities."
  }
];

export const FORMULA_CHEAT_SHEET = [
  {
    topic: "Percentages & Ratios",
    formulas: [
      "Percentage Change = ((New Value - Old Value) / Old Value) * 100",
      "Net % change after successive x% and y% changes = x + y + (xy / 100)",
      "Compounded Ratio of (a:b) and (c:d) = ac : bd"
    ]
  },
  {
    topic: "Time & Work / Speed & Distance",
    formulas: [
      "If A can do work in 'a' days & B in 'b' days, together work per day = 1/a + 1/b = (a+b)/ab",
      "Speed (S) = Distance (D) / Time (T); 1 km/h = 5/18 m/s; 1 m/s = 18/5 km/h",
      "Average Speed for equal distance traveled at x and y speed = (2xy) / (x + y)"
    ]
  },
  {
    topic: "Permutations & Combinations",
    formulas: [
      "nPr = n! / (n - r)!",
      "nCr = n! / (r! * (n - r)!)",
      "Probability = (Favorable Outcomes) / (Total Outcomes)"
    ]
  },
  {
    topic: "Core CS Summary Rules",
    formulas: [
      "DBMS ACIDS: Atomicity, Consistency, Isolation, Durability",
      "OS Deadlock 4 Conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait",
      "Computer Networks OSI Layers: Physical, Data Link, Network, Transport, Session, Presentation, Application"
    ]
  }
];
