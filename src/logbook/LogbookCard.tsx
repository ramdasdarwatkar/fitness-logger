interface Props {
  exerciseName: string;
  rows: any[];
}

const formatDuration = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s}s`;
};

const formatDistance = (km: number) => {
  if (km >= 1) {
    const whole = Math.floor(km);
    const meters = Math.round((km - whole) * 1000);
    return meters ? `${whole} km ${meters} m` : `${whole} km`;
  }
  return `${Math.round(km * 1000)} m`;
};

export const LogbookCard = ({ exerciseName, rows }: Props) => {
  return (
    <div className="rounded-2xl bg-surface p-4 shadow-sm">
      <h3 className="font-medium mb-3">{exerciseName}</h3>

      <div className="space-y-2 text-sm">
        {rows.map((r, i) => (
          <div key={r.id} className="flex justify-between text-gray-300">
            <span className="text-gray-400">Set {r.sets || i + 1}</span>

            <div className="flex gap-3 font-medium">
              {r.weight != null && <span>{r.weight} kg</span>}
              {r.reps != null && <span>{r.reps} reps</span>}
              {r.duration != null && <span>{formatDuration(r.duration)}</span>}
              {r.distance != null && <span>{formatDistance(r.distance)}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
