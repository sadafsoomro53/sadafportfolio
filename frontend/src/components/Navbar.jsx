import React, { useState, useEffect } from 'react';
import { Terminal, Code2, Cpu, User, Mail, Settings, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenAdmin }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'AI Lab', href: '#ai-lab' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: scrolled ? '0.75rem 2rem' : '1.25rem 2rem',
      background: scrolled ? 'rgba(7, 10, 15, 0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(250, 204, 21, 0.15)' : 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <a href="#" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          textDecoration: 'none',
          color: 'var(--text-main)',
          fontSize: '1.25rem',
          fontWeight: 800,
          fontFamily: 'var(--font-heading)'
        }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #FACC15, #F59E0B)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#070A0F',
            boxShadow: '0 0 15px rgba(250, 204, 21, 0.4)'
          }}>
            <Terminal size={22} strokeWidth={2.5} />
          </div>
          <span>DEV<span style={{ color: 'var(--primary-yellow)' }}>.AI</span></span>
        </a>

        {/* Desktop Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.75rem',
          '@media (max-width: 768px)': { display: 'none' }
        }} className="desktop-links">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--primary-yellow)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
            >
              {link.name}
            </a>
          ))}

          {/* Database Admin Drawer Trigger */}
          <button
            onClick={onOpenAdmin}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              background: 'rgba(250, 204, 21, 0.1)',
              border: '1px solid rgba(250, 204, 21, 0.3)',
              color: 'var(--primary-yellow)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'var(--transition-fast)'
            }}
            title="Open Full-Stack Database & Admin Panel"
          >
            <Settings size={15} />
            <span>Admin / Database</span>
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--primary-yellow)',
            cursor: 'pointer',
            display: 'none',
            '@media (max-width: 768px)': { display: 'block' }
          }}
          className="mobile-toggle"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: 'rgba(14, 21, 38, 0.95)',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                color: 'var(--text-main)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500
              }}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => { setMobileOpen(false); onOpenAdmin(); }}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <Settings size={16} /> Admin Database Manager
          </button>
        </div>
      )}
    </nav>
  );
}
