import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, Github, Linkedin, MessageSquare } from 'lucide-react';
import { sendContactMessage } from '../api';

export default function Contact({ profile }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await sendContactMessage(formData);
      if (res.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMsg(res.message || 'Failed to submit message.');
      }
    } catch (err) {
      setErrorMsg('Error connecting to backend database server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ padding: '6rem 1.5rem', position: 'relative' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{
            color: 'var(--primary-yellow)',
            fontWeight: 700,
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            GET IN TOUCH
          </span>
          <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
            Let's Build Something <span className="yellow-glow-text">Extraordinary</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Have a project in mind, need a full-stack web application, or want to discuss AI integration? Send a direct message!
          </p>
        </div>

        {/* Form & Info Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '0.9fr 1.1fr',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          {/* Contact Details Card */}
          <div className="glass-card" style={{ padding: '2.25rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem', fontFamily: 'var(--font-heading)' }}>
              Contact Information
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Feel free to reach out via email or social networks. Messages submitted here are stored directly in the local backend database!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'var(--yellow-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-yellow)'
                }}>
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Direct Email</div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{profile?.email || 'developer@example.com'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'var(--yellow-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-yellow)'
                }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Location</div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{profile?.location || 'Lahore, Pakistan'}</div>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div style={{
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              gap: '1rem'
            }}>
              <a href={profile?.github || "#"} target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: '0.6rem 1rem' }}>
                <Github size={18} /> GitHub
              </a>
              <a href={profile?.linkedin || "#"} target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: '0.6rem 1rem' }}>
                <Linkedin size={18} /> LinkedIn
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card" style={{ padding: '2.25rem', borderColor: 'rgba(250, 204, 21, 0.3)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <CheckCircle2 size={56} color="var(--primary-yellow)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Message Received!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  Your message has been saved into the database. I will get back to you shortly!
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-outline">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {errorMsg && (
                  <div style={{
                    padding: '0.75rem',
                    borderRadius: '8px',
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid #EF4444',
                    color: '#EF4444',
                    fontSize: '0.85rem'
                  }}>
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: '10px',
                      background: 'rgba(7, 10, 15, 0.8)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Your Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: '10px',
                      background: 'rgba(7, 10, 15, 0.8)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Subject</label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Job Opportunity"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: '10px',
                      background: 'rgba(7, 10, 15, 0.8)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your project, timeline, or requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: '10px',
                      background: 'rgba(7, 10, 15, 0.8)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button type="submit" className="btn-primary" disabled={loading} style={{ justifyContent: 'center' }}>
                  <Send size={18} />
                  <span>{loading ? 'Submitting to Database...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
