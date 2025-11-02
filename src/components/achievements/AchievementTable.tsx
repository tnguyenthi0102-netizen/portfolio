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
  Menu,
  Checkbox,
  Slider,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DialogIcon from '@mui/icons-material/Article'
import CheckIcon from '@mui/icons-material/Check'
import CancelIcon from '@mui/icons-material/Cancel'
import AddIcon from '@mui/icons-material/Add'
import type { Achievement } from '@/data/achievement'
import { updateAchievement, deleteAchievement } from '@/services/achievements'
import { toast } from 'sonner'
import { ACHIEVEMENT_CATEGORIES } from '@/data/achievement-constants'
import ConfirmDialog from '@/components/ui/ConfirmDialog'

interface AchievementTableProps {
  achievements: Achievement[]
  onRefresh: () => void
  onEdit: (achievement: Achievement) => void
}

function AchievementTable({ achievements, onRefresh, onEdit }: AchievementTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingData, setEditingData] = useState<Partial<Achievement>>({})
  const [initialData, setInitialData] = useState<Partial<Achievement> | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmingId, setConfirmingId] = useState<string | null>(null)
  const [todosMenuAnchor, setTodosMenuAnchor] = useState<{ id: string; element: HTMLElement } | null>(null)

  const areValuesEqual = (data1: Partial<Achievement>, data2: Partial<Achievement>): boolean => {
    if (data1.title !== data2.title) return false
    if (data1.description !== data2.description) return false
    if (data1.category !== data2.category) return false
    
    const todos1 = data1.todos || []
    const todos2 = data2.todos || []
    if (todos1.length !== todos2.length) return false
    
    for (let i = 0; i < todos1.length; i++) {
      const todo1 = todos1[i]
      const todo2 = todos2[i]
      if (todo1.title !== todo2.title || todo1.done !== todo2.done) {
        return false
      }
    }
    
    return true
  }

  const handleStartEdit = (achievement: Achievement) => {
    setEditingId(achievement.id)
    setEditingData({ ...achievement })
    setInitialData({ ...achievement })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingData({})
    setInitialData(null)
    setTodosMenuAnchor(null)
  }

  const handleToggleTodo = (todoId: number) => {
    if (!editingData.todos) return
    const updatedTodos = editingData.todos.map(todo =>
      todo.id === todoId ? { ...todo, done: !todo.done } : todo
    )
    setEditingData({ ...editingData, todos: updatedTodos })
  }

  const handleAddTodo = () => {
    const currentTodos = editingData.todos || []
    const newId = currentTodos.length > 0
      ? Math.max(...currentTodos.map(t => t.id)) + 1
      : 1
    const newTodos = [...currentTodos, { id: newId, title: '', done: false }]
    setEditingData({ ...editingData, todos: newTodos })
  }

  const handleRemoveTodo = (todoId: number) => {
    if (!editingData.todos) return
    const updatedTodos = editingData.todos.filter(todo => todo.id !== todoId)
    setEditingData({ ...editingData, todos: updatedTodos })
  }

  const handleUpdateTodoTitle = (todoId: number, title: string) => {
    if (!editingData.todos) return
    const updatedTodos = editingData.todos.map(todo =>
      todo.id === todoId ? { ...todo, title } : todo
    )
    setEditingData({ ...editingData, todos: updatedTodos })
  }

  const handleSaveEdit = async () => {
    if (!editingId || !initialData) return

    const hasChanges = !areValuesEqual(editingData, initialData)
    if (!hasChanges) {
      toast.info('No changes to save')
      setEditingId(null)
      setEditingData({})
      setInitialData(null)
      setTodosMenuAnchor(null)
      return
    }

    try {
      await updateAchievement(editingId, {
        title: editingData.title,
        description: editingData.description,
        category: editingData.category,
        todos: editingData.todos,
      })
      toast.success('Achievement updated successfully')
      setEditingId(null)
      setEditingData({})
      setInitialData(null)
      setTodosMenuAnchor(null)
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
    return format(new Date(timestamp * 1000), 'dd/MM/yyyy')
  }

  if (!Array.isArray(achievements) || achievements.length === 0) {
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
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Updated</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(achievements) && achievements.map((achievement) => {
              const isEditing = editingId === achievement.id
              const isDeleting = deletingId === achievement.id

              return (
                <TableRow key={achievement.id} hover>
                  <TableCell>{achievement.id}</TableCell>
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
                      <Box>
                        <TextField
                          size="small"
                          value={editingData.todos?.length ? `${editingData.todos.length} todos` : 'No todos'}
                          onClick={(e) => setTodosMenuAnchor({ id: achievement.id, element: e.currentTarget })}
                          placeholder="Todo title"
                          fullWidth
                          onChange={() => { }}
                        />
                        
                        <Menu
                          anchorEl={todosMenuAnchor?.id === achievement.id ? todosMenuAnchor.element : null}
                          open={Boolean(todosMenuAnchor?.id === achievement.id)}
                          onClose={() => setTodosMenuAnchor(null)}
                          PaperProps={{
                            sx: { maxHeight: 300, width: 300, mt: 1 }
                          }}
                        >
                          {editingData.todos && editingData.todos.length > 0 ? (
                            editingData.todos.map((todo) => (
                              <MenuItem key={todo.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', p: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Checkbox
                                    checked={todo.done}
                                    onChange={() => handleToggleTodo(todo.id)}
                                    size="small"
                                    color="success"
                                  />
                                  <TextField
                                    size="small"
                                    value={todo.title}
                                    onChange={(e) => handleUpdateTodoTitle(todo.id, e.target.value)}
                                    placeholder="Todo title"
                                    fullWidth
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleRemoveTodo(todo.id)
                                    }}
                                  >
                                    <DeleteIcon fontSize="small" color='error'/>
                                  </IconButton>
                                </Box>
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem disabled>No todos</MenuItem>
                          )}
                          <MenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              handleAddTodo()
                            }}
                            sx={{ borderTop: 1, borderColor: 'divider' }}
                          >
                            <AddIcon fontSize="small" sx={{ mr: 1 }} />
                            Add Todo
                          </MenuItem>
                        </Menu>
                      </Box>
                    ) : (
                      <Slider
                        value={achievement.progress ?? 0}
                        color='success'
                        size='small'
                        disabled
                        valueLabelDisplay='on'
                        valueLabelFormat={(value) => `${value}%`}
                        sx={{
                          '& .MuiSlider-valueLabel': {
                            fontSize: '0.65rem',
                            padding: '2px 4px',
                          },
                        }}
                      />
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
                        <IconButton size="small" color="success" onClick={handleSaveEdit}>
                          <CheckIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={handleCancelEdit}>
                          <CancelIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ) : (
                      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                        <IconButton size="small" onClick={() => handleStartEdit(achievement)}>
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
                        <IconButton size="small" color="success" onClick={() => onEdit(achievement)}>
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
