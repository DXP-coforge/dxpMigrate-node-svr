
export class AEMClient {
  constructor() {}

  async getPages(): Promise<any[]> {
    // Simulated AEM response
    return [
      {
        path: '/content/site/en/home',
        title: 'Home',
        seo: { title: 'Home Page' }
      }
    ];
  }

  async createPage(payload: any): Promise<void> {
    console.log('[AEM] Creating page:', payload);
  }
}
