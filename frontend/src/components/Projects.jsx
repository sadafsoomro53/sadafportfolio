import React, { useState } from 'react';
import { ExternalLink, Github, Search, Eye, Filter, Sparkles } from 'lucide-react';

export default function Projects({ projects, onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Full Stack', 'AI / ML', 'Web Apps'];

  const filteredProjects = (projects || []).filter(project => {
    const matchesCategory = activeCategory === 'All' || project.category.toLowerCase() === activeCategory.toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      (project.tech && project.tech.some(t => t.toLowerCase().includes(q)));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" style={{ padding: '6rem 1.5rem', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{
            color: 'var(--primary-yellow)',
            fontWeight: 700,
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            PORTFOLIO SHOWCASE
          </span>
          <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
            Featured <span className="yellow-glow-text">Projects</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Explore full-stack web applications, AI multi-agent systems, and machine learning software solutions.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          marginBottom: '3rem',
          padding: '1.25rem',
          background: 'rgba(15, 23, 42, 0.6)',
          borderRadius: '16px',
          border: '1px solid var(--border-color)'
        }}>
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '10px',
                  border: activeCategory === cat ? '1px solid var(--primary-yellow)' : '1px solid transparent',
                  background: activeCategory === cat ? 'var(--primary-yellow)' : 'transparent',
                  color: activeCategory === cat ? '#070A0F' : 'var(--text-muted)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '10px',
            background: 'rgba(7, 10, 15, 0.8)',
            border: '1px solid var(--border-color)',
            width: '100%',
            maxWidth: '300px'
          }}>
            <Search size={18} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search projects or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-main)',
                fontSize: '0.9rem',
                width: '100%'
              }}
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: 'var(--text-muted)'
          }}>
            <Filter size={40} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p style={{ fontSize: '1.1rem' }}>No projects match your filter query.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2rem'
          }}>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                {/* Image & Overlay */}
                <div style={{
                  height: '200px',
                  width: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  background: '#0E1526'
                }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />

                  {/* Category Pill Tag */}
                  <span style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '8px',
                    background: 'rgba(7, 10, 15, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(250, 204, 21, 0.3)',
                    color: 'var(--primary-yellow)',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}>
                    {project.category}
                  </span>

                  {project.featured && (
                    <span style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #FACC15, #F59E0B)',
                      color: '#070A0F',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}>
                      <Sparkles size={12} /> Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    marginBottom: '0.6rem',
                    fontFamily: 'var(--font-heading)',
                    lineHeight: 1.3
                  }}>
                    {project.title}
                  </h3>

                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    marginBottom: '1.25rem',
                    flexGrow: 1
                  }}>
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.4rem',
                    marginBottom: '1.5rem'
                  }}>
                    {project.tech && project.tech.map((t, idx) => (
                      <span key={idx} className="tag-pill">{t}</span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                  }}>
                    <button
                      onClick={() => onSelectProject(project)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--primary-yellow)',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                      }}
                    >
                      <Eye size={16} /> Details
                    </button>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: 'var(--text-muted)', transition: 'var(--transition-fast)' }}
                          onMouseEnter={(e) => e.target.style.color = 'var(--primary-yellow)'}
                          onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                          title="View Source Code"
                        >
                          <Github size={18} />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: 'var(--text-muted)', transition: 'var(--transition-fast)' }}
                          onMouseEnter={(e) => e.target.style.color = 'var(--primary-yellow)'}
                          onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                          title="Live Demo Preview"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Repos on GitHub CTA */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <a
            href="https://github.com/sadafsoomro53?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="btn-glow"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.85rem 2rem',
              fontSize: '1rem',
              borderRadius: '12px',
              textDecoration: 'none'
            }}
          >
            <Github size={20} />
            Explore All 27+ Public Repositories on GitHub
          </a>
        </div>

      </div>
    </section>
  );
}
