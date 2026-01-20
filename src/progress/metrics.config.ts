import type { MetricConfig } from "./progress.types";

export const BODY_METRICS: MetricConfig[] = [
  {
    key: "weight",
    label: "Weight",
    unit: "kg",
    requiresConversion: false,
  },
  {
    key: "height",
    label: "Height",
    unit: "in",
    requiresConversion: true,
  },
  {
    key: "chest",
    label: "Chest",
    unit: "in",
    requiresConversion: true,
  },
  {
    key: "waist",
    label: "Waist",
    unit: "in",
    requiresConversion: true,
  },
  {
    key: "hips",
    label: "Hips",
    unit: "in",
    requiresConversion: true,
  },
  {
    key: "shoulder",
    label: "Shoulder",
    unit: "in",
    requiresConversion: true,
  },
  {
    key: "left_arm",
    label: "Left Arm",
    unit: "in",
    requiresConversion: true,
  },
  {
    key: "right_arm",
    label: "Right Arm",
    unit: "in",
    requiresConversion: true,
  },
  {
    key: "left_thigh",
    label: "Left Thigh",
    unit: "in",
    requiresConversion: true,
  },
  {
    key: "right_thigh",
    label: "Right Thigh",
    unit: "in",
    requiresConversion: true,
  },
  {
    key: "neck",
    label: "Neck",
    unit: "in",
    requiresConversion: true,
  },
  {
    key: "wrist",
    label: "Wrist",
    unit: "in",
    requiresConversion: true,
  },
  {
    key: "head",
    label: "Head",
    unit: "in",
    requiresConversion: true,
  },
];
