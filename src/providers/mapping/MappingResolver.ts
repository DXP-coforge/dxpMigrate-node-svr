import { injectable, inject } from "tsyringe";
import { MappingProvider } from "./MappingProvider.js";
import { TOKENS } from "../../core/di/tokens.js";
import { ContentMapping } from "../../core/mapping/MappingTypes.js";

@injectable()
export class MappingResolver {

  constructor(
    @inject(TOKENS.MappingProvider)
    private readonly provider: MappingProvider
  ) {}

  async resolve(input: {
    mapping?: ContentMapping;
    mappingId?: string;
  }): Promise<ContentMapping> {

    if (input.mapping) {
      return input.mapping;
    }

    if (input.mappingId) {
      return this.provider.getMapping(input.mappingId);
    }

    throw new Error("Either mapping or mappingId must be provided");
  }
}
