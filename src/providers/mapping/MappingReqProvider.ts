import { ContentMapping } from "../../core/mapping/MappingTypes.js";
import { Request } from "express";

export interface MappingReqProvider {
  getMapping(request: Request): Promise<ContentMapping>;
}
