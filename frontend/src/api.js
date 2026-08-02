const API_BASE = '/api';

export const fetchPortfolioData = async () => {
  try {
    const res = await fetch(`${API_BASE}/portfolio`);
    if (!res.ok) throw new Error('API server unavailable');
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.warn("Backend API offline or connecting... using active state.", err);
    return null;
  }
};

export const fetchProjects = async (category = 'All', search = '') => {
  try {
    const res = await fetch(`${API_BASE}/projects?category=${encodeURIComponent(category)}&search=${encodeURIComponent(search)}`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error("Error fetching projects:", err);
    return [];
  }
};

export const createProject = async (projectData) => {
  const res = await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectData)
  });
  return await res.json();
};

export const updateProjectAPI = async (id, projectData) => {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectData)
  });
  return await res.json();
};

export const deleteProjectAPI = async (id) => {
  const res = await fetch(`${API_BASE}/projects/${id}`, { method: 'DELETE' });
  return await res.json();
};

export const sendContactMessage = async (formData) => {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  return await res.json();
};

export const fetchContactMessages = async () => {
  try {
    const res = await fetch(`${API_BASE}/contact`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    return [];
  }
};

export const sendAIChatQuery = async (prompt) => {
  try {
    const res = await fetch(`${API_BASE}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    return await res.json();
  } catch (err) {
    return { success: false, reply: "Unable to reach AI backend endpoint. Please ensure Node server is running." };
  }
};

export const updateProfileAPI = async (profileData) => {
  const res = await fetch(`${API_BASE}/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profileData)
  });
  return await res.json();
};
