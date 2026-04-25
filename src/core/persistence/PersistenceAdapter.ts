export interface PersistenceAdapter {
  save(content: any): Promise<void>;
}
