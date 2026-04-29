/* src/data/defaultData.js
 *
 * Starter content showing every section the resume builder supports.
 * Sarah Mitchell — a fictional senior engineer — fills out each editor with
 * realistic, paragraph-quality content so users can see exactly how each
 * section renders before they start editing.
 *
 * Notes:
 *   • meta.font defaults to "helvetica" — see TemplateSharedParts FONT_FAMILIES.
 *   • Skill group bullets are written as full sentences because the on-screen
 *     SkillsBlock joins them into a paragraph (workbook functional-resume style).
 *   • References are shown row-by-row — name, position, organization, phone, email.
 */

export const defaultData = {
  meta: {
    template: "modern",
    accent: "#0ea5e9",
    font: "helvetica",
  },

  profile: {
    fullName: "Sarah Mitchell",
    title: "Senior Full-Stack Engineer | Cloud Architecture Specialist",
    email: "sarah.mitchell@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    website: "sarahmitchell.dev",
    summary:
      "Award-winning software architect with 8+ years of experience designing and deploying scalable cloud-native applications. Proven expertise in microservices architecture, DevOps practices, and leading high-performance engineering teams. Passionate about mentoring junior developers and driving technical excellence across the full software delivery lifecycle.",
  },

  links: [
    { id: "link1", label: "LinkedIn",  url: "linkedin.com/in/sarah-mitchell-engineer" },
    { id: "link2", label: "GitHub",    url: "github.com/sarah-mitchell-dev" },
    { id: "link3", label: "Portfolio", url: "sarahmitchell.dev" },
  ],

  experience: [
    {
      id: "exp1",
      role: "Principal Engineer",
      company: "CloudVenture Technologies",
      location: "San Francisco, CA",
      start: "2022-06",
      end: "Present",
      bullets: [
        "Lead architectural decisions for 50+ microservices supporting 2M+ daily active users.",
        "Spearheaded migration from monolithic to Kubernetes-based infrastructure, reducing deployment time by 75%.",
        "Mentored 12 engineers, resulting in 3 promotions and improved team velocity of 40%.",
        "Implemented comprehensive CI/CD pipelines using GitHub Actions, reducing deployment errors by 90%.",
        "Designed and deployed event-driven architecture using Apache Kafka, handling 500K events/second.",
      ],
    },
    {
      id: "exp2",
      role: "Senior Software Engineer",
      company: "DataStream Solutions",
      location: "Remote",
      start: "2020-03",
      end: "2022-05",
      bullets: [
        "Architected real-time analytics platform processing 10TB+ data daily using Apache Spark and PostgreSQL.",
        "Led cross-functional team of 8 engineers to deliver features serving enterprise clients.",
        "Optimized database queries and caching strategies, improving API response time by 65%.",
        "Established code review standards and best practices, improving code quality metrics by 45%.",
        "Developed internal tools for monitoring and alerting, reducing MTTR by 2 hours.",
      ],
    },
    {
      id: "exp3",
      role: "Full-Stack Developer",
      company: "InnovateLabs Inc",
      location: "New York, NY",
      start: "2018-08",
      end: "2020-02",
      bullets: [
        "Built customer-facing web application using React and Node.js serving 500K+ users.",
        "Implemented payment integration with Stripe, processing $50M+ in annual transactions.",
        "Designed and implemented microservices for user authentication and profile management.",
        "Reduced frontend bundle size by 55% through code splitting and lazy loading.",
      ],
    },
    {
      id: "exp4",
      role: "Junior Developer",
      company: "TechStart Ventures",
      location: "Boston, MA",
      start: "2017-06",
      end: "2018-07",
      bullets: [
        "Contributed to full-stack development of SaaS platform using React, Node.js, and MongoDB.",
        "Implemented responsive UI components using Material-UI, improving user satisfaction by 35%.",
        "Participated in agile ceremonies and contributed to sprint planning and retrospectives.",
      ],
    },
  ],

  education: [
    {
      id: "edu1",
      degree: "Master of Science in Computer Science",
      school: "Massachusetts Institute of Technology (MIT)",
      location: "Cambridge, MA",
      start: "2015-09",
      end: "2017-05",
      bullets: [
        "Specialization in Distributed Systems and Machine Learning.",
        "GPA: 3.85 / 4.0",
        "Thesis: Optimizing Consensus Algorithms for High-Throughput Blockchain Networks.",
      ],
    },
    {
      id: "edu2",
      degree: "Bachelor of Science in Computer Engineering",
      school: "University of California, Berkeley",
      location: "Berkeley, CA",
      start: "2011-08",
      end: "2015-05",
      bullets: [
        "Cum Laude Honors, GPA: 3.8 / 4.0",
        "Dean's List all semesters",
        "Recipient of Merit Scholarship",
      ],
    },
  ],

  projects: [
    {
      id: "proj1",
      title: "CloudSync — Distributed File Synchronization System",
      organization: "Personal Project / Open Source",
      start: "2023-06",
      end: "2024-01",
      bullets: [
        "Developed P2P file synchronization system with conflict resolution using Go and gRPC.",
        "Implemented end-to-end encryption using AES-256.",
        "Achieved 2.5K GitHub stars and contributions from 15+ developers.",
        "Published technical blog series with 50K+ views on distributed systems.",
      ],
    },
    {
      id: "proj2",
      title: "MetricsHub — Real-Time Observability Platform",
      organization: "Side Project",
      start: "2022-11",
      end: "2023-08",
      bullets: [
        "Built comprehensive monitoring dashboard supporting 50+ metric types.",
        "Implemented custom alerting engine with ML-based anomaly detection.",
        "Designed time-series database optimization achieving 99.9% query latency SLA.",
      ],
    },
  ],

  // ── Key Skills ────────────────────────────────────────────────────────────
  // Each group renders as: bold theme heading + paragraph (workbook
  // functional/business style). Bullets here are written as full sentences
  // that flow as prose — the SkillsBlock joins them into one paragraph.
  skillGroups: [
    {
      id: "skill1",
      title: "Cloud Architecture & DevOps",
      bullets: [
        "Eight years of hands-on experience designing AWS-native systems across EC2, S3, Lambda and RDS, with production exposure to Kubernetes, Docker and Terraform.",
        "Built and maintained CI/CD pipelines using GitHub Actions and Jenkins that reduced release cycle time by 75% and deployment errors by 90% across multiple teams.",
      ],
    },
    {
      id: "skill2",
      title: "Software Engineering",
      bullets: [
        "Expert-level proficiency in JavaScript, TypeScript, Python, Go and Java, with working knowledge of Rust and C#.",
        "Strong command of full-stack frameworks including React, Next.js, Node.js, Express, Django and FastAPI, comfortable across both REST and GraphQL APIs.",
        "Deep experience with PostgreSQL, MongoDB, Redis, Apache Spark, Kafka and Elasticsearch in high-throughput production environments.",
      ],
    },
    {
      id: "skill3",
      title: "Leadership & Mentorship",
      bullets: [
        "Led cross-functional engineering teams of up to 12 people, with three direct reports promoted under my mentorship within the past 18 months.",
        "Established code-review standards and engineering best-practice documentation that lifted measurable code-quality metrics by 45% across two organisations.",
        "Regularly speak at internal tech-talks and external conferences, including a keynote to 5,000+ attendees at TechLeaders 2024.",
      ],
    },
    {
      id: "skill4",
      title: "System Design & Architecture",
      bullets: [
        "Strong background in microservices, event-driven architecture, domain-driven design and large-scale system design under real-world reliability constraints.",
        "Designed event-driven systems handling 500K events/second and analytics pipelines processing 10TB+ daily, with documented uptime above 99.9%.",
      ],
    },
  ],

  achievements: [
    {
      id: "ach1",
      title: "Cloud Architecture Award",
      organization: "TechLeaders Conference 2024",
      year: "2024",
      bullets: [
        "Recognised for innovative microservices architecture design.",
        "Keynote speaker at 5,000+ attendee conference.",
      ],
    },
    {
      id: "ach2",
      title: "Engineering Excellence Award",
      organization: "CloudVenture Technologies",
      year: "2023",
      bullets: [
        "Employee of the Year for technical impact and mentorship.",
      ],
    },
    {
      id: "ach3",
      title: "Hackathon Winner — Cloud Innovation Challenge",
      organization: "Global Tech Summit 2022",
      year: "2022",
      bullets: [
        "Developed serverless application for real-time data processing.",
        "Beat 200+ teams with innovative solution.",
      ],
    },
  ],

  // ── Volunteer Work ────────────────────────────────────────────────────────
  voluntary: [
    {
      id: "vol1",
      role: "Volunteer Coding Mentor",
      organization: "Code for Good Foundation",
      location: "San Francisco, CA",
      start: "2021-03",
      end: "Present",
      bullets: [
        "Mentor cohorts of 6–8 underrepresented students each semester through a 12-week intro-to-web-development curriculum.",
        "Designed and delivered weekly evening workshops on JavaScript, Git and modern web tooling.",
        "Three former mentees have since secured paid junior engineering roles at local startups.",
      ],
    },
    {
      id: "vol2",
      role: "Technical Workshop Lead",
      organization: "Women Who Code — Bay Area Chapter",
      location: "San Francisco, CA",
      start: "2019-09",
      end: "2022-12",
      bullets: [
        "Hosted monthly technical workshops on cloud architecture and system design for 30–60 attendees.",
        "Coordinated guest speakers from companies including Google, Stripe and Netflix.",
      ],
    },
  ],

  // ── Certificates & Licenses ───────────────────────────────────────────────
  certificates: [
    {
      id: "cert1",
      title: "AWS Certified Solutions Architect — Professional",
      issuer: "Amazon Web Services",
      year: "2023-04",
      expiry: "2026-04",
      credentialId: "AWS-PSA-2023-019384",
      bullets: [
        "Achieved 92/100 on first attempt.",
      ],
    },
    {
      id: "cert2",
      title: "Certified Kubernetes Administrator (CKA)",
      issuer: "Cloud Native Computing Foundation",
      year: "2022-08",
      expiry: "2025-08",
      credentialId: "LF-CKA-22-7264",
      bullets: [],
    },
    {
      id: "cert3",
      title: "HashiCorp Certified: Terraform Associate",
      issuer: "HashiCorp",
      year: "2021-11",
      expiry: "",
      credentialId: "",
      bullets: [],
    },
  ],

  // ── Interests ─────────────────────────────────────────────────────────────
  // Rendered inline, pipe-separated. Keep entries short.
  interests: [
    "Trail running and ultra-marathons",
    "Open-source contribution",
    "Chess (USCF rated)",
    "Amateur astrophotography",
    "Volunteer mentoring",
  ],

  // ── References ────────────────────────────────────────────────────────────
  // Rendered row-by-row: Name → Position → Organization → Tel → Email.
  references: [
    {
      id: "ref1",
      name: "Dr. Marcus Chen",
      title: "VP of Engineering",
      organization: "CloudVenture Technologies",
      email: "marcus.chen@cloudventure.example.com",
      phone: "+1 (555) 871-2034",
    },
    {
      id: "ref2",
      name: "Priya Raman",
      title: "Director of Platform Engineering",
      organization: "DataStream Solutions",
      email: "priya.raman@datastream.example.com",
      phone: "+1 (555) 402-9981",
    },
    {
      id: "ref3",
      name: "Professor Helena Vasquez",
      title: "Thesis Advisor, Distributed Systems",
      organization: "Massachusetts Institute of Technology",
      email: "h.vasquez@csail.mit.example.edu",
      phone: "+1 (617) 253-1729",
    },
  ],
};