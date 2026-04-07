# 📄 Vita Forge

A React application for creating professional resumes with real-time A4 preview, two template designs, and text-based PDF export with selectable, searchable text.

## ✨ Features

- **👁️ Live A4 Preview** — Paginated preview that mirrors the exported PDF exactly, page by page
- **🎨 Two Templates** — Modern (left-aligned) and Basic (centered) layouts
- **📑 Full Section Support** — Profile, links, experience, projects, education, achievements, and skill groups
- **🎯 Accent Color Picker** — Customize the accent color applied across headings, name, and section rules
- **📄 Text-Based PDF Export** — Exports a real vector PDF using jsPDF with selectable, copyable, searchable text and clickable hyperlinks
- **💾 JSON Import / Export** — Save and reload your resume data as a `.json` file
- **🔄 Reorderable Sections** — Move items up/down within any section using ↑/↓ buttons
- **⌨️ Quick Bullet Entry** — Press Enter to add bullet points without clicking a button

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Utility-first styling |
| **jsPDF** | Text-based PDF generation |
| **JavaScript ES6+** | Core language |

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/axcel-blade/vita-forge.git
cd vita-forge

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

## 📖 Usage

1. **Edit your profile** — Fill in name, title, contact details, and links
2. **Add sections** — Add experience, education, projects, achievements, and skill groups
3. **Choose a template** — Switch between Modern and Basic in the Resume Template card
4. **Pick an accent color** — Use the color picker in the toolbar
5. **Preview** — The right panel shows a paginated A4 preview, navigate pages with the arrows or keyboard
6. **Export PDF** — Click **Save as PDF** to download a text-based PDF that matches the preview exactly
7. **Save your data** — Use **Export JSON** to back up your resume; reload it later with **Import JSON**

### Keyboard Shortcuts

| Key | Action |
|---|---|
| `←` / `↑` | Previous page in preview |
| `→` / `↓` | Next page in preview |
| `Enter` (in bullet input) | Add bullet and clear input |

## 📁 Project Structure

```
src/
├── components/
│   ├── editors/
│   │   ├── ResumeEditor.jsx          # Template selector + editor container
│   │   ├── ProfileEditor.jsx         # Name, title, contact, links
│   │   ├── ExperienceEditor.jsx      # Work experience entries
│   │   ├── EducationEditor.jsx       # Education entries
│   │   ├── ProjectsEditor.jsx        # Project entries
│   │   ├── AchievementsEditor.jsx    # Achievement entries
│   │   ├── SkillsEditor.jsx          # Skill group entries
│   │   └── BulletsEditor.jsx         # Reusable bullet point list editor
│   ├── preview/
│   │   └── A4PaginatedPreview.jsx    # A4-sized paginated live preview
│   ├── TemplateModern.jsx            # Modern template (left-aligned header)
│   ├── TemplateBasic.jsx             # Basic template (centered header)
│   ├── TemplateSharedParts.jsx       # Section, BulletList, and entry block components
│   ├── Toolbar.jsx                   # Accent color, PDF export, JSON import/export
│   └── SharedInputs.jsx              # Reusable UI: Label, Text, TextArea, IconButton, SectionCard
├── data/
│   └── defaultData.js                # Sample resume data (Sarah Mitchell)
├── App.jsx                           # Root layout: editor + preview panels
├── main.jsx                          # React entry point
└── index.css                         # Tailwind directives
```

## 🎨 Templates

### Modern ✨
Left-aligned header with name, title, and contact on the left. Clean horizontal flow. Best for tech and creative roles.

### Basic 📋
Centered header with name, title, contact, and links all centered. Accent-color horizontal rule separates the header. Best for traditional industries.

Both templates share identical body sections (Summary, Experience, Projects, Education, Achievements, Skills) and render identically in both the preview and exported PDF.

## 📄 PDF Export

The PDF is generated entirely with **jsPDF text drawing** — no screenshots, no canvas rendering. This means:

- ✅ Text is fully **selectable and copyable**
- ✅ Text is **searchable** (Ctrl+F in PDF viewers)
- ✅ Links are **clickable** — open in browser when clicked in any PDF viewer
- ✅ Renders **crisply at any zoom level**
- ✅ Small file size
- ✅ Template-aware — Modern and Basic produce distinct PDFs matching their preview layouts

## 🔧 Data Format

Resume data is a single JSON object. You can export, edit, and re-import it at any time.

```js
{
  meta: { template: "modern", accent: "#0ea5e9" },
  profile: {
    fullName: "Jane Doe",
    title: "Software Engineer",
    email: "jane@example.com",
    phone: "+1 555 000 0000",
    location: "New York, NY",
    website: "janedoe.dev",
    summary: "..."
  },
  links: [
    { id: "link1", label: "LinkedIn", url: "linkedin.com/in/janedoe" }
  ],
  experience: [
    {
      id: "exp1",
      role: "Engineer",
      company: "Acme Corp",
      location: "New York, NY",
      start: "2022-01",
      end: "Present",
      bullets: ["Did X", "Built Y"]
    }
  ],
  education: [...],
  projects: [...],
  achievements: [...],
  skillGroups: [
    { id: "skill1", title: "Languages", bullets: ["JavaScript", "Python"] }
  ]
}
```

## 📦 Key Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "jspdf": "^2.5.1",
  "tailwindcss": "^3.3.0",
  "vite": "^5.0.0"
}
```

## 💡 Tips

- **Reorder items** — Use the ↑/↓ buttons on any experience, education, project, achievement, or skill group
- **Quick bullets** — Type in the bullet input and press Enter; repeat to add multiple bullets fast
- **Backup often** — Use **Export JSON** to save your progress locally; the app has no server-side storage
- **Accent color** — The color applies to the name, all section headings, and the underline rules in both preview and PDF

## 🐛 Known Limitations

- No spell checker (use your browser's built-in spell check)
- No image/photo support in resumes
- Single-page app with no cloud sync — use JSON export to save your work

## 🚀 Planned Enhancements

- [ ] Sidebar two-column template
- [ ] Cover letter editor and export
- [ ] ATS keyword checker
- [ ] More template designs
- [ ] Dark mode

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

## 🤝 Contributing

Pull requests welcome. For major changes, open an issue first to discuss what you'd like to change.

---

Made with ❤️ using React, Tailwind CSS, and jsPDF