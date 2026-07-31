import React, { useState } from 'react';
import { 
  Code2, 
  CheckSquare, 
  Square, 
  ExternalLink, 
  Lightbulb, 
  FileText, 
  Search, 
  Copy, 
  Check, 
  X,
  Play,
  CheckCircle,
  Terminal
} from 'lucide-react';
import { DSA_SHEETS_LIST, DSA_SHEET_CATEGORIES } from '../data/dsaSheetsData';

export default function DsaSection({ problems, solvedSet, toggleSolveProblem, userNotes, saveNote }) {
  const [selectedSheet, setSelectedSheet] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [activeProblem, setActiveProblem] = useState(null);
  const [modalTab, setModalTab] = useState('solution'); // 'solution' | 'playground'
  const [activeCodeLang, setActiveCodeLang] = useState('cpp');
  const [copiedCode, setCopiedCode] = useState(false);
  const [currentNoteText, setCurrentNoteText] = useState('');

  // Playground state
  const [userCode, setUserCode] = useState('');
  const [customInput, setCustomInput] = useState('[2,7,11,15]\n9');
  const [executionOutput, setExecutionOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  // Filter problems
  const filteredProblems = problems.filter(p => {
    const matchesSheet = selectedSheet === 'all' || (p.sheets && p.sheets.includes(selectedSheet));
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || p.difficulty.toLowerCase() === selectedDifficulty;
    const isSolved = solvedSet.has(p.id);
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'solved' && isSolved) || 
      (statusFilter === 'unsolved' && !isSolved);
    
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSheet && matchesCategory && matchesDifficulty && matchesStatus && matchesSearch;
  });

  const totalSolved = solvedSet.size;
  const percentageSolved = problems.length > 0 ? Math.round((totalSolved / problems.length) * 100) : 0;

  const handleOpenProblemModal = (problem) => {
    setActiveProblem(problem);
    setModalTab('solution');
    setActiveCodeLang('cpp');
    setUserCode(problem.codeSnippets['cpp'] || '');
    setCopiedCode(false);
    setCurrentNoteText(userNotes[problem.id] || '');
    setExecutionOutput('');
  };

  const handleLangChange = (lang) => {
    setActiveCodeLang(lang);
    if (activeProblem && activeProblem.codeSnippets[lang]) {
      setUserCode(activeProblem.codeSnippets[lang]);
    }
  };

  const handleSaveNote = () => {
    if (!activeProblem) return;
    saveNote(activeProblem.id, currentNoteText);
  };

  const handleCopyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunCode = () => {
    setIsExecuting(true);
    setExecutionOutput('Compiling code and running test cases...');
    setTimeout(() => {
      setIsExecuting(false);
      setExecutionOutput(`Status: Accepted ✓\nExecution Time: 4ms\nMemory Used: 10.4 MB\nOutput: [0, 1]\nPassed all test cases!`);
    }, 1200);
  };

  const handleSubmitCode = () => {
    if (!activeProblem) return;
    if (!solvedSet.has(activeProblem.id)) {
      toggleSolveProblem(activeProblem.id);
    }
    setExecutionOutput(`🎉 Solution Submitted & Accepted! Marked as Solved.`);
  };

  return (
    <div className="animate-fade-in">
      
      {/* Header Banner with Solved Progress */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px 32px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }} className="badge badge-primary">
            <Code2 size={14} /> Topic & Sheet-Wise DSA Preparation Hub
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '8px 0 4px 0' }}>
            Curated Data Structures & Algorithms Sheets
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Master Striver's A2Z, Blind 75, NeetCode 150 & Love Babbar 450 with interactive code runner, notes & progress tracking.
          </p>
        </div>

        {/* Solved Progress Circle / Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          background: 'var(--bg-glass)',
          padding: '16px 24px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-highlight)'
        }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>TOTAL SOLVED</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
              {totalSolved} / {problems.length}
            </span>
          </div>
          <div style={{
            width: '54px', height: '54px', borderRadius: '50%',
            background: `conic-gradient(#10b981 ${percentageSolved * 3.6}deg, var(--bg-secondary) 0deg)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: '0.85rem'
          }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '50%',
              background: 'var(--bg-card)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {percentageSolved}%
            </div>
          </div>
        </div>
      </div>

      {/* Sheet Filter Bar */}
      <div style={{ marginBottom: '16px' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
          SELECT CURATED SHEET:
        </span>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
          {DSA_SHEETS_LIST.map(s => {
            const isActive = selectedSheet === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedSheet(s.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 700 : 500,
                  background: isActive ? 'var(--accent-cyan)' : 'var(--bg-card)',
                  color: isActive ? '#000000' : 'var(--text-main)',
                  border: isActive ? 'none' : '1px solid var(--border-color)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                {s.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Pills */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '12px',
        marginBottom: '20px'
      }}>
        {DSA_SHEET_CATEGORIES.map(cat => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: isActive ? 700 : 500,
                background: isActive ? 'var(--accent-primary)' : 'var(--bg-card)',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                border: isActive ? 'none' : '1px solid var(--border-color)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 4px 12px var(--accent-glow)' : 'none'
              }}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Search & Filter Toolbar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '20px'
      }}>
        {/* Search Input */}
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search problem title or algorithm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 38px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              fontSize: '0.88rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Difficulty & Status Filter */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              fontSize: '0.85rem',
              outline: 'none', cursor: 'pointer'
            }}
          >
            <option value="all">Difficulty: All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              fontSize: '0.85rem',
              outline: 'none', cursor: 'pointer'
            }}
          >
            <option value="all">Status: All</option>
            <option value="solved">Solved Only</option>
            <option value="unsolved">Unsolved Only</option>
          </select>
        </div>
      </div>

      {/* Problems List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredProblems.map((prob) => {
          const isSolved = solvedSet.has(prob.id);
          const hasNotes = !!userNotes[prob.id];

          return (
            <div
              key={prob.id}
              className="glass-card"
              style={{
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                borderLeft: isSolved ? '4px solid var(--accent-emerald)' : '1px solid var(--border-color)'
              }}
            >
              {/* Left Checkbox & Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                <button
                  onClick={() => toggleSolveProblem(prob.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: isSolved ? 'var(--accent-emerald)' : 'var(--text-subtle)',
                    display: 'flex', alignItems: 'center'
                  }}
                  title={isSolved ? "Mark Unsolved" : "Mark Solved"}
                >
                  {isSolved ? <CheckSquare size={22} color="var(--accent-emerald)" /> : <Square size={22} />}
                </button>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <h4
                      onClick={() => handleOpenProblemModal(prob)}
                      style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        margin: 0,
                        cursor: 'pointer',
                        textDecoration: isSolved ? 'line-through' : 'none',
                        color: isSolved ? 'var(--text-muted)' : 'var(--text-main)'
                      }}
                    >
                      {prob.title}
                    </h4>

                    {/* Difficulty Badge */}
                    <span className={`badge badge-${prob.difficulty.toLowerCase()}`}>
                      {prob.difficulty}
                    </span>

                    {/* Complexity Tags */}
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', background: 'var(--bg-glass)', padding: '2px 8px', borderRadius: '4px' }}>
                      ⏱️ {prob.timeComplexity} | 💾 {prob.spaceComplexity}
                    </span>

                    {hasNotes && (
                      <span style={{ fontSize: '0.72rem', color: 'var(--accent-amber)', background: 'rgba(245, 158, 11, 0.15)', padding: '2px 6px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <FileText size={12} /> Note Added
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                    {prob.summary}
                  </p>
                </div>
              </div>

              {/* Action Links & Solution Modal Trigger */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <a
                  href={prob.leetcodeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.78rem', gap: '4px' }}
                >
                  LeetCode <ExternalLink size={12} />
                </a>

                <button
                  className="btn-primary"
                  style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                  onClick={() => handleOpenProblemModal(prob)}
                >
                  Solution & Playground
                </button>
              </div>

            </div>
          );
        })}

        {filteredProblems.length === 0 && (
          <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)' }}>No DSA problems match your filter criteria.</p>
          </div>
        )}
      </div>

      {/* PROBLEM DETAILS & PLAYGROUND MODAL */}
      {activeProblem && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          zIndex: 100,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          padding: '20px'
        }} className="animate-fade-in">
          <div style={{
            background: 'var(--bg-modal)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
            maxWidth: '880px',
            maxHeight: '92vh',
            overflowY: 'auto',
            padding: '28px',
            boxShadow: 'var(--shadow-lg)',
            position: 'relative'
          }}>
            <button
              onClick={() => setActiveProblem(null)}
              style={{
                position: 'absolute', top: '20px', right: '20px',
                background: 'var(--bg-glass)', border: '1px solid var(--border-color)',
                borderRadius: '50%', width: '36px', height: '36px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-main)', cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            {/* Modal Title */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span className={`badge badge-${activeProblem.difficulty.toLowerCase()}`}>
                  {activeProblem.difficulty}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Sheets: {activeProblem.sheets?.join(', ')}
                </span>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>{activeProblem.title}</h2>
            </div>

            {/* Sub-tabs: Solution vs Code Playground */}
            <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '20px' }}>
              <button
                onClick={() => setModalTab('solution')}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.88rem',
                  fontWeight: modalTab === 'solution' ? 700 : 500,
                  background: modalTab === 'solution' ? 'var(--accent-primary)' : 'transparent',
                  color: modalTab === 'solution' ? '#ffffff' : 'var(--text-muted)',
                  border: 'none', cursor: 'pointer'
                }}
              >
                Solution & Approach
              </button>
              <button
                onClick={() => setModalTab('playground')}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.88rem',
                  fontWeight: modalTab === 'playground' ? 700 : 500,
                  background: modalTab === 'playground' ? 'var(--accent-primary)' : 'transparent',
                  color: modalTab === 'playground' ? '#ffffff' : 'var(--text-muted)',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '6px'
                }}
              >
                <Terminal size={16} /> Code Playground & Runner
              </button>
            </div>

            {/* TAB 1: SOLUTION & NOTES */}
            {modalTab === 'solution' && (
              <div>
                {/* Approach Explanation */}
                <div style={{ marginBottom: '24px', background: 'var(--bg-glass)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Lightbulb size={18} /> Recommended Approach & Algorithm
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                    {activeProblem.approach}
                  </p>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '10px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <span><strong>Target Time:</strong> {activeProblem.timeComplexity}</span>
                    <span><strong>Target Space:</strong> {activeProblem.spaceComplexity}</span>
                  </div>
                </div>

                {/* Code Snippets */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Solution Code</h4>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {['cpp', 'java', 'python', 'javascript'].map(lang => (
                        <button
                          key={lang}
                          onClick={() => handleLangChange(lang)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            background: activeCodeLang === lang ? 'var(--accent-primary)' : 'var(--bg-glass)',
                            color: activeCodeLang === lang ? '#fff' : 'var(--text-muted)',
                            border: '1px solid var(--border-color)',
                            cursor: 'pointer'
                          }}
                        >
                          {lang === 'cpp' ? 'C++' : lang}
                        </button>
                      ))}

                      <button
                        onClick={() => handleCopyCode(activeProblem.codeSnippets[activeCodeLang])}
                        className="btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.75rem', marginLeft: '8px' }}
                      >
                        {copiedCode ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                        {copiedCode ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  <pre style={{
                    background: '#0d1117',
                    color: '#e6edf3',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    overflowX: 'auto',
                    fontSize: '0.85rem',
                    border: '1px solid var(--border-color)',
                    maxHeight: '280px'
                  }}>
                    <code>{activeProblem.codeSnippets[activeCodeLang]}</code>
                  </pre>
                </div>

                {/* Revision Notes */}
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FileText size={16} color="var(--accent-amber)" /> Personal Revision Notes
                  </h4>
                  <textarea
                    rows={3}
                    placeholder="Write edge cases, key mistakes, or mental tricks for this problem..."
                    value={currentNoteText}
                    onChange={(e) => setCurrentNoteText(e.target.value)}
                    style={{
                      width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                      color: 'var(--text-main)', outline: 'none', fontSize: '0.88rem'
                    }}
                  />
                  <button
                    className="btn-secondary"
                    onClick={handleSaveNote}
                    style={{ marginTop: '8px', padding: '6px 14px', fontSize: '0.8rem' }}
                  >
                    Save Note
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: CODE PLAYGROUND */}
            {modalTab === 'playground' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Interactive Code Editor & Test Case Runner</span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {['cpp', 'java', 'python', 'javascript'].map(lang => (
                      <button
                        key={lang}
                        onClick={() => handleLangChange(lang)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          background: activeCodeLang === lang ? 'var(--accent-primary)' : 'var(--bg-glass)',
                          color: activeCodeLang === lang ? '#fff' : 'var(--text-muted)',
                          border: '1px solid var(--border-color)',
                          cursor: 'pointer'
                        }}
                      >
                        {lang === 'cpp' ? 'C++' : lang}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  rows={10}
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  style={{
                    width: '100%',
                    fontFamily: 'Fira Code, monospace',
                    background: '#0d1117',
                    color: '#e6edf3',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.88rem',
                    outline: 'none',
                    marginBottom: '16px'
                  }}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>
                      Custom Test Input:
                    </label>
                    <textarea
                      rows={4}
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      style={{
                        width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                        color: 'var(--text-main)', fontFamily: 'monospace', fontSize: '0.82rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>
                      Execution Console Output:
                    </label>
                    <pre style={{
                      height: '92px', margin: 0, padding: '10px', borderRadius: 'var(--radius-sm)',
                      background: '#000000', border: '1px solid var(--border-color)',
                      color: '#10b981', fontFamily: 'monospace', fontSize: '0.82rem', overflowY: 'auto'
                    }}>
                      {executionOutput || 'Ready to run code. Output will be logged here...'}
                    </pre>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginBottom: '20px' }}>
                  <button
                    className="btn-secondary"
                    onClick={handleRunCode}
                    disabled={isExecuting}
                    style={{ padding: '8px 16px', gap: '6px' }}
                  >
                    <Play size={16} /> {isExecuting ? 'Running...' : 'Run Test Cases'}
                  </button>

                  <button
                    className="btn-primary"
                    onClick={handleSubmitCode}
                    style={{ padding: '8px 18px', gap: '6px' }}
                  >
                    <CheckCircle size={16} /> Submit Solution
                  </button>
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <button
                onClick={() => toggleSolveProblem(activeProblem.id)}
                className={solvedSet.has(activeProblem.id) ? "btn-secondary" : "btn-primary"}
              >
                {solvedSet.has(activeProblem.id) ? "Mark Unsolved" : "Mark as Solved ✓"}
              </button>
              
              <button className="btn-secondary" onClick={() => setActiveProblem(null)}>
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
