import type { Achievement, AchievementCreateInput, AchievementUpdateInput, AchievementListParams, AchievementListResponse } from '@/data/achievement'
import { api } from '@/lib/api'

export async function getAchievements(params: AchievementListParams = {}): Promise<AchievementListResponse> {
  const queryParams = new URLSearchParams()
  
  if (params.page) queryParams.append('page', params.page.toString())
  if (params.limit) queryParams.append('limit', params.limit.toString())
  if (params.search) queryParams.append('search', params.search)
  if (params.sortBy) queryParams.append('sortBy', params.sortBy)
  if (params.order) queryParams.append('order', params.order)
  if (params.category) queryParams.append('category', params.category)
  if (params.status) queryParams.append('status', params.status)
  if (params.scoreMin !== undefined) queryParams.append('scoreMin', params.scoreMin.toString())
  if (params.scoreMax !== undefined) queryParams.append('scoreMax', params.scoreMax.toString())
  if (params.createdFrom) queryParams.append('createdFrom', params.createdFrom)
  if (params.createdTo) queryParams.append('createdTo', params.createdTo)
  if (params.updatedFrom) queryParams.append('updatedFrom', params.updatedFrom)
  if (params.updatedTo) queryParams.append('updatedTo', params.updatedTo)

  const response = await api.get<Achievement[]>(`?${queryParams.toString()}`)
  
  return {
    data: response.data,
  }
}

export async function getAchievement(id: string): Promise<Achievement> {
  const response = await api.get<Achievement>(`/${id}`)
  return response.data
}

export async function createAchievement(input: AchievementCreateInput): Promise<Achievement> {
  const payload = {
    ...input,
    createdAt: Math.floor(Date.now() / 1000),
    updatedAt: Math.floor(Date.now() / 1000),
  }
  const response = await api.post<Achievement>('', payload)
  return response.data
}

export async function updateAchievement(id: string, input: AchievementUpdateInput): Promise<Achievement> {
  const existing = await getAchievement(id)
  const payload = {
    ...existing,
    ...input,
    updatedAt: Math.floor(Date.now() / 1000),
  }
  const response = await api.put<Achievement>(`/${id}`, payload)
  return response.data
}

export async function deleteAchievement(id: string): Promise<void> {
  await api.delete(`/${id}`)
}

