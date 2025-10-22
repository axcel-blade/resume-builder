export const defaultData = {
  meta: { template: "modern", accent: "#0ea5e9" },

  profile: {
    fullName: "Jane Doe",
    title: "Software Engineer",
    email: "jane.doe@example.com",
    phone: "+61 400 000 000",
    location: "Perth, WA",
    website: "janedoe.dev",
    summary:
      "Curious and passionate engineer with over 5 years of experience in full-stack development. Skilled in designing clean user interfaces, building robust APIs, and mentoring junior developers. Dedicated to delivering impactful products through scalable architecture and elegant UX.",
  },

  links: [
    { id: "1", label: "LinkedIn", url: "linkedin.com/in/janedoe" },
    { id: "2", label: "GitHub", url: "github.com/janedoe" },
    { id: "3", label: "Portfolio", url: "janedoe.dev/portfolio" },
  ],

  skills: {
    hard: ["Programming", "Data Analysis", "UI Design", "Project Management"],
    soft: ["Communication", "Teamwork", "Leadership", "Adaptability"],
    transferable: ["Problem Solving", "Organization", "Time Management"],
    technical: ["React.js", "Node.js", "Docker", "AWS", "TypeScript"],
  },

  experience: [
    {
      id: "exp1",
      role: "Senior Software Engineer",
      company: "TechNova Solutions",
      location: "Perth, WA",
      start: "2022-01",
      end: "Present",
      bullets: [
        "Lead a team of 5 engineers to build a multi-tenant SaaS platform for analytics dashboards.",
        "Migrated legacy Node.js services to modern TypeScript microservices architecture.",
        "Implemented CI/CD pipelines using GitHub Actions and Docker, reducing deployment time by 40%.",
      ],
    },
  ],

  education: [
    {
      id: "edu1",
      degree: "Bachelor of Science in Computer Science",
      school: "Curtin University",
      location: "Perth, WA",
      start: "2015-02",
      end: "2018-11",
      bullets: ["Graduated with First-Class Honours."],
    },
  ],

  projects: [
    {
      id: "proj1",
      title: "SmartBudget – Personal Finance Tracker",
      organization: "Personal Project",
      start: "2023-06",
      end: "2024-02",
      bullets: [
        "Developed a full-stack web app to manage budgets, expenses, and savings goals.",
        "Built RESTful APIs with Node.js and Express for secure transaction management.",
      ],
    },
  ],

  achievements: [
    {
      id: "ach1",
      title: "Winner – National Hackathon 2023",
      organization: "CSIRO Innovation Hub",
      year: "2023",
      bullets: [
        "Developed an AI-powered chatbot for mental health awareness in under 24 hours.",
        "Won the competition among 200+ participants nationwide.",
      ],
    },
  ],
};