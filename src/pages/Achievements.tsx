import { useEffect, useState } from 'react'
import { useQueryStates, parseAsInteger, parseAsString } from 'nuqs'
import { Toaster } from 'sonner'
import { Container, Box, Typography, Button, Paper, Pagination, Stack, CircularProgress } from '@mui/material'
import { getAchievements } from '@/services/achievements'
import type { Achievement, AchievementListParams } from '@/data/achievement'
import AchievementToolbar from '@/components/achievements/AchievementToolbar'
import AchievementTable from '@/components/achievements/AchievementTable'
import AchievementDialog from '@/components/achievements/AchievementDialog'

const LIMIT = 10

function Achievements() {
  const [query, setQuery] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
    search: parseAsString,
    sortBy: parseAsString.withDefault('updatedAt'),
    order: parseAsString.withDefault('desc'),
    category: parseAsString,
    status: parseAsString,
    createdFrom: parseAsString,
    createdTo: parseAsString,
    updatedFrom: parseAsString,
    updatedTo: parseAsString,
    progressMin: parseAsInteger,
    progressMax: parseAsInteger,
  })

  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [pagination, setPagination] = useState<{
    first?: number
    items?: number
    last?: number
    next?: number | null
    pages?: number
    prev?: number | null
  }>({})
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null)

  const fetchAchievements = async () => {
    try {
      setLoading(true)
      const params: AchievementListParams = {
        _page: query.page || 1,
        _per_page: query.limit || LIMIT,
      }

      const sortBy = query.sortBy || 'updatedAt'
      const order = (query.order as 'asc' | 'desc') || 'desc'
      params._sort = order === 'asc' ? sortBy : `-${sortBy}`

      if (query.search) params.title_like = query.search
      if (query.category) params.category = query.category
      if (query.updatedFrom) {
        const dateFrom = new Date(query.updatedFrom + 'T00:00:00').getTime() / 1000
        params.updatedAt_gte = Math.floor(dateFrom).toString()
      }
      if (query.updatedTo) {
        const dateTo = new Date(query.updatedTo + 'T23:59:59').getTime() / 1000
        params.updatedAt_lte = Math.floor(dateTo).toString()
      }
      if (query.progressMin !== null && query.progressMin !== undefined) params.progress_gte = query.progressMin
      if (query.progressMax !== null && query.progressMax !== undefined) params.progress_lte = query.progressMax

      const response = await getAchievements(params)
      
      setAchievements(response.data || [])
      setPagination({
        first: response.first,
        items: response.items,
        last: response.last,
        next: response.next,
        pages: response.pages,
        prev: response.prev,
      })
    } catch (error) {
      console.error('Failed to fetch achievements:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAchievements()
  }, [query.page, query.limit, query.search, query.sortBy, query.order, query.category, query.updatedFrom, query.updatedTo, query.progressMin, query.progressMax])

  const handleCreate = () => {
    setEditingAchievement(null)
    setDialogOpen(true)
  }

  const handleEdit = (achievement: Achievement) => {
    setEditingAchievement(achievement)
    setDialogOpen(true)
  }

  const handleDialogSuccess = () => {
    fetchAchievements()
  }

  const handleRefresh = () => {
    fetchAchievements()
  }

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setQuery({ page: value })
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Toaster position="top-right" />
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
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
          <CircularProgress />
        </Paper>
      ) : (
        <>
          <AchievementTable achievements={achievements} onRefresh={handleRefresh} onEdit={handleEdit} />

          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Page {pagination.first || query.page || 1} of {pagination.pages || 1} - Total {pagination.items || 0} items
            </Typography>
            <Pagination
              count={pagination.pages || 1}
              page={pagination.first || query.page || 1}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
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
