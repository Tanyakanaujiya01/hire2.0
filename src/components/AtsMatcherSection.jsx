import React, { useState } from 'react';
import { 
  FileCheck, 
  Sparkles, 
  Target, 
  Zap
} from 'lucide-react';

export default function AtsMatcherSection() {
  const [resumeText, setResumeText] = useState(`Rahul Sharma
Senior Software Engineer | Full Stack Developer
Email: rahul.sharma@example.com | GitHub: github.com/rahulsharma | LinkedIn: linkedin.com/in/rahulsharma

SUMMARY:
Passionate Software Engineer with 3+ years of experience building high-concurrency microservices, RESTful APIs, and responsive web applications using React, JavaScript, Node.js, and PostgreSQL. Experienced in Docker, AWS, Git, and Agile development workflows.

TECHNICAL SKILLS:
- Languages: JavaScript, TypeScript, Java, SQL, HTML5, CSS3
- Frontend: React 18, Next.js, Redux, Tailwind CSS
- Backend: Node.js, Express.js, Microservices, REST APIs
- Databases: PostgreSQL, MongoDB, Redis
- Tools & Cloud: AWS (S3, EC2), Docker, Git, CI/CD pipelines, Jest

EXPERIENCE:
Software Engineer | Tech Corp (2022 - Present)
- Designed and scaled backend APIs handling 30,000+ daily active users with sub-100ms latency.
- Migrated legacy monolith frontend to React and Next.js, boosting Core Web Vitals LCP by 45%.
- Implemented Redis caching layers reducing database query load by 60%.`);

  const [jobDescription, setJobDescription] = useState(`Senior Full Stack Engineer Role:
We are looking for a Senior Full Stack Software Engineer proficient in React, Node.js, TypeScript, PostgreSQL, and System Design.
Requirements:
- Strong mastery of JavaScript, TypeScript, React 18, and modern state management.
- Hands-on backend experience with Node.js microservices and SQL databases (PostgreSQL/MySQL).
- Understanding of System Design, caching strategies (Redis), Docker containerization, and AWS cloud deployment.
- Familiarity with CI/CD pipelines, unit testing, and Agile methodology.`);

  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      // Keyword extraction logic
      const targetKeywords = [
        "React", "Node.js", "TypeScript", "PostgreSQL", "System Design",
        "JavaScript", "Microservices", "Redis", "Docker", "AWS", "SQL",
        "REST APIs", "CI/CD", "Agile", "Testing", "Next.js", "GraphQL",
        "Kubernetes", "Git", "Redux", "Kafka"
      ];

      const resLower = resumeText.toLowerCase();
      const jdLower = jobDescription.toLowerCase();

      const requiredInJd = targetKeywords.filter(kw => jdLower.includes(kw.toLowerCase()));
      const matched = requiredInJd.filter(kw => resLower.includes(kw.toLowerCase()));
      const missing = requiredInJd.filter(kw => !resLower.includes(kw.toLowerCase()));

      const matchPercent = requiredInJd.length > 0
        ? Math.min(100, Math.round((matched.length / requiredInJd.length) * 100))
        : 85;

      setAnalysisResult({
        score: matchPercent,
        matchedKeywords: matched,
        missingKeywords: missing,
        totalRequired: requiredInJd.length,
        hasMetrics: resLower.includes('%') || resLower.includes('$') || resLower.includes('k'),
        hasContact: resLower.includes('@') && resLower.includes('email'),
        recommendations: [
          missing.length > 0 ? `Incorporate missing keywords naturally: ${missing.slice(0, 4).join(', ')}.` : 'Great keyword match coverage!',
          'Quantify achievements using metrics (e.g. "Increased speed by 35%").',
          'Ensure standard section headers (Experience, Education, Skills) are present.'
        ]
      });

      setIsAnalyzing(false);
    }, 800);
  };

  return (
    <div className="animate-fade-in">
      
      {/* Banner Header */}
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
            <FileCheck size={14} /> ATS Resume Match & Score Optimizer
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '8px 0 4px 0' }}>
            Interactive ATS Resume Scanner
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Compare your resume text directly against job descriptions to calculate keyword fit, missing tech tags, and ATS parser readiness.
          </p>
        </div>
      </div>

      {/* Inputs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginBottom: '28px' }}>
        
        {/* Left: Resume Input */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileCheck color="var(--accent-primary)" size={20} /> Candidate Resume Text
          </h3>
          <textarea
            rows={12}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your plain resume text here..."
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              fontSize: '0.85rem',
              outline: 'none',
              fontFamily: 'Fira Code, monospace',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Right: Job Description Input */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target color="var(--accent-cyan)" size={20} /> Target Job Description / Skills
          </h3>
          <textarea
            rows={12}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste target job description or requirements..."
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              fontSize: '0.85rem',
              outline: 'none',
              fontFamily: 'Fira Code, monospace',
              resize: 'vertical'
            }}
          />
        </div>

      </div>

      {/* Action Button */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <button
          className="btn-primary"
          style={{ padding: '14px 32px', fontSize: '1rem' }}
          onClick={handleRunAnalysis}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>Scanning Resume & Matching Keywords...</>
          ) : (
            <>Run ATS Match Analysis <Zap size={18} /></>
          )}
        </button>
      </div>

      {/* Analysis Results View */}
      {analysisResult && (
        <div className="glass-card animate-fade-in" style={{ padding: '32px', border: '1px solid var(--border-highlight)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '28px', alignItems: 'center', marginBottom: '32px' }}>
            
            {/* Score Ring / Card */}
            <div style={{ textAlign: 'center', background: 'var(--bg-glass)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>ATS MATCH SCORE</span>
              
              <div style={{
                fontSize: '3.2rem',
                fontWeight: 800,
                color: analysisResult.score >= 75 ? 'var(--accent-emerald)' : analysisResult.score >= 50 ? 'var(--accent-amber)' : 'var(--accent-rose)',
                margin: '8px 0'
              }}>
                {analysisResult.score}%
              </div>

              <span className={`badge ${analysisResult.score >= 75 ? 'badge-easy' : analysisResult.score >= 50 ? 'badge-medium' : 'badge-hard'}`}>
                {analysisResult.score >= 75 ? '🔥 High Match - Strong Candidate' : analysisResult.score >= 50 ? '⚡ Moderate Match - Add Keywords' : '⚠️ Low Match - Resume Needs Optimization'}
              </span>
            </div>

            {/* Keyword Summary */}
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '12px' }}>Matched Technical Keywords ({analysisResult.matchedKeywords.length})</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                {analysisResult.matchedKeywords.map((kw, i) => (
                  <span key={i} className="badge badge-easy" style={{ fontSize: '0.78rem' }}>
                    ✓ {kw}
                  </span>
                ))}
              </div>

              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '12px', color: 'var(--accent-rose)' }}>Missing Critical Keywords ({analysisResult.missingKeywords.length})</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {analysisResult.missingKeywords.length > 0 ? (
                  analysisResult.missingKeywords.map((kw, i) => (
                    <span key={i} className="badge badge-hard" style={{ fontSize: '0.78rem' }}>
                      + {kw}
                    </span>
                  ))
                ) : (
                  <span style={{ fontSize: '0.88rem', color: 'var(--accent-emerald)' }}>No major missing technical keywords detected!</span>
                )}
              </div>
            </div>

          </div>

          {/* Recommendations List */}
          <div style={{ background: 'var(--bg-glass)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles color="var(--accent-amber)" size={18} /> ATS Optimization Recommendations
            </h4>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-main)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {analysisResult.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>

        </div>
      )}

    </div>
  );
}
