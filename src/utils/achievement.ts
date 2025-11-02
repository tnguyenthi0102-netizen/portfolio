import { z } from 'zod'
import type { TodoItem } from '@/data/achievement'

export const todoItemSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  title: z.string().min(1, 'Todo title is required'),
  done: z.boolean(),
})

export const achievementSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  todos: z.array(todoItemSchema),
})

export type AchievementFormData = z.infer<typeof achievementSchema>

export function calculateProgress(todos?: TodoItem[]): number {
  if (!todos || todos.length === 0) return 0
  const completedCount = todos.filter(todo => todo.done).length
  return Math.round((completedCount / todos.length) * 100)
}

