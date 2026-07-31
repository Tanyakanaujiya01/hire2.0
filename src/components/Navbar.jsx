import React from 'react';
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
  Bookmark
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, theme, toggleTheme, solvedDsaCount, savedJobsCount }) {
  const navItems = [
    { id: 'jobs', label: 'Jobs Portal', icon: Briefcase, badge: 'Hiring' },
    { id: 'dsa', label: 'DSA Preparation Sheet', icon: Code2, count: solvedDsaCount },
    { id: 'aptitude', label: 'Aptitude & CS', icon: Brain },
    { id: 'companies', label: 'Company Exam Patterns', icon: Building2 },
    { id: 'ats', label: 'ATS Resume Matcher', icon: FileCheck, highlight: true },
    { id: 'saved', label: 'Saved Jobs', icon: Bookmark, count: savedJobsCount }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--bg-card)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '12px 24px'
    }}>
      <div style={{
        maxWidth: '1380px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('jobs')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--gradient-brand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)'
          }}>
            <Sparkles size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em' }} className="gradient-text">
                HirePulse
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
              Job Portal & Topic-Wise Prep Hub
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', padding: '4px 0' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  background: isActive ? 'var(--accent-primary)' : 'transparent',
                  border: isActive ? 'none' : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 4px 12px var(--accent-glow)' : 'none'
                }}
              >
                <Icon size={18} color={isActive ? '#ffffff' : 'var(--accent-primary)'} />
                <span>{item.label}</span>
                
                {item.badge && (
                  <span style={{
                    fontSize: '0.65rem',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: item.highlight ? 'var(--accent-rose)' : 'rgba(16, 185, 129, 0.2)',
                    color: item.highlight ? '#fff' : '#10b981',
                    fontWeight: 700
                  }}>
                    {item.badge}
                  </span>
                )}

                {typeof item.count === 'number' && item.count > 0 && (
                  <span style={{
                    fontSize: '0.72rem',
                    padding: '2px 7px',
                    borderRadius: '999px',
                    background: isActive ? 'rgba(255,255,255,0.25)' : 'var(--border-highlight)',
                    color: isActive ? '#fff' : 'var(--accent-primary)',
                    fontWeight: 700
                  }}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Stats Quick Bar & Theme Switch */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-glass)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-color)',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}>
            <CheckCircle2 size={16} color="var(--accent-emerald)" />
            <span>DSA Solved: <strong>{solvedDsaCount}</strong></span>
          </div>

          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {theme === 'dark' ? <Sun size={20} color="#f59e0b" /> : <Moon size={20} color="#6366f1" />}
          </button>
        </div>
      </div>
    </header>
  );
}
