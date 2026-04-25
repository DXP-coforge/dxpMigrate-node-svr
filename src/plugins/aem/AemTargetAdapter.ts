import { TargetCMSAdapter } from '../../core/adapters/TargetCMSAdapter.js';
import { MigrationContext } from '../../core/context/MigrationContext.js';
import { AEMClient } from './AemClient.js';
import { NormalizedContent } from '../../core/model/NormalizedContent.js';

export class AEMTargetAdapter implements TargetCMSAdapter {
  constructor(private client: AEMClient) {}

  async writeContent(
    content: NormalizedContent,
    context: MigrationContext
  ): Promise<void> {

    const fields = content.fields || {};
    const meta = content.meta || {};

    if (!meta.container) {
      throw new Error(
        `Missing container in meta for content: ${meta.sourceId || "unknown"}`
      );
    }

    if (!content.type) {
      throw new Error(
        `Missing content type for content: ${meta.sourceId || "unknown"}`
      );
    }

    // Extract contentType from "optimizely:standardPage"
    const contentType = content.type.includes(":")
      ? content.type.split(":")[1]
      : content.type;

    const { sections, ...baseFields } = fields;

    let mainContentArea;

    if (Array.isArray(sections) && sections.length > 0) {
      mainContentArea = {
        items: sections.map((section: any) => {
          const { type, ...props } = section;

          if (!type) {
            throw new Error("Section missing type property");
          }

          return {
            contentType: type,
            properties: props
          };
        })
      };
    }

    const payload = {
      displayName: baseFields.title || "",
      contentType,
      container: meta.container,
      locale: meta.locale || "en",
      properties: {
        ...baseFields,
        ...(mainContentArea && { mainContentArea })
      }
    };

    await this.client.createPage(payload);
  }

}
