# 📄 Vita Forge

A React application for creating professional resumes with real-time A4 preview, two template designs, AI-powered summary generation, and text-based PDF export with selectable, searchable text.

## ✨ Features

- **👁️ Live A4 Preview** — Paginated preview that mirrors the exported PDF exactly, page by page
- **🎨 Two Templates** — Modern (left-aligned) and Basic (centered) layouts
- **🤖 AI Summary Generator** — Generate or rewrite your professional summary using Claude AI, powered by your resume data
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
| **Claude API (Anthropic)** | AI-powered summary generation |
| **Vercel Serverless Functions** | Secure API proxy for Claude |
| **JavaScript ES6+** | Core language |

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Anthropic API key (for AI summary feature) — get one at [console.anthropic.com](https://console.anthropic.com)

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

### Environment Variables

Create a `.env` file in the project root:

```env
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

> ⚠️ Never commit your `.env` file. It is already in `.gitignore`.

### Build for Production

```bash
npm run build
npm run preview
```

## 📖 Usage

1. **Edit your profile** — Fill in name, title, contact details, and links
2. **Generate your summary** — Click **✦ Generate with AI** next to the Summary field to auto-generate a professional summary from your resume data. If a summary already exists, the button becomes **✦ Rewrite with AI**
3. **Add sections** — Add experience, education, projects, achievements, and skill groups
4. **Choose a template** — Switch between Modern and Basic in the Resume Template card
5. **Pick an accent color** — Use the color picker in the toolbar
6. **Preview** — The right panel shows a paginated A4 preview, navigate pages with the arrows or keyboard
7. **Export PDF** — Click **Save as PDF** to download a text-based PDF that matches the preview exactly
8. **Save your data** — Use **Export JSON** to back up your resume; reload it later with **Import JSON**

### Keyboard Shortcuts

| Key | Action |
|---|---|
| `←` / `↑` | Previous page in preview |
| `→` / `↓` | Next page in preview |
| `Enter` (in bullet input) | Add bullet and clear input |

## 📁 Project Structure

```
├── api/
│   └── generate_summary.js           # Vercel serverless function — secure Claude API proxy
├── src/
│   ├── components/
│   │   ├── editors/
│   │   │   ├── ResumeEditor.jsx          # Template selector + editor container
│   │   │   ├── ProfileEditor.jsx         # Name, title, contact, links, AI summary button
│   │   │   ├── ExperienceEditor.jsx      # Work experience entries
│   │   │   ├── EducationEditor.jsx       # Education entries
│   │   │   ├── ProjectsEditor.jsx        # Project entries
│   │   │   ├── AchievementsEditor.jsx    # Achievement entries
│   │   │   ├── SkillsEditor.jsx          # Skill group entries
│   │   │   └── BulletsEditor.jsx         # Reusable bullet point list editor
│   │   ├── preview/
│   │   │   └── A4PaginatedPreview.jsx    # A4-sized paginated live preview
│   │   ├── TemplateModern.jsx            # Modern template (left-aligned header)
│   │   ├── TemplateBasic.jsx             # Basic template (centered header)
│   │   ├── TemplateSharedParts.jsx       # Section, BulletList, and entry block components
│   │   ├── Toolbar.jsx                   # Accent color, PDF export, JSON import/export
│   │   └── SharedInputs.jsx              # Reusable UI: Label, Text, TextArea, IconButton, SectionCard
│   ├── data/
│   │   └── defaultData.js                # Sample resume data (Sarah Mitchell)
│   ├── App.jsx                           # Root layout: editor + preview panels
│   ├── main.jsx                          # React entry point
│   └── index.css                         # Tailwind directives
```

## 🤖 AI Summary Generator

The AI summary feature uses **Claude by Anthropic** to generate or rewrite your professional summary based on your full resume data.

### How it works

- If the **Summary field is empty** → button shows **✦ Generate with AI** (blue)
- If the **Summary field has content** → button shows **✦ Rewrite with AI** (amber)
- While generating → button shows a spinner and is disabled

The AI reads your name, title, experience, education, projects, skills, and achievements to produce a concise, compelling 2–4 sentence summary. You can edit the result freely after generation.

### Setup for AI (Vercel deployment)

1. Add your API key in **Vercel Dashboard → Settings → Environment Variables**:
   ```
   ANTHROPIC_API_KEY = sk-ant-your-key-here
   ```
2. The `api/generate_summary.js` serverless function acts as a secure proxy — your API key is never exposed to the browser.

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

- **AI Summary** — Fill in your experience and skills first before generating a summary for better results
- **Reorder items** — Use the ↑/↓ buttons on any experience, education, project, achievement, or skill group
- **Quick bullets** — Type in the bullet input and press Enter; repeat to add multiple bullets fast
- **Backup often** — Use **Export JSON** to save your progress locally; the app has no server-side storage
- **Accent color** — The color applies to the name, all section headings, and the underline rules in both preview and PDF

## 🐛 Known Limitations

- No spell checker (use your browser's built-in spell check)
- No image/photo support in resumes
- Single-page app with no cloud sync — use JSON export to save your work
- AI summary requires an Anthropic API key and Vercel deployment to function

## 🚀 Planned Enhancements

- [ ] Sidebar two-column template
- [ ] Cover letter editor and export
- [ ] ATS keyword checker
- [ ] AI bullet point suggestions per experience entry
- [ ] More template designs
- [ ] Dark mode

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

## 🤝 Contributing

Pull requests welcome. For major changes, open an issue first to discuss what you'd like to change.

---

Made with ❤️ using React, Tailwind CSS, jsPDF, and Claude AI