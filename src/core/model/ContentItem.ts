export interface ContentItem {
  id: string;
  type: string;
  path?: string;
  locale?: string;
  fields: Record<string, any>;
  meta?: Record<string, any>;
}
