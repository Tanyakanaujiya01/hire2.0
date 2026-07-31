import React from 'react';
import { 
  Briefcase, 
  Code2, 
  Building2, 
  TrendingUp, 
  CheckCircle, 
  Target, 
  ArrowRight
} from 'lucide-react';

export default function DashboardStats({ setActiveTab, totalJobs, solvedDsaCount, totalDsaCount }) {
  const dsaPercentage = totalDsaCount > 0 ? Math.round((solvedDsaCount / totalDsaCount) * 100) : 0;

  return (
    <div style={{
      marginBottom: '32px',
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-highlight)',
      padding: '28px 32px',
      position: 'relative',
      overflow: 'hidden'
    }} className="animate-fade-in">
      
      {/* Background Decorative Blob */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '240px',
        height: '240px',
        background: 'var(--accent-glow)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        
        {/* Banner Welcome & Jump Buttons */}
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }} className="badge badge-primary">
            <TrendingUp size={14} /> Career Preparation & Job Match Platform
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '4px 0 8px 0', lineHeight: 1.2 }}>
            Prepare for Tech Interviews & Find Verified Jobs
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '650px', marginBottom: '20px' }}>
            Master topic-wise DSA sheets (Striver/SDE style), practice timed aptitude tests, inspect company-specific hiring exam patterns (TCS, Amazon, Infosys), and apply directly to top engineering roles.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <button className="btn-primary" onClick={() => setActiveTab('dsa')}>
              <Code2 size={18} /> Continue DSA Sheet ({dsaPercentage}%) <ArrowRight size={16} />
            </button>
            <button className="btn-secondary" onClick={() => setActiveTab('companies')}>
              <Building2 size={18} /> Company Exam Guides
            </button>
            <button className="btn-secondary" onClick={() => setActiveTab('ats')}>
              <Target size={18} /> Check ATS Resume Match
            </button>
          </div>
        </div>

        {/* Quick Metric Card 1: DSA Progress */}
        <div style={{
          background: 'var(--bg-card)',
          padding: '20px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>DSA SHEET PROGRESS</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '4px 0 0 0' }}>
                {solvedDsaCount} / {totalDsaCount}
              </h3>
            </div>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-emerald)'
            }}>
              <CheckCircle size={24} />
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px', color: 'var(--text-muted)' }}>
              <span>Completion Target</span>
              <span>{dsaPercentage}%</span>
            </div>
            <div style={{ height: '8px', background: 'var(--bg-glass)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${dsaPercentage}%`,
                background: 'linear-gradient(90deg, #10b981, #06b6d4)',
                borderRadius: '999px',
                transition: 'width 0.4s ease'
              }} />
            </div>
          </div>
        </div>

        {/* Quick Metric Card 2: Active Jobs */}
        <div style={{
          background: 'var(--bg-card)',
          padding: '20px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>FEATURED OPEN ROLES</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '4px 0 0 0' }}>
                {totalJobs} Jobs Open
              </h3>
            </div>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(99, 102, 241, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary)'
            }}>
              <Briefcase size={24} />
            </div>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '12px 0 0 0' }}>
            Verified positions from Stripe, Amazon, Swiggy, TCS, Razorpay & Flipkart.
          </p>
        </div>

      </div>
    </div>
  );
}
