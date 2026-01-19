interface Props {
  index: number;
  metrics: Record<string, boolean>;
  data: any;
  onChange: (key: string, value: number) => void;
  onAdd?: () => void;
}

export const SetRow = ({ index, metrics, data, onChange, onAdd }: Props) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-10 text-gray-400">{index + 1}</span>

      {metrics.weight && (
        <input
          type="number"
          placeholder="kg"
          className="input"
          value={data.weight || ""}
          onChange={(e) => onChange("weight", +e.target.value)}
        />
      )}

      {metrics.reps && (
        <input
          type="number"
          placeholder="reps"
          className="input"
          value={data.reps || ""}
          onChange={(e) => onChange("reps", +e.target.value)}
        />
      )}

      {metrics.duration && (
        <input
          type="number"
          placeholder="sec"
          className="input"
          value={data.duration || ""}
          onChange={(e) => onChange("duration", +e.target.value)}
        />
      )}

      {metrics.distance && (
        <input
          type="number"
          placeholder="km"
          className="input"
          value={data.distance || ""}
          onChange={(e) => onChange("distance", +e.target.value)}
        />
      )}

      {onAdd && (
        <button
          onClick={onAdd}
          className="px-2 py-1 rounded bg-primary text-black"
        >
          +
        </button>
      )}
    </div>
  );
};
