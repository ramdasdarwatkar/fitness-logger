import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { BODY_METRICS } from "./metrics.config";
import type { MetricConfig } from "./progress.types";
import { getMetricHistory } from "./progress.service";
import { formatMetricValue } from "./progress.utils";
import { ProgressLineChart } from "../shared/charts/ProgressLineChart";

const ProgressPage = () => {
  const [metric, setMetric] = useState<MetricConfig>(BODY_METRICS[0]);
  const [history, setHistory] = useState<{ date: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await getMetricHistory(metric.key);
      setHistory(data);
      setLoading(false);
    };

    load();
  }, [metric]);

  return (
    <div className="p-4 space-y-6">
      {/* HEADER */}
      <h1 className="text-lg font-semibold">Progress</h1>

      {/* METRIC SELECTOR */}
      <select
        value={metric.key}
        onChange={(e) => {
          const selected = BODY_METRICS.find((m) => m.key === e.target.value);
          if (selected) setMetric(selected);
        }}
        className="w-full p-3 rounded-xl bg-surface"
      >
        {BODY_METRICS.map((m) => (
          <option key={m.key} value={m.key}>
            {m.label}
          </option>
        ))}
      </select>

      {/* CHART */}
      {!loading && history.length > 0 && (
        <ProgressLineChart data={history} metric={metric} />
      )}

      {/* HISTORY */}
      <div className="space-y-2">
        <h2 className="text-sm font-medium text-gray-400">History</h2>

        {loading && <p className="text-sm text-gray-500">Loading…</p>}

        {!loading && history.length === 0 && (
          <p className="text-sm text-gray-500">No data recorded yet.</p>
        )}

        {!loading &&
          history
            .slice()
            .reverse()
            .map((row) => {
              const formatted = formatMetricValue(metric, row.value);

              return (
                <div
                  key={row.date}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-400">
                    {dayjs(row.date).format("DD MMM YYYY")}
                  </span>

                  <span className="font-medium">
                    {formatted.value} {formatted.unit}
                  </span>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default ProgressPage;
