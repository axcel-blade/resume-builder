In the code files add the file location like comment in top of the code file.
After refactoring the code always refactor the README.md file according to the changes.
This is sample project structure.
Like this refactor the currect folder structure.
```
project-root/
│
├── public/
│
├── src/
│   ├── core/                # Global app setup
│   │   ├── router/         # Central routing
│   │   ├── layouts/        # Main layouts (Navbar, Footer)
│   │   └── config/         # Constants, env configs
│
│   ├── website/            # 🌐 MAIN WEBSITE (Landing pages)
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Products.jsx
│   │   │   └── Contact.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProductCard.jsx
│   │   │
│   │   └── assets/
│
│   ├── apps/               # 🚀 ALL WEB APPS LIVE HERE
│   │
│   │   ├── resume-builder/
│   │   │   ├── pages/
│   │   │   │   ├── Builder.jsx
│   │   │   │   ├── Templates.jsx
│   │   │   │   └── Preview.jsx
│   │   │   │
│   │   │   ├── components/
│   │   │   │   ├── Form/
│   │   │   │   ├── Sections/
│   │   │   │   └── UI/
│   │   │   │
│   │   │   ├── services/   # API / logic
│   │   │   ├── hooks/
│   │   │   └── utils/
│   │
│   │   ├── cover-letter/   # 🔒 FUTURE MODULE
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   └── services/
│   │   │
│   │   └── shared/         # Shared between apps
│   │       ├── components/
│   │       ├── hooks/
│   │       └── utils/
│
│   ├── routes/             # Route definitions
│   │   └── AppRoutes.jsx
│
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── README.md
```