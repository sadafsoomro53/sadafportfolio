import React from 'react';
import { Terminal, Heart, ArrowUp } from 'lucide-react';

export default function Footer({ profile }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      padding: '4rem 1.5rem 2rem',
      borderTop: '1px solid rgba(250, 204, 21, 0.15)',
      background: 'rgba(7, 10, 15, 0.95)',
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'var(--primary-yellow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#070A0F',
            fontWeight: 800
          }}>
            <Terminal size={18} />
          </div>
          <span style={{ fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
            DEV<span style={{ color: 'var(--primary-yellow)' }}>.AI</span>
          </span>
        </div>

        {/* Copy Text */}
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} {profile?.name || 'Full-Stack & AI Engineer'}. All rights reserved. Crafted with Obsidian Dark & Electric Yellow.
        </div>

        {/* Scroll To Top */}
        <button
          onClick={scrollToTop}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'var(--yellow-muted)',
            border: '1px solid var(--border-color)',
            color: 'var(--primary-yellow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'var(--transition-fast)'
          }}
          title="Back to Top"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </footer>
  );
}
