import React from 'react';
import { ArrowRight, Github, Linkedin, Mail, Download, Sparkles, Code, Cpu, Database } from 'lucide-react';

export default function Hero({ profile }) {
  const stats = [
    { label: 'GitHub Repositories', value: '26+', icon: Code },
    { label: 'AI & Python Apps', value: '6+', icon: Cpu },
    { label: 'Web Applications', value: '10+', icon: Database },
  ];

  const avatarUrl = profile?.avatar || "https://avatars.githubusercontent.com/u/157893042?v=4";

  return (
    <section style={{
      minHeight: '100vh',
      paddingTop: '8rem',
      paddingBottom: '4rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '3rem',
        alignItems: 'center'
      }}>
        {/* Left Column Text */}
        <div>
          {/* Status Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '30px',
            background: 'var(--yellow-muted)',
            border: '1px solid var(--border-color)',
            color: 'var(--primary-yellow)',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1.5rem'
          }}>
            <Sparkles size={16} />
            <span>AVAILABLE FOR FRONTEND & AI PROJECTS</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '1.25rem',
            fontFamily: 'var(--font-heading)'
          }}>
            Hi, I'm <span className="yellow-glow-text">{profile?.name || "Sadaf Soomro"}</span> 👋<br/>
            Building <span className="gradient-text">Frontend Apps & AI Tools</span>
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-muted)',
            marginBottom: '2rem',
            maxWidth: '620px',
            lineHeight: 1.7
          }}>
            {profile?.bio || "I’m a Computer Science Student currently learning Python with a strong interest in Artificial Intelligence. Along with AI, I build hands-on, responsive Frontend & Web Applications."}
          </p>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '3rem'
          }}>
            <a href="#projects" className="btn-primary">
              <span>View My Projects</span>
              <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn-outline">
              <Mail size={18} />
              <span>Get In Touch</span>
            </a>
          </div>

          {/* Stats Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-yellow)', marginBottom: '0.2rem' }}>
                    <Icon size={18} />
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>{stat.value}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column Profile Picture Card & Code Card */}
        <div style={{ position: 'relative' }}>
          {/* Ambient Glow Behind Profile Picture */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '320px',
            height: '320px',
            background: 'radial-gradient(circle, rgba(250, 204, 21, 0.3) 0%, transparent 70%)',
            filter: 'blur(50px)',
            zIndex: 0
          }} />

          {/* Profile Card Container */}
          <div className="glass-card animate-float" style={{
            position: 'relative',
            zIndex: 1,
            padding: '2rem',
            borderColor: 'rgba(250, 204, 21, 0.4)',
            textAlign: 'center'
          }}>
            {/* Avatar Frame */}
            <div style={{
              width: '140px',
              height: '140px',
              margin: '0 auto 1.5rem',
              borderRadius: '50%',
              padding: '4px',
              background: 'linear-gradient(135deg, #FACC15, #F59E0B)',
              boxShadow: '0 0 25px rgba(250, 204, 21, 0.5)'
            }}>
              <img
                src={avatarUrl}
                alt={profile?.name || "Sadaf Soomro"}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.2rem', fontFamily: 'var(--font-heading)' }}>
              {profile?.name || "Sadaf Soomro"}
            </h3>

            <p style={{ fontSize: '0.85rem', color: 'var(--primary-yellow)', fontWeight: 600, marginBottom: '1rem' }}>
              CS Student | Python & AI Enthusiast
            </p>

            {/* Terminal snippet */}
            <div style={{
              background: 'rgba(7, 10, 15, 0.9)',
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid rgba(250, 204, 21, 0.15)',
              textAlign: 'left',
              fontFamily: 'var(--font-code)',
              fontSize: '0.8rem',
              color: '#E2E8F0',
              marginBottom: '1.5rem'
            }}>
              <div><span style={{ color: '#FACC15' }}>const</span> developer = &#123;</div>
              <div>&nbsp;&nbsp;name: <span style={{ color: '#38BDF8' }}>"Sadaf Soomro"</span>,</div>
              <div>&nbsp;&nbsp;role: <span style={{ color: '#38BDF8' }}>"Frontend & AI Developer"</span>,</div>
              <div>&nbsp;&nbsp;skills: [<span style={{ color: '#4ADE80' }}>"Python"</span>, <span style={{ color: '#4ADE80' }}>"AI/ML"</span>, <span style={{ color: '#4ADE80' }}>"React"</span>]</div>
              <div>&#125;;</div>
            </div>

            {/* Quick Links */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem'
            }}>
              <a
                href={profile?.github || "https://github.com/sadafsoomro53"}
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              >
                <Github size={16} /> GitHub Profile
              </a>
              <a
                href={profile?.linkedin || "https://www.linkedin.com/in/sadaf-soomro-2b519b268/"}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
