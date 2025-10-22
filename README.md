# 📄 Resume Builder
A React-based resume builder that allows users to create, customize, and export professional resumes with live preview and PDF download. Built with React, Tailwind CSS, and react-to-print, this project provides clean and modern templates for a personalized and print-ready resume creation experience.

## 🚀 Features
* 🧩 Dynamic Resume Editor – Instantly edit profile details, experience, education, achievements, and skills.
* 🎨 Multiple Templates – Choose between Modern, Basic, and Sidebar resume designs.
* 💾 PDF Export – Download clean, print-ready resumes using react-to-print (no headers or footers).
* ⚡ Live Preview – Real-time updates as you type.
* 🎯 Fully Responsive – Works seamlessly across desktop and mobile browsers.
* 💡 Minimal & Fast – Lightweight UI built with Tailwind CSS for smooth performance.

## 🛠️ Tech Stack
* Frontend: React (Vite)
* Styling: Tailwind CSS
* PDF Export: react-to-print
* Language: JavaScript (ES6+)

## 🧰 Installation & Setup
### 1. Clone the repository
```
git clone https://github.com/<your-username>/resume-builder.git
cd resume-builder
```

### 2. Install dependencies
```
npm install
```

### 3. Start the development server
```
npm run dev
```
### 4. Open your browser and visit:
```
http://localhost:5173
```

## 🧾 Usage
1. Enter your personal and professional details in the sidebar editor.
2. Choose a template from the toolbar (Modern, Basic, or Sidebar).

3. Preview your resume in real time as you edit.

4. Click “Save as PDF” to download a clean, print-ready version of your resume.

## 🧑‍💻 Folder Structure
```
resume-builder/
│
├── src/
│   ├── components/
│   │   ├── Toolbar.jsx
│   │   ├── TemplateModern.jsx
│   │   ├── TemplateBasic.jsx
│   │   ├── TemplateSidebar.jsx
│   │   ├── TemplateSharedParts.jsx
│   │   ├── ProfileEditor.jsx
│   │   ├── ExperienceEditor.jsx
│   │   ├── EducationEditor.jsx
│   │   ├── AchievementsEditor.jsx
│   │   └── SkillsEditor.jsx
│   ├── data/
│   │   └── defaultData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── public/
│   └── favicon.ico
│
├── package.json
├── tailwind.config.js
└── README.md
```

## 📦 Dependencies
```
"dependencies": {
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-to-print": "^3.x",
  "tailwindcss": "^3.x"
}
```

## 📸 Preview

## 🧑‍🎨 Author
Developed by Ferx Technologies
Maintained by Joseph Fernando

## 📜 License
This project is licensed under the MIT License – you’re free to use, modify, and distribute it.
