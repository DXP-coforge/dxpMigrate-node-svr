import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { MigrationJobRunner } from '../execution/MigrationJobRunner.js';

@injectable()
export class MigrationController {
  constructor(
    private readonly runner: MigrationJobRunner
  ) {}

  async migrate(req: Request, res: Response) {
    const result = await this.runner.run(req.body);

    res.status(202).json({
      status: 'accepted',
      //jobId: result.jobId
    });
  }
}
