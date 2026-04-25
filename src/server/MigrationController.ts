import { injectable, inject } from "tsyringe";
import { Request, Response } from "express";
import crypto from "crypto";

import { MigrationEngine } from "../core/engine/MigrationEngine.js";
import { MigrationContext } from "../core/context/MigrationContext.js";
import { MappingResolver } from "../providers/mapping/MappingResolver.js";

@injectable()
export class MigrationController {

  constructor(
    private readonly engine: MigrationEngine,
    private readonly mappingResolver: MappingResolver
  ) {}

  async migrate(req: Request, res: Response) {
    try {
      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      if (!files?.source?.[0]) {
        return res.status(400).json({ error: "Source file required" });
      }

      // 🔥 Parse source JSON from file buffer
      const source = JSON.parse(
        files.source[0].buffer.toString("utf-8")
      );

      let resolvedMapping;

      // Case 1: mapping file uploaded
      if (files?.mapping?.[0]) {
        resolvedMapping = JSON.parse(
          files.mapping[0].buffer.toString("utf-8")
        );
      }
      // Case 2: mappingId provided
      else if (req.body.mappingId) {
        resolvedMapping = await this.mappingResolver.resolve({
          mappingId: req.body.mappingId
        });
      }
      else {
        return res.status(400).json({
          error: "Provide mapping file OR mappingId"
        });
      }

      const context = new MigrationContext(
        resolvedMapping,
        crypto.randomUUID()
      );
console.log("SSSSSS ", source)
      const result = await this.engine.executeSingle(
        source,
        context
      );
console.log("VVVVVVVV ", result)
      return res.json({
        jobId: context.jobId,
        result
      });

    } catch (error: any) {
      return res.status(500).json({
        error: "Migration failed",
        message: error.message
      });
    }
  }
}
