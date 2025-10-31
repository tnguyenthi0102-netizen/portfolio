import axios, { AxiosError } from 'axios'
import { store } from '@/store'
import { apiErrorReceived } from '@/store/slices/apiSlice'

const baseURL = (import.meta as any).env.VITE_API_BASE_URL as string

export const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

type NormalizedError = {
  status?: number
  code?: string
  message: string
  details?: unknown
  url?: string
  method?: string
}

export class ApiError extends Error {
  status?: number
  code?: string
  details?: unknown
  url?: string
  method?: string

  constructor(err: NormalizedError) {
    super(err.message)
    this.name = 'ApiError'
    this.status = err.status
    this.code = err.code
    this.details = err.details
    this.url = err.url
    this.method = err.method
  }
}

function normalizeAxiosError(error: unknown): NormalizedError {
  const axErr = error as AxiosError

  if (axErr.code === 'ECONNABORTED') {
    return {
      code: 'TIMEOUT',
      message: 'Request timed out, please try again',
    }
  }

  if (!axErr.response) {
    return {
      code: axErr.message === 'canceled' ? 'CANCELLED' : 'NETWORK_ERROR',
      message:
        axErr.message === 'canceled'
          ? 'Request was canceled'
          : 'Network error or server not responding',
    }
  }

  const status = axErr.response.status
  const method = axErr.config?.method?.toUpperCase()
  const url = axErr.config?.url

  const codeMap: Record<number, string> = {
    400: 'BAD_REQUEST',
    401: 'UNAUTHORIZED',
    403: 'FORBIDDEN',
    404: 'NOT_FOUND',
    422: 'UNPROCESSABLE_ENTITY',
    429: 'TOO_MANY_REQUESTS',
    500: 'INTERNAL_SERVER_ERROR',
    502: 'BAD_GATEWAY',
    503: 'SERVICE_UNAVAILABLE',
  }

  const friendlyMessageMap: Record<number, string> = {
    400: 'Bad request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Resource not found',
    422: 'Unprocessable entity',
    429: 'Too many requests, please try again later',
    500: 'Server error, please try again',
    502: 'Bad gateway, please try again',
    503: 'Service unavailable',
  }

  const code = codeMap[status] || 'HTTP_ERROR'
  const message = friendlyMessageMap[status] || `HTTP error ${status}`

  return {
    status,
    code,
    message,
    details: (axErr.response.data as any) ?? undefined,
    url,
    method,
  }
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalized = normalizeAxiosError(error)
    store.dispatch(apiErrorReceived(normalized))
    return Promise.reject(new ApiError(normalized))
  },
)


