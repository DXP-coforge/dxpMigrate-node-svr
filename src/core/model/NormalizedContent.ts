export interface NormalizedContent {
  id: string;
  /**
   * Logical content type
   * examples:
   *  - aem:page
   *  - optimizely:page
   *  - generic:asset
   */
  type: string;

  /**
   * Normalized, CMS-agnostic fields
   */
  fields: Record<string, any>;

  /**
   * Optional metadata (path, id, locale, etc.)
   */
  meta?: {
    sourceId?: string;
    path?: string;
    locale?: string;

    // Important for target CMS routing
    container?: string;

    // allow extensibility
    [key: string]: any;
  };
}
