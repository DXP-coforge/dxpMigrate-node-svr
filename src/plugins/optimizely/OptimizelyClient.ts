export class OptimizelyClient {
  constructor(private config: any) {}

  async fetchContent(): Promise<any[]> {
    return [];
  }

  async createPage(payload: any): Promise<void> {
    console.log('[Optimizely] Creating page:', payload);
  }
}
