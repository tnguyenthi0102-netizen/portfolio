import { useState, memo } from 'react'
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
  Slider,
  FormControl,
  FormHelperText,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DialogIcon from '@mui/icons-material/Article'
import CheckIcon from '@mui/icons-material/Check'
import CancelIcon from '@mui/icons-material/Cancel'
import AddIcon from '@mui/icons-material/Add'
import type { Achievement } from '@/data/achievement'
import { toast } from 'sonner'
import { useAppDispatch, useAppSelector } from '@/store'
import { updateAchievementThunk, deleteAchievementThunk } from '@/store/slices/achievementsSlice'
import { ACHIEVEMENT_CATEGORIES } from '@/data/achievement-constants'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { areValuesEqual, filterValidTodos, achievementSchema } from '@/utils/achievement'
import TodoItemRow from './TodoItemRow'

interface AchievementTableProps {
  achievements: Achievement[]
  onEdit: (achievement: Achievement) => void
}

const textTwoLineStyle = {
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical' as const,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'break-word' as const,
}

function AchievementTable({ achievements, onEdit }: AchievementTableProps) {
  const dispatch = useAppDispatch()
  const { deleting } = useAppSelector((state) => state.achievements)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingData, setEditingData] = useState<Partial<Achievement>>({})
  const [initialData, setInitialData] = useState<Partial<Achievement> | null>(null)
  const [confirmingId, setConfirmingId] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [todosMenuAnchor, setTodosMenuAnchor] = useState<{
    id: string
    element: HTMLElement
  } | null>(null)

  const handleStartEdit = (achievement: Achievement) => {
    setEditingId(achievement.id)
    setEditingData({ ...achievement })
    setInitialData({ ...achievement })
    setValidationErrors({})
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingData({})
    setInitialData(null)
    setValidationErrors({})
    setTodosMenuAnchor(null)
  }

  const handleToggleTodo = (todoId: number) => {
    if (!editingData.todos) return
    const updatedTodos = editingData.todos.map((todo) =>
      todo.id === todoId ? { ...todo, done: !todo.done } : todo,
    )
    setEditingData({ ...editingData, todos: updatedTodos })
  }

  const handleAddTodo = () => {
    const currentTodos = editingData.todos || []
    const newId = currentTodos.length > 0 ? Math.max(...currentTodos.map((t) => t.id)) + 1 : 1
    const newTodos = [...currentTodos, { id: newId, title: '', done: false }]
    setEditingData({ ...editingData, todos: newTodos })
  }

  const handleRemoveTodo = (todoId: number) => {
    if (!editingData.todos) return
    const updatedTodos = editingData.todos.filter((todo) => todo.id !== todoId)
    setEditingData({ ...editingData, todos: updatedTodos })
  }

  const handleUpdateTodoTitle = (todoId: number, title: string) => {
    if (!editingData.todos) return
    const updatedTodos = editingData.todos.map((todo) =>
      todo.id === todoId ? { ...todo, title } : todo,
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
      setValidationErrors({})
      setTodosMenuAnchor(null)
      return
    }

    const dataToValidate = {
      title: editingData.title || '',
      description: editingData.description || '',
      category: editingData.category || '',
      todos: editingData.todos || [],
    }

    const result = achievementSchema.safeParse(dataToValidate)
    console.log(result)

    if (!result.success) {
      const errors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string
        if (field === 'todos' && issue.path.length > 1) {
          const todoIndex = issue.path[1] as number
          const todoField = issue.path[2] as string | undefined
          if (todoField) {
            if (!errors[`todos.${todoIndex}.${todoField}`]) {
              errors[`todos.${todoIndex}.${todoField}`] = issue.message
            }
          }
        } else if (field) {
          errors[field] = issue.message
        }
      })
      setValidationErrors(errors)
      toast.error('Please fix validation errors')
      return
    }

    setValidationErrors({})

    try {
      await dispatch(
        updateAchievementThunk({
          id: editingId,
          input: {
            title: editingData.title,
            description: editingData.description,
            category: editingData.category,
            todos: editingData.todos ? filterValidTodos(editingData.todos) : undefined,
          },
        }),
      ).unwrap()

      toast.success('Achievement updated successfully')
      setEditingId(null)
      setEditingData({})
      setInitialData(null)
      setTodosMenuAnchor(null)
    } catch (error: any) {
      toast.error(error || 'Failed to update achievement')
    }
  }

  const handleConfirmDelete = async () => {
    if (!confirmingId) return
    try {
      await dispatch(deleteAchievementThunk(confirmingId)).unwrap()
      toast.success('Achievement deleted successfully')
      setConfirmingId(null)
    } catch (error: any) {
      toast.error(error || 'Failed to delete achievement')
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
            {Array.isArray(achievements) &&
              achievements.map((achievement) => {
                const isEditing = editingId === achievement.id
                const isDeleting = deleting[achievement.id] || false

                return (
                  <TableRow key={achievement.id} hover>
                    <TableCell
                      sx={{
                        position: 'relative',
                        paddingBottom: isEditing ? 3 : 'inherit',
                      }}
                    >
                      {isEditing ? (
                        <TextField
                          size="small"
                          value={editingData.title || ''}
                          onChange={(e) =>
                            setEditingData({ ...editingData, title: e.target.value })
                          }
                          fullWidth
                          error={!!validationErrors.title}
                          FormHelperTextProps={{
                            sx: {
                              margin: 0,
                              position: 'absolute',
                              top: '100%',
                              left: 0,
                              fontSize: '0.75rem',
                              whiteSpace: 'nowrap',
                            },
                          }}
                          helperText={validationErrors.title}
                        />
                      ) : (
                        <Typography variant="body2" sx={textTwoLineStyle}>
                          {achievement.title}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell
                      sx={{
                        position: 'relative',
                        paddingBottom: isEditing ? 3 : 'inherit',
                      }}
                    >
                      {isEditing ? (
                        <TextField
                          size="small"
                          value={editingData.description || ''}
                          onChange={(e) =>
                            setEditingData({ ...editingData, description: e.target.value })
                          }
                          fullWidth
                          multiline
                          maxRows={2}
                          error={!!validationErrors.description}
                          FormHelperTextProps={{
                            sx: {
                              margin: 0,
                              position: 'absolute',
                              top: '100%',
                              left: 0,
                              fontSize: '0.75rem',
                              whiteSpace: 'nowrap',
                            },
                          }}
                          helperText={validationErrors.description}
                        />
                      ) : (
                        <Typography variant="body2" sx={textTwoLineStyle}>
                          {achievement.description}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell
                      sx={{
                        position: 'relative',
                        paddingBottom: isEditing ? 3 : 'inherit',
                      }}
                    >
                      {isEditing ? (
                        <>
                          <FormControl size="small" fullWidth error={!!validationErrors.category}>
                            <Select
                              value={editingData.category || ''}
                              onChange={(e) =>
                                setEditingData({ ...editingData, category: e.target.value })
                              }
                              fullWidth
                            >
                              {ACHIEVEMENT_CATEGORIES.map((cat) => (
                                <MenuItem key={cat} value={cat}>
                                  {cat}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          {validationErrors.category && (
                            <FormHelperText
                              sx={{
                                margin: 0,
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                fontSize: '0.75rem',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {validationErrors.category}
                            </FormHelperText>
                          )}
                        </>
                      ) : (
                        <Typography variant="body2">{achievement.category}</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <Box>
                          <TextField
                            size="small"
                            value={
                              editingData.todos?.length
                                ? `${editingData.todos.length} todos`
                                : 'No todos'
                            }
                            onClick={(e) =>
                              setTodosMenuAnchor({ id: achievement.id, element: e.currentTarget })
                            }
                            placeholder="Todo title"
                            fullWidth
                            onChange={() => {}}
                          />

                          <Menu
                            anchorEl={
                              todosMenuAnchor?.id === achievement.id
                                ? todosMenuAnchor.element
                                : null
                            }
                            open={Boolean(todosMenuAnchor?.id === achievement.id)}
                            onClose={() => setTodosMenuAnchor(null)}
                            PaperProps={{
                              sx: { maxHeight: 300, width: 300, mt: 1 },
                            }}
                          >
                            {editingData.todos && editingData.todos.length > 0 ? (
                              editingData.todos.map((todo, index) => (
                                <TodoItemRow
                                  key={todo.id}
                                  mode="controlled"
                                  todo={todo}
                                  onToggle={handleToggleTodo}
                                  onTitleChange={handleUpdateTodoTitle}
                                  onRemove={handleRemoveTodo}
                                  variant="menu"
                                  error={validationErrors[`todos.${index}.title`]}
                                />
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
                          color="success"
                          size="small"
                          disabled
                          valueLabelDisplay="on"
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
                            {isDeleting ? (
                              <CircularProgress size={16} />
                            ) : (
                              <DeleteIcon fontSize="small" />
                            )}
                          </IconButton>
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => onEdit(achievement)}
                          >
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
        loading={confirmingId ? deleting[confirmingId] || false : false}
      />
    </>
  )
}

export default memo(AchievementTable)
