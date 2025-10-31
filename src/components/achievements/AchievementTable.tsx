import { useState } from 'react'
import { format } from 'date-fns'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DialogIcon from '@mui/icons-material/Article'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import type { Achievement } from '@/data/achievement'
import { updateAchievement, deleteAchievement } from '@/lib/api/achievements'
import { toast } from 'sonner'
import { ACHIEVEMENT_CATEGORIES, ACHIEVEMENT_STATUSES } from '@/data/achievement-constants'
import ConfirmDialog from '@/components/ui/ConfirmDialog'

interface AchievementTableProps {
  achievements: Achievement[]
  onRefresh: () => void
  onEdit: (achievement: Achievement) => void
}

function AchievementTable({ achievements, onRefresh, onEdit }: AchievementTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingData, setEditingData] = useState<Partial<Achievement>>({})
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmingId, setConfirmingId] = useState<string | null>(null)

  const handleStartEdit = (achievement: Achievement) => {
    setEditingId(achievement.id)
    setEditingData(achievement)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingData({})
  }

  const handleSaveEdit = async () => {
    if (!editingId) return

    try {
      await updateAchievement(editingId, {
        title: editingData.title,
        description: editingData.description,
        category: editingData.category,
        status: editingData.status,
        score: editingData.score,
      })
      toast.success('Achievement updated successfully')
      setEditingId(null)
      setEditingData({})
      onRefresh()
    } catch (error) {
      toast.error('Failed to update achievement')
      console.error(error)
    }
  }

  const handleConfirmDelete = async () => {
    if (!confirmingId) return
    try {
      setDeletingId(confirmingId)
      await deleteAchievement(confirmingId)
      toast.success('Achievement deleted successfully')
      onRefresh()
      setConfirmingId(null)
    } catch (error) {
      toast.error('Failed to delete achievement')
      console.error(error)
    } finally {
      setDeletingId(null)
    }
  }

  const formatDate = (timestamp: number) => {
    return format(new Date(timestamp * 1000), 'MMM dd, yyyy')
  }

  if (achievements.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="text.secondary">No achievements found</Typography>
      </Paper>
    )
  }

  return (
    <>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Updated</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {achievements.map((achievement) => {
            const isEditing = editingId === achievement.id
            const isDeleting = deletingId === achievement.id

            return (
              <TableRow key={achievement.id} hover>
                <TableCell>
                  {isEditing ? (
                    <TextField
                      size="small"
                      value={editingData.title || ''}
                      onChange={(e) => setEditingData({ ...editingData, title: e.target.value })}
                      fullWidth
                    />
                  ) : (
                    <Typography variant="body2">{achievement.title}</Typography>
                  )}
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <TextField
                      size="small"
                      value={editingData.description || ''}
                      onChange={(e) => setEditingData({ ...editingData, description: e.target.value })}
                      fullWidth
                      multiline
                      maxRows={2}
                    />
                  ) : (
                    <Typography variant="body2">{achievement.description}</Typography>
                  )}
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <Select
                      value={editingData.category || ''}
                      onChange={(e) => setEditingData({ ...editingData, category: e.target.value })}
                      size="small"
                      fullWidth
                    >
                      {ACHIEVEMENT_CATEGORIES.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <Typography variant="body2">{achievement.category}</Typography>
                  )}
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <Select
                      value={editingData.status || ''}
                      onChange={(e) => setEditingData({ ...editingData, status: e.target.value })}
                      size="small"
                      fullWidth
                    >
                      {ACHIEVEMENT_STATUSES.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <Typography variant="body2">{achievement.status}</Typography>
                  )}
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <TextField
                      type="number"
                      size="small"
                      value={editingData.score || 0}
                      onChange={(e) => setEditingData({ ...editingData, score: parseInt(e.target.value) || 0 })}
                      inputProps={{ min: 0, max: 100 }}
                      sx={{ width: 80 }}
                    />
                  ) : (
                    <Typography variant="body2">{achievement.score}</Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(achievement.createdAt)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(achievement.updatedAt)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  {isEditing ? (
                    <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                      <IconButton size="small" color="primary" onClick={handleSaveEdit}>
                        <SaveIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={handleCancelEdit}>
                        <CancelIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                      <IconButton size="small" color="primary" onClick={() => handleStartEdit(achievement)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setConfirmingId(achievement.id)}
                        disabled={isDeleting}
                      >
                        {isDeleting ? <CircularProgress size={16} /> : <DeleteIcon fontSize="small" />}
                      </IconButton>
                      <IconButton size="small" color="info" onClick={() => onEdit(achievement)}>
                        <DialogIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
    <ConfirmDialog
      open={Boolean(confirmingId)}
      title="Delete achievement"
      description="Are you sure you want to delete this achievement? This action cannot be undone."
      confirmText="Delete"
      cancelText="Cancel"
      onConfirm={handleConfirmDelete}
      onClose={() => setConfirmingId(null)}
      loading={Boolean(deletingId)}
    />
    </>
  )
}

export default AchievementTable
