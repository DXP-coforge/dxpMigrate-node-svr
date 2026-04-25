import { ContentMapping } from "../../core/mapping/MappingTypes.js";
import { Request } from "express";

export interface MappingProvider {
  getMappingReq(request: Request): Promise<ContentMapping>;
  getMapping(mappingId: string): Promise<ContentMapping>;
}
