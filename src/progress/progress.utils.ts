import type { MetricConfig } from "./progress.types";

export const CM_TO_IN = 2.54;

export const cmToInches = (cm: number) => Number((cm / CM_TO_IN).toFixed(2));

export const formatMetricValue = (config: MetricConfig, rawValue: number) => {
  if (!config.requiresConversion) {
    return {
      value: rawValue,
      unit: config.unit,
    };
  }

  return {
    value: cmToInches(rawValue),
    unit: config.unit,
  };
};
