import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type {
  Achievement,
  AchievementCreateInput,
  AchievementUpdateInput,
  AchievementListParams,
} from '@/data/achievement'
import {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from '@/services/achievements'

type AchievementsState = {
  items: Achievement[]
  pagination: {
    first?: number
    items?: number
    last?: number
    next?: number | null
    pages?: number
    prev?: number | null
  }
  filters: AchievementListParams
  loading: boolean
  error: string | null
  creating: boolean
  updating: Record<string, boolean>
  deleting: Record<string, boolean>
}

const initialState: AchievementsState = {
  items: [],
  pagination: {},
  filters: {},
  loading: false,
  error: null,
  creating: false,
  updating: {},
  deleting: {},
}

export const fetchAchievements = createAsyncThunk(
  'achievements/fetch',
  async (params: AchievementListParams, { rejectWithValue }) => {
    try {
      const response = await getAchievements(params)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch achievements')
    }
  },
)

export const createAchievementThunk = createAsyncThunk(
  'achievements/create',
  async (input: AchievementCreateInput, { rejectWithValue }) => {
    try {
      const achievement = await createAchievement(input)
      return achievement
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create achievement')
    }
  },
)

export const updateAchievementThunk = createAsyncThunk(
  'achievements/update',
  async ({ id, input }: { id: string; input: AchievementUpdateInput }, { rejectWithValue }) => {
    try {
      const achievement = await updateAchievement(id, input)
      return achievement
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update achievement')
    }
  },
)

export const deleteAchievementThunk = createAsyncThunk(
  'achievements/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteAchievement(id)
      return id
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete achievement')
    }
  },
)

const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<AchievementListParams>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {}
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAchievements.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAchievements.fulfilled, (state, action) => {
        state.loading = false
        const { data = [], ...pagination } = action.payload
        state.items = data
        state.pagination = pagination
      })
      .addCase(fetchAchievements.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(createAchievementThunk.pending, (state) => {
        state.creating = true
        state.error = null
      })
      .addCase(createAchievementThunk.fulfilled, (state, action) => {
        state.creating = false
        state.items.unshift(action.payload)
      })
      .addCase(createAchievementThunk.rejected, (state, action) => {
        state.creating = false
        state.error = action.payload as string
      })
      .addCase(updateAchievementThunk.pending, (state, action) => {
        const id = action.meta.arg.id
        state.updating[id] = true
        state.error = null
      })
      .addCase(updateAchievementThunk.fulfilled, (state, action) => {
        const id = action.meta.arg.id
        state.updating[id] = false
        const index = state.items.findIndex((item) => item.id === id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(updateAchievementThunk.rejected, (state, action) => {
        const id = action.meta.arg.id
        state.updating[id] = false
        state.error = action.payload as string
      })
      .addCase(deleteAchievementThunk.pending, (state, action) => {
        const id = action.meta.arg
        state.deleting[id] = true
        state.error = null
      })
      .addCase(deleteAchievementThunk.fulfilled, (state, action) => {
        const id = action.payload
        state.deleting[id] = false
        state.items = state.items.filter((item) => item.id !== id)
      })
      .addCase(deleteAchievementThunk.rejected, (state, action) => {
        const id = action.meta.arg
        state.deleting[id] = false
        state.error = action.payload as string
      })
  },
})

export const { setFilters, clearFilters, clearError } = achievementsSlice.actions
export default achievementsSlice.reducer
