const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'data', 'portfolio_db.json');

// Real Data for Sadaf Soomro
const sadafData = {
  profile: {
    name: "Sadaf Soomro",
    title: "Computer Science Student | Frontend Developer & AI Enthusiast",
    tagline: "Specializing in Python, Artificial Intelligence, & Modern Web Applications",
    bio: "I am a Computer Science student currently learning Python with a strong passion for Artificial Intelligence. Along with AI & Machine Learning, I build hands-on, responsive Frontend & Web Applications.",
    location: "Pakistan (Available for Web & AI Projects)",
    email: "sadafsoomro53@gmail.com",
    github: "https://github.com/sadafsoomro53",
    linkedin: "https://www.linkedin.com/in/sadaf-soomro-2b519b268/",
    twitter: "https://github.com/sadafsoomro53",
    avatar: "https://avatars.githubusercontent.com/u/157893042?v=4",
    resumeUrl: "#"
  },
  skills: [
    { category: "Frontend Development", items: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Responsive UI", "Bootstrap / Tailwind"] },
    { category: "Python & AI / ML", items: ["Python", "Jupyter Notebook", "Machine Learning", "NLP / Medical Chatbot", "Algorithm Logic", "Automation"] },
    { category: "Web Applications & Backend", items: ["Node.js", "Express.js", "REST APIs", "Admin Dashboards", "Vendor Portals", "SQLite / JSON DB"] },
    { category: "Tools & Technologies", items: ["Git", "GitHub", "VS Code", "Vercel", "Vite", "npm"] }
  ],
  projects: [
    {
      id: "1",
      title: "Libro Admin WebApp",
      description: "An admin view web application designed to streamline bookstore operations featuring vendor management, book inventory control, user management, notifications, and transaction tracking.",
      category: "Web Apps",
      tech: ["JavaScript", "React", "Admin UI", "HTML5", "CSS3"],
      github: "https://github.com/sadafsoomro53/Libro-Admin-WebApp",
      demo: "https://github.com/sadafsoomro53/Libro-Admin-WebApp",
      featured: true,
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "2",
      title: "AI Medical Chatbot",
      description: "An intelligent healthcare chatbot developed using Python, Machine Learning, and NLP in Jupyter Notebook for quick medical query resolution and diagnostic guidance.",
      category: "AI / ML",
      tech: ["Python", "Jupyter Notebook", "NLP", "Machine Learning", "AI"],
      github: "https://github.com/sadafsoomro53/MedicalChatbot",
      demo: "https://github.com/sadafsoomro53/MedicalChatbot",
      featured: true,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "3",
      title: "Vendor Web Application",
      description: "Full-stack web application designed for vendor catalog management, product updates, inventory tracking, and order workflows.",
      category: "Full Stack",
      tech: ["JavaScript", "Node.js", "Express.js", "HTML/CSS"],
      github: "https://github.com/sadafsoomro53/vendor-webapp",
      demo: "https://github.com/sadafsoomro53/vendor-webapp",
      featured: true,
      image: "https://images.unsplash.com/photo-1556742049-0a67bf600451?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "4",
      title: "Netbryx Web Portal",
      description: "Modern, fully responsive corporate web frontend built for Netbryx with dynamic layout components and smooth scrolling.",
      category: "Web Apps",
      tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      github: "https://github.com/sadafsoomro53/NetbryxWeb",
      demo: "https://github.com/sadafsoomro53/NetbryxWeb",
      featured: false,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "5",
      title: "Sensor Light Automation Script",
      description: "Hardware simulation and IoT automation logic in Python for light sensor triggers, state control, and automated switching.",
      category: "Full Stack",
      tech: ["Python", "Automation", "IoT Simulation"],
      github: "https://github.com/sadafsoomro53/Sensor-Light-turn-on-off",
      demo: "https://github.com/sadafsoomro53/Sensor-Light-turn-on-off",
      featured: false,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "6",
      title: "TicTacToe Interactive Python Game",
      description: "A classic TicTacToe game implementation in Python featuring game loop mechanics, win-state validation, and interactive gameplay.",
      category: "AI / ML",
      tech: ["Python", "Game Logic", "Algorithms"],
      github: "https://github.com/sadafsoomro53/TicTacToe",
      demo: "https://github.com/sadafsoomro53/TicTacToe",
      featured: false,
      image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?q=80&w=1000&auto=format&fit=crop"
    }
  ],
  experience: [
    {
      id: "1",
      role: "Computer Science Degree Student & Developer",
      company: "Computer Science Department",
      period: "Present",
      description: "Studying Core Computer Science concepts, Python programming, Machine Learning fundamentals, and hands-on Web Development."
    },
    {
      id: "2",
      role: "Frontend Web Developer (Projects & Open Source)",
      company: "Independent / GitHub Projects",
      period: "2023 - Present",
      description: "Built 26+ GitHub repositories including Libro Admin WebApp, Netbryx Web Portal, Vendor Management WebApp, and responsive UIs."
    },
    {
      id: "3",
      role: "Python & Artificial Intelligence Developer",
      company: "AI & ML Development",
      period: "2023 - Present",
      description: "Developing intelligent Python tools such as AI Medical Chatbot (Jupyter Notebook / NLP) and IoT Automation scripts."
    }
  ],
  contactMessages: []
};

// Ensure data directory exists
const dir = path.dirname(DB_FILE);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Write / update data file
fs.writeFileSync(DB_FILE, JSON.stringify(sadafData, null, 2), 'utf-8');

const getDB = () => {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading database:", err);
    return sadafData;
  }
};

const saveDB = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error("Error writing to database:", err);
    return false;
  }
};

module.exports = {
  getDB,
  saveDB
};
