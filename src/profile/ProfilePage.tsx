import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getLatestProfile, saveProfile } from "./profile.service";
import type { ProfileEntry } from "./profile.types";

const SECTIONS: {
  title: string;
  fields: { key: keyof ProfileEntry; label: string }[];
}[] = [
  {
    title: "Upper Body",
    fields: [
      { key: "chest", label: "Chest (cm)" },
      { key: "shoulder", label: "Shoulder (cm)" },
      { key: "left_arm", label: "Left Arm (cm)" },
      { key: "right_arm", label: "Right Arm (cm)" },
    ],
  },
  {
    title: "Lower Body",
    fields: [
      { key: "waist", label: "Waist (cm)" },
      { key: "hips", label: "Hips (cm)" },
      { key: "left_thigh", label: "Left Thigh (cm)" },
      { key: "right_thigh", label: "Right Thigh (cm)" },
    ],
  },
  {
    title: "Other",
    fields: [
      { key: "neck", label: "Neck (cm)" },
      { key: "wrist", label: "Wrist (cm)" },
      { key: "head", label: "Head (cm)" },
    ],
  },
];

const ProfilePage = () => {
  const [form, setForm] = useState<Partial<ProfileEntry>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await getLatestProfile();
      if (data) setForm(data);
      setLoading(false);
    };
    load();
  }, []);

  const update = (key: keyof ProfileEntry, value: string) => {
    setForm((p) => ({
      ...p,
      [key]: key === "name" ? value : value ? Number(value) : undefined,
    }));
  };

  const save = async () => {
    setSaving(true);
    await saveProfile(form);
    setSaving(false);
  };

  if (loading) return null;

  return (
    <div className="p-4 pb-28 space-y-6">
      {/* HEADER */}
      <div className="space-y-1">
        <input
          type="text"
          placeholder="Your name"
          value={form.name ?? ""}
          onChange={(e) => update("name", e.target.value)}
          className="
            w-full
            text-xl
            font-semibold
            bg-transparent
            border-b border-white/10
            focus:outline-none
            pb-1
          "
        />
        <p className="text-xs text-gray-400">
          Profile • {dayjs().format("DD MMM YYYY")}
        </p>
      </div>

      {/* 🔥 BASICS (EXPLICIT HEIGHT ROW) */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-gray-400">Basics</h2>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-[11px] text-gray-400">Height (cm)</label>
            <input
              type="number"
              value={form.height ?? ""}
              onChange={(e) => update("height", e.target.value)}
              className="
                w-full
                p-2
                rounded-lg
                bg-surface
                text-sm
                text-center
              "
            />
          </div>

          <div>
            <label className="text-[11px] text-gray-400">Weight (kg)</label>
            <input
              type="number"
              value={form.weight ?? ""}
              onChange={(e) => update("weight", e.target.value)}
              className="
                w-full
                p-2
                rounded-lg
                bg-surface
                text-sm
                text-center
              "
            />
          </div>

          {/* spacer to keep 3-column symmetry */}
          <div />
        </div>
      </div>

      {/* OTHER SECTIONS */}
      {SECTIONS.map((section) => (
        <div key={section.title} className="space-y-3">
          <h2 className="text-sm font-medium text-gray-400">{section.title}</h2>

          <div className="grid grid-cols-3 gap-3">
            {section.fields.map((f) => (
              <div key={f.key}>
                <label className="text-[11px] text-gray-400">{f.label}</label>
                <input
                  type="number"
                  value={(form[f.key] as number) ?? ""}
                  onChange={(e) => update(f.key, e.target.value)}
                  className="
                    w-full
                    p-2
                    rounded-lg
                    bg-surface
                    text-sm
                    text-center
                  "
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* SAVE */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-bg">
        <button
          onClick={save}
          disabled={saving}
          className="w-full py-3 rounded-xl bg-primary text-black font-semibold"
        >
          {saving ? "Saving…" : "Save Profile"}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
