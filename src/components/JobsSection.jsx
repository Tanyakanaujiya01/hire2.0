import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Bookmark, 
  CheckCircle2, 
  Filter, 
  X, 
  Send,
  GraduationCap,
  PlusCircle
} from 'lucide-react';

export default function JobsSection({ jobs, savedJobs, toggleSaveJob, applyToJob, appliedJobs }) {
  const [jobListings, setJobListings] = useState(jobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWorkType, setSelectedWorkType] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  
  // Application Form State
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantResume, _setApplicantResume] = useState('');
  const [applicantExp, setApplicantExp] = useState('1');
  const [coverNote, setCoverNote] = useState('');
  const [applicationSuccessMsg, setApplicationSuccessMsg] = useState('');

  // Post Job Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [newWorkType, setNewWorkType] = useState('Remote');
  const [newExpMin, setNewExpMin] = useState(0);
  const [newTags, setNewTags] = useState('React, Node.js, JavaScript');
  const [newDescription, setNewDescription] = useState('');
  const [newEligibility, setNewEligibility] = useState('B.E / B.Tech / MCA with 60% aggregate');

  // Filter Logic
  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesWorkType = selectedWorkType === 'All' || job.workType === selectedWorkType;
    
    const matchesExp = selectedExperience === 'All' || 
      (selectedExperience === 'Freshers' && job.experienceMin === 0) ||
      (selectedExperience === '1-3 Yrs' && job.experienceMin >= 1 && job.experienceMin <= 3) ||
      (selectedExperience === '3+ Yrs' && job.experienceMin > 3);

    return matchesSearch && matchesWorkType && matchesExp;
  });

  const handleOpenApply = (job) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
    setApplicationSuccessMsg('');
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) return;
    
    applyToJob(selectedJob.id, {
      name: applicantName,
      email: applicantEmail,
      resume: applicantResume || 'Candidate_Resume_Tech.pdf',
      experience: applicantExp,
      coverNote
    });

    setApplicationSuccessMsg(`🎉 Application submitted successfully for ${selectedJob.title} at ${selectedJob.company}!`);
    setTimeout(() => {
      setIsApplyModalOpen(false);
      setApplicationSuccessMsg('');
    }, 2200);
  };

  const handleCreateJob = (e) => {
    e.preventDefault();
    if (!newTitle || !newCompany) return;

    const createdJob = {
      id: `job-${Date.now()}`,
      title: newTitle,
      company: newCompany,
      location: newLocation || 'Remote / Hybrid',
      workType: newWorkType,
      experience: `${newExpMin} - ${Number(newExpMin) + 2} Yrs`,
      experienceMin: Number(newExpMin),
      salary: newSalary || '₹12,00,000 - ₹18,00,000 PA',
      postedDate: 'Just Now',
      logoBg: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      tags: newTags.split(',').map(t => t.trim()),
      description: newDescription || 'Exciting tech role in a high-growth environment building cutting edge web & cloud systems.',
      eligibility: newEligibility,
      responsibilities: [
        'Architect scalable frontend & backend components.',
        'Collaborate with product managers and engineers.',
        'Deliver reliable, high-performance code.'
      ],
      perks: ['Flexible Work Hours', 'Health Insurance', 'Learning Stipend']
    };

    setJobListings([createdJob, ...jobListings]);
    setIsPostJobModalOpen(false);
    
    // Reset form
    setNewTitle(''); setNewCompany(''); setNewLocation(''); setNewSalary('');
  };

  return (
    <div className="animate-fade-in">
      
      {/* Search & Filter Bar */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '20px',
        marginBottom: '28px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'center' }}>
          
          {/* Main Search Input */}
          <div style={{ position: 'relative', gridColumn: 'span 2' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by job title, company (Amazon, Microsoft), tech skill (React, Java)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px 12px 42px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                fontSize: '0.92rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Work Type Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={16} color="var(--accent-primary)" />
            <select
              value={selectedWorkType}
              onChange={(e) => setSelectedWorkType(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                fontSize: '0.88rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="All">Work Type: All</option>
              <option value="Remote">Remote Only</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          {/* Experience Level Filter */}
          <div>
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                fontSize: '0.88rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="All">Experience: All</option>
              <option value="Freshers">Freshers (0 Yrs)</option>
              <option value="1-3 Yrs">1 - 3 Years</option>
              <option value="3+ Yrs">3+ Years</option>
            </select>
          </div>

        </div>

        {/* Filter Quick Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '16px', flexWrap: 'wrap', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span>Popular Searches:</span>
          {['React', 'Java', 'Python', 'Remote', 'Freshers', 'Amazon', 'Full Stack'].map(tag => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              style={{
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                fontSize: '0.78rem'
              }}
            >
              {tag}
            </button>
          ))}
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{ color: 'var(--accent-rose)', background: 'none', border: 'none', cursor: 'pointer', marginLeft: 'auto', fontWeight: 600 }}
            >
              Clear Search
            </button>
          )}
        </div>
      </div>

      {/* Jobs Section Header with Post Job Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
          Available Job Opportunities <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>({filteredJobs.length} roles found)</span>
        </h2>

        <button
          className="btn-primary"
          style={{ padding: '8px 16px', fontSize: '0.85rem', gap: '6px' }}
          onClick={() => setIsPostJobModalOpen(true)}
        >
          <PlusCircle size={16} /> Post a New Job
        </button>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="glass-card" style={{ padding: '48px', textAlign: 'center' }}>
          <Briefcase size={48} color="var(--text-subtle)" style={{ marginBottom: '12px' }} />
          <h3>No matching jobs found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Try adjusting your search terms or filters to find open opportunities.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
          {filteredJobs.map((job) => {
            const isSaved = savedJobs.includes(job.id);
            const isApplied = appliedJobs.includes(job.id);

            return (
              <div key={job.id} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  {/* Top Bar: Company Logo & Bookmark */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        background: job.logoBg || 'var(--accent-primary)',
                        color: '#ffffff',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1rem',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                      }}>
                        {job.company.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>{job.company}</h4>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{job.postedDate}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      title={isSaved ? "Saved" : "Save Job"}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: isSaved ? 'var(--accent-amber)' : 'var(--text-subtle)',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                    >
                      <Bookmark size={20} fill={isSaved ? "var(--accent-amber)" : "none"} />
                    </button>
                  </div>

                  {/* Title & Key details */}
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '10px', lineHeight: 1.3 }}>
                    {job.title}
                  </h3>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={14} color="var(--accent-cyan)" /> {job.location}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <DollarSign size={14} color="var(--accent-emerald)" /> {job.salary}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Briefcase size={14} color="var(--accent-violet)" /> {job.experience}
                    </span>
                  </div>

                  {/* Tech Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                    {job.tags.map((tag) => (
                      <span key={tag} className="badge badge-primary" style={{ fontSize: '0.7rem', padding: '3px 8px' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div style={{
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px'
                }}>
                  <button
                    className="btn-secondary"
                    style={{ flex: 1, padding: '8px 12px', fontSize: '0.85rem' }}
                    onClick={() => setSelectedJob(job)}
                  >
                    View Details
                  </button>

                  {isApplied ? (
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: 'var(--accent-emerald)',
                      fontWeight: 700,
                      fontSize: '0.85rem'
                    }}>
                      <CheckCircle2 size={16} /> Applied
                    </span>
                  ) : (
                    <button
                      className="btn-primary"
                      style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                      onClick={() => handleOpenApply(job)}
                    >
                      Easy Apply
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* JOB DETAILS MODAL */}
      {selectedJob && !isApplyModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }} className="animate-fade-in">
          <div style={{
            background: 'var(--bg-modal)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
            maxWidth: '720px',
            maxHeight: '85vh',
            overflowY: 'auto',
            padding: '32px',
            boxShadow: 'var(--shadow-lg)',
            position: 'relative'
          }}>
            <button
              onClick={() => setSelectedJob(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-color)',
                borderRadius: '50%',
                width: '36px', height: '36px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-main)', cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{
                width: '56px', height: '56px',
                borderRadius: '14px',
                background: selectedJob.logoBg || 'var(--accent-primary)',
                color: '#fff',
                fontWeight: 800, fontSize: '1.4rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {selectedJob.company.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>{selectedJob.title}</h2>
                <span style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: 600 }}>{selectedJob.company}</span>
                <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  <span>📍 {selectedJob.location}</span>
                  <span>💰 {selectedJob.salary}</span>
                  <span>💼 {selectedJob.experience}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>Role Overview</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>{selectedJob.description}</p>
            </div>

            {/* Requirements & Eligibility */}
            <div style={{ marginBottom: '24px', background: 'var(--bg-glass)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <GraduationCap size={18} color="var(--accent-cyan)" /> Academic Eligibility Criteria
              </h4>
              <p style={{ color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 600 }}>{selectedJob.eligibility}</p>
            </div>

            {/* Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button className="btn-secondary" onClick={() => setSelectedJob(null)}>
                Close
              </button>
              {appliedJobs.includes(selectedJob.id) ? (
                <span className="badge badge-easy" style={{ padding: '10px 16px', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} /> Application Submitted
                </span>
              ) : (
                <button className="btn-primary" onClick={() => setIsApplyModalOpen(true)}>
                  Easy Apply Now <Send size={16} />
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* EASY APPLY MODAL */}
      {isApplyModalOpen && selectedJob && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          zIndex: 110,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          padding: '20px'
        }} className="animate-fade-in">
          <div style={{
            background: 'var(--bg-modal)',
            border: '1px solid var(--border-highlight)',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
            maxWidth: '540px',
            padding: '28px',
            boxShadow: 'var(--shadow-lg)',
            position: 'relative'
          }}>
            <button
              onClick={() => setIsApplyModalOpen(false)}
              style={{
                position: 'absolute', top: '18px', right: '18px',
                background: 'var(--bg-glass)', border: '1px solid var(--border-color)',
                borderRadius: '50%', width: '32px', height: '32px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-main)', cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '4px' }}>
              Quick Application: {selectedJob.title}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Applying to <strong>{selectedJob.company}</strong> ({selectedJob.location})
            </p>

            {applicationSuccessMsg ? (
              <div style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid #10b981',
                color: '#10b981',
                padding: '20px',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
                fontWeight: 600
              }}>
                {applicationSuccessMsg}
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                      color: 'var(--text-main)', outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rahul.sharma@example.com"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                      color: 'var(--text-main)', outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>
                    Years of Experience
                  </label>
                  <select
                    value={applicantExp}
                    onChange={(e) => setApplicantExp(e.target.value)}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                      color: 'var(--text-main)', outline: 'none'
                    }}
                  >
                    <option value="0">0 Years (Fresher)</option>
                    <option value="1">1 Year</option>
                    <option value="2">2 Years</option>
                    <option value="3">3+ Years</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>
                    Short Cover Note / Portfolio Link
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your experience and relevant projects..."
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                      color: 'var(--text-main)', outline: 'none', resize: 'vertical'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                  <button type="button" className="btn-secondary" onClick={() => setIsApplyModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Submit Application <Send size={16} />
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* POST NEW JOB MODAL */}
      {isPostJobModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(10px)',
          zIndex: 110, display: 'flex', justifyContent: 'center', alignItems: 'center',
          padding: '20px'
        }} className="animate-fade-in">
          <div style={{
            background: 'var(--bg-modal)', border: '1px solid var(--border-highlight)',
            borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '600px',
            maxHeight: '90vh', overflowY: 'auto', padding: '28px', position: 'relative'
          }}>
            <button
              onClick={() => setIsPostJobModalOpen(false)}
              style={{
                position: 'absolute', top: '18px', right: '18px',
                background: 'var(--bg-glass)', border: '1px solid var(--border-color)',
                borderRadius: '50%', width: '32px', height: '32px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-main)', cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '6px' }}>
              Post a New Job Opportunity
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Reach thousands of active tech job seekers & engineering graduates.
            </p>

            <form onSubmit={handleCreateJob} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Job Title *</label>
                  <input
                    type="text" required placeholder="e.g. SDE-1 / Frontend Developer"
                    value={newTitle} onChange={e => setNewTitle(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Company Name *</label>
                  <input
                    type="text" required placeholder="e.g. Uber / Stripe"
                    value={newCompany} onChange={e => setNewCompany(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Location</label>
                  <input
                    type="text" placeholder="e.g. Bengaluru, India"
                    value={newLocation} onChange={e => setNewLocation(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Work Type</label>
                  <select
                    value={newWorkType} onChange={e => setNewWorkType(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Min Exp (Years)</label>
                  <input
                    type="number" min="0" max="10"
                    value={newExpMin} onChange={e => setNewExpMin(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Salary Range</label>
                <input
                  type="text" placeholder="e.g. ₹15,00,000 - ₹22,00,000 PA"
                  value={newSalary} onChange={e => setNewSalary(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Tech Tags (comma separated)</label>
                <input
                  type="text" placeholder="React, Node.js, TypeScript, Docker"
                  value={newTags} onChange={e => setNewTags(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Academic Eligibility Criteria</label>
                <input
                  type="text" placeholder="B.E/B.Tech CS/IT with 65% aggregate, 0 active backlogs"
                  value={newEligibility} onChange={e => setNewEligibility(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Job Description / Overview</label>
                <textarea
                  rows={3} placeholder="Provide key responsibilities and technical summary..."
                  value={newDescription} onChange={e => setNewDescription(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-main)', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" className="btn-secondary" onClick={() => setIsPostJobModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Publish Job Listing
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
