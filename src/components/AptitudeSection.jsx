import React, { useState } from 'react';
import { 
  Brain, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  BookMarked,
  Sparkles,
  Award
} from 'lucide-react';
import { APTITUDE_CATEGORIES, APTITUDE_QUESTIONS, FORMULA_CHEAT_SHEET } from '../data/aptitudeData';

export default function AptitudeSection() {
  const [selectedCategory, setSelectedCategory] = useState('quant');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState({});
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);

  // Filter questions by selected category
  const filteredQuestions = APTITUDE_QUESTIONS.filter(q => q.category === selectedCategory);
  const currentQuestion = filteredQuestions[currentQuestionIndex] || filteredQuestions[0];

  const handleSelectAnswer = (qId, optionIdx) => {
    if (userAnswers[qId] !== undefined) return; // Answer locked
    setUserAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    setShowExplanation(prev => ({ ...prev, [qId]: true }));
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setShowExplanation({});
    setCurrentQuestionIndex(0);
  };

  // Calculate score
  let correctCount = 0;
  Object.keys(userAnswers).forEach(qId => {
    const q = APTITUDE_QUESTIONS.find(item => item.id === qId);
    if (q && userAnswers[qId] === q.correctIndex) {
      correctCount++;
    }
  });

  return (
    <div className="animate-fade-in">
      
      {/* Top Banner & Category Selection */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px 32px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }} className="badge badge-primary">
            <Brain size={14} /> Aptitude & Technical Fundamentals
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '8px 0 4px 0' }}>
            Quantitative, Logical & Core CS Practice
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Interactive question bank with step-by-step mathematical & logical solution breakdowns.
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={() => setIsCheatSheetOpen(true)}
        >
          <BookMarked size={18} /> Formula Cheat Sheet
        </button>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        {APTITUDE_CATEGORIES.map(cat => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentQuestionIndex(0);
              }}
              style={{
                background: isActive ? 'var(--accent-primary)' : 'var(--bg-card)',
                color: isActive ? '#ffffff' : 'var(--text-main)',
                border: isActive ? 'none' : '1px solid var(--border-color)',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 4px 14px var(--accent-glow)' : 'none'
              }}
            >
              <div style={{
                width: '38px', height: '38px', borderRadius: '10px',
                background: isActive ? 'rgba(255,255,255,0.2)' : 'var(--bg-glass)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Brain size={20} color={isActive ? '#ffffff' : 'var(--accent-primary)'} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>{cat.name}</h4>
                <span style={{ fontSize: '0.75rem', color: isActive ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)' }}>
                  Interactive Practice
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Quiz Area */}
      {filteredQuestions.length > 0 && currentQuestion ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>
          
          {/* Question Box */}
          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span className="badge badge-primary" style={{ fontSize: '0.75rem' }}>
                Question {currentQuestionIndex + 1} of {filteredQuestions.length} • {currentQuestion.topic}
              </span>

              {userAnswers[currentQuestion.id] !== undefined && (
                <span style={{
                  fontSize: '0.82rem', fontWeight: 700,
                  color: userAnswers[currentQuestion.id] === currentQuestion.correctIndex ? 'var(--accent-emerald)' : 'var(--accent-rose)'
                }}>
                  {userAnswers[currentQuestion.id] === currentQuestion.correctIndex ? '✓ Correct Answer' : '✗ Incorrect'}
                </span>
              )}
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '24px', lineHeight: 1.5 }}>
              {currentQuestion.question}
            </h3>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = userAnswers[currentQuestion.id] === idx;
                const isCorrect = idx === currentQuestion.correctIndex;
                const isAnswered = userAnswers[currentQuestion.id] !== undefined;

                let optBg = 'var(--bg-secondary)';
                let optBorder = '1px solid var(--border-color)';
                let optColor = 'var(--text-main)';

                if (isAnswered) {
                  if (isCorrect) {
                    optBg = 'rgba(16, 185, 129, 0.15)';
                    optBorder = '1px solid #10b981';
                    optColor = '#10b981';
                  } else if (isSelected) {
                    optBg = 'rgba(244, 63, 94, 0.15)';
                    optBorder = '1px solid #f43f5e';
                    optColor = '#f43f5e';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(currentQuestion.id, idx)}
                    disabled={isAnswered}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: 'var(--radius-sm)',
                      background: optBg,
                      border: optBorder,
                      color: optColor,
                      textAlign: 'left',
                      fontSize: '0.92rem',
                      fontWeight: 600,
                      cursor: isAnswered ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{String.fromCharCode(65 + idx)}. {opt}</span>
                    {isAnswered && isCorrect && <CheckCircle2 size={18} color="#10b981" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle size={18} color="#f43f5e" />}
                  </button>
                );
              })}
            </div>

            {/* Detailed Solution Explanation */}
            {showExplanation[currentQuestion.id] && (
              <div style={{
                background: 'rgba(99, 102, 241, 0.08)',
                border: '1px solid var(--border-highlight)',
                padding: '20px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '24px'
              }} className="animate-fade-in">
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={16} /> Detailed Solution Explanation
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Pagination controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '18px' }}>
              <button
                className="btn-secondary"
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                style={{ opacity: currentQuestionIndex === 0 ? 0.5 : 1 }}
              >
                Previous Question
              </button>

              <button
                className="btn-primary"
                disabled={currentQuestionIndex === filteredQuestions.length - 1}
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                style={{ opacity: currentQuestionIndex === filteredQuestions.length - 1 ? 0.5 : 1 }}
              >
                Next Question
              </button>
            </div>

          </div>

          {/* Right Sidebar: Score Card & Question Navigator */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Score Card */}
            <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
              <Award size={32} color="var(--accent-amber)" style={{ marginBottom: '8px' }} />
              <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Quiz Performance</h4>
              
              <div style={{ margin: '16px 0' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                  {correctCount} / {filteredQuestions.length}
                </span>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Correct Answers</p>
              </div>

              <button className="btn-secondary" style={{ width: '100%', fontSize: '0.82rem' }} onClick={handleResetQuiz}>
                <RotateCcw size={14} /> Reset Quiz
              </button>
            </div>

            {/* Question Quick Jump Grid */}
            <div className="glass-card" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px' }}>Question Navigator</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {filteredQuestions.map((q, idx) => {
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isCorrect = isAnswered && userAnswers[q.id] === q.correctIndex;
                  const isCurrent = currentQuestionIndex === idx;

                  let btnBg = 'var(--bg-glass)';
                  let btnColor = 'var(--text-main)';

                  if (isCurrent) {
                    btnBg = 'var(--accent-primary)';
                    btnColor = '#fff';
                  } else if (isAnswered) {
                    btnBg = isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)';
                    btnColor = isCorrect ? '#10b981' : '#f43f5e';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      style={{
                        padding: '10px',
                        borderRadius: 'var(--radius-sm)',
                        background: btnBg,
                        color: btnColor,
                        border: '1px solid var(--border-color)',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      ) : null}

      {/* FORMULA CHEAT SHEET MODAL */}
      {isCheatSheetOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)',
          zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center',
          padding: '20px'
        }} className="animate-fade-in">
          <div style={{
            background: 'var(--bg-modal)', border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '700px',
            maxHeight: '85vh', overflowY: 'auto', padding: '32px', position: 'relative'
          }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookMarked color="var(--accent-primary)" /> Quick Formula & Concept Reference
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
              {FORMULA_CHEAT_SHEET.map((sec, idx) => (
                <div key={idx} style={{ background: 'var(--bg-glass)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '10px' }}>
                    {sec.topic}
                  </h4>
                  <ul style={{ paddingLeft: '20px', color: 'var(--text-main)', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {sec.formulas.map((form, i) => (
                      <li key={i} style={{ fontFamily: 'Fira Code, monospace' }}>{form}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-secondary" onClick={() => setIsCheatSheetOpen(false)}>
                Close Cheat Sheet
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
