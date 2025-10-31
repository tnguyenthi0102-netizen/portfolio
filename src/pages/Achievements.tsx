import { useEffect, useState, useCallback, useMemo } from 'react'
import { useQueryStates, parseAsInteger, parseAsString } from 'nuqs'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@mui/material/styles'
import { Container, Box, Typography, Button, Paper, Pagination, Stack, CircularProgress } from '@mui/material'
import { getAchievements } from '@/lib/api/achievements'
import type { Achievement } from '@/data/achievement'
import AchievementToolbar from '@/components/achievements/AchievementToolbar'
import AchievementTable from '@/components/achievements/AchievementTable'
import AchievementDialog from '@/components/achievements/AchievementDialog'
import { createDynamicTheme } from '@/lib/mui-theme'

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
  })

  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null)

  const fetchAchievements = useCallback(async () => {
    try {
      setLoading(true)
      const params: any = {
        page: query.page || 1,
        limit: query.limit || 10,
        sortBy: query.sortBy || 'updatedAt',
        order: (query.order as 'asc' | 'desc') || 'desc',
      }

      if (query.search) params.search = query.search
      if (query.category) params.category = query.category
      if (query.status) params.status = query.status
      if (query.createdFrom) params.createdFrom = query.createdFrom
      if (query.createdTo) params.createdTo = query.createdTo
      if (query.updatedFrom) params.updatedFrom = query.updatedFrom
      if (query.updatedTo) params.updatedTo = query.updatedTo

      const response = await getAchievements(params)
      setAchievements(response.data)
    } catch (error) {
      console.error('Failed to fetch achievements:', error)
    } finally {
      setLoading(false)
    }
  }, [query.page, query.limit, query.search, query.sortBy, query.order, query.category, query.status, query.createdFrom, query.createdTo, query.updatedFrom, query.updatedTo])

  useEffect(() => {
    fetchAchievements()
  }, [fetchAchievements])

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

  const theme = useMemo(() => createDynamicTheme(), [])

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Toaster position="top-right" />
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1">
            Achievements
          </Typography>
          <Button variant="contained" onClick={handleCreate}>
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
                Page {query.page || 1} - Showing {achievements.length} items
              </Typography>
              <Pagination
                count={Math.ceil(achievements.length / (query.limit || 10)) || 1}
                page={query.page || 1}
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
    </ThemeProvider>
  )
}

export default Achievements
