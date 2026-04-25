import { MappingModel } from "../../infrastructure/db.js";

export class DBMappingProvider {
  async getMapping(id: string) {
    const record = await MappingModel.findOne({ mappingId: id });
    if (!record) throw new Error("Mapping not found");
    return record.mapping;
  }
}
