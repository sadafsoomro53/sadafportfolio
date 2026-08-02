import React from 'react';
import { Briefcase, Calendar, Building, GraduationCap } from 'lucide-react';

export default function Experience({ experience }) {
  const defaultExperience = [
    {
      id: "1",
      role: "Senior Full-Stack & AI Developer",
      company: "InnovateTech Solutions",
      period: "2024 - Present",
      description: "Architecting enterprise AI microservices, LLM multi-agent workflows, and high-performance React web interfaces."
    },
    {
      id: "2",
      role: "Full-Stack Web Developer",
      company: "CyberPulse Studio",
      period: "2022 - 2024",
      description: "Developed over 15+ web applications, RESTful APIs, and cloud database integrations with high client satisfaction."
    },
    {
      id: "3",
      role: "AI & Machine Learning Engineer Intern",
      company: "DataMind AI Lab",
      period: "2021 - 2022",
      description: "Trained neural network models for NLP document extraction and integrated predictions into web frontends."
    }
  ];

  const list = experience && experience.length > 0 ? experience : defaultExperience;

  return (
    <section id="experience" style={{ padding: '6rem 1.5rem', position: 'relative' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{
            color: 'var(--primary-yellow)',
            fontWeight: 700,
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            CAREER & MILESTONES
          </span>
          <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
            Work <span className="yellow-glow-text">Experience</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A track record of engineering scalable full-stack applications and deploying machine learning solutions.
          </p>
        </div>

        {/* Timeline */}
        <div style={{
          position: 'relative',
          paddingLeft: '2rem',
          borderLeft: '2px solid rgba(250, 204, 21, 0.2)'
        }}>
          {list.map((item, idx) => (
            <div key={item.id || idx} style={{ marginBottom: '3rem', position: 'relative' }}>
              
              {/* Timeline Marker Dot */}
              <div style={{
                position: 'absolute',
                left: '-2.6rem',
                top: '0.2rem',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#070A0F',
                border: '3px solid var(--primary-yellow)',
                boxShadow: '0 0 12px var(--yellow-glow)'
              }} />

              {/* Card */}
              <div className="glass-card" style={{ padding: '1.75rem' }}>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  marginBottom: '0.75rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Briefcase size={20} color="var(--primary-yellow)" />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                      {item.role}
                    </h3>
                  </div>

                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.85rem',
                    color: 'var(--primary-yellow)',
                    fontWeight: 600,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    background: 'var(--yellow-muted)'
                  }}>
                    <Calendar size={14} />
                    {item.period}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'var(--text-muted)',
                  fontSize: '0.95rem',
                  marginBottom: '1rem',
                  fontWeight: 600
                }}>
                  <Building size={16} />
                  <span>{item.company}</span>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
