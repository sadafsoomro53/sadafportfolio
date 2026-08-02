import React, { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2, Database, MessageSquare, UserCheck, Check, Save, Lock, Key, ShieldAlert, LogOut } from 'lucide-react';
import { createProject, updateProjectAPI, deleteProjectAPI, fetchContactMessages, updateProfileAPI } from '../api';

export default function AdminDrawer({ isOpen, onClose, profile, projects, onRefreshData }) {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'profile' | 'messages'

  // Admin Authentication Security State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Default Master Passcode for Sadaf Soomro
  const ADMIN_PASSCODE = 'sadaf53';

  // New/Edit Project Form State
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Full Stack',
    description: '',
    tech: '',
    github: '',
    demo: '',
    featured: false,
    image: ''
  });

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: profile?.name || '',
    title: profile?.title || '',
    tagline: profile?.tagline || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    email: profile?.email || '',
    github: profile?.github || '',
    linkedin: profile?.linkedin || ''
  });

  // Contact Messages State
  const [messages, setMessages] = useState([]);
  const [statusNotice, setStatusNotice] = useState('');

  useEffect(() => {
    if (profile) {
      setProfileForm({
        name: profile.name || '',
        title: profile.title || '',
        tagline: profile.tagline || '',
        bio: profile.bio || '',
        location: profile.location || '',
        email: profile.email || '',
        github: profile.github || '',
        linkedin: profile.linkedin || ''
      });
    }
  }, [profile]);

  useEffect(() => {
    if (isOpen && isAuthenticated && activeTab === 'messages') {
      fetchContactMessages().then(msgs => setMessages(msgs || []));
    }
  }, [isOpen, isAuthenticated, activeTab]);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSCODE) {
      sessionStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      setPasswordError('');
      setPasswordInput('');
    } else {
      setPasswordError('Access Denied: Incorrect Master Password');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
  };

  const showStatus = (msg) => {
    setStatusNotice(msg);
    setTimeout(() => setStatusNotice(''), 4000);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description) return;

    if (editingProject) {
      const res = await updateProjectAPI(editingProject.id, projectForm);
      if (res.success) {
        showStatus("Project updated in database!");
        setEditingProject(null);
        resetProjectForm();
        onRefreshData();
      }
    } else {
      const res = await createProject(projectForm);
      if (res.success) {
        showStatus("New project added to database!");
        resetProjectForm();
        onRefreshData();
      }
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project from the database?")) {
      const res = await deleteProjectAPI(id);
      if (res.success) {
        showStatus("Project removed from database.");
        onRefreshData();
      }
    }
  };

  const handleStartEdit = (proj) => {
    setEditingProject(proj);
    setProjectForm({
      title: proj.title || '',
      category: proj.category || 'Full Stack',
      description: proj.description || '',
      tech: Array.isArray(proj.tech) ? proj.tech.join(', ') : (proj.tech || ''),
      github: proj.github || '',
      demo: proj.demo || '',
      featured: proj.featured || false,
      image: proj.image || ''
    });
  };

  const resetProjectForm = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      category: 'Full Stack',
      description: '',
      tech: '',
      github: '',
      demo: '',
      featured: false,
      image: ''
    });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const res = await updateProfileAPI(profileForm);
    if (res.success) {
      showStatus("Profile details updated in database!");
      onRefreshData();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 300,
      background: 'rgba(7, 10, 15, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <div style={{
        maxWidth: '650px',
        width: '100%',
        height: '100%',
        background: '#0B0F17',
        borderLeft: '1px solid var(--primary-yellow)',
        padding: '2rem',
        overflowY: 'auto',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Database size={22} color="var(--primary-yellow)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
              Full-Stack Database Panel
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#EF4444',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
                title="Lock Database Panel"
              >
                <LogOut size={14} /> Lock Panel
              </button>
            )}
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <X size={24} />
            </button>
          </div>
        </div>

        {/* SECURITY AUTHENTICATION LOCK SCREEN */}
        {!isAuthenticated ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '70vh',
            textAlign: 'center',
            padding: '1rem'
          }}>
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'rgba(250, 204, 21, 0.1)',
              border: '2px solid var(--primary-yellow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              color: 'var(--primary-yellow)',
              boxShadow: '0 0 25px rgba(250, 204, 21, 0.3)'
            }}>
              <Lock size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
              Admin <span className="yellow-glow-text">Protected Area</span>
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '360px', marginBottom: '2rem', lineHeight: 1.5 }}>
              This database control panel is password-protected. Enter Master Password to modify projects and profile details.
            </p>

            <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '340px' }}>
              <div style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>
                  Master Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    required
                    placeholder="Enter Master Password..."
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      paddingLeft: '2.5rem',
                      borderRadius: '10px',
                      background: '#070A0F',
                      border: passwordError ? '1px solid #EF4444' : '1px solid var(--border-color)',
                      color: '#FFF',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                  <Key size={16} color="var(--primary-yellow)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
                {passwordError && (
                  <span style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <ShieldAlert size={14} /> {passwordError}
                  </span>
                )}
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}>
                Unlock Admin Panel
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Status Toast */}
            {statusNotice && (
              <div style={{
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                background: 'var(--yellow-muted)',
                border: '1px solid var(--primary-yellow)',
                color: 'var(--primary-yellow)',
                fontWeight: 600,
                fontSize: '0.85rem',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Check size={16} /> {statusNotice}
              </div>
            )}

            {/* Tab Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {[
                { id: 'projects', label: 'Projects Manager', icon: Database },
                { id: 'profile', label: 'Profile Settings', icon: UserCheck },
                { id: 'messages', label: 'Inbox Messages', icon: MessageSquare }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      padding: '0.65rem',
                      borderRadius: '10px',
                      border: isActive ? '1px solid var(--primary-yellow)' : '1px solid rgba(255, 255, 255, 0.08)',
                      background: isActive ? 'var(--primary-yellow)' : 'rgba(15, 23, 42, 0.8)',
                      color: isActive ? '#070A0F' : 'var(--text-muted)',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB 1: PROJECTS MANAGER */}
            {activeTab === 'projects' && (
              <div>
                {/* Add / Edit Form */}
                <form onSubmit={handleSaveProject} className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary-yellow)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Plus size={18} /> {editingProject ? 'Edit Project Details' : 'Add New Project to Database'}
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Project Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. AI Financial Bot"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', background: '#070A0F', border: '1px solid var(--border-color)', color: '#FFF' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Category</label>
                      <select
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                        style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', background: '#070A0F', border: '1px solid var(--border-color)', color: '#FFF' }}
                      >
                        <option value="Full Stack">Full Stack</option>
                        <option value="AI / ML">AI / ML</option>
                        <option value="Web Apps">Web Apps</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Description *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Short explanation of features..."
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', background: '#070A0F', border: '1px solid var(--border-color)', color: '#FFF', resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Technologies (Comma separated)</label>
                    <input
                      type="text"
                      placeholder="React, Python, PyTorch, Node.js"
                      value={projectForm.tech}
                      onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', background: '#070A0F', border: '1px solid var(--border-color)', color: '#FFF' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>GitHub URL</label>
                      <input
                        type="url"
                        placeholder="https://github.com/..."
                        value={projectForm.github}
                        onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                        style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', background: '#070A0F', border: '1px solid var(--border-color)', color: '#FFF' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Demo URL</label>
                      <input
                        type="url"
                        placeholder="https://example.com"
                        value={projectForm.demo}
                        onChange={(e) => setProjectForm({ ...projectForm, demo: e.target.value })}
                        style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', background: '#070A0F', border: '1px solid var(--border-color)', color: '#FFF' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button type="submit" className="btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
                      <Save size={16} /> Save Project
                    </button>
                    {editingProject && (
                      <button type="button" onClick={resetProjectForm} className="btn-outline" style={{ padding: '0.6rem 1rem' }}>
                        Cancel
                      </button>
                    )}
                  </div>
                </form>

                {/* List of existing projects */}
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-muted)' }}>
                  Current Projects in Database ({projects ? projects.length : 0})
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {projects && projects.map((p) => (
                    <div key={p.id} style={{
                      padding: '1rem',
                      borderRadius: '10px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{p.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--primary-yellow)' }}>{p.category}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => handleStartEdit(p)} style={{ background: 'none', border: 'none', color: 'var(--primary-yellow)', cursor: 'pointer' }}>
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDeleteProject(p.id)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: PROFILE SETTINGS */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="glass-card" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary-yellow)' }}>
                  Update Portfolio Personal Profile
                </h4>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', background: '#070A0F', border: '1px solid var(--border-color)', color: '#FFF' }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Title / Profession</label>
                  <input
                    type="text"
                    value={profileForm.title}
                    onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', background: '#070A0F', border: '1px solid var(--border-color)', color: '#FFF' }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Bio / About Me</label>
                  <textarea
                    rows={4}
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', background: '#070A0F', border: '1px solid var(--border-color)', color: '#FFF' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', background: '#070A0F', border: '1px solid var(--border-color)', color: '#FFF' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Location</label>
                    <input
                      type="text"
                      value={profileForm.location}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', background: '#070A0F', border: '1px solid var(--border-color)', color: '#FFF' }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
                  <Save size={18} /> Update Profile in Database
                </button>
              </form>
            )}

            {/* TAB 3: CONTACT MESSAGES */}
            {activeTab === 'messages' && (
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary-yellow)' }}>
                  Received Contact Form Messages ({messages.length})
                </h4>
                {messages.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No messages stored in database yet.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {messages.map((m) => (
                      <div key={m.id} className="glass-card" style={{ padding: '1.25rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span style={{ fontWeight: 700, color: 'var(--primary-yellow)' }}>{m.name}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>{new Date(m.timestamp).toLocaleString()}</span>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                          <strong>Email:</strong> {m.email} | <strong>Subject:</strong> {m.subject}
                        </div>
                        <p style={{ fontSize: '0.9rem', lineHeight: 1.5, background: 'rgba(7, 10, 15, 0.8)', padding: '0.75rem', borderRadius: '8px' }}>
                          {m.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
