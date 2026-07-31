export const COMPANIES_PREP_DATA = [
  {
    id: "comp-tcs",
    name: "TCS (Tata Consultancy Services)",
    category: "Service & Product",
    logoColor: "from-blue-900 to-indigo-700",
    roles: ["Ninja (3.6 LPA)", "Digital (7.0 LPA)", "Prime (9.0 - 11.5 LPA)"],
    eligibility: {
      degree: "B.E / B.Tech / M.E / M.Tech / MCA / M.Sc (CS/IT/ECE/EEE)",
      minPercentage: "60% or 6.0 CGPA throughout 10th, 12th, Diploma, & Graduation",
      backlogs: "Max 1 active backlog allowed at exam time; 0 backlogs during joining",
      gapInEducation: "Max 24 months allowed with valid rationale",
      batches: "2024, 2025 & 2026 Graduating Batches"
    },
    examPattern: [
      {
        section: "Foundation Section (Ninja Level)",
        duration: "75 Mins",
        questions: "65 Questions (Numerical: 20q, Verbal: 25q, Reasoning: 20q)",
        topics: "Percentages, Ratios, Syllogisms, Reading Comprehension, Logical Deduction. No negative marking."
      },
      {
        section: "Advanced Section (Digital / Prime Upgrade)",
        duration: "115 Mins",
        questions: "Advanced Aptitude + 2 Hands-on Coding Problems",
        topics: "Advanced Quantitative, Advanced Reasoning, 2 Hands-on Coding (DSA Easy/Medium). Proctored environment."
      }
    ],
    selectionRounds: [
      { round: "Round 1", name: "TCS NQT Online Cognitive & Technical Test", description: "Proctored online test testing Aptitude, Logical, Verbal, and Coding." },
      { round: "Round 2", name: "Technical Interview", description: "DSA fundamentals, OOPs, SQL queries, DBMS, final year project deep-dive." },
      { round: "Round 3", name: "Managerial & HR Round", description: "Behavioral questions, relocation willingness, shift flexibility, communication skills." }
    ],
    frequentlyAskedTopics: ["Arrays & Strings", "Matrix Operations", "GCD & Prime Algorithms", "SQL Joins & Aggregations", "Logical Syllogisms"],
    tips: [
      "No negative marking in TCS NQT, try to answer all questions before time expires.",
      "In the coding section, ensure edge cases (empty inputs, large values) pass.",
      "Revise basic Java/Python syntax and SQL subqueries."
    ]
  },
  {
    id: "comp-amazon",
    name: "Amazon",
    category: "FAANG / Big Tech",
    logoColor: "from-amber-500 to-orange-600",
    roles: ["SDE-1 (28-34 LPA)", "SDE Intern (₹80k-100k/mo stipend)"],
    eligibility: {
      degree: "B.Tech / B.E / M.Tech in CS / IT / ECE or related quantitative fields",
      minPercentage: "CGPA 6.5+ or 65% minimum across degree",
      backlogs: "No active backlogs at time of interview process",
      gapInEducation: "No strict limit, evaluated purely on technical skills",
      batches: "Freshers (2024-2026) & Experienced 1-3 years"
    },
    examPattern: [
      {
        section: "Online Assessment (OA 1 - Debugging)",
        duration: "20 Mins",
        questions: "7 Code Debugging Questions",
        topics: "Find logical & syntax bugs in existing C++/Java/Python snippets quickly"
      },
      {
        section: "Online Assessment (OA 2 - Coding & Work Simulation)",
        duration: "120 Mins",
        questions: "2 DSA Coding Problems + Work Style Assessment",
        topics: "Arrays, Trees, Graphs, DP + 14 Amazon Leadership Principles situational questions"
      }
    ],
    selectionRounds: [
      { round: "Round 1", name: "Online Assessment (OA 1 & OA 2)", description: "Code debugging, 2 algorithmic problems, Amazon Leadership Principles alignment." },
      { round: "Round 2", name: "Technical Interview 1 (DSA & Data Structures)", description: "Live coding on shared editor (Graphs, Trees, Sliding Window) + 2 Leadership questions." },
      { round: "Round 3", name: "Technical Interview 2 (System Design & LLD)", description: "Object-oriented design (e.g. Parking Lot, Elevator) or complex DSA problem." },
      { round: "Round 4", name: "Bar Raiser Round", description: "Deep dive into past projects, architectural trade-offs, and rigorous Amazon Leadership Principles evaluation." }
    ],
    frequentlyAskedTopics: ["Topological Sort & Graphs", "Dynamic Programming (Knapsack, Subsets)", "LRU Cache / Design Problems", "Trees & LCA", "Sliding Window"],
    tips: [
      "Amazon emphasizes their 14 Leadership Principles (Customer Obsession, Ownership, Bias for Action, Dive Deep). Prepare STAR format stories for each!",
      "Always speak your thought process out loud during live coding.",
      "Analyze time and space complexity using Big-O before writing code."
    ]
  },
  {
    id: "comp-microsoft",
    name: "Microsoft",
    category: "FAANG / Big Tech",
    logoColor: "from-blue-600 to-cyan-600",
    roles: ["Software Engineer 1 (25-32 LPA)", "SDE Intern (₹1.25 Lakh/mo stipend)"],
    eligibility: {
      degree: "B.Tech / B.E / M.Tech / Dual Degree in CS / IT / ECE",
      minPercentage: "7.0 CGPA or 70% minimum with no current active backlogs",
      backlogs: "0 active backlogs allowed",
      gapInEducation: "Maximum 1 year education gap permitted",
      batches: "2024, 2025 & 2026 Batch"
    },
    examPattern: [
      {
        section: "Online Codility Challenge",
        duration: "90 Mins",
        questions: "3 Algorithmic Coding Questions",
        topics: "Arrays, Strings, Dynamic Programming, Graphs, Priority Queues"
      }
    ],
    selectionRounds: [
      { round: "Round 1", name: "Codility Online Test", description: "3 algorithmic coding tasks with strict memory & edge case verification." },
      { round: "Round 2", name: "Technical Round 1 (Data Structures)", description: "Coding live on whiteboard/Codility editor + Space-Time optimization." },
      { round: "Round 3", name: "Technical Round 2 (LLD / OS / System Design)", description: "Object-oriented design patterns, Thread Synchronization, OS Memory Management." },
      { round: "Round 4", name: "AA (As-Appropriate) Managerial Round", description: "Culture fit, growth mindset, project architecture, leadership scenario." }
    ],
    frequentlyAskedTopics: ["Linked List Reversal & Cycle Detection", "Binary Trees & BST", "Dynamic Programming", "Tries & Auto-complete"],
    tips: [
      "Microsoft places heavy focus on clean code modularity and variable naming.",
      "Be prepared to answer OS concurrency questions (Mutex, Semaphores, Deadlocks)."
    ]
  },
  {
    id: "comp-infosys",
    name: "Infosys",
    category: "Service & Product",
    logoColor: "from-blue-600 to-cyan-500",
    roles: ["System Engineer (3.6 LPA)", "DSE - Digital Specialist Engineer (6.25 LPA)", "SP - Specialist Programmer (9.5 LPA)"],
    eligibility: {
      degree: "B.E / B.Tech / M.E / M.Tech / MCA / M.Sc",
      minPercentage: "60% or 6.0 CGPA in 10th, 12th & Graduation",
      backlogs: "0 active backlogs allowed during final selection",
      gapInEducation: "Up to 2 years permitted",
      batches: "2024, 2025, 2026 Graduating Batches"
    },
    examPattern: [
      {
        section: "Infytq / HackWithInfy Exam",
        duration: "180 Mins",
        questions: "3 Coding Problems (Medium / Hard)",
        topics: "Arrays, Dynamic Programming, Backtracking, Greedy Algorithms"
      }
    ],
    selectionRounds: [
      { round: "Round 1", name: "Infosys Online Test / HackWithInfy Coding Round", description: "Aptitude, Pseudo-code, & Hands-on DSA coding problems." },
      { round: "Round 2", name: "Technical & HR Interview", description: "DSA problem solving, OOPs concepts, SQL, and project walkthrough." }
    ],
    frequentlyAskedTopics: ["Dynamic Programming", "Greedy Approach", "String Parsing", "SQL Window Functions", "Data Structures"],
    tips: [
      "Participating in HackWithInfy is the fastest route to get direct SP/DSE interview calls.",
      "Focus heavily on DP & Graph fundamentals for higher salary tier roles."
    ]
  },
  {
    id: "comp-google",
    name: "Google",
    category: "FAANG / Dream Tech",
    logoColor: "from-red-500 via-yellow-500 to-green-500",
    roles: ["Software Engineer (STEP / L3 / L4) (35-48 LPA)"],
    eligibility: {
      degree: "BS / MS / PhD in Computer Science or related quantitative field",
      minPercentage: "No strict cut-off, exceptionally strong problem-solving required",
      backlogs: "0 active backlogs at date of joining",
      gapInEducation: "No restriction",
      batches: "Freshers & Experienced professionals"
    },
    examPattern: [
      {
        section: "Google Online Challenge (GOC)",
        duration: "90 Mins",
        questions: "2 Complex DSA Problems",
        topics: "Advanced Graphs, Segment Trees, DP on Trees, Combinatorics"
      }
    ],
    selectionRounds: [
      { round: "Round 1", name: "Online Coding Challenge", description: "2 high-difficulty algorithmic challenges." },
      { round: "Round 2", name: "Technical Phone Screen", description: "45-minute live coding session with Google Engineer on Google Docs/CoderPad." },
      { round: "Round 3", name: "Onsite / Final Interviews (4-5 Rounds)", description: "3-4 Technical DSA/System Design interviews + 1 Googliness & Leadership round." }
    ],
    frequentlyAskedTopics: ["Graph Algorithms (Dijkstra, Tarjan)", "Dynamic Programming with Bitmask", "Binary Search on Answer Space", "Tries & String Algorithms"],
    tips: [
      "Google values optimal algorithms and clean code structure over quick hacky solutions.",
      "Practice solving problems on a plain text editor without auto-complete or syntax highlighting.",
      "Master Big-O space-time complexity tradeoffs."
    ]
  },
  {
    id: "comp-accenture",
    name: "Accenture",
    category: "Global Tech Services",
    logoColor: "from-purple-700 to-indigo-600",
    roles: ["Associate Software Engineer (4.5 LPA)", "Advanced Application Engineering Analyst (6.5 LPA)"],
    eligibility: {
      degree: "B.E / B.Tech / M.E / M.Tech / MCA / M.Sc (All streams)",
      minPercentage: "60% or 6.5 CGPA in current degree",
      backlogs: "0 active backlogs during onboard process",
      gapInEducation: "Max 1 year allowed",
      batches: "2024, 2025, 2026 Batch"
    },
    examPattern: [
      {
        section: "Cognitive & Technical Assessment",
        duration: "90 Mins",
        questions: "90 MCQs",
        topics: "English Ability, Critical Reasoning, Abstract Reasoning, Common Applications, MS Office, Pseudo-code, Networking & Security"
      },
      {
        section: "Coding Assessment",
        duration: "45 Mins",
        questions: "2 Coding Questions",
        topics: "Basic Arrays, Strings, Pattern Printing, Bit Manipulation"
      }
    ],
    selectionRounds: [
      { round: "Round 1", name: "Cognitive & Technical Test", description: "Elimination round with 90 MCQs." },
      { round: "Round 2", name: "Coding Test", description: "Hands-on coding in C, C++, Java, or Python." },
      { round: "Round 3", name: "Communication Test", description: "AI-monitored spoken English test measuring pronunciation, fluency, and listening comprehension." },
      { round: "Round 4", name: "HR Interview", description: "Scenario-based discussion, adaptability, project review." }
    ],
    frequentlyAskedTopics: ["Bitwise Operators", "String Reversal & Anagrams", "Loop Logic & Pseudo-codes", "Networking Fundamentals"],
    tips: [
      "The Communication Test is an elimination round! Speak clearly in a quiet environment with a reliable microphone.",
      "Pseudo-code section requires speed and accuracy."
    ]
  },
  {
    id: "comp-goldman",
    name: "Goldman Sachs",
    category: "FinTech / Investment Banking",
    logoColor: "from-blue-800 to-slate-900",
    roles: ["Engineering Analyst (24-30 LPA)", "Summer Analyst Intern (₹1.5 Lakh/mo stipend)"],
    eligibility: {
      degree: "B.E / B.Tech / M.Tech / Dual Degree in CS / IT / EE / Math",
      minPercentage: "7.0 CGPA or 70% throughout 10th, 12th & B.Tech",
      backlogs: "0 active backlogs",
      gapInEducation: "Max 1 year allowed",
      batches: "2024, 2025 & 2026 Batch"
    },
    examPattern: [
      {
        section: "Aptitude & Technical OA",
        duration: "135 Mins",
        questions: "Numerical (12q), CS MCQs (7q), 2 Coding (Medium/Hard), Advanced Math (8q)",
        topics: "Probability, Matrix Math, Data Structures, Algorithms, OOPs, DBMS. Negative marking applies."
      }
    ],
    selectionRounds: [
      { round: "Round 1", name: "Goldman Sachs Aptitude & Coding OA", description: "Comprehensive online assessment testing Quantitative, CS theory, and 2 Coding problems." },
      { round: "Round 2", name: "Technical Interview 1 (DSA & Math)", description: "Puzzles, Probability questions, Dynamic Programming, and Graph algorithms." },
      { round: "Round 3", name: "Technical Interview 2 (System Design & Code)", description: "Low Level Design, Database Indexing, Multithreading, and Hash Map internals." },
      { round: "Round 4", name: "Culture & HR Round", description: "Commercial awareness, teamwork scenarios, integrity, and career aspirations." }
    ],
    frequentlyAskedTopics: ["Probability & Combinatorics", "Dynamic Programming", "Heap & Priority Queue", "Graph Shortest Path (Dijkstra)", "Puzzles"],
    tips: [
      "Goldman Sachs asks mathematical & probability puzzles alongside DSA coding problems.",
      "Revise CS core fundamentals: OS virtual memory, Garbage Collection, and B-Tree indexing."
    ]
  }
];
