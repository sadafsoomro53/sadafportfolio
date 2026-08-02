import React from 'react';
import { X, ExternalLink, Github, Sparkles, Layers, CheckCircle } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 200,
      background: 'rgba(7, 10, 15, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="glass-card" style={{
        maxWidth: '700px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        padding: '2rem',
        borderColor: 'var(--primary-yellow)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(250, 204, 21, 0.1)',
            border: '1px solid rgba(250, 204, 21, 0.3)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            color: 'var(--primary-yellow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Project Image */}
        <div style={{
          width: '100%',
          height: '240px',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '1.5rem',
          position: 'relative'
        }}>
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span className="tag-pill">{project.category}</span>
          {project.featured && (
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-yellow)', display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 600 }}>
              <Sparkles size={14} /> Featured Project
            </span>
          )}
        </div>

        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
          {project.title}
        </h2>

        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          {project.description}
        </p>

        {/* Tech Stack Breakdown */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Layers size={16} color="var(--primary-yellow)" /> Architecture & Technologies Used:
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.tech && project.tech.map((t, idx) => (
              <span
                key={idx}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '8px',
                  background: 'rgba(250, 204, 21, 0.1)',
                  border: '1px solid rgba(250, 204, 21, 0.25)',
                  color: 'var(--primary-yellow)',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Database Status Indicator */}
        <div style={{
          padding: '1rem',
          borderRadius: '10px',
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <CheckCircle size={16} color="var(--primary-yellow)" />
          <span>Stored persistently in SQLite Database & Node.js Express REST API.</span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="btn-primary">
              <span>Live Demo</span>
              <ExternalLink size={18} />
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="btn-outline">
              <Github size={18} />
              <span>Source Code</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
