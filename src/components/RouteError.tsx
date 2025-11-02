import { useRouteError } from 'react-router-dom'
import ErrorScreen from '@/components/ErrorScreen'

export default function RouteError() {
  const err = useRouteError() as any
  const message = err?.statusText || err?.message || 'Unexpected error'
  return <ErrorScreen message={message} />
}
