export const defaultData = {
  meta: { template: "modern", accent: "#0ea5e9" },
  profile: {
    fullName: "Alex Carter",
    title: "Full-Stack Developer | Cloud & AI Enthusiast",
    email: "alex.carter@example.com",
    phone: "+1 (555) 123-4567",
    location: "Remote / Global",
    website: "alexcarter.dev",
    summary:
      "Versatile software engineer passionate about building scalable web applications and intelligent systems. Experienced in distributed computing, data pipelines, and modular architectures.",
  },
  links: [
    { id: "link1", label: "LinkedIn", url: "linkedin.com/in/alexcarter" },
    { id: "link2", label: "GitHub", url: "github.com/alex-carter" },
  ],
  experience: [
    {
      id: "exp1",
      role: "Senior Software Engineer",
      company: "InnovateX Labs",
      location: "Remote",
      start: "2023-03",
      end: "Present",
      bullets: [
        "Lead a team of engineers building distributed microservices.",
        "Implemented asynchronous messaging, improving throughput by 60%.",
      ],
    },
    {
      id: "exp2",
      role: "Full-Stack Developer",
      company: "NextWave Systems",
      location: "Hybrid",
      start: "2021-05",
      end: "2023-02",
      bullets: [
        "Developed internal dashboards using React and Express APIs.",
        "Reduced build size by 30% through optimization.",
      ],
    },
  ],
  education: [
    {
      id: "edu1",
      degree: "Bachelor of Computer Science",
      school: "Global Institute of Technology",
      location: "Online",
      start: "2017-08",
      end: "2021-05",
      bullets: ["Specialized in software engineering and machine learning.", "GPA 3.9 / 4.0"],
    },
  ],
  projects: [
    {
      id: "proj1",
      title: "TaskSphere – Team Collaboration Platform",
      organization: "Personal Project",
      start: "2024-02",
      end: "2024-07",
      bullets: [
        "Built collaborative task manager using React and PostgreSQL.",
        "Implemented real-time updates with WebSockets.",
      ],
    },
  ],
  achievements: [
    {
      id: "ach1",
      title: "Hackathon Winner – AI for Good Challenge",
      organization: "TechSociety Global",
      year: "2024",
      bullets: [
        "Developed computer-vision model for waste sorting.",
        "Presented to judges from Google Cloud and AWS.",
      ],
    },
  ],
  skillGroups: [
    {
      id: "skill1",
      title: "Programming Languages",
      bullets: ["JavaScript / TypeScript", "Python", "Go", "C#", "Java"],
    },
    {
      id: "skill2",
      title: "Frameworks & Tools",
      bullets: ["React.js", "Next.js", "Express.js", "Node.js", "Docker", "Kubernetes"],
    },
  ],
  coverLetter: {
    companyName: "",
    jobTitle: "",
    recipientName: "",
    recipientTitle: "",
    content: "Dear Hiring Manager,\n\nI am writing to express my interest in the [Job Title] position at [Company Name].\n\nWith my extensive background in full-stack development and cloud architecture, I am confident that I can bring significant value to your team. My experience includes...\n\nI am excited about the opportunity to contribute to your organization and would welcome the chance to discuss how my skills align with your needs.\n\nThank you for considering my application.",
  },
};