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

    skills: [
        "React.js",
        "Next.js",
        "Node.js",
        "TypeScript",
        "Python",
        "Django",
        "PostgreSQL",
        "Docker",
        "AWS",
        "CI/CD",
        "REST APIs",
        "Agile/Scrum",
    ],

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
        {
        id: "exp2",
        role: "Full-Stack Developer",
        company: "CloudSync Labs",
        location: "Melbourne, VIC",
        start: "2019-05",
        end: "2021-12",
        bullets: [
            "Developed and maintained web applications using React, Redux, and Express.",
            "Optimized database queries in PostgreSQL to improve data retrieval speed by 30%.",
            "Collaborated with designers and PMs to implement responsive UIs and REST APIs.",
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
        bullets: [
            "Graduated with First-Class Honours.",
            "Specialized in Software Engineering and Artificial Intelligence.",
        ],
        },
        {
        id: "edu2",
        degree: "Certified AWS Developer – Associate",
        school: "Amazon Web Services",
        location: "Online",
        start: "2021-01",
        end: "2021-03",
        bullets: ["Earned certification for AWS architecture and serverless applications."],
        },
    ],

    projects: [
        {
        id: "proj1",
        title: "SmartBudget – Personal Finance Tracker",
        description:
            "A full-stack web app that helps users manage budgets, track expenses, and visualize spending trends.",
        technologies: ["React", "Node.js", "MongoDB", "Chart.js"],
        link: "https://smartbudget.dev",
        bullets: [
            "Designed REST APIs for expense management and authentication.",
            "Integrated chart visualizations and implemented JWT-based auth.",
        ],
        },
        {
        id: "proj2",
        title: "EduLearn LMS",
        description:
            "An online learning management system that enables instructors to create, manage, and grade online courses.",
        technologies: ["Next.js", "PostgreSQL", "Prisma", "TailwindCSS"],
        link: "https://edulearn.io",
        bullets: [
            "Built instructor dashboards with course analytics and student engagement stats.",
            "Implemented payment integration using Stripe API.",
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
        {
        id: "ach2",
        title: "Dean’s List of Academic Excellence",
        organization: "Curtin University",
        year: "2017",
        bullets: [
            "Recognized for maintaining a GPA above 3.8 throughout the academic year.",
        ],
        },
        {
        id: "ach3",
        title: "Open Source Contributor",
        organization: "ReactJS Community",
        year: "2022",
        bullets: [
            "Contributed to React open-source documentation and accessibility improvements.",
        ],
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
            "Used React and Chart.js to visualize spending patterns in real-time.",
            ],
        },
        {
            id: "proj2",
            title: "EduLearn LMS",
            organization: "Freelance / Open Source",
            start: "2022-08",
            end: "2023-03",
            bullets: [
            "Created an online learning platform enabling course creation and student tracking.",
            "Implemented authentication and role-based access using JWT and Prisma ORM.",
            "Deployed on Vercel and PostgreSQL with CI/CD via GitHub Actions.",
            ],
        },
        {
            id: "proj3",
            title: "AI Trading Bot",
            organization: "Ferx Technologies",
            start: "2024-04",
            end: "Present",
            bullets: [
            "Designed an intelligent Binance trading bot using Python and TensorFlow.",
            "Integrated machine learning models to predict market trends and automate trades.",
            "Implemented stop-loss and take-profit algorithms with live backtesting support.",
            ],
        },
    ],
};