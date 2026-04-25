
export interface SourceCMSAdapter {
  fetchContent(query?: any): Promise<any[]>;
}
