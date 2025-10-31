import { z } from 'zod'

export const achievementSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  status: z.string().min(1, 'Status is required'),
})

export type AchievementFormData = z.infer<typeof achievementSchema>

