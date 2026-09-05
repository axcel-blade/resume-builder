export interface MarketplaceTemplate {
  id: string;
  name: string;
  description: string;
  layout: 'modern' | 'basic';
  accent: string;
  font: string;
  category: string;
}

export const TEMPLATE_CATALOG: MarketplaceTemplate[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Left-aligned header with a sky accent. Default Vita Forge layout.',
    layout: 'modern',
    accent: '#0ea5e9',
    font: 'helvetica',
    category: 'Professional',
  },
  {
    id: 'basic',
    name: 'Basic',
    description: 'Centered header and a clean, conservative look for ATS screens.',
    layout: 'basic',
    accent: '#334155',
    font: 'helvetica',
    category: 'Professional',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Modern layout with a navy accent for leadership roles.',
    layout: 'modern',
    accent: '#1e3a5f',
    font: 'helvetica',
    category: 'Leadership',
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Basic layout with an emerald accent for dense, one-page resumes.',
    layout: 'basic',
    accent: '#047857',
    font: 'helvetica',
    category: 'Minimal',
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Modern layout with a burgundy accent for research and teaching CVs.',
    layout: 'modern',
    accent: '#9f1239',
    font: 'times',
    category: 'Education',
  },
];
