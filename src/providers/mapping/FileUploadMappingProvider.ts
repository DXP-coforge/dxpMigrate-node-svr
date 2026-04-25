import { MappingReqProvider } from "./MappingReqProvider.js";
import { ContentMapping } from "../../core/mapping/MappingTypes.js";
import { Request } from "express";

export class FileUploadMappingProvider implements MappingReqProvider {
  async getMapping(req: Request): Promise<ContentMapping> {
    const file = (req.files as any)?.mapping?.[0];
    if (!file) {
      throw new Error("Mapping file is required");
    }
    return JSON.parse(file.buffer.toString("utf-8"));
  }
}
