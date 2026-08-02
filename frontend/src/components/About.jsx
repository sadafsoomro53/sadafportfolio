import React from 'react';
import { Server, Layout, BrainCircuit, Zap, CheckCircle2 } from 'lucide-react';

export default function About({ profile }) {
  const pillars = [
    {
      icon: Layout,
      title: "Frontend Engineering",
      desc: "Pixel-perfect modern UIs with React, Next.js, and TypeScript. Styled with high-contrast Obsidian dark aesthetics, custom CSS variables, and fluid micro-animations."
    },
    {
      icon: Server,
      title: "Backend & Database",
      desc: "Robust RESTful & GraphQL microservices powered by Node.js, Express, Python FastAPI, and optimized SQL & NoSQL persistent database architectures."
    },
    {
      icon: BrainCircuit,
      title: "Artificial Intelligence",
      desc: "Autonomous multi-agent LLM systems, custom PyTorch neural networks, semantic vector search integration (Pinecone/Chroma), and real-time inference pipelines."
    }
  ];

  return (
    <section id="about" style={{ padding: '6rem 1.5rem', position: 'relative' }}>
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
            SYSTEM ARCHITECTURE & SPECIALIZATION
          </span>
          <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
            About <span className="yellow-glow-text">My Work</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Bridging complex artificial intelligence models with intuitive, high-performance web frontends and rock-solid backend infrastructure.
          </p>
        </div>

        {/* 3 Pillar Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div key={i} className="glass-card" style={{ padding: '2.25rem' }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '14px',
                  background: 'var(--yellow-muted)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-yellow)',
                  marginBottom: '1.5rem'
                }}>
                  <Icon size={28} />
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
                  {pillar.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Highlights List */}
        <div className="glass-card" style={{
          marginTop: '3rem',
          padding: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          borderColor: 'rgba(250, 204, 21, 0.2)'
        }}>
          {[
            "Full-Stack End-to-End Ownership",
            "Real-time WebSocket Data Push",
            "AI Agent & RAG Architecture",
            "Production Database Persistence"
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CheckCircle2 size={20} color="var(--primary-yellow)" />
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
