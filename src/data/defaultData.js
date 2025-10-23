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
      "Versatile software engineer passionate about building scalable web applications and intelligent systems. Experienced in distributed computing, data pipelines, and modular architectures. Enjoys solving real-world problems through creative design, automation, and modern frameworks across multiple programming languages.",
  },

  links: [
    { id: "link1", label: "LinkedIn", url: "linkedin.com/in/alexcarter" },
    { id: "link2", label: "GitHub", url: "github.com/alex-carter" },
    { id: "link3", label: "Portfolio", url: "alexcarter.dev" },
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
        "Lead a team of engineers building distributed microservices in Node.js and Go.",
        "Implemented asynchronous messaging using RabbitMQ, improving throughput by 60%.",
        "Migrated container orchestration from Docker Compose to Kubernetes with Helm.",
        "Established code review pipelines and automated deployment with GitHub Actions.",
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
        "Developed internal dashboards using React, Redux Toolkit, and Express APIs.",
        "Integrated role-based access control and JWT authentication across services.",
        "Collaborated with UI/UX team to redesign web components using TailwindCSS.",
        "Reduced build size by 30% through Webpack optimization and lazy loading.",
      ],
    },
    {
      id: "exp3",
      role: "Software Engineer Intern",
      company: "OpenCloud Analytics",
      location: "Remote",
      start: "2020-01",
      end: "2020-12",
      bullets: [
        "Created ETL scripts in Python for processing millions of IoT sensor records daily.",
        "Deployed a predictive maintenance model using TensorFlow and FastAPI.",
        "Implemented REST endpoints for data aggregation and trend visualization.",
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
      bullets: [
        "Specialized in software engineering, databases, and machine learning.",
        "Graduated with High Distinction (GPA 3.9 / 4.0).",
        "Capstone project: 'Smart Agriculture Platform using IoT and Cloud Analytics.'",
      ],
    },
    {
      id: "edu2",
      degree: "Professional Certificate in Cloud Architecture",
      school: "FutureSkills Academy",
      location: "Remote",
      start: "2022-01",
      end: "2022-06",
      bullets: [
        "Hands-on projects in AWS and Azure service deployments.",
        "Designed cost-optimized infrastructure for scalable web applications.",
      ],
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
        "Built a collaborative task manager using React, Node.js, and PostgreSQL.",
        "Implemented real-time updates with WebSockets and optimistic UI rendering.",
        "Added user analytics and project reporting features with D3.js visualizations.",
      ],
    },
    {
      id: "proj2",
      title: "SmartCart – AI-Driven Shopping Assistant",
      organization: "Open Source",
      start: "2023-06",
      end: "2023-12",
      bullets: [
        "Developed recommendation algorithms using Python and TensorFlow Lite.",
        "Built a REST API with Flask and integrated it into a React front end.",
        "Deployed the entire solution on AWS Lambda with CloudFront CDN.",
      ],
    },
    {
      id: "proj3",
      title: "EcoData – Environmental Monitoring Dashboard",
      organization: "Hackathon Project",
      start: "2022-03",
      end: "2022-04",
      bullets: [
        "Collected and visualized air-quality data from public IoT networks.",
        "Won 2nd place in regional sustainability hackathon (200+ participants).",
        "Used Leaflet.js for interactive mapping and D3.js for charting trends.",
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
        "Developed a computer-vision model to detect waste sorting errors in recycling centers.",
        "Presented solution to judges from Google Cloud and AWS with live demo.",
      ],
    },
    {
      id: "ach2",
      title: "Employee Excellence Award",
      organization: "NextWave Systems",
      year: "2022",
      bullets: [
        "Recognized for introducing automated deployment testing framework that reduced manual QA time by 40%.",
      ],
    },
    {
      id: "ach3",
      title: "Top 3 Finalist – Global App Innovation Contest",
      organization: "OpenDev Foundation",
      year: "2021",
      bullets: [
        "Built cross-platform health tracking app using Flutter and Firebase.",
        "App reached over 10,000 beta downloads in first month of launch.",
      ],
    },
  ],

  skillGroups: [
    {
      id: "skill1",
      title: "Programming Languages",
      bullets: [
        "JavaScript / TypeScript (React, Node.js)",
        "Python (Flask, FastAPI, Pandas)",
        "Go (Gin Framework)",
        "C# (.NET Core)",
        "Java (Spring Boot, Gradle)",
      ],
    },
    {
      id: "skill2",
      title: "Frameworks & Tools",
      bullets: [
        "React.js, Next.js, Redux Toolkit",
        "Express.js, NestJS, Flask, Django",
        "TailwindCSS, Bootstrap, Framer Motion",
        "Jest, Vitest, Playwright, Postman",
      ],
    },
    {
      id: "skill3",
      title: "DevOps & Cloud Platforms",
      bullets: [
        "AWS (Lambda, S3, EC2, CloudFormation)",
        "Azure Functions, Google Cloud Run",
        "Docker, Kubernetes, GitHub Actions, Jenkins",
      ],
    },
    {
      id: "skill4",
      title: "Databases",
      bullets: [
        "PostgreSQL, MySQL, MongoDB, SQLite",
        "Redis Caching, Prisma ORM, Sequelize",
      ],
    },
    {
      id: "skill5",
      title: "Machine Learning & Data Science",
      bullets: [
        "TensorFlow, Scikit-learn, OpenCV",
        "Data preprocessing, model training, evaluation",
        "Visualization with Matplotlib and Plotly",
      ],
    },
    {
      id: "skill6",
      title: "Soft Skills & Collaboration",
      bullets: [
        "Technical documentation and mentoring",
        "Agile & Scrum project coordination",
        "Excellent problem-solving and adaptability",
        "Cross-functional communication in global teams",
      ],
    },
  ],
};