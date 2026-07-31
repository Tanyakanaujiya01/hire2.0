import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardStats from './components/DashboardStats';
import JobsSection from './components/JobsSection';
import DsaSection from './components/DsaSection';
import AptitudeSection from './components/AptitudeSection';
import CompanyPrepSection from './components/CompanyPrepSection';
import AtsMatcherSection from './components/AtsMatcherSection';

import { JOBS_DATA } from './data/jobsData';
import { DSA_PROBLEMS_DATA } from './data/dsaSheetsData';

export default function App() {
  const [activeTab, setActiveTab] = useState('jobs');
  const [theme, setTheme] = useState(() => localStorage.getItem('hirepulse_theme') || 'dark');
  
  // DSA Solved Tracker State
  const [solvedDsaIds, setSolvedDsaIds] = useState(() => {
    try {
      const saved = localStorage.getItem('hirepulse_solved_dsa');
      return saved ? JSON.parse(saved) : ['dsa-1', 'dsa-2'];
    } catch {
      return ['dsa-1', 'dsa-2'];
    }
  });

  // DSA Notes State
  const [userNotes, setUserNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('hirepulse_dsa_notes');
      return saved ? JSON.parse(saved) : { 'dsa-1': 'Remember to use complement = target - nums[i] in Hash Map.' };
    } catch {
      return {};
    }
  });

  // Saved Jobs State
  const [savedJobs, setSavedJobs] = useState(() => {
    try {
      const saved = localStorage.getItem('hirepulse_saved_jobs');
      return saved ? JSON.parse(saved) : ['job-1'];
    } catch {
      return ['job-1'];
    }
  });

  // Applied Jobs State
  const [appliedJobs, setAppliedJobs] = useState(() => {
    try {
      const saved = localStorage.getItem('hirepulse_applied_jobs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync theme with document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hirepulse_theme', theme);
  }, [theme]);

  // Persist DSA Solved Set
  useEffect(() => {
    localStorage.setItem('hirepulse_solved_dsa', JSON.stringify(solvedDsaIds));
  }, [solvedDsaIds]);

  // Persist User Notes
  useEffect(() => {
    localStorage.setItem('hirepulse_dsa_notes', JSON.stringify(userNotes));
  }, [userNotes]);

  // Persist Saved Jobs
  useEffect(() => {
    localStorage.setItem('hirepulse_saved_jobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  // Persist Applied Jobs
  useEffect(() => {
    localStorage.setItem('hirepulse_applied_jobs', JSON.stringify(appliedJobs));
  }, [appliedJobs]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleSolveProblem = (id) => {
    setSolvedDsaIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const saveNote = (id, noteText) => {
    setUserNotes(prev => ({ ...prev, [id]: noteText }));
  };

  const toggleSaveJob = (id) => {
    setSavedJobs(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const applyToJob = (id, _applicantDetails) => {
    if (!appliedJobs.includes(id)) {
      setAppliedJobs(prev => [...prev, id]);
    }
  };

  const solvedSet = new Set(solvedDsaIds);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
        solvedDsaCount={solvedDsaIds.length}
        savedJobsCount={savedJobs.length}
      />

      {/* Main Container */}
      <main style={{ flex: 1, maxWidth: '1380px', width: '100%', margin: '0 auto', padding: '32px 24px' }}>
        
        {/* Top Hero Banner Metrics */}
        <DashboardStats
          setActiveTab={setActiveTab}
          totalJobs={JOBS_DATA.length}
          solvedDsaCount={solvedDsaIds.length}
          totalDsaCount={DSA_PROBLEMS_DATA.length}
        />

        {/* Dynamic Section Renderer */}
        {activeTab === 'jobs' && (
          <JobsSection
            jobs={JOBS_DATA}
            savedJobs={savedJobs}
            toggleSaveJob={toggleSaveJob}
            applyToJob={applyToJob}
            appliedJobs={appliedJobs}
          />
        )}

        {activeTab === 'dsa' && (
          <DsaSection
            problems={DSA_PROBLEMS_DATA}
            solvedSet={solvedSet}
            toggleSolveProblem={toggleSolveProblem}
            userNotes={userNotes}
            saveNote={saveNote}
          />
        )}

        {activeTab === 'aptitude' && (
          <AptitudeSection />
        )}

        {activeTab === 'companies' && (
          <CompanyPrepSection />
        )}

        {activeTab === 'ats' && (
          <AtsMatcherSection />
        )}

        {activeTab === 'saved' && (
          <JobsSection
            jobs={JOBS_DATA.filter(j => savedJobs.includes(j.id))}
            savedJobs={savedJobs}
            toggleSaveJob={toggleSaveJob}
            applyToJob={applyToJob}
            appliedJobs={appliedJobs}
          />
        )}

      </main>

      {/* Footer */}
      <footer style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border-color)',
        padding: '24px',
        textAlign: 'center',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        marginTop: '40px'
      }}>
        <div style={{ maxWidth: '1380px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span>© 2026 HirePulse • Career Portal & Dedicated DSA Prep Hub</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => setActiveTab('jobs')}>Jobs Portal</span>
            <span style={{ cursor: 'pointer' }} onClick={() => setActiveTab('dsa')}>Topic DSA Sheet</span>
            <span style={{ cursor: 'pointer' }} onClick={() => setActiveTab('companies')}>Company Exam Patterns</span>
            <span style={{ cursor: 'pointer' }} onClick={() => setActiveTab('ats')}>ATS Scanner</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
