export interface Achievement {
  id: string
  title: string
  description: string
  category: string
  status: string
  score: number
  createdAt: number
  updatedAt: number
}

export interface AchievementCreateInput {
  title: string
  description: string
  category: string
  status: string
  score: number
}

export interface AchievementUpdateInput {
  title?: string
  description?: string
  category?: string
  status?: string
  score?: number
}

export interface AchievementFilters {
  search?: string
  category?: string[]
  status?: string[]
  scoreMin?: number
  scoreMax?: number
  createdFrom?: string
  createdTo?: string
  updatedFrom?: string
  updatedTo?: string
}

export interface AchievementListParams {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  order?: 'asc' | 'desc'
  category?: string
  status?: string
  scoreMin?: number
  scoreMax?: number
  createdFrom?: string
  createdTo?: string
  updatedFrom?: string
  updatedTo?: string
}

export interface AchievementListResponse {
  data: Achievement[]
  total?: number
}

