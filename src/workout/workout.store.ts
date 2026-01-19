import { create } from "zustand";

interface WorkoutState {
  sessions: any[];
  setSessions: (s: any[]) => void;
}

export const useWorkoutStore = create<WorkoutState>((set) => ({
  sessions: [],
  setSessions: (sessions) => set({ sessions }),
}));
