# 📄 Resume & Cover Letter Builder

A modern, full-featured React application for creating professional resumes and cover letters with real-time preview, multiple customizable templates, and seamless PDF export capabilities.

## ✨ Key Features

- **📝 Dual Document Support** - Create and manage both resumes and cover letters in one platform
- **🎨 Multiple Templates** - Choose from Modern, Basic, and Sidebar designs with one-click switching
- **👁️ Live Preview** - See changes instantly as you edit your content
- **💾 Smart Data Management** - Export/import resumes as JSON to save your work locally
- **📊 Comprehensive Sections** - Profile, experience, education, projects, achievements, and skills
- **🎯 Customizable Styling** - Pick your accent color to personalize your resume
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **⚡ Fast & Lightweight** - Built with modern tooling (Vite) for optimal performance
- **🖨️ Print-Ready PDF Export** - Download professional PDFs without headers/footers

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI Framework |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Utility-first styling |
| **react-to-print** | PDF generation |
| **JavaScript ES6+** | Core language |

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/resume-cover-letter-builder.git
cd resume-cover-letter-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📖 Usage Guide

1. **Start Editing** - Fill in your profile information (name, email, phone, location)
2. **Add Sections** - Add work experience, education, projects, achievements, and skills
3. **Choose Template** - Select from Modern, Basic, or Sidebar designs in the Resume Template section
4. **Customize** - Pick an accent color that matches your style
5. **Preview** - See live updates in the right panel
6. **Export** - Save as PDF or export data as JSON

### Tab Navigation

- **📄 Resume Tab** - Edit and preview your resume with template selection
- **📝 Cover Letter Tab** - Create a customized cover letter for specific job applications

## 📁 Project Structure

```
src/
├── components/
│   ├── editors/              # Form editors for each resume section
│   │   ├── ProfileEditor.jsx
│   │   ├── ExperienceEditor.jsx
│   │   ├── EducationEditor.jsx
│   │   ├── ProjectsEditor.jsx
│   │   ├── AchievementsEditor.jsx
│   │   ├── SkillsEditor.jsx
│   │   ├── BulletsEditor.jsx
│   │   ├── ResumeEditor.jsx
│   │   └── CoverLetterEditor.jsx
│   ├── templates/            # Resume & cover letter templates
│   │   ├── ResumeTemplate.jsx
│   │   └── CoverLetterTemplate.jsx
│   ├── TemplateModern.jsx    # Modern resume design
│   ├── TemplateBasic.jsx     # Basic resume design
│   ├── TemplateSidebar.jsx   # Sidebar resume design
│   ├── TemplateSharedParts.jsx  # Reusable template components
│   ├── Toolbar.jsx           # Export/Import/PDF controls
│   ├── TabNavigation.jsx     # Resume/Cover Letter switcher
│   └── SharedInputs.jsx      # Reusable UI components
├── data/
│   └── defaultData.js        # Sample resume & cover letter data
├── App.jsx                   # Main application component
├── main.jsx                  # React entry point
└── index.css                 # Tailwind directives
```

## 🎨 Template Designs

### Modern Template ✨
Clean, contemporary design with bold typography and ample white space. Perfect for tech and creative professionals.

### Basic Template 📋
Traditional centered layout with classic serif typography. Ideal for conservative industries.

### Sidebar Template 📑
Professional two-column design with sidebar for skills and contact info. Great for organizing information clearly.

## 🔧 Customization

### Change Accent Color
Use the color picker in the toolbar to customize the accent color throughout your resume.

### Add Custom Sections
Easily extend the app by adding new editor components and integrating them into ResumeEditor.jsx.

### Modify Templates
Edit template files in `src/components/` to adjust spacing, fonts, colors, and layout.

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-to-print": "^3.0.0",
  "tailwindcss": "^3.3.0",
  "vite": "^5.0.0"
}
```

## 💡 Tips & Tricks

- **Quick Bullets** - Press Enter to add multiple bullet points without clicking "Add"
- **Reorder Sections** - Use ↑/↓ buttons to move items up and down
- **Save Your Work** - Export JSON regularly to backup your resume data
- **Print Optimization** - The PDF export automatically hides the UI for clean printing
- **Mobile Editing** - Edit on the go with the responsive mobile-friendly interface

## 🐛 Known Limitations

- Cover letter templates are limited to one professional design
- No built-in spell checker (use browser extensions)
- Images cannot be embedded in resumes

## 🚀 Future Enhancements

- [ ] Dark mode support
- [ ] More template designs
- [ ] Resume ATS optimization checker
- [ ] Spell checking integration
- [ ] Template preview gallery
- [ ] Cloud sync and backup
- [ ] Share resume link feature

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs and request features via GitHub Issues
- Submit pull requests for improvements
- Share template designs
- Improve documentation

## 👨‍💻 Author

**Your Name** - [GitHub](https://github.com/yourusername) | [Portfolio](https://yourportfolio.com)

---

**Ready to build your resume?** [Try it now](#getting-started) or [View Demo](#)

Made with ❤️ using React & Tailwind CSS