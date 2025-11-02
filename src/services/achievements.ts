import type { Achievement, AchievementCreateInput, AchievementUpdateInput, AchievementListParams, AchievementListResponse } from '@/data/achievement'
import { api } from '@/services/api'
import { calculateProgress } from '@/utils/achievement'

export async function getAchievements(params: AchievementListParams = {}): Promise<AchievementListResponse> {
  const queryParams: Record<string, string> = {}

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams[key] = value.toString()
    }
  })

  const queryString = new URLSearchParams(queryParams).toString()
  const { data } = await api.get<any>(`?${queryString}`)
  return data
}

export async function getAchievement(id: string): Promise<Achievement> {
  const response = await api.get<Achievement>(`/${id}`)
  return response.data
}

export async function createAchievement(input: AchievementCreateInput): Promise<Achievement> {
  const progress = calculateProgress(input.todos)
  const payload = {
    ...input,
    progress,
    createdAt: Math.floor(Date.now() / 1000),
    updatedAt: Math.floor(Date.now() / 1000),
  }
  const response = await api.post<Achievement>('', payload)
  return response.data
}

export async function updateAchievement(id: string, input: AchievementUpdateInput): Promise<Achievement> {
  const existing = await getAchievement(id)
  const todos = input.todos !== undefined ? input.todos : existing.todos
  const progress = calculateProgress(todos)
  const payload = {
    ...existing,
    ...input,
    progress,
    updatedAt: Math.floor(Date.now() / 1000),
  }
  const response = await api.put<Achievement>(`/${id}`, payload)
  return response.data
}

export async function deleteAchievement(id: string): Promise<void> {
  await api.delete(`/${id}`)
}
