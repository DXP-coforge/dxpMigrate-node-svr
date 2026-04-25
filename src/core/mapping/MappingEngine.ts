import {
  ContentMapping,
  FieldRule,
  IterateRule,
  WhenRule,
  PathRule,
  MappingOps
} from "./MappingTypes.js";

export class MappingEngine {

  static apply(source: any, mapping: any): any {

    if (!mapping?.fields)
      throw new Error("Mapping.fields missing");

    return this.mapObject(source, mapping.fields);
  }

  private static mapObject(source: any, rules: any): any {

    const result: any = {};

    for (const key in rules) {

      const rule = rules[key];

      // ✅ STRING PATH
      if (typeof rule === "string") {
        result[key] = this.getValue(source, rule);
      }

      // ✅ CONSTANT
      else if (rule?.type === "constant") {
        result[key] = rule.value;
      }

      // ✅ CONTENT AREA
      else if (rule?.type === "contentArea") {

        const items = this.getValue(source, rule.source) || [];

        result[key] = {
          items: items.map((item: any) => {

            if (item.type === "text") {
              return {
                contentType: "textBlock",
                properties: {
                  text: item.text
                }
              };
            }

            if (item.type === "image") {
              return {
                contentType: "imageBlock",
                properties: {
                  url: item.url,
                  altText: item.altText
                }
              };
            }

            return null;

          }).filter(Boolean)
        };
      }

      // ✅ NESTED OBJECT
      else if (typeof rule === "object") {
        result[key] = this.mapObject(source, rule);
      }

    }

    return result;
  }

  private static getValue(source: any, path: string): any {

    return path.split(".").reduce(
      (obj, key) => obj ? obj[key] : undefined,
      source
    );
  }
}
