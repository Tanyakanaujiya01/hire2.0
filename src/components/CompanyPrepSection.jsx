import React, { useState } from 'react';
import { 
  Building2, 
  Target, 
  Lightbulb, 
  X,
  ChevronRight
} from 'lucide-react';
import { COMPANIES_PREP_DATA } from '../data/companiesData';

export default function CompanyPrepSection() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [activeModalTab, setActiveModalTab] = useState('rounds');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = COMPANIES_PREP_DATA.filter(comp =>
    comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comp.roles.some(r => r.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="animate-fade-in">
      
      {/* Header Banner */}
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
            <Building2 size={14} /> Technical Companies Hiring Process & Exam Patterns
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '8px 0 4px 0' }}>
            Company-Wise Recruitment Guides & Syllabi
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            In-depth breakdown of online tests, round structure, academic eligibility criteria, and frequently asked interview questions for top tech firms.
          </p>
        </div>

        <input
          type="text"
          placeholder="Filter by company name (TCS, Amazon, Google)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px 16px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-main)',
            fontSize: '0.88rem',
            outline: 'none',
            minWidth: '260px'
          }}
        />
      </div>

      {/* Companies Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '22px' }}>
        {filteredCompanies.map(comp => (
          <div
            key={comp.id}
            className="glass-card"
            style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              {/* Company Header Tag */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                  {comp.category}
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {comp.selectionRounds.length} Interview Rounds
                </span>
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px' }}>
                {comp.name}
              </h3>

              {/* Roles Offered */}
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>ROLES & COMPENSATION BANDS</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {comp.roles.map((r, i) => (
                    <span key={i} className="badge badge-easy" style={{ fontSize: '0.72rem' }}>
                      💰 {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Eligibility Summary */}
              <div style={{ background: 'var(--bg-glass)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: '16px', fontSize: '0.82rem' }}>
                <div style={{ color: 'var(--text-main)', fontWeight: 600, marginBottom: '2px' }}>
                  🎓 Min Score: {comp.eligibility.minPercentage}
                </div>
                <div style={{ color: 'var(--text-muted)' }}>
                  ⚠️ Backlogs: {comp.eligibility.backlogs}
                </div>
              </div>
            </div>

            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => {
                setSelectedCompany(comp);
                setActiveModalTab('rounds');
              }}
            >
              Inspect Exam Pattern & Selection Workflow <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* COMPANY DETAIL MODAL */}
      {selectedCompany && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(10px)',
          zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center',
          padding: '20px'
        }} className="animate-fade-in">
          <div style={{
            background: 'var(--bg-modal)', border: '1px solid var(--border-highlight)',
            borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '850px',
            maxHeight: '88vh', overflowY: 'auto', padding: '32px', position: 'relative'
          }}>
            <button
              onClick={() => setSelectedCompany(null)}
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

            {/* Header */}
            <div style={{ marginBottom: '20px' }}>
              <span className="badge badge-primary" style={{ marginBottom: '6px' }}>{selectedCompany.category}</span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>{selectedCompany.name} Hiring Process</h2>
            </div>

            {/* Modal Internal Navigation Tabs */}
            <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '20px', overflowX: 'auto' }}>
              {[
                { id: 'rounds', label: 'Selection Rounds' },
                { id: 'exam', label: 'Exam Pattern & Format' },
                { id: 'eligibility', label: 'Academic Eligibility' },
                { id: 'topics', label: 'Top Asked Topics & Strategy' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveModalTab(tab.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.88rem',
                    fontWeight: activeModalTab === tab.id ? 700 : 500,
                    background: activeModalTab === tab.id ? 'var(--accent-primary)' : 'transparent',
                    color: activeModalTab === tab.id ? '#ffffff' : 'var(--text-muted)',
                    border: 'none', cursor: 'pointer', whiteSpace: 'nowrap'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: Selection Rounds */}
            {activeModalTab === 'rounds' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
                {selectedCompany.selectionRounds.map((rnd, idx) => (
                  <div key={idx} style={{
                    background: 'var(--bg-glass)',
                    padding: '18px 22px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start'
                  }}>
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '10px',
                      background: 'var(--accent-primary)', color: '#fff',
                      fontWeight: 800, fontSize: '0.9rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {rnd.round}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 4px 0' }}>{rnd.name}</h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                        {rnd.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 2: Exam Pattern */}
            {activeModalTab === 'exam' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
                {selectedCompany.examPattern.map((sec, idx) => (
                  <div key={idx} style={{
                    background: 'var(--bg-glass)',
                    padding: '20px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-highlight)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-cyan)', margin: 0 }}>
                        {sec.section}
                      </h4>
                      <span className="badge badge-easy">⏱️ {sec.duration}</span>
                    </div>

                    <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '8px', fontWeight: 600 }}>
                      Format: {sec.questions}
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                      <strong>Syllabus / Topics:</strong> {sec.topics}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: Academic Eligibility */}
            {activeModalTab === 'eligibility' && (
              <div style={{
                background: 'var(--bg-glass)',
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                display: 'flex', flexDirection: 'column', gap: '14px'
              }} className="animate-fade-in">
                <div>
                  <strong style={{ color: 'var(--accent-primary)', display: 'block', fontSize: '0.85rem' }}>ELIGIBLE DEGREES & STREAMS</strong>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{selectedCompany.eligibility.degree}</span>
                </div>

                <div>
                  <strong style={{ color: 'var(--accent-primary)', display: 'block', fontSize: '0.85rem' }}>MINIMUM PERCENTAGE / CGPA CUTOFF</strong>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{selectedCompany.eligibility.minPercentage}</span>
                </div>

                <div>
                  <strong style={{ color: 'var(--accent-primary)', display: 'block', fontSize: '0.85rem' }}>BACKLOG POLICY</strong>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{selectedCompany.eligibility.backlogs}</span>
                </div>

                <div>
                  <strong style={{ color: 'var(--accent-primary)', display: 'block', fontSize: '0.85rem' }}>EDUCATION GAP LIMIT</strong>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{selectedCompany.eligibility.gapInEducation}</span>
                </div>

                <div>
                  <strong style={{ color: 'var(--accent-primary)', display: 'block', fontSize: '0.85rem' }}>ELIGIBLE BATCHES</strong>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{selectedCompany.eligibility.batches}</span>
                </div>
              </div>
            )}

            {/* TAB 4: Frequently Asked Topics & Strategy */}
            {activeModalTab === 'topics' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Target size={18} color="var(--accent-rose)" /> Most Frequently Tested DSA Topics
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedCompany.frequentlyAskedTopics.map((top, i) => (
                      <span key={i} className="badge badge-primary" style={{ fontSize: '0.82rem', padding: '6px 12px' }}>
                        {top}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid #10b981' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#10b981', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Lightbulb size={18} /> Pro Prep Strategy & Tips
                  </h4>
                  <ul style={{ paddingLeft: '20px', color: 'var(--text-main)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedCompany.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <button className="btn-secondary" onClick={() => setSelectedCompany(null)}>
                Close Guide
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
