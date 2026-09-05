export interface MarketplaceTemplateDefinition {
  id: string;
  name: string;
  description: string;
  layout: 'modern' | 'basic';
  accent: string;
  font: string;
  category: string;
  icon: string;
}

export const MARKETPLACE_TEMPLATES: MarketplaceTemplateDefinition[];

export function getMarketplaceTemplate(id: string): MarketplaceTemplateDefinition;

export function applyMarketplaceTemplate(
  meta: Record<string, unknown> | undefined,
  id: string,
): Record<string, unknown>;
