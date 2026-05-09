/* src/data/defaultData.js */

export const defaultData = {
  meta: {
    template: "modern",
    accent: "#0ea5e9",
    font: "helvetica",
  },

  profile: {
    fullName: "Alex Carter",
    title: "Software Engineer | Full-Stack Web Developer",
    email: "alex.carter@example.com",
    phone: "+1 (555) 017-8842",
    location: "Austin, TX",
    website: "alexcarter.dev",
    summary:
      "Results-driven software engineer with 5+ years of hands-on experience building web applications from concept to production. Strong background in React, Node.js, and relational databases with a focus on clean architecture, user-centered design, and reliable delivery. Comfortable collaborating across product, design, and engineering teams to ship practical solutions that improve customer experience and business outcomes.",
  },

  links: [
    { id: "link1", label: "LinkedIn", url: "linkedin.com/in/alex-carter-dev" },
    { id: "link2", label: "GitHub", url: "github.com/alexcarter-dev" },
    { id: "link3", label: "Portfolio", url: "alexcarter.dev" },
  ],

  experience: [
    {
      id: "exp1",
      role: "Senior Software Engineer",
      company: "Northstar Digital Labs",
      location: "Austin, TX",
      start: "2023-03",
      end: "Present",
      bullets: [
        "Led development of customer portal features used by over 120,000 monthly users.",
        "Reduced API response times by 42% through query tuning and cache-layer improvements.",
        "Introduced automated release checks in GitHub Actions, cutting production regressions by 35%.",
        "Mentored junior developers through code reviews and pair programming sessions.",
      ],
    },
    {
      id: "exp2",
      role: "Software Engineer",
      company: "BlueRiver Systems",
      location: "Dallas, TX",
      start: "2020-08",
      end: "2023-02",
      bullets: [
        "Built and maintained React and Node.js modules for internal operations and client reporting.",
        "Implemented role-based authentication and audit logging for sensitive workflows.",
        "Collaborated with QA to improve test coverage and stabilize release quality.",
        "Migrated legacy endpoints to modern REST services without customer downtime.",
      ],
    },
    {
      id: "exp3",
      role: "Junior Web Developer",
      company: "Pixel Forge Studio",
      location: "Houston, TX",
      start: "2018-06",
      end: "2020-07",
      bullets: [
        "Created responsive landing pages and dashboards for small business clients.",
        "Integrated third-party APIs for payment, email, and analytics features.",
        "Improved Lighthouse performance by optimizing image delivery and client-side bundles.",
      ],
    },
  ],

  education: [
    {
      id: "edu1",
      degree: "B.Sc. in Software Engineering",
      school: "University of Texas at Dallas",
      location: "Dallas, TX",
      start: "2014-08",
      end: "2018-05",
      bullets: [
        "Focused on web systems, software architecture, and database engineering.",
        "Completed capstone project on scalable scheduling systems.",
        "Graduated with honors and served as peer tutor for programming fundamentals.",
      ],
    },
    {
      id: "edu2",
      degree: "Full-Stack Web Development Certificate",
      school: "Austin Code Academy",
      location: "Austin, TX",
      start: "2019-01",
      end: "2019-09",
      bullets: [
        "Completed project-based training in React, Node.js, and PostgreSQL.",
        "Built three portfolio-ready applications using agile iteration cycles.",
      ],
    },
  ],

  projects: [
    {
      id: "proj1",
      title: "TaskFlow Pro",
      organization: "Personal Project",
      start: "2024-01",
      end: "Present",
      bullets: [
        "Developed a productivity web app with Kanban boards, reminders, and progress analytics.",
        "Implemented JWT authentication and role-based project collaboration.",
        "Deployed to cloud infrastructure with CI/CD and automated quality checks.",
        "Repository: github.com/alexcarter-dev/taskflow-pro",
      ],
    },
    {
      id: "proj2",
      title: "EventHub API",
      organization: "Open Source",
      start: "2023-04",
      end: "2023-12",
      bullets: [
        "Built a REST API for event ticketing and attendee management workflows.",
        "Designed modular service layers and reusable validation middleware.",
        "Wrote API documentation and usage examples for external contributors.",
      ],
    },
  ],

  skillGroups: [
    {
      id: "skill1",
      title: "Programming Languages",
      bullets: [
        "JavaScript and TypeScript for production-ready frontend and backend applications.",
        "Python and SQL for automation scripts, data workflows, and service integrations.",
      ],
    },
    {
      id: "skill2",
      title: "Frontend & UI",
      bullets: [
        "React, Next.js, and Tailwind CSS for responsive and accessible interfaces.",
        "Component-driven development patterns with reusable UI systems.",
      ],
    },
    {
      id: "skill3",
      title: "Backend & APIs",
      bullets: [
        "Node.js and Express for REST APIs with authentication and validation.",
        "Database design and query optimization using PostgreSQL and MongoDB.",
      ],
    },
    {
      id: "skill4",
      title: "Dev Tools & Collaboration",
      bullets: [
        "Git, GitHub, and CI pipelines for reliable team delivery.",
        "Agile teamwork, sprint planning, code reviews, and technical documentation.",
      ],
    },
  ],

  achievements: [
    {
      id: "ach1",
      title: "Engineering Excellence Award",
      organization: "Northstar Digital Labs",
      year: "2025",
      bullets: [
        "Recognized for delivering high-impact performance improvements across customer-facing systems.",
        "Acknowledged for mentorship and consistent cross-team collaboration.",
      ],
    },
    {
      id: "ach2",
      title: "Hackathon Finalist",
      organization: "Texas Dev Summit",
      year: "2023",
      bullets: [
        "Built a rapid prototype for a civic services platform in a 24-hour team challenge.",
      ],
    },
  ],

  voluntary: [
    {
      id: "vol1",
      role: "Coding Mentor",
      organization: "CodeBridge Community",
      location: "Austin, TX",
      start: "2022-02",
      end: "Present",
      bullets: [
        "Delivered beginner-friendly coding sessions on HTML, JavaScript, and career readiness.",
        "Supported students with project reviews and portfolio preparation.",
      ],
    },
    {
      id: "vol2",
      role: "STEM Workshop Volunteer",
      organization: "FutureMinds Initiative",
      location: "Dallas, TX",
      start: "2020-06",
      end: "2021-12",
      bullets: [
        "Helped organize weekend workshops introducing high school students to software development.",
        "Assisted facilitators with live coding demos and classroom support.",
      ],
    },
  ],

  certificates: [
    {
      id: "cert1",
      title: "AWS Certified Developer - Associate",
      issuer: "Amazon Web Services",
      year: "2024-06",
      expiry: "2027-06",
      credentialId: "AWS-DEV-2024-9182",
      bullets: [
        "Validated cloud development, deployment, and troubleshooting fundamentals.",
      ],
    },
    {
      id: "cert2",
      title: "Professional Scrum Master I (PSM I)",
      issuer: "Scrum.org",
      year: "2023-02",
      expiry: "",
      credentialId: "PSM-I-328174",
      bullets: [
        "Demonstrated practical understanding of Scrum values and agile facilitation.",
      ],
    },
    {
      id: "cert3",
      title: "Google IT Support Certificate",
      issuer: "Google",
      year: "2021-09",
      expiry: "",
      credentialId: "GOOG-ITS-2021-5521",
      bullets: [
        "Covered troubleshooting, networking basics, and system administration concepts.",
      ],
    },
  ],

  interests: [
    "Open-source contribution",
    "Tech meetups",
    "Mentoring junior developers",
    "UI/UX design trends",
    "Cycling",
  ],

  references: [
    {
      id: "ref1",
      name: "Jordan Blake",
      title: "Engineering Manager",
      organization: "Northstar Digital Labs",
      email: "jordan.blake@example.com",
      phone: "+1 (555) 331-0021",
    },
    {
      id: "ref2",
      name: "Taylor Morgan",
      title: "Senior Product Manager",
      organization: "BlueRiver Systems",
      email: "taylor.morgan@example.com",
      phone: "+1 (555) 240-1187",
    },
  ],
};

export const defaultCoverLetterData = {
  fullName: "Alex Carter",
  email: "alex.carter@example.com",
  phone: "+1 (555) 017-8842",
  jobTitle: "Software Engineer",
  companyName: "BrightPath Technologies",
  recipientName: "Ms Emily Roberts",
  recipientTitle: "Hiring Manager",
  companyAddress: "BrightPath Technologies\n2801 Greenway Plaza\nAustin, TX 78701",
  topSkills: "React, Node.js, TypeScript, API Design",
  achievements:
    "Improved API performance by 42% and introduced CI quality gates that reduced regressions",
  whyCompany:
    "I value your product-first engineering culture and your focus on building simple, high-impact software experiences.",
  tone: "professional",
};