import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceDot,
} from "recharts";
import dayjs from "dayjs";
import type { MetricConfig } from "../../progress/progress.types";
import { formatMetricValue } from "../../progress/progress.utils";

interface Props {
  data: { date: string; value: number }[];
  metric: MetricConfig;
}

export const ProgressLineChart = ({ data, metric }: Props) => {
  if (data.length === 0) return null;

  // Convert values for UI
  const chartData = data.map((d) => {
    const formatted = formatMetricValue(metric, d.value);
    return {
      date: d.date,
      displayDate: dayjs(d.date).format("MMM YY"),
      value: formatted.value,
    };
  });

  // PR (highest value)
  const pr = Math.max(...chartData.map((d) => d.value));
  const prPoint = chartData.find((d) => d.value === pr);

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#22c55e" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#1f2933"
          />

          <XAxis
            dataKey="displayDate"
            tick={{ fill: "#9ca3af", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: "#9ca3af", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={40}
          />

          <Tooltip
            cursor={false}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const p = payload[0].payload;
              return (
                <div className="bg-surface px-3 py-2 rounded-lg text-xs">
                  <div className="text-gray-400">{p.displayDate}</div>
                  <div className="font-semibold">
                    {p.value} {metric.unit}
                  </div>
                </div>
              );
            }}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#22c55e"
            strokeWidth={2}
            dot={{ r: 3, fill: "#22c55e" }}
            activeDot={{ r: 5 }}
            fill="url(#lineFill)"
          />

          {prPoint && (
            <ReferenceDot
              x={prPoint.displayDate}
              y={prPoint.value}
              r={6}
              fill="#facc15"
              stroke="none"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
