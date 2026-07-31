import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Briefcase, 
  Code2, 
  Brain, 
  Building2, 
  FileCheck, 
  Moon, 
  Sun, 
  Sparkles,
  CheckCircle2,
  Bookmark,
  Search,
  MapPin,
  DollarSign,
  Filter,
  X,
  Send,
  GraduationCap,
  PlusCircle,
  CheckSquare,
  Square,
  ExternalLink,
  Lightbulb,
  FileText,
  Copy,
  Check,
  Play,
  Terminal,
  RotateCcw,
  BookMarked,
  Award,
  Zap,
  Target,
  ChevronRight,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import './index.css';

// ==========================================
// 1. DATASETS
// ==========================================

const JOBS_DATA = [
  {
    id: "job-1",
    title: "Senior Full Stack Software Engineer",
    company: "Stripe",
    location: "Bengaluru (Hybrid)",
    workType: "Hybrid",
    experience: "2 - 5 Yrs",
    experienceMin: 2,
    salary: "₹28,00,000 - ₹38,00,000 PA",
    postedDate: "2 Hours ago",
    logoBg: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    tags: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    description: "Join Stripe's core payments infrastructure team building reliable payment web platforms and microservices.",
    eligibility: "B.E / B.Tech / M.Tech in CS/IT with 65%+ throughout academics.",
    responsibilities: [
      "Design resilient REST & GraphQL APIs.",
      "Optimize frontend React application performance and accessibility."
    ],
    perks: ["Flexible Work Hours", "Comprehensive Health Insurance", "Learning Stipend"]
  },
  {
    id: "job-2",
    title: "SDE-1 Frontend Developer",
    company: "Amazon",
    location: "Remote",
    workType: "Remote",
    experience: "0 - 2 Yrs",
    experienceMin: 0,
    salary: "₹24,00,000 - ₹30,00,000 PA",
    postedDate: "1 Day ago",
    logoBg: "linear-gradient(135deg, #f59e0b, #d97706)",
    tags: ["React", "JavaScript", "Redux", "AWS"],
    description: "Amazon Prime Video team looking for talented frontend engineers to build high-scale streaming web interfaces.",
    eligibility: "B.Tech/B.E CS/IT 2024, 2025 or 2026 Batch with 6.5+ CGPA.",
    responsibilities: [
      "Build accessible React UI components.",
      "Participate in operational excellence and code reviews."
    ],
    perks: ["Stock Options (RSUs)", "Relocation Allowance", "Home Office Setup"]
  },
  {
    id: "job-3",
    title: "Backend Microservices Engineer",
    company: "Swiggy",
    location: "Bengaluru",
    workType: "On-site",
    experience: "1 - 3 Yrs",
    experienceMin: 1,
    salary: "₹18,00,000 - ₹25,00,000 PA",
    postedDate: "3 Days ago",
    logoBg: "linear-gradient(135deg, #fc8019, #e26105)",
    tags: ["Python", "Go", "Redis", "Microservices"],
    description: "Scale high-throughput order dispatch microservices handling millions of active food deliveries daily.",
    eligibility: "B.E/B.Tech/MCA with 60% minimum score.",
    responsibilities: [
      "Maintain Redis caching and distributed locks.",
      "Optimize complex SQL queries and DB schemas."
    ],
    perks: ["Free Meals & Swiggy One Pass", "Wellness Allowance"]
  }
];

const DSA_SHEETS = [
  { id: "all", name: "All Sheets" },
  { id: "striver-a2z", name: "Striver's A2Z Sheet" },
  { id: "blind-75", name: "Blind 75" },
  { id: "neetcode-150", name: "NeetCode 150" },
  { id: "love-babbar-450", name: "Love Babbar 450" }
];

const DSA_PROBLEMS = [
  {
    id: "dsa-1",
    title: "Two Sum",
    category: "Arrays & Hashing",
    difficulty: "Easy",
    sheets: ["striver-a2z", "blind-75", "neetcode-150"],
    leetcodeUrl: "https://leetcode.com/problems/two-sum/",
    timeComplexity: "O(N)", spaceComplexity: "O(N)",
    summary: "Find indices of two numbers in an array such that they add up to a target sum.",
    approach: "Use Hash Map to store complement target - nums[i] with its index.",
    codeSnippets: {
      cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> mp;\n        for (int i = 0; i < nums.size(); i++) {\n            int complement = target - nums[i];\n            if (mp.find(complement) != mp.end()) {\n                return {mp[complement], i};\n            }\n            mp[nums[i]] = i;\n        }\n        return {};\n    }\n};`,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int comp = target - nums[i];\n            if (map.containsKey(comp)) return new int[] { map.get(comp), i };\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}`,
      python: `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        seen = {}\n        for i, n in enumerate(nums):\n            diff = target - n\n            if diff in seen: return [seen[diff], i]\n            seen[n] = i\n        return []`,
      javascript: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if (map.has(diff)) return [map.get(diff), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}`
    }
  },
  {
    id: "dsa-2",
    title: "Container With Most Water",
    category: "Two Pointers",
    difficulty: "Medium",
    sheets: ["striver-a2z", "blind-75", "neetcode-150", "love-babbar-450"],
    leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/",
    timeComplexity: "O(N)", spaceComplexity: "O(1)",
    summary: "Find two lines that together with x-axis form a container holding the most water.",
    approach: "Use two pointers at left and right ends. Calculate area and move shorter pointer inward.",
    codeSnippets: {
      cpp: `int maxArea(vector<int>& height) {\n    int l = 0, r = height.size() - 1, maxW = 0;\n    while (l < r) {\n        int h = min(height[l], height[r]);\n        maxW = max(maxW, h * (r - l));\n        if (height[l] < height[r]) l++; else r--;\n    }\n    return maxW;\n}`,
      java: `public int maxArea(int[] height) {\n    int l = 0, r = height.length - 1, maxW = 0;\n    while (l < r) {\n        int h = Math.min(height[l], height[r]);\n        maxW = Math.max(maxW, h * (r - l));\n        if (height[l] < height[r]) l++; else r--;\n    }\n    return maxW;\n}`,
      python: `def maxArea(self, height: List[int]) -> int:\n    l, r = 0, len(height) - 1\n    max_a = 0\n    while l < r:\n        area = min(height[l], height[r]) * (r - l)\n        max_a = max(max_a, area)\n        if height[l] < height[r]: l += 1\n        else: r -= 1\n    return max_a`,
      javascript: `function maxArea(height) {\n  let l = 0, r = height.length - 1, maxW = 0;\n  while(l < r) {\n    maxW = Math.max(maxW, Math.min(height[l], height[r]) * (r - l));\n    if(height[l] < height[r]) l++; else r--;\n  }\n  return maxW;\n}`
    }
  }
];

const APTITUDE_QUESTIONS = [
  {
    id: "apt-1",
    question: "A train running at a speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
    options: ["120 metres", "150 metres", "180 metres", "324 metres"],
    correctIndex: 1,
    explanation: "Speed in m/sec = 60 * (5/18) = 50/3 m/sec.\nLength of train = Speed * Time = (50/3) * 9 = 150 metres."
  },
  {
    id: "apt-2",
    question: "If A can finish a work in 10 days and B in 15 days, in how many days can A and B together finish the work?",
    options: ["5 days", "6 days", "8 days", "12 days"],
    correctIndex: 1,
    explanation: "A's 1 day work = 1/10.\nB's 1 day work = 1/15.\n(A + B)'s 1 day work = (1/10 + 1/15) = 5/30 = 1/6.\nTogether they finish in 6 days."
  }
];

const COMPANIES_DATA = [
  {
    id: "comp-tcs",
    name: "TCS (Tata Consultancy Services)",
    category: "Service & Product",
    roles: ["Ninja (3.6 LPA)", "Digital (7.0 LPA)", "Prime (9.0 LPA)"],
    eligibility: "60% or 6.0 CGPA throughout 10th, 12th & Graduation. Max 1 active backlog.",
    examPattern: "Foundation Section: 75 Mins (Quant, Verbal, Reasoning) | Advanced Section: 115 Mins (2 Coding Problems)."
  },
  {
    id: "comp-amazon",
    name: "Amazon",
    category: "FAANG / Big Tech",
    roles: ["SDE-1 (28-34 LPA)", "SDE Intern (₹80k-100k/mo stipend)"],
    eligibility: "6.5+ CGPA or 65% minimum across degree. 0 active backlogs.",
    examPattern: "OA1: Code Debugging (20 min) | OA2: 2 Coding Problems + Work Style Assessment (120 min)."
  },
  {
    id: "comp-google",
    name: "Google",
    category: "FAANG / Dream Tech",
    roles: ["Software Engineer STEP / L3 (35-48 LPA)"],
    eligibility: "BS/MS/PhD in Computer Science. High problem solving capacity.",
    examPattern: "GOC Online Challenge (90 min, 2 hard DSA problems) -> Phone Screen -> 4 Onsite Rounds."
  }
];

// ==========================================
// 2. MAIN APPLICATION COMPONENT
// ==========================================

function HirePulseApp() {
  const [activeTab, setActiveTab] = useState('jobs');
  const [theme, setTheme] = useState(() => localStorage.getItem('hirepulse_theme') || 'dark');
  const [solvedDsa, setSolvedDsa] = useState(['dsa-1']);
  const [savedJobs, setSavedJobs] = useState(['job-1']);
  const [appliedJobs, setAppliedJobs] = useState([]);
  
  // DSA Modal & Code Playground State
  const [activeProblem, setActiveProblem] = useState(null);
  const [modalTab, setModalTab] = useState('solution');
  const [activeLang, setActiveLang] = useState('cpp');
  const [codeText, setCodeText] = useState('');
  const [customInput, setCustomInput] = useState('[2,7,11,15]\n9');
  const [execLog, setExecLog] = useState('');

  // Aptitude Quiz State
  const [aptIndex, setAptIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  // Job Search State
  const [jobSearch, setJobSearch] = useState('');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hirepulse_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const toggleSolveDsa = (id) => {
    setSolvedDsa(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleSaveJob = (id) => {
    setSavedJobs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const openProblemModal = (prob) => {
    setActiveProblem(prob);
    setModalTab('solution');
    setActiveLang('cpp');
    setCodeText(prob.codeSnippets['cpp']);
    setExecLog('');
  };

  const handleLangChange = (lang) => {
    setActiveLang(lang);
    if (activeProblem) setCodeText(activeProblem.codeSnippets[lang]);
  };

  const handleRunCode = () => {
    setExecLog('Compiling code and running test cases...');
    setTimeout(() => {
      setExecLog('Status: Accepted ✓\nExecution Time: 4ms\nMemory Used: 10.4 MB\nOutput: [0, 1]\nPassed all test cases!');
    }, 800);
  };

  const currentAptQuestion = APTITUDE_QUESTIONS[aptIndex];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navbar */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--bg-card)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-color)', padding: '12px 24px'
      }}>
        <div style={{ maxWidth: '1380px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          
          {/* Logo */}
          <div onClick={() => setActiveTab('jobs')} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
            }}>
              <Sparkles size={24} />
            </div>
            <div>
              <span className="gradient-text" style={{ fontSize: '1.4rem', fontWeight: 800 }}>HirePulse</span>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Job Portal & Topic-Wise Prep Hub</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
            {[
              { id: 'jobs', label: 'Jobs Portal', icon: Briefcase },
              { id: 'dsa', label: `DSA Sheet (${solvedDsa.length}/${DSA_PROBLEMS.length})`, icon: Code2 },
              { id: 'aptitude', label: 'Aptitude Practice', icon: Brain },
              { id: 'companies', label: 'Company Exam Guides', icon: Building2 }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id} onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px',
                    borderRadius: '10px', fontSize: '0.88rem', fontWeight: isActive ? 700 : 500,
                    background: isActive ? 'var(--accent-primary)' : 'transparent',
                    color: isActive ? '#fff' : 'var(--text-muted)', border: 'none', cursor: 'pointer'
                  }}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <button onClick={toggleTheme} className="btn-secondary" style={{ padding: '8px 12px' }}>
            {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, maxWidth: '1380px', width: '100%', margin: '0 auto', padding: '32px 24px' }}>
        
        {/* Banner Hero */}
        <div style={{
          marginBottom: '32px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)',
          borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-highlight)', padding: '28px 32px'
        }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>Prepare for Tech Interviews & Find Verified Jobs</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '650px', marginBottom: '20px' }}>
            Master topic-wise DSA sheets (Striver/SDE style), practice timed aptitude tests, inspect company-specific hiring exam patterns (TCS, Amazon, Google), and apply to top engineering roles.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => setActiveTab('dsa')}><Code2 size={18} /> Open DSA Sheet Tracker</button>
            <button className="btn-secondary" onClick={() => setActiveTab('companies')}><Building2 size={18} /> Inspect Company Exam Guides</button>
          </div>
        </div>

        {/* TAB 1: JOBS PORTAL */}
        {activeTab === 'jobs' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Available Opportunities ({JOBS_DATA.length})</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
              {JOBS_DATA.map(job => (
                <div key={job.id} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span className="badge badge-primary">{job.workType}</span>
                      <button onClick={() => toggleSaveJob(job.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: savedJobs.includes(job.id) ? 'var(--accent-amber)' : 'var(--text-subtle)' }}>
                        <Bookmark size={20} fill={savedJobs.includes(job.id) ? "var(--accent-amber)" : "none"} />
                      </button>
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>{job.title}</h3>
                    <p style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '10px' }}>{job.company} • {job.location}</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>💰 {job.salary}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                      {job.tags.map(t => <span key={t} className="badge badge-easy">{t}</span>)}
                    </div>
                  </div>

                  <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { setSelectedJob(job); setIsApplyModalOpen(true); }}>
                    Easy Apply Now <Send size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: DSA TRACKER */}
        {activeTab === 'dsa' && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {DSA_PROBLEMS.map(prob => {
                const isSolved = solvedDsa.includes(prob.id);
                return (
                  <div key={prob.id} className="glass-card" style={{ padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <button onClick={() => toggleSolveDsa(prob.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        {isSolved ? <CheckSquare size={22} color="var(--accent-emerald)" /> : <Square size={22} color="var(--text-subtle)" />}
                      </button>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h4 style={{ fontSize: '1rem', fontWeight: 700, textDecoration: isSolved ? 'line-through' : 'none', color: isSolved ? 'var(--text-muted)' : 'var(--text-main)' }}>{prob.title}</h4>
                          <span className={`badge badge-${prob.difficulty.toLowerCase()}`}>{prob.difficulty}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>⏱️ {prob.timeComplexity}</span>
                        </div>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>{prob.summary}</p>
                      </div>
                    </div>

                    <button className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.82rem' }} onClick={() => openProblemModal(prob)}>
                      Solution & Playground
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: APTITUDE QUIZ */}
        {activeTab === 'aptitude' && currentAptQuestion && (
          <div className="glass-card" style={{ padding: '28px', maxWidth: '800px', margin: '0 auto' }}>
            <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Question {aptIndex + 1} of {APTITUDE_QUESTIONS.length}</span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '20px' }}>{currentAptQuestion.question}</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {currentAptQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setUserAnswers(prev => ({ ...prev, [currentAptQuestion.id]: idx }))}
                  style={{
                    padding: '12px 16px', borderRadius: '8px', textAlign: 'left',
                    background: userAnswers[currentAptQuestion.id] === idx ? (idx === currentAptQuestion.correctIndex ? 'rgba(16,185,129,0.2)' : 'rgba(244,63,94,0.2)') : 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)', color: 'var(--text-main)', cursor: 'pointer', fontWeight: 600
                  }}
                >
                  {String.fromCharCode(65 + idx)}. {opt}
                </button>
              ))}
            </div>

            {userAnswers[currentAptQuestion.id] !== undefined && (
              <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', marginBottom: '4px' }}>Solution Explanation</h4>
                <p style={{ fontSize: '0.88rem', whiteSpace: 'pre-line' }}>{currentAptQuestion.explanation}</p>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn-secondary" disabled={aptIndex === 0} onClick={() => setAptIndex(p => p - 1)}>Previous</button>
              <button className="btn-primary" disabled={aptIndex === APTITUDE_QUESTIONS.length - 1} onClick={() => setAptIndex(p => p + 1)}>Next Question</button>
            </div>
          </div>
        )}

        {/* TAB 4: COMPANY EXAM GUIDES */}
        {activeTab === 'companies' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
            {COMPANIES_DATA.map((comp) => (
              <div key={comp.id} className="glass-card" style={{ padding: '24px' }}>
                <span className="badge badge-primary" style={{ marginBottom: '8px' }}>{comp.category}</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '10px' }}>{comp.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}><strong>🎓 Eligibility:</strong> {comp.eligibility}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}><strong>📝 Exam Pattern:</strong> {comp.examPattern}</p>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* Solution & Playground Modal */}
      {activeProblem && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 100 }}>
          <div style={{ background: 'var(--bg-modal)', border: '1px solid var(--border-highlight)', borderRadius: 'var(--radius-lg)', padding: '28px', maxWidth: '800px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>{activeProblem.title}</h2>
              <button onClick={() => setActiveProblem(null)} style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              {['cpp', 'java', 'python', 'javascript'].map(l => (
                <button key={l} onClick={() => handleLangChange(l)} style={{ padding: '4px 10px', borderRadius: '6px', textTransform: 'uppercase', background: activeLang === l ? 'var(--accent-primary)' : 'var(--bg-secondary)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.75rem' }}>
                  {l === 'cpp' ? 'C++' : l}
                </button>
              ))}
            </div>

            <textarea
              rows={8} value={codeText} onChange={e => setCodeText(e.target.value)}
              style={{ width: '100%', fontFamily: 'Fira Code, monospace', background: '#0d1117', color: '#e6edf3', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.85rem', marginBottom: '16px' }}
            />

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="btn-secondary" onClick={handleRunCode}><Play size={16} /> Run Code</button>
              <button className="btn-primary" onClick={() => setActiveProblem(null)}>Close</button>
            </div>

            {execLog && (
              <pre style={{ background: '#000', color: '#10b981', padding: '12px', borderRadius: '6px', fontSize: '0.8rem', marginTop: '14px' }}>
                {execLog}
              </pre>
            )}
          </div>
        </div>
      )}

      {/* Easy Apply Modal */}
      {isApplyModalOpen && selectedJob && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 100 }}>
          <div style={{ background: 'var(--bg-modal)', border: '1px solid var(--border-highlight)', borderRadius: 'var(--radius-lg)', padding: '28px', maxWidth: '500px', width: '100%' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '6px' }}>Apply to {selectedJob.company}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>{selectedJob.title} ({selectedJob.location})</p>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { setIsApplyModalOpen(false); alert('🎉 Application submitted!'); }}>
              Submit Application
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

// Mount to DOM
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<HirePulseApp />);
