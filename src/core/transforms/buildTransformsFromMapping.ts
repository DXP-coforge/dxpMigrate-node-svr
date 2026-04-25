import { ContentMapping } from '../mapping/MappingTypes.js';
import { ContentTransform } from './ContentTransform.js';
import { MappingTransform } from './MappingTransform.js';
import { FanOutTransform } from './FanOutTransform.js';
import { AemToOptimizelyTransform } from './AemToOptimizelyTransform.js';
``
export function buildTransformsFromMapping(
  mapping: ContentMapping
): ContentTransform[] {

  // ✅ Validate mapping exists
  if (!mapping) {
    throw new Error("[TransformBuilder] Mapping is undefined");
  }

  // ✅ Validate fields exist
  if (!mapping.fields || Object.keys(mapping.fields).length === 0) {
    throw new Error("[TransformBuilder] Mapping.fields is missing or empty");
  }

  console.log(
    "[TransformBuilder] Building transforms. Field count:",
    Object.keys(mapping.fields).length
  );

  const transforms: ContentTransform[] = [];

  // ✅ Always apply MappingTransform first
  transforms.push(new MappingTransform(mapping));

  // ✅ Apply FanOutTransform only if enabled
  if (mapping.fanOut === true) {
    console.log("[TransformBuilder] Adding FanOutTransform");
    transforms.push(new FanOutTransform(mapping));
  }

  // ✅ Apply AemToOptimizelyTransform only if targets exist
  if (mapping.targets && mapping.targets.length > 0) {
    console.log("[TransformBuilder] Adding AemToOptimizelyTransform");
    transforms.push(new AemToOptimizelyTransform(mapping));
  }

  return transforms;
}
