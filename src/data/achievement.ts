export interface TodoItem {
  id: number
  title: string
  done: boolean
}

export interface Achievement {
  id: string
  title: string
  description: string
  category: string
  status: string
  score: number
  progress?: number
  todos?: TodoItem[]
  createdAt: number
  updatedAt: number
}

export interface AchievementCreateInput {
  title: string
  description: string
  category: string
  status: string
  score: number
  todos?: TodoItem[]
}

export interface AchievementUpdateInput {
  title?: string
  description?: string
  category?: string
  status?: string
  score?: number
  todos?: TodoItem[]
}

export interface AchievementFilters {
  search?: string
  category?: string[]
  status?: string[]
  scoreMin?: number
  scoreMax?: number
  progressMin?: number
  progressMax?: number
  createdFrom?: string
  createdTo?: string
  updatedFrom?: string
  updatedTo?: string
}

export interface AchievementListParams {
  _page?: number
  _per_page?: number
  _sort?: string
  q?: string
  category?: string
  progress_gte?: number
  progress_lte?: number
  updatedAt_gte?: string
  updatedAt_lte?: string
}

export interface AchievementListResponse {
  data: Achievement[]
  first?: number
  items?: number
  last?: number
  next?: number | null
  pages?: number
  prev?: number | null
}

