export interface AemEnvironmentConfig {
  host: string;
  username: string;
  password: string;
  basePath?: string;
}

export class AemEnvironment {
  readonly baseUrl: string;
  readonly authHeader: string;

  constructor(private readonly config: AemEnvironmentConfig) {
    this.baseUrl = config.host.replace(/\/$/, '');
    this.authHeader =
      'Basic ' +
      Buffer.from(
        `${config.username}:${config.password}`
      ).toString('base64');
  }

  get headers() {
    return {
      Authorization: this.authHeader,
      'Content-Type': 'application/json'
    };
  }

  resolve(path: string): string {
    return `${this.baseUrl}${path}`;
  }
}
