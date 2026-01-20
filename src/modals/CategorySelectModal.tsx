import { useState } from "react";
import { getCache } from "../storage/cache";
import { LS_KEYS } from "../storage/localStorage.keys";

interface Props {
  availableCategoryIds?: string[];
  onClose: () => void;
  onGo: (categoryIds: string[]) => void;
}

export const CategorySelectModal = ({
  availableCategoryIds,
  onClose,
  onGo,
}: Props) => {
  const allCategories = (getCache(LS_KEYS.CATEGORIES) as any[]) || [];

  const categories = availableCategoryIds
    ? allCategories.filter((c: any) => availableCategoryIds.includes(c.id))
    : allCategories;

  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-surface rounded-xl w-11/12 max-w-sm p-4">
        <h3 className="mb-4 font-medium">Select Categories</h3>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {categories.map((cat: any) => (
            <label key={cat.id} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selected.includes(cat.id)}
                onChange={() => toggle(cat.id)}
              />
              <span>{cat.name}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg bg-gray-600"
          >
            Cancel
          </button>

          <button
            disabled={!selected.length}
            onClick={() => onGo(selected)}
            className="flex-1 py-2 rounded-lg bg-primary text-black font-semibold disabled:opacity-50"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
};
