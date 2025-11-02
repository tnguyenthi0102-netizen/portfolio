export const ACHIEVEMENT_CATEGORIES = [
  'Technical',
  'Education',
  'Certification',
  'Award',
  'Competition',
  'Project',
] as const

export const ACHIEVEMENT_STATUSES = [
  'Pending',
  'In Progress',
  'Completed',
  'Achieved',
  'Verified',
] as const

export type AchievementCategory = (typeof ACHIEVEMENT_CATEGORIES)[number]
export type AchievementStatus = (typeof ACHIEVEMENT_STATUSES)[number]
