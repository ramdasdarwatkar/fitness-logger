export type BodyMetricKey =
  | "weight"
  | "height"
  | "chest"
  | "waist"
  | "hips"
  | "shoulder"
  | "left_arm"
  | "right_arm"
  | "left_thigh"
  | "right_thigh"
  | "neck"
  | "wrist"
  | "head";

export interface ProgressPoint {
  date: string; // YYYY-MM-DD
  value: number; // raw DB value (kg or cm)
}

export interface MetricConfig {
  key: BodyMetricKey;
  label: string;
  unit: "kg" | "in";
  requiresConversion: boolean;
}
