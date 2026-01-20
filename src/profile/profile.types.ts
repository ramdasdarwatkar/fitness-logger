export interface ProfileEntry {
  id: number;
  user_id: string;
  input_date: string;

  name?: string;

  weight?: number;
  height?: number;
  waist?: number;
  chest?: number;
  shoulder?: number;
  hips?: number;

  left_arm?: number;
  right_arm?: number;
  left_thigh?: number;
  right_thigh?: number;

  wrist?: number;
  neck?: number;
  head?: number;
}
