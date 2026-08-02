import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModal';
import AIShowcase from './components/AIShowcase';
import Experience from './components/Experience';
import Contact from './components/Contact';
import AdminDrawer from './components/AdminDrawer';
import Footer from './components/Footer';
import { fetchPortfolioData } from './api';
import { fallbackData } from './data/portfolioData';

export default function App() {
  const [data, setData] = useState(fallbackData);
  const [selectedProject, setSelectedProject] = useState(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const resData = await fetchPortfolioData();
      if (resData && resData.projects && resData.projects.length > 0) {
        setData(resData);
      } else {
        setData(fallbackData);
      }
    } catch (err) {
      console.warn("Using static fallback portfolio data.", err);
      setData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Background Glow Mesh & Grid */}
      <div className="bg-mesh" />
      <div className="bg-grid" />

      {/* Navigation Bar */}
      <Navbar onOpenAdmin={() => setAdminOpen(true)} />

      {/* Hero Header */}
      <Hero profile={data.profile} />

      {/* About Section */}
      <About profile={data.profile} />

      {/* Skills Matrix */}
      <Skills skills={data.skills} />

      {/* Filterable Projects Showcase */}
      <Projects
        projects={data.projects && data.projects.length > 0 ? data.projects : fallbackData.projects}
        onSelectProject={(proj) => setSelectedProject(proj)}
      />

      {/* Interactive AI Lab Endpoint */}
      <AIShowcase />

      {/* Experience & Career Timeline */}
      <Experience experience={data.experience && data.experience.length > 0 ? data.experience : fallbackData.experience} />

      {/* Persistent Contact Section */}
      <Contact profile={data.profile} />

      {/* Footer */}
      <Footer profile={data.profile} />

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Admin / Database Control Drawer */}
      <AdminDrawer
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        profile={data.profile}
        projects={data.projects}
        onRefreshData={loadData}
      />
    </div>
  );
}
