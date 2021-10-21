export type Activity = {
  id?: number;
  startTime: Date | null;
  goalTime: Date | null;
  distance: number;
  userId: number;
};

export const initActivity: Activity[] = [
  {
    id: 0,
    startTime: null,
    goalTime: null,
    distance: 0,
    userId: 0,
  },
];
