export const MARKETPLACE_TEMPLATES = [
  {
    id: "modern",
    name: "Modern",
    description: "Left-aligned header with a sky accent. Default Vita Forge layout.",
    layout: "modern",
    accent: "#0ea5e9",
    font: "helvetica",
    category: "Professional",
    icon: "✨",
  },
  {
    id: "basic",
    name: "Basic",
    description: "Centered header and a clean, conservative look for ATS screens.",
    layout: "basic",
    accent: "#334155",
    font: "helvetica",
    category: "Professional",
    icon: "📋",
  },
  {
    id: "executive",
    name: "Executive",
    description: "Modern layout with a navy accent for leadership roles.",
    layout: "modern",
    accent: "#1e3a5f",
    font: "helvetica",
    category: "Leadership",
    icon: "👔",
  },
  {
    id: "compact",
    name: "Compact",
    description: "Basic layout with an emerald accent for dense, one-page resumes.",
    layout: "basic",
    accent: "#047857",
    font: "helvetica",
    category: "Minimal",
    icon: "📄",
  },
  {
    id: "academic",
    name: "Academic",
    description: "Modern layout with a burgundy accent for research and teaching CVs.",
    layout: "modern",
    accent: "#9f1239",
    font: "times",
    category: "Education",
    icon: "🎓",
  },
];

export function getMarketplaceTemplate(id) {
  return MARKETPLACE_TEMPLATES.find((template) => template.id === id) || MARKETPLACE_TEMPLATES[0];
}

export function applyMarketplaceTemplate(meta, id) {
  const template = getMarketplaceTemplate(id);
  return {
    ...meta,
    template: template.id,
    layout: template.layout,
    accent: template.accent,
    font: template.font,
  };
}
