import React from 'react';
import { Code2, Server, Brain, Cloud, Terminal } from 'lucide-react';

export default function Skills({ skills }) {
  const categoryIcons = {
    "Frontend Development": Code2,
    "Backend & APIs": Server,
    "Artificial Intelligence & ML": Brain,
    "Databases & Cloud": Cloud
  };

  const defaultSkills = [
    { category: "Frontend Development", items: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "TailwindCSS", "CSS3 / HTML5", "Redux Toolkit", "Vite"] },
    { category: "Backend & APIs", items: ["Node.js", "Express.js", "Python", "FastAPI", "Django", "REST APIs", "GraphQL", "WebSockets"] },
    { category: "Artificial Intelligence & ML", items: ["PyTorch", "TensorFlow", "LangChain", "OpenAI APIs", "Hugging Face", "Pinecone Vector DB", "Computer Vision", "NLP"] },
    { category: "Databases & Cloud", items: ["PostgreSQL", "MongoDB", "SQLite", "Redis", "Docker", "AWS", "Vercel", "Git / GitHub"] }
  ];

  const displaySkills = skills && skills.length > 0 ? skills : defaultSkills;

  return (
    <section id="skills" style={{ padding: '6rem 1.5rem', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{
            color: 'var(--primary-yellow)',
            fontWeight: 700,
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            TECH STACK & TOOLKIT
          </span>
          <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
            Technical <span className="yellow-glow-text">Proficiencies</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Comprehensive list of languages, frameworks, AI libraries, and cloud databases I utilize to build modern software.
          </p>
        </div>

        {/* Skills Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {displaySkills.map((catGroup, idx) => {
            const Icon = categoryIcons[catGroup.category] || Terminal;
            return (
              <div key={idx} className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'var(--yellow-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary-yellow)'
                  }}>
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                    {catGroup.category}
                  </h3>
                </div>

                {/* Tech Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {catGroup.items.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        padding: '0.4rem 0.85rem',
                        borderRadius: '8px',
                        background: 'rgba(15, 23, 42, 0.9)',
                        border: '1px solid rgba(250, 204, 21, 0.18)',
                        color: 'var(--text-main)',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        transition: 'var(--transition-fast)'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.borderColor = 'var(--primary-yellow)';
                        e.target.style.color = 'var(--primary-yellow)';
                        e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.borderColor = 'rgba(250, 204, 21, 0.18)';
                        e.target.style.color = 'var(--text-main)';
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
