import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type NormalizedError = {
  status?: number
  code?: string
  message: string
  details?: unknown
  url?: string
  method?: string
}

type ApiState = {
  lastError?: NormalizedError
}

const initialState: ApiState = {
  lastError: undefined,
}

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    apiErrorReceived: (state, action: PayloadAction<NormalizedError>) => {
      state.lastError = action.payload
    },
    clearApiError: (state) => {
      state.lastError = undefined
    },
  },
})

export const { apiErrorReceived, clearApiError } = apiSlice.actions
export default apiSlice.reducer


