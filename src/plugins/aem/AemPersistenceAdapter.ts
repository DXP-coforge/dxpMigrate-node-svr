
import { AemEnvironment } from "./AemEnvironmentConfig.js";

export class AemPersistenceAdapter {
  private operations: Array<() => Promise<void>> = [];

  constructor(private readonly env: AemEnvironment) {}

  createNode(
    path: string,
    primaryType: string,
    properties: Record<string, any>
  ): void {
    this.operations.push(async () => {
      await fetch(this.env.resolve(path), {
        method: 'POST',
        headers: this.env.headers,
        body: JSON.stringify({
          'jcr:primaryType': primaryType,
          ...properties
        })
      });
    });
  }

  async exists(path: string): Promise<boolean> {
    const res = await fetch(this.env.resolve(path), {
      method: 'HEAD',
      headers: this.env.headers
    });

    return res.status === 200;
  }

  async commit(): Promise<void> {
    for (const op of this.operations) {
      await op();
    }
    this.operations = [];
  }
}
