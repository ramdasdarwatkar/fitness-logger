import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface DataPoint {
  month: string; // YYYY-MM
  value: number;
}

interface Props {
  data: DataPoint[];
  metricLabel: string;
  prValue?: number | null;
}

const formatMonthShort = (month: string) => {
  const [year, monthIndex] = month.split("-");
  return new Date(Number(year), Number(monthIndex) - 1).toLocaleString("en", {
    month: "short",
  });
};

const formatMonthYear = (month: string) => {
  const [year] = month.split("-");
  return `${formatMonthShort(month)}-${year.slice(2)}`;
};

export const MonthlyLineChart = ({ data, metricLabel, prValue }: Props) => {
  if (!data.length) {
    return (
      <div className="h-40 flex items-center justify-center text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <div>
      {/* TOP LABEL */}
      <p className="text-sm text-gray-400 mb-2">{metricLabel}</p>

      {/* SCROLLABLE CHART */}
      <div className="overflow-x-auto">
        <div style={{ minWidth: data.length * 80 }} className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.08)" />

              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="month"
                tickFormatter={formatMonthShort}
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                width={32}
              />

              <Tooltip
                cursor={false}
                contentStyle={{
                  background: "#020617",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
                labelFormatter={(label) =>
                  typeof label === "string" ? formatMonthYear(label) : ""
                }
                formatter={(value) => (typeof value === "number" ? value : "")}
              />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#22c55e"
                strokeWidth={2.5}
                fill="url(#lineGradient)"
                dot={({ cx, cy, payload }) => {
                  const isPR = prValue != null && payload.value === prValue;

                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isPR ? 6 : 4}
                      fill={isPR ? "#22c55e" : "#020617"}
                      stroke="#22c55e"
                      strokeWidth={2}
                    />
                  );
                }}
                activeDot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
