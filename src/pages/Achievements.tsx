import { useEffect, useState, useCallback } from 'react'
import { useQueryStates, parseAsInteger, parseAsString } from 'nuqs'
import { Toaster } from 'sonner'
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Pagination,
  Stack,
  CircularProgress,
} from '@mui/material'
import dayjs from 'dayjs'
import type { Achievement, AchievementListParams } from '@/data/achievement'
import AchievementToolbar from '@/components/achievements/AchievementToolbar'
import AchievementTable from '@/components/achievements/AchievementTable'
import AchievementDialog from '@/components/achievements/AchievementDialog'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchAchievements } from '@/store/slices/achievementsSlice'

const LIMIT = 10

function Achievements() {
  const dispatch = useAppDispatch()
  const { items: achievements, pagination, loading } = useAppSelector((state) => state.achievements)

  const [query, setQuery] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
    q: parseAsString,
    sortBy: parseAsString.withDefault('updatedAt'),
    order: parseAsString.withDefault('desc'),
    category: parseAsString,
    updatedFrom: parseAsString,
    updatedTo: parseAsString,
    progressMin: parseAsInteger,
    progressMax: parseAsInteger,
  })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null)

  useEffect(() => {
    if (query.page && query.page !== 1) {
      setQuery({ page: 1 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    query.q,
    query.category,
    query.updatedFrom,
    query.updatedTo,
    query.progressMin,
    query.progressMax,
  ])

  useEffect(() => {
    const params: AchievementListParams = {
      _page: query.page || 1,
      _per_page: query.limit || LIMIT,
    }

    const sortBy = query.sortBy || 'updatedAt'
    const order = (query.order as 'asc' | 'desc') || 'desc'
    params._sort = order === 'asc' ? sortBy : `-${sortBy}`

    if (query.q) params.q = query.q
    if (query.category) params.category = query.category
    if (query.updatedFrom) {
      params.updatedAt_gte = dayjs(query.updatedFrom).startOf('day').unix().toString()
    }
    if (query.updatedTo) {
      params.updatedAt_lte = dayjs(query.updatedTo).endOf('day').unix().toString()
    }
    if (query.progressMin !== null && query.progressMin !== undefined)
      params.progress_gte = query.progressMin
    if (query.progressMax !== null && query.progressMax !== undefined)
      params.progress_lte = query.progressMax

    dispatch(fetchAchievements(params))
  }, [
    dispatch,
    query.page,
    query.limit,
    query.q,
    query.category,
    query.updatedFrom,
    query.updatedTo,
    query.progressMin,
    query.progressMax,
    query.sortBy,
    query.order,
  ])

  const handleCreate = () => {
    setEditingAchievement(null)
    setDialogOpen(true)
  }

  const handleEdit = useCallback((achievement: Achievement) => {
    setEditingAchievement(achievement)
    setDialogOpen(true)
  }, [])

  const buildParams = (): AchievementListParams => {
    const params: AchievementListParams = {
      _page: query.page || 1,
      _per_page: query.limit || LIMIT,
    }
    const sortBy = query.sortBy || 'updatedAt'
    const order = (query.order as 'asc' | 'desc') || 'desc'
    params._sort = order === 'asc' ? sortBy : `-${sortBy}`
    if (query.q) params.q = query.q
    if (query.category) params.category = query.category
    if (query.updatedFrom) {
      params.updatedAt_gte = dayjs(query.updatedFrom).startOf('day').unix().toString()
    }
    if (query.updatedTo) {
      params.updatedAt_lte = dayjs(query.updatedTo).endOf('day').unix().toString()
    }
    if (query.progressMin !== null && query.progressMin !== undefined)
      params.progress_gte = query.progressMin
    if (query.progressMax !== null && query.progressMax !== undefined)
      params.progress_lte = query.progressMax
    return params
  }

  const handleDialogSuccess = () => {
    dispatch(fetchAchievements(buildParams()))
  }

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setQuery({ page: value })
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Toaster position="top-right" />
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: { xs: 'wrap', md: 'nowrap' }, gap: { xs: 2, md: 0 } }}>
        <Typography 
          variant="h4" 
          component="h1"
          sx={{ 
            width: { xs: '100%', md: 'auto' },
            wordBreak: 'break-word'
          }}
        >
          Achievements
        </Typography>
        <Button
          variant="contained"
          onClick={handleCreate}
          sx={{
            backgroundColor: 'var(--color-border)',
            color: 'var(--color-fg)',
            '&:hover': {
              backgroundColor: 'var(--color-border)',
              opacity: 0.8,
            },
          }}
        >
          Create Achievement
        </Button>
      </Box>

      <AchievementToolbar />

      {loading ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <CircularProgress color="success" />
        </Paper>
      ) : (
        <>
          <AchievementTable achievements={achievements} onEdit={handleEdit} />

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent={{ xs: 'flex-start', md: 'space-between' }}
            alignItems={{ xs: 'flex-start', md: 'center' }}
            spacing={{ xs: 1.5, md: 0 }}
            sx={{ mt: 3 }}
          >
            <Typography variant="body2" color="text.secondary">
              Page {pagination.first || query.page || 1} of {pagination.pages || 1} - Total{' '}
              {pagination.items || 0} items
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'left', md: 'flex-end' },
                width: { xs: '100%', md: 'auto' },
              }}
            >
              <Pagination
                count={pagination.pages || 1}
                page={query.page || 1}
                onChange={handlePageChange}
                color="primary"
                showFirstButton
                showLastButton
              />
            </Box>
          </Stack>
        </>
      )}

      <AchievementDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false)
          setEditingAchievement(null)
        }}
        onSuccess={handleDialogSuccess}
        achievement={editingAchievement}
      />
    </Container>
  )
}

export default Achievements
