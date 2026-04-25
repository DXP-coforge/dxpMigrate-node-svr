export interface PathRule {
  path: string;
}
export const MappingOps = {
  ITERATE: '$iterate',
  MAP: '$map'
} as const;

export interface IterateRule {
  [MappingOps.ITERATE]: string;
  [MappingOps.MAP]: {
    [sourceComponentType: string]: {
      targetType: string;
      fields: Record<string, string>;
    };
  };
}

export interface WhenRule {
  $when: {
    path: string;
    equals?: any;
    exists?: boolean;
  };
  then: FieldRule;
}

export type FieldRule =
  | string            // shorthand: "jcr:title"
  | PathRule          // { path: "jcr:title" }
  | IterateRule
  | WhenRule;

export interface TargetMapping {
  targetType: string;
  fields: Record<string, FieldRule>;
}

export interface ContentMapping {
  sourceType: string;

  // Single target (normal mode)
  targetType?: string;
  fields?: Record<string, FieldRule>;

  // Fan-out mode
  fanOut?: boolean;
  targets?: TargetMapping[];
}
