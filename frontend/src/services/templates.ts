import { apiRequest } from './http';
import { MARKETPLACE_TEMPLATES } from '../constants/templates';

export interface MarketplaceTemplate {
  id: string;
  name: string;
  description: string;
  layout: 'modern' | 'basic';
  accent: string;
  font: string;
  category: string;
}

/** Prefer API catalog; fall back to bundled constants if the backend is offline. */
export async function listTemplates(): Promise<MarketplaceTemplate[]> {
  try {
    return await apiRequest<MarketplaceTemplate[]>('/templates', { method: 'GET' });
  } catch {
    return MARKETPLACE_TEMPLATES;
  }
}
