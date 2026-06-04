export const drivetrainLabels = {
  FOUR_X_FOUR: "4x4",
  FOUR_X_TWO: "4x2",
} as const;

export type DrivetrainKey = keyof typeof drivetrainLabels;
