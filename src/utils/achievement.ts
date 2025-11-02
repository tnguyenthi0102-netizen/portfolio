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

export function filterValidTodos<T extends { title?: string }>(todos: T[]): T[] {
  return todos.filter(todo => todo.title && todo.title.trim() !== '')
}

type TodoComparable = {
  title: string
  done: boolean
  id?: string | number
}

type AchievementComparable = {
  title?: string
  description?: string
  category?: string
  todos?: TodoComparable[]
}

export function areValuesEqual(
  val1: AchievementComparable,
  val2: AchievementComparable
): boolean {
  if (val1.title !== val2.title) return false
  if (val1.description !== val2.description) return false
  if (val1.category !== val2.category) return false

  const todos1 = val1.todos || []
  const todos2 = val2.todos || []
  if (todos1.length !== todos2.length) return false

  for (let i = 0; i < todos1.length; i++) {
    const todo1 = todos1[i]
    const todo2 = todos2[i]
    if (todo1.title !== todo2.title || todo1.done !== todo2.done) {
      return false
    }
  }

  return true
}

