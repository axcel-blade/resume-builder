# 📄 Vita Forge

A React resume builder with a paginated A4 preview, two templates, AI-assisted summary writing, a selectable font family, and a vector PDF export with searchable text and clickable links.

Built to comply with the formatting guidance in the **Curtin Careers Resume Workbook** out of the box: 0.75–1" margins, sans-serif body type, abbreviated month-year dates, reverse-chronological ordering within sections, paragraph-style key skills, and row-by-row referee details.

## ✨ Features

- **👁️ Live A4 preview** that mirrors the exported PDF page-for-page
- **🎨 Two templates** — Modern (left-aligned) and Basic (centered)
- **🔤 Selectable font family** — sans-serif fonts recommended by the workbook (Helvetica, Arial, Calibri, Verdana) plus serif options (Georgia, Times New Roman)
- **🤖 AI summary** — generate or rewrite your career objective from your resume data using Claude
- **📑 Ten resume sections** in the standard professional order:
  1. Profile (Personal Details + Career Objective)
  2. Professional Experience
  3. Education
  4. Projects
  5. Key Skills *(group title + paragraph, functional-resume style)*
  6. Achievements and Awards
  7. Volunteer Work
  8. Certificates & Licenses
  9. Interests
  10. References *(mandatory — falls back to "References available on request.")*
- **📐 Format-compliant by default** — 20 mm margins, `Jun 2022 – Present` date formatting, auto reverse-chronological sort on dated sections, consistent bullet periods per section
- **🎯 Accent color picker** applied to name, headings, and section rules
- **📄 Vector PDF export** — selectable, copyable, searchable text and clickable hyperlinks via jsPDF; the PDF mirrors the live preview exactly
- **💾 JSON import / export** for backup and reload
- **🔄 Reorderable entries** within every section (↑/↓ buttons)
- **⌨️ Quick bullet entry** — press Enter to add and clear the input

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| jsPDF | Vector PDF generation |
| Claude API (Anthropic) | AI summary generation |
| Vercel Serverless Functions | Secure API proxy for Claude |

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Anthropic API key (for AI summary) — get one at [console.anthropic.com](https://console.anthropic.com)

### Installation

```bash
git clone https://github.com/axcel-blade/vita-forge.git
cd vita-forge
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

### Environment

Create a `.env` file in the project root:

```env
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

> ⚠️ Never commit `.env` — it's already in `.gitignore`.

### Production build

```bash
npm run build
npm run preview
```

## 📖 Usage

1. **Pick a template, font, and accent color** — Modern or Basic, any sans-serif or serif font, any hex value
2. **Profile** — name, title, contact, links
3. **Career Objective** — write your own or click **✦ Generate with AI** (becomes **✦ Rewrite with AI** once content exists)
4. **Add the sections you need** — Experience, Education, Projects, Skills, Achievements, Volunteer Work, Certificates, Interests. Empty sections stay hidden from the resume
5. **References** — leave empty for "References available on request" or add named referees with name, position, organization, phone, and email
6. **Preview** — paginated A4, navigate with arrows or keyboard
7. **Export** — **Save as PDF** for the deliverable or **Export JSON** for backup

### Keyboard

| Key | Action |
|---|---|
| `←` / `↑` | Previous preview page |
| `→` / `↓` | Next preview page |
| `Enter` (in bullet input) | Add bullet & clear |

## 📁 Project Structure

```
├── api/
│   └── generate_summary.js              # Vercel serverless proxy for Claude
├── src/
│   ├── components/
│   │   ├── editors/
│   │   │   ├── ResumeEditor.jsx         # Template + font selector + editor container
│   │   │   ├── ProfileEditor.jsx        # Name, contact, links, AI summary
│   │   │   ├── ExperienceEditor.jsx
│   │   │   ├── EducationEditor.jsx
│   │   │   ├── ProjectsEditor.jsx
│   │   │   ├── SkillsEditor.jsx
│   │   │   ├── AchievementsEditor.jsx
│   │   │   ├── VoluntaryEditor.jsx
│   │   │   ├── CertificatesEditor.jsx
│   │   │   ├── InterestsEditor.jsx
│   │   │   ├── ReferencesEditor.jsx
│   │   │   └── BulletsEditor.jsx        # Reusable bullet list
│   │   ├── preview/
│   │   │   └── A4PaginatedPreview.jsx   # Paginated 20 mm-margin live preview
│   │   ├── TemplateModern.jsx           # Left-aligned header
│   │   ├── TemplateBasic.jsx            # Centered header
│   │   ├── TemplateSharedParts.jsx      # Section blocks, FONT_FAMILIES, References, Interests
│   │   ├── Toolbar.jsx                  # Accent picker, PDF export, JSON I/O
│   │   └── SharedInputs.jsx             # Label, Text, TextArea, IconButton, SectionCard
│   ├── data/
│   │   └── defaultData.js               # Sample resume data (every section populated)
│   ├── utils/
│   │   └── format.js                    # Date / sort / bullet helpers (preview ↔ PDF parity)
│   ├── App.jsx                          # Editor + preview layout
│   ├── main.jsx
│   └── index.css                        # Tailwind directives
```

## 🔤 Typography

Vita Forge ships seven font choices, grouped by the workbook's recommendation:

**Recommended (sans-serif)** — Helvetica Neue, Arial, Calibri, Verdana
**Other** — Tahoma, Georgia, Times New Roman

The Curtin Careers Resume Workbook (p.24) recommends sans-serif fonts for resumes because they're easier to read on screen and in print. The picker shows each option in its own typeface so you can compare before committing.

The selected font applies live to the preview and is honoured by the PDF export. *Note:* jsPDF only ships with three built-in fonts (helvetica, times, courier), so the PDF maps sans-serif choices to **helvetica** and serif choices to **times** — preserving your sans-vs-serif intent even if it can't render the exact face.

## 🤖 AI Summary

Uses Claude to write or rewrite a 2–4 sentence career objective from your full resume data (experience, education, projects, skills, achievements).

- Empty Career Objective field → button shows **✦ Generate with AI** (blue)
- Existing content → button shows **✦ Rewrite with AI** (amber)
- During generation → spinner, button disabled

The result is fully editable.

### Vercel deployment

1. **Vercel Dashboard → Settings → Environment Variables** → add:
   ```
   ANTHROPIC_API_KEY = sk-ant-your-key-here
   ```
2. `api/generate_summary.js` proxies the call. Your API key never reaches the browser.

## 🎨 Templates

**Modern ✨** — Left-aligned name, title, and contact. Clean horizontal flow. Suits tech and creative roles.

**Basic 📋** — Centered name, title, contact, and links. Suits traditional industries.

Both share an identical body and produce visually-matching previews and PDFs.

## 📐 Format Compliance

Vita Forge enforces the Curtin Careers Resume Workbook formatting requirements automatically — you don't have to think about them:

| Rule | How it's enforced |
|---|---|
| 0.75–1" page margins | 20 mm (≈ 0.79") on all four sides, applied identically in preview and PDF |
| Sans-serif body type | Default font is Helvetica Neue; recommended alternatives (Arial, Calibri, Verdana) flagged in the picker |
| Abbreviated month-year dates (`Jun 2022`) | All `YYYY-MM` inputs are formatted through one helper before render |
| Consistent ` – ` separator with single spaces | Same helper, no per-template variation |
| Reverse-chronological order | Experience, Education, Projects, Volunteer Work sorted by `start` desc; Certificates by `year` desc |
| Per-section bullet style | Prose sections end every bullet with a period; Interests render as a single inline pipe-separated line |
| Paragraph-style Key Skills | Each skill group renders as bold theme heading + paragraph (functional/business resume style, workbook p.36 & p.46) |
| Row-by-row Referees | Name → Position → Organization → Tel → Email, each on its own row |
| Mandatory References | Always rendered — falls back to "References available on request." when no referees added |
| Standard professional section order | Profile → Experience → Education → Projects → Skills → Achievements → Volunteer → Certificates → Interests → References |

All of this lives in [`src/utils/format.js`](./src/utils/format.js) and [`src/components/TemplateSharedParts.jsx`](./src/components/TemplateSharedParts.jsx) so the React preview and the jsPDF builder stay locked together.

## 📄 PDF Export

Generated entirely with **jsPDF text drawing** — no canvas screenshots:

- ✅ Selectable, copyable, searchable text
- ✅ Clickable hyperlinks
- ✅ Crisp at any zoom
- ✅ Small file size
- ✅ Template-aware — Modern and Basic produce distinct PDFs matching their previews
- ✅ Section order, headings, paragraph skills, and row-by-row references all match the website exactly

## 🔧 Data Format

Resume data is one JSON object — exportable, editable, re-importable.

```js
{
  meta: {
    template: "modern",          // "modern" | "basic"
    accent: "#0ea5e9",           // any hex
    font: "helvetica"            // "helvetica" | "arial" | "calibri" | "verdana" | "tahoma" | "georgia" | "times"
  },
  profile: {
    fullName: "Jane Doe",
    title: "Software Engineer",
    email: "jane@example.com",
    phone: "+1 555 000 0000",
    location: "New York, NY",
    website: "janedoe.dev",
    summary: "..."               // rendered as "Career Objective"
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
      start: "2022-01",          // YYYY-MM — rendered as "Jan 2022"
      end: "Present",
      bullets: ["Built X.", "Shipped Y."]
    }
  ],
  education:    [/* { id, degree, school, location, start, end, bullets } */],
  projects:     [/* { id, title, organization, start, end, bullets } */],
  skillGroups: [
    {
      id: "skill1",
      title: "Communication",     // bold theme heading
      bullets: [                  // joined into one paragraph at render time
        "Confident speaker with experience presenting to executive audiences.",
        "Strong written communication evidenced by published technical articles."
      ]
    }
  ],
  achievements: [/* { id, title, organization, year, bullets } */],
  voluntary:    [/* same shape as experience, with `organization` instead of `company` */],
  certificates: [
    {
      id: "cert1",
      title: "AWS Solutions Architect — Professional",
      issuer: "Amazon Web Services",
      year: "2023",
      expiry: "2026-06",         // optional
      credentialId: "AWS-PSA-92347",  // optional
      bullets: []
    }
  ],
  interests: ["Trail running", "Open-source contribution"],
  references: [
    // empty array → "References available on request."
    // populated → each row stacks: Name (bold) → Title → Organization → Tel → Email
    {
      id: "ref1",
      name: "Dr. Marcus Chen",
      title: "VP of Engineering",
      organization: "CloudVenture Technologies",
      email: "marcus.chen@example.com",
      phone: "+1 (555) 871-2034"
    }
  ]
}
```

Sections render only when their array has at least one populated entry. The exception is `references`, which always renders and uses the fallback line when empty.

> 💡 **Skill bullets are sentences, not single words.** Because the Skills section renders as a paragraph, each bullet should be a full sentence. Short labels like `"Python"` or `"React"` will read awkwardly when joined into prose.

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

- **AI Summary** — fill in experience and skills first; the AI uses them as context
- **Reorder** — every list section has ↑/↓ on each entry
- **Quick bullets** — type, Enter, type, Enter
- **Skill bullets are prose** — write full sentences; they're joined into a paragraph
- **Backup often** — there's no server-side storage; **Export JSON** is your save button
- **Accent color** — applies to the name, every heading, and every section rule
- **Font choice** — sans-serif (Helvetica, Arial, Calibri, Verdana) is recommended for screen and print legibility
- **Hide a section** — clear all its entries; the heading disappears too

## 🐛 Known Limitations

- No spell check (browser-level only)
- No images or photos
- No cloud sync — use JSON export
- AI summary requires an Anthropic API key + Vercel deployment
- PDF font fidelity is limited to jsPDF's built-in faces — your sans-vs-serif choice is honoured but not the exact font face

## 🚀 Planned

- [ ] Sidebar two-column template
- [ ] Cover letter editor and export
- [ ] ATS keyword checker
- [ ] AI bullet-point suggestions per experience entry
- [ ] Embedded TTF fonts for pixel-exact PDF font matching
- [ ] More template designs
- [ ] Dark mode

## 📄 License

MIT — see [LICENSE](LICENSE).

## 🤝 Contributing

Pull requests welcome. For major changes, open an issue first to discuss.

## 🙏 Acknowledgements

Formatting guidelines and section conventions adapted from the [Curtin Careers Resume Workbook](https://www.curtin.edu.au/students/essentials/careers/), produced by Curtin University Careers, Employment & Leadership.