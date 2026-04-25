export class TraceCollector {
  private logs: Array<{
    sourcePath: string;
    value: any;
  }> = [];

  log(sourcePath: string, value: any) {
    this.logs.push({ sourcePath, value });
  }

  getLogs() {
    return this.logs;
  }
}
